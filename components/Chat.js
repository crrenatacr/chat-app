import { useState, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  // State to hold chat messages
  const [messages, setMessages] = useState([]);

  // Initialize with a default message on component mount
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  // Destructure params from the route
  const { name, backgroundColor } = route.params;

  // Set the navigation title to the user's name
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, [name, navigation]);

  // Function to handle sending new messages
  const onSend = (newMessages) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={styles.text}>Hello {name}!</Text>
      <GiftedChat 
        messages={messages} 
        onSend={messages => onSend(messages)} 
        user={{ _id: 1 }}
      />
      
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
