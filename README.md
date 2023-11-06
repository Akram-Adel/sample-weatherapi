# WeatherAPI

[![React Version](https://img.shields.io/badge/React-18.2.0-blue)](https://react.dev/) [![React Native Version](https://img.shields.io/badge/React%20Navigation-0.72.6-blue)](https://reactnative.dev/) [![React Navigation Version](https://img.shields.io/badge/React%20Navigation-6.1.9-blue)](https://github.com/react-navigation/react-navigation) [![Jest Version](https://img.shields.io/badge/Jest-29.2.1-blue)](https://jestjs.io/)

## Includes

- [x] Unit testing with Jest
- [x] API integration using axios
- [x] `TypeScrip`
- [x] Atomic Design

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

# Unit Tests

UI and business logic change frequently, which is why I don't focus too much on testing UI or business logic.
Instead, I focus on testing critical functionalities of the component that don't often change when the UI or the business changes.
