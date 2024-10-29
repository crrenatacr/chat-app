import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  return (
    <ImageBackground
      source={require('../assets/background-image.png')}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.title}>ChatApp</Text>

        <View style={styles.box}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#757083" style={styles.icon} />
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName} 
              placeholder="Your name" 
              placeholderTextColor="#757083"
            />
          </View>

          <Text style={styles.colorLabel}>Choose background color:</Text>
          <View style={styles.colorOptionsContainer}>
            {['#090C08', '#474056', '#8A95A5', '#B9C6AE'].map((color) => (
              <TouchableOpacity
                key={color}
                accessible={true}
                accessibilityLabel={`Color option ${color}`}
                accessibilityHint="Selects this color as the background color"
                accessibilityRole="button"
                onPress={() => setBackgroundColor(color)} 
                style={[styles.colorOption, { backgroundColor: color }]}
              />
            ))}
          </View>

          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Start chatting"
            accessibilityHint="Navigates to the chat screen with the selected background color"
            accessibilityRole="button"
            style={[styles.button, { backgroundColor: '#757083' }]}
            onPress={() => navigation.navigate('Chat', { name: name, backgroundColor: backgroundColor })}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    position: 'absolute',
    top: '12%',
  },
  box: {
    width: '88%',
    height: height * 0.44,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginTop: '30%',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '88%',
    borderWidth: 1,
    borderColor: '#757083',
    borderRadius: 5,
    padding: 10,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: '#757083',
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '60%',
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 5,
  },
  button: {
    width: '88%',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default Start;
