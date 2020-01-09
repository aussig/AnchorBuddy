# AnchorBuddy

A cross platform Android and iOS app, built using expo.io, to assist with making calculations when anchoring a boat.

The app will calculate the depth to anchor and the scope to use.

**NOT TO BE USED FOR NAVIGATION - YOU ACCEPT ALL RISKS IN USING THIS SOFTWARE**

Copyright © 2018 Austin Goudge and Stephen Gorst

## Setting Up
Install expo.io and all prerequisites by following [their instructions](https://docs.expo.io/versions/latest/introduction/installation.html).

Install `expo-cli` command-line tool (instructions below assume you have this installed):

```sh
$ npm install -g expo-cli
```

## Building and Running Locally

To run the project in expo.io:

```sh
$ expo start
```

Running in emulators can be done via the browser UI that is automatically launched by `expo start`. Genymotion is required for Android.


## Publishing new version via Expo

Can be done via the UI launched with `expo start`.


## Building new Apps for Play and Apple Stores

```sh
$ expo build:ios
$ expo build:android -t app-bundle
```
