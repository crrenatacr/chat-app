import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Define CustomActions component
const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  storage,
  userID,
}) => {
  const actionSheet = useActionSheet();

  // Function to display the action sheet with options
  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;

    // Display action sheet and handle option selection
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage(); 
            return;
          case 1:
            takePhoto(); 
            return;
          case 2:
            getLocation(); 
            return;
          default:
            return;
        }
      }
    );
  };

  // Function to upload the image and send it as a message
  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI); 
    const newUploadRef = ref(storage, uniqueRefString); 
    const response = await fetch(imageURI); 
    const blob = await response.blob(); 
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref); 
      onSend({ image: imageURL }); 
    });
  };

  // Function to select an image from the user's library
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync(); 
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri); 
      else Alert.alert("Permissions haven't been granted."); 
    }
  };

  // Function to take a photo with the camera
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync(); 
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri); 
      else Alert.alert("Permissions haven't been granted."); 
    }
  };

  // Generate unique reference string for each image
  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split("/")[uri.split("/").length - 1]; 
    return `${userID}-${timeStamp}-${imageName}`; 
  };

  // Function to get the user's current location
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({}); 
      if (location) {
        onSend({
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        }); 
      } else Alert.alert("Error occurred while fetching location"); 
    } else Alert.alert("Permissions haven't been granted."); 
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onActionPress}
      accessibilityLabel="Open actions"
      accessibilityRole="button"
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

// Define component styles
const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1, 
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 10,
    backgroundColor: "transparent",
    textAlign: "center",
    marginTop: 4,
  },
});

export default CustomActions;
