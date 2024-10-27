import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params; // Receive name and background color from navigation params

  useEffect(() => {
    navigation.setOptions({ title: name }); // Set the navigation title to the user's name
  }, [name, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}> {/* Apply the chosen background color */}
      <Text style={styles.text}>Hello {name}!</Text> {/* Ensure name is within a Text component */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Chat;
