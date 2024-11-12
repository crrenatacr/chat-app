# Chat App

## Project Overview

Chat App is a mobile messaging application built with **React Native** and **Expo**, designed for real-time communication. The app allows users to chat with friends and family, share images, and exchange location data. It also features offline message reading, making it a reliable communication tool. The app ensures accessibility for users with visual impairments by supporting screen readers.

### User Stories

- **As a user**, I want to be able to receive real-time information and send messages to stay connected with friends and family.
- **As a user**, I want to create a personalized experience by choosing my name and background color when entering the app.
- **As a user**, I want to be able to share images from my device so I can showcase my activities.
- **As a user**, I want to share my location to help friends find me easily.
- **As a user**, I want to be able to read my messages offline for convenience.
- **As a user with visual impairments**, I want the app to be compatible with screen readers to ensure accessibility.

### Key Features

- **Welcome Screen**: Users can enter their name and select a background color for a personalized experience.
- **Chat Interface**: Send and receive messages in real time, with the ability to view message history.
- **Image Sharing**: Users can take and upload photos from their device or photo library to share in the chat.
- **Location Sharing**: Users can share their current location with others in the chat.
- **Offline Messaging**: Users can read messages offline even when they don't have an internet connection.
- **Accessibility**: The app is designed to be compatible with screen readers to ensure it is accessible to all users.

## Technologies Used

- **React Native**: Framework for building mobile applications.
- **Expo**: A platform for developing and deploying React Native apps.
- **Firebase**: Used for real-time data storage, authentication, and file storage (Firestore, Cloud Storage).
- **Gifted Chat**: A library for creating an elegant chat interface.
- **React Navigation**: Handles navigation between screens.
- **AsyncStorage**: Stores data offline.
- **Expo Location**: Provides access to the user's location for sharing.
- **Expo Image Picker**: Allows users to pick images or take photos for sharing.

## Getting Started

### Prerequisites

Ensure you have the following installed before you begin:

- **Node.js (v16.19.0)** (preferrable) or newer: Required to run the app.
- **Expo CLI**: Install globally by running:
  Poweshell
  npm install -g expo-cli


# Android Studio (Optional but recommended):

 Required for Android emulator usage.

# Installation

Clone the repository:

git clone https://github.com/crrenatacr/chat-app.git
cd chat-app

# Install dependencies:

npm install

# Setup

    Ensure the correct Node version is installed: If you're using a version of Node higher than 16.19.0, you can switch to the correct version by running:

    nvm install 16.19.0
    nvm use 16.19.0
    nvm alias default 16.19.0

    Create a Firebase Project:
        Go to the Firebase Console.
        Create a new project and add a web app.
        Copy the Firebase configuration details for use in the app.

    Set up Firestore and Firebase Storage:
        In the Firebase console, set up Firestore Database and Firebase Storage for the app.

# Running the App

    Start the app locally with Expo:

    npx expo start

    Open the Expo app on your mobile device or emulator:
        Scan the QR code displayed in the terminal or browser to run the app on your device.

# Project Structure

    src: Source code for the app.
    components: Contains React components for the app.
    assets: Stores static assets such as images and icons.
    screens: Different screens for navigation in the app.
    styles: Styling files for the app.

# Dependencies

Here is a list of key dependencies used in this project:

    @expo/react-native-action-sheet: For action sheet support.
    expo: The platform for building React Native apps.
    firebase: For Firebase services such as Firestore, Authentication, and Storage.
    react-native-gifted-chat: Provides a user-friendly chat interface.
    react-navigation: Handles navigation within the app.
    expo-location: To access and share the user's location.
    expo-image-picker: For picking images from the user's device or camera.

# License

This project is licensed under the MIT License - see the LICENSE file for details.