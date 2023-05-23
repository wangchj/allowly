# Sim-Wallet

This app represents a virtual wallet and the amount of cash I can spend. The use case is simple:

- When I complete a task of value, I'll deposit a certain amount into the virtual wallet.
- When I make a purchase, I'll deduct the amount of the purchase from the virtual wallet.
- The amount in the wallet is what I can spend in real life.

The goal is to motivate myself to complete certain tasks.

You may ask, why not just use real cash in a real wallet? The answer is I don't like to carry
bulky cash and change with me.

# Using the app

The app can be found at https://wangchj.github.io/sim-wallet

The app only has static asset files (1 html, and 1 JS file). There are no backend servers. The app
stores all the data in browser local storage; so all of your data is stored on your device. However,
Internet is required to use the app in order to get the assets.

# Bulding the app

If you want to host the static assets yourself somewhere else, it's really simple to do:

1. Clone this repo
1. In the directory of the repo, run `npx webpack`. This will produce the assets in `docs/`
1. Upload the content of the `docs/` directory to your host (e.g., GitHub, S3, etc).

# License
This project is licensed under the MIT License.
