import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import for human silhouette icon

// Get the device's height for responsive sizing
const { height } = Dimensions.get('window');

const Start = ({ navigation }) => {
  const [name, setName] = useState(''); // State for storing the user's name
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF'); // State for storing the selected background color

  return (
    <ImageBackground
      source={require('../assets/background-image.png')} // Replace with your image in the assets folder
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* App title positioned lower */}
        <Text style={styles.title}>ChatApp</Text>

        {/* White box containing input, color selection, and button */}
        <View style={styles.box}>
          {/* User name input field with icon */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#757083" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName} // Update name state on text change
              placeholder="Your name" // Placeholder text
              placeholderTextColor="#757083"
            />
          </View>

          {/* Background color selection */}
          <Text style={styles.colorLabel}>Choose background color:</Text>
          <View style={styles.colorOptionsContainer}>
            {['#090C08', '#474056', '#8A95A5', '#B9C6AE'].map((color) => (
              <TouchableOpacity
                key={color}
                style={[styles.colorOption, { backgroundColor: color }]}
                onPress={() => setBackgroundColor(color)} // Sets the selected background color
              />
            ))}
          </View>

          {/* Button to start the chat */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: '#757083' }]}
            onPress={() => navigation.navigate('Chat', { name: name, backgroundColor: backgroundColor })} // Pass name and background color to Chat
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Cover the entire screen
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align to bottom
    paddingBottom: 50, // Space from bottom of the screen
  },
  title: {
    fontSize: 45, // App title font size
    fontWeight: '600', // App title font weight
    color: '#FFFFFF', // App title font color
    position: 'absolute',
    top: '12%', // Position title lower on the screen
  },
  box: {
    width: '88%',
    height: height * 0.44, // 44% of the device height
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around', // Space elements evenly inside box
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: '30%', // Push box downwards more
    marginBottom: 30, // Add margin from the bottom
  },
  inputContainer: {
    flexDirection: 'row', // Align icon and text input horizontally
    alignItems: 'center',
    width: '88%',
    borderWidth: 1,
    borderColor: '#757083',
    borderRadius: 5,
    padding: 10,
  },
  icon: {
    marginRight: 10, // Space between icon and input text
  },
  textInput: {
    flex: 1, // Takes up the remaining width in inputContainer
    color: '#757083',
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1, // 100% opacity
  },
  colorOptionsContainer: {
    flexDirection: 'row', // Align color options in a row
    justifyContent: 'center', // Center the color options
    width: '60%',
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25, // Half of width and height to make it circular
    marginHorizontal: 5,
  },
  button: {
    width: '88%', // Same width as text input
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF', // Button text color
  },
});

export default Start;
