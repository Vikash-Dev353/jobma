import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
  GestureResponderEvent
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { validateInputs } from './validation';
import PersonalInfoScreen from './PersonalInfoScreen';


const App = () => {
 
  return (
    <>
      <PersonalInfoScreen />
    </>
  );
};

export default App;
