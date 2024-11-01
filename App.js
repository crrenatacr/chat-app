import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from 'firebase/auth';
import { useEffect } from 'react';
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBDN4n6T-VFTHZwbpdvR_nqgAUx86LJ19o",
  authDomain: "chat-app-99ffd.firebaseapp.com",
  projectId: "chat-app-99ffd",
  storageBucket: "chat-app-99ffd.firebasestorage.app",
  messagingSenderId: "980131401442",
  appId: "1:980131401442:web:5489e62280367c50af18bb"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;