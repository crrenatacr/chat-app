import { useState, useEffect } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native'; 
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

const Chat = ({ route, db, navigation }) => {
  const [messages, setMessages] = useState([]);
  const collectionName = "messages";

  const { name, userID, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesFirestore = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          _id: data._id,
          text: data.text,
          createdAt: data.createdAt.toDate(), // Converte TimeStamp para Date
          user: {
            _id: data.user._id,
            name: data.user.name,
            avatar: data.user.avatar || null,
          },
          system: data.system || false,
        };
      });
      setMessages(messagesFirestore);
    });

    return () => unsubscribe(); // Limpa a assinatura do onSnapshot
  }, [db]);

  const onSend = (newMessages) => {
    const message = newMessages[0];
    console.log("Dados do usuário:", { userID, name });
    if (userID && name) {
      addDoc(collection(db, collectionName), {
        _id: message._id || Math.floor(Math.random() * 1000000), // Gera um ID caso não exista
        text: message.text,
        createdAt: new Date(),
        user: {
          _id: userID, // Usa o userID de route.params
          name: name, // Usa o name de route.params
          avatar: message.user.avatar || null,
        },
        system: message.system || false,
      });
    } else {
      console.error("Dados de usuário incompletos: ", { userID, name });
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

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={styles.text}>Hello {name}!</Text>
      <GiftedChat 
        messages={messages}
        renderBubble={renderBubble}
        onSend={messages => onSend(messages)}
        user={{ _id: userID, name: name }} // Usa userID aqui também
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
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Chat;
