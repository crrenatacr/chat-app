import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {
  // Destructure the parameters from the route object
  const { name, backgroundColor } = route.params;

  // useEffect hook to set the navigation title when the component mounts or when 'name' changes
  useEffect(() => {
    navigation.setOptions({ title: name }); // Update the navigation title to the user's name
  }, [name, navigation]); // Dependencies array to re-run effect when 'name' or 'navigation' changes

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Text style={styles.text}>Hello {name}!</Text>
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
