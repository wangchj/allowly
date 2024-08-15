const day = 1000 * 60 * 60 * 24;

// Result records
let res = [];

function randomValue() {
  let sign = Math.random() < 0.5 ? true : false;
  let value = (Math.floor(Math.random() * 20) + 1) * 100 * (sign ? 1 : -1);
  return value;
}

function addEntry(date) {
  let value = randomValue();
  let total = res.length > 0 ? res[0].total + value : value;
  res.unshift({
    time: new Date(date).getTime(),
    value: value,
    total: total,
  });
}

let now = new Date();
let date = new Date();
date.setDate(now.getDate() - 20);

while (date < now) {
  date.setHours(Math.floor(Math.random() * 23), Math.floor(Math.random() * 59), 0);
  addEntry(date);
  date.setTime(date.getTime() + day);
}

addEntry(now);

console.log(JSON.stringify({entries:res}));
