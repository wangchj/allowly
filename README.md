# Allowly

A cross-platform app for keeping track of spending allowance. The use case is simple:

- When I complete a task of value, I'll add to my allowance in the app
- When I make a purchase, I'll deduct fro my allowance in the app
- The amount in the app is what I can spend in real life.

The goal is to motivate myself to complete certain tasks.

You may ask, why not just use real cash in a real wallet? The answer is I don't like to carry
bulky cash and change with me.

# Data storage and privacy

The app stores all data locally in app preferences. The app does not call any remote APIs and does
not require network connection to work once the app is install.

The data is erased after the app is uninstalled.

# Building the app

If you want to host the static assets yourself somewhere else, it's really simple to do:

1. Clone this repo
1. In the directory of the repo, run `npx webpack`. This will produce the assets in `docs/`
1. Upload the content of the `docs/` directory to your host (e.g., GitHub, S3, etc).

# Making screenshots for iOS App Store

When uploading a new version to Apple iOS App Store, we may also need to update the screenshots to
show the changes. This section describe how to make the screenshots.

The screenshot process is simple since we have an automated script to do that:

```bash
node scripts/make-screenshots.js
```

# License
This project is licensed under the MIT License.
