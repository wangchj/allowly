const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const {cd, exec} = require('shelljs');

// Throw and exist the script if any of the commands fail.
shell.config.fatal = true;

/**
 * Build root directory.
 */
const buildDir = path.resolve(__dirname, '../build');

/**
 * Fastlane snapshot command output location.
 */
const snapshotDir = `${buildDir}/snapshot`;

/**
 * Screenshots temporarily work location
 */
const tempDir = `${buildDir}/temp`;

/**
 * Screenshot background color.
 */
const bgColor = '#F0F0F0';

/**
 * Directory that contains iOS device frames.
 */
const framesDir = path.resolve(__dirname, '../ios/App/frames');

/**
 * Final screenshots output location.
 */
const screenshotsDir = `${buildDir}/screenshots`;

const iphone55Pattern = /iPhone 8 Plus-([\w-]+)_framed\.png/;
const iphone69Pattern = /iPhone 15 Pro Max-([\w-]+)_framed\.png/;
const ipad129Pattern  = /iPad Pro \(12.9-inch\) \(2nd generation\)-([\w-]+)\.png/;
const ipad13Pattern   = /iPad Pro 13-inch \(M4\)-([\w-]+)\.png/;

mockData();
patchLoadEntries();
buildAndSync();
snapshot();
frameit();
magick();
unpatch();
buildAndSync();

function mockData() {
  exec('mkdir -p build');
  exec('node scripts/screenshot-mock-entries.js').to('./build/mock-entries.json');
}

function patchLoadEntries() {
  const target = `${path.resolve(__dirname) + '/../src/modules/load-entries.js'}`;
  const patch = `${path.resolve(__dirname) + '/load-mock-entries.patch'}`;
  exec(`patch -u ${target} -i ${patch}`);
}

function unpatch() {
  cd(path.resolve(__dirname, '..'));
  exec('git checkout src/modules/load-entries.js');
}

function buildAndSync() {
  exec('npm run build');
  exec('npx cap sync');
}

/**
 * Runs `fastlane snapshot` command.
 */
function snapshot() {
  cd(path.resolve(__dirname, '../ios/App'));
  exec(`fastlane snapshot --output_directory ${snapshotDir}`);
}

/**
 * Runs `fastlane frameit` command.
 */
function frameit() {
  cd(snapshotDir);
  exec('fastlane frameit');
}

/**
 * Runs ImageMagick commands to finalize screenshots.
 */
function magick() {
  exec(`mkdir -p ${tempDir}`);
  exec(`mkdir -p ${screenshotsDir}`);

  // File names inside the snapshot output directory, which contains all the locales.
  const locales = fs.readdirSync(`${snapshotDir}`);

  for (let locale of locales) {
    // .html files are not locale directories.
    if (locale.endsWith('.html')) {
      continue;
    }

    // Screenshot image file names
    const files = fs.readdirSync(`${snapshotDir}/${locale}`);

    for (let file of files) {
      const imagePath = `${snapshotDir}/${locale}/${file}`;

      if (file.match(iphone55Pattern)) {
        iphone5_5(imagePath);
      }
      else if (file.match(iphone69Pattern)) {
        iphone6_9(imagePath);
      }
      else if (file.match(ipad129Pattern) && !file.endsWith('_framed.png')) {
        ipad12_9(imagePath);
      }
      else if (file.match(ipad13Pattern)) {
        ipad13(imagePath);
      }
    }
  }
}

/**
 * Processes a 5.5" iPhone image.
 *
 * @param {string} path The path of the image file.
 */
function iphone5_5(path) {
  const screen = path.match(iphone55Pattern)[1];
  const prefix = 'iphone5_5';
  const bgPath = `${tempDir}/${prefix}_bg.png`;
  const resizedPath = `${tempDir}/${prefix}_resized.png`;
  const outputPath = `${screenshotsDir}/${prefix}_${screen}.png`;

  if(!fs.existsSync(bgPath)) {
    exec(`magick -size 1242x2208 xc:${bgColor} '${bgPath}'`);
  }

  exec(`magick '${path}' -resize 1241x2208 '${resizedPath}'`);
  exec(`magick '${bgPath}' -colorspace sRGB '${resizedPath}' -gravity center -composite '${outputPath}'`);
}

/**
 * Processes a 6.9" iPhone image.
 *
 * @param {string} path The path of the image file.
 */
function iphone6_9(path) {
  const screen = path.match(iphone69Pattern)[1];
  const prefix = 'iphone6_9';
  const bgPath = `${tempDir}/${prefix}_bg.png`;
  const resizedPath = `${tempDir}/${prefix}_resized.png`;
  const outputPath = `${screenshotsDir}/${prefix}_${screen}.png`;

  if(!fs.existsSync(bgPath)) {
    exec(`magick -size 1290x2796 xc:${bgColor} '${bgPath}'`);
  }

  exec(`magick '${path}' -resize 1290x2796 '${resizedPath}'`);
  exec(`magick '${bgPath}' -colorspace sRGB '${resizedPath}' -gravity center -composite '${outputPath}'`);
}

/**
 * Processes a 12.9" iPad image.
 *
 * @param {string} path The path of the image file.
 */
function ipad12_9(path) {
  const screen = path.match(ipad129Pattern)[1];
  const prefix = 'ipad12_9';
  const bgPath = `${tempDir}/${prefix}_bg.png`;
  const bg2Path = `${tempDir}/${prefix}_bg2.png`;
  const framePath = `${framesDir}/ipad_pro_12.9_2nd_gen.png`;
  const stepPath = `${tempDir}/${prefix}_step.png`;
  const outputPath = `${screenshotsDir}/${prefix}_${screen}.png`;

  // Make background image that is the same size as the frame image.
  if(!fs.existsSync(bgPath)) {
    exec(`magick -size 2326x3100 xc:${bgColor} '${bgPath}'`)
  }

  // Make the screenshot the same size as the frame image.
  exec(`magick '${bgPath}' -colorspace sRGB '${path}' -gravity center -composite '${stepPath}'`);

  // Overlay the frame image on top of the screenshot to produce the framed image.
  exec(`magick '${stepPath}' '${framePath}' -gravity center -composite '${stepPath}'`);

  // Resize to fit App Store canvas
  exec(`magick '${stepPath}' -resize 2048x2732 '${stepPath}'`);

  // Create background image that is the same size as canvas
  if(!fs.existsSync(bg2Path)) {
    exec(`magick -size 2048x2732 xc:${bgColor} '${bg2Path}'`);
  }

  // Make the final image
  exec(`magick '${bg2Path}' -colorspace sRGB '${stepPath}' -gravity center -composite '${outputPath}'`);
}

/**
 * Processes a 13" iPad image.
 *
 * @param {string} path The path of the image file.
 */
function ipad13(path) {
  const screen = path.match(ipad13Pattern)[1];
  const prefix = 'ipad13';
  const bgPath = `${tempDir}/${prefix}_bg.png`;
  const bg2Path = `${tempDir}/${prefix}_bg2.png`;
  const framePath = `${framesDir}/ipad_pro_13.png`;
  const stepPath = `${tempDir}/${prefix}_step.png`;
  const outputPath = `${screenshotsDir}/${prefix}_${screen}.png`;

  // Make background image that is the same size as the frame image.
  if(!fs.existsSync(bgPath)) {
    exec(`magick -size 2350x3132 xc:${bgColor} '${bgPath}'`);
  }

  if(!fs.existsSync(bg2Path)) {
    exec(`magick -size 2064x2752 xc:${bgColor} '${bg2Path}'`);
  }

  // Resizing because the screenshot from the simulator is slightly larger than the frame content area.
  //
  // screenshot: 2064 x 2752
  // Frame content area: 2048 x 2732
  exec(`magick '${path}' -resize 2048x2732 '${stepPath}'`);

  // Make the screenshot the same size as the frame image.
  exec(`magick '${bgPath}' -colorspace sRGB '${stepPath}' -gravity center -composite '${stepPath}'`);

  // Overlay the frame image on top of the screenshot to produce the framed image.
  exec(`magick '${stepPath}' '${framePath}' -gravity center -composite '${stepPath}'`);

  // Resize to produce final image
  exec(`magick '${stepPath}' -resize 2064x2752 '${stepPath}'`);

  // Pad 1 pixel vertically
  exec(`magick '${bg2Path}' -colorspace sRGB '${stepPath}' -gravity center -composite '${outputPath}'`);
}
