import { useState, useEffect } from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native'; 
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';


const Chat = ({ route, db, navigation, isConnected, storage }) => {
  const [messages, setMessages] = useState([]);
  const collectionName = "messages";


  const { name, userID, backgroundColor } = route.params;

  

  const onSend = (newMessages) => {
    const message = newMessages[0];
    console.log("User data:", { userID, name });
    if (userID && name) {
      addDoc(collection(db, collectionName), {
        _id: message._id || Math.floor(Math.random() * 1000000), // Generate ID if it doesn't exist
        text: message.text,
        createdAt: new Date(),
        user: {
          _id: userID, // Uses userID from route.params
          name: name, // Uses name from route.params
          avatar: message.user.avatar || null,
        },
        system: message.system || false,
      });
    } else {
      console.error("Incomplete User Data: ", { userID, name });
    }
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} onSend={onSend} {...props} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  let unsubMessages;
  useEffect(() => {
    if (isConnected === true) {
      const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (querySnapshot) => {
        const messagesFirestore = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            _id: data._id,
            text: data.text,
            createdAt: data.createdAt.toDate(), // Convert TimeStamp para Date
            user: {
              _id: data.user._id,
              name: data.user.name,
              avatar: data.user.avatar || null,
              image: data.image || null,
            },
            system: data.system || false,
          };
        });
        setMessages(messagesFirestore);
      });
    } else {
      loadCachedMessages();
    }

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected, db]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }
  //Function called when isConnected prop is false in useEffect()
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={styles.text}>Hello {name}!</Text>
      <GiftedChat 
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        onSend={messages => onSend(messages)}
        renderCustomView={renderCustomView}
        user={{ _id: userID, name }} 
      />
      {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#C00",
    padding: 10,
    zIndex: 1
  },
  logoutButtonText: {
    color: "#FFF",
    fontSize: 10
  }
});

export default Chat;
