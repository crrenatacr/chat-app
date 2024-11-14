import { useState, useEffect } from "react";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";

const Chat = ({ route, db, isConnected, storage }) => {
  const [messages, setMessages] = useState([]);
  const collectionName = "messages";

  const { name, userID, backgroundColor } = route.params;

  const onSend = (newMessages) => {
    const message = newMessages[0] || newMessages;
    if (userID && name) {
      addDoc(collection(db, collectionName), {
        _id: message?._id || Math.floor(Math.random() * 1000000),
        ...message,
        createdAt: new Date(),
        user: {
          _id: userID,
          name: name,
          avatar: message?.user?.avatar || null,
        },
        system: message?.system || false,
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
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{
            width: 150,
            height: 100,
            borderRadius: 13,
            margin: 3,
          }}
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
  };

  // Insira renderAvatar aqui
  const renderAvatar = (props) => {
    return (
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{props.currentMessage.user.name[0]}</Text>
      </View>
    );
  };

  useEffect(() => {
    if (isConnected === true) {
      const q = query(
        collection(db, collectionName),
        orderBy("createdAt", "desc")
      );
      unsubMessages = onSnapshot(q, (querySnapshot) => {
        const newMessages = [];
        querySnapshot.docs.map((doc) => {
          newMessages.push({
            _id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        setMessages(newMessages);
      });
    } else {
      loadCachedMessages();
    }

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected, db]);

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
        renderAvatar={renderAvatar} // Passa renderAvatar para personalizar o avatar
        renderInputToolbar={renderInputToolbar}
        renderActions={renderCustomActions}
        onSend={messages => onSend(messages)}
        renderCustomView={renderCustomView}
        user={{ _id: userID, name }} 
      />
      {Platform.OS === "android" ? <KeyboardAvoidingView behavior="height" /> : null}
      {Platform.OS === "ios" ? <KeyboardAvoidingView behavior="padding" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#757083",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5, // 50% opacity para o avatar
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "300",
    color: "#FFFFFF", // cor branca para o texto do avatar
  },
  startChatButton: {
    backgroundColor: "#757083",
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 1, // "Choose background color"
  },
  mapContainer: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
    overflow: "hidden",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Chat;
