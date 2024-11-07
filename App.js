import { NavigationContainer } from '@react-navigation/native'; // import react Navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app"; // import FireBase
import { useEffect } from 'react'
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import Start from './components/Start';
import Chat from './components/Chat';
import { useNetInfo }from '@react-native-community/netinfo';

import { LogBox, Alert } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Your web app's Firebase configuration
const App = () => {
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
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);
const connectionStatus = useNetInfo();

// Create the navigator
const Stack = createNativeStackNavigator();

useEffect(() => {
  if (connectionStatus.isConnected === false) {
    Alert.alert("Connection lost!");
    disableNetwork(db);
  } else if (connectionStatus.isConnected === true) {
    enableNetwork(db);
  }
}, [connectionStatus.isConnected]);

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
        >

      {props => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props}  />}
      </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
