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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {  launchImageLibrary } from 'react-native-image-picker';

const PersonalInfoScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    experience: '',
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    experience: '',
  });

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        console.log('assets')
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    })
  };

  const handleInputChange = (field, value) => {
    setInputs({ ...inputs, [field]: value });
  };


  const validateInputs = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // First Name validation
    if (!inputs.firstName) {
      newErrors.firstName = 'First Name is required';
      isValid = false;
    } else {
      newErrors.firstName = '';
    }

    // Last Name validation
    if (!inputs.lastName) {
      newErrors.lastName = 'Last Name is required';
      isValid = false;
    } else {
      newErrors.lastName = '';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!inputs.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(inputs.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    } else {
      newErrors.email = '';
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/; 
    if (!inputs.phone) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(inputs.phone)) {
      newErrors.phone = 'Invalid phone number';
      isValid = false;
    } else {
      newErrors.phone = '';
    }

    // Country validation
    if (!inputs.country) {
      newErrors.country = 'Country is required';
      isValid = false;
    } else {
      newErrors.country = '';
    }

    // City validation
    if (!inputs.city) {
      newErrors.city = 'City is required';
      isValid = false;
    } else {
      newErrors.city = '';
    }

    // Experience validation
    if (!inputs.experience) {
      newErrors.experience = 'Experience is required';
      isValid = false;
    } else if (isNaN(Number(inputs.experience))) {
      newErrors.experience = 'Experience must be a number';
      isValid = false;
    } else {
      newErrors.experience = '';
    }

    setErrors(newErrors);
    return isValid;
  };


  const onSubmit = () => {
    if (validateInputs()) {
      Alert.alert('Success', 'All inputs are valid!');
      console.log('Form Data:', inputs);
      // You can proceed with form submission logic here (e.g., API call)
    } else {
      Alert.alert('Error', 'Please fix the errors before submitting');
    }
  };

  return (
    <>
      <View style={styles.header}>
        <LinearGradient
          colors={['#5063ed', '#2a2e4a']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.statusBar} />
          <Image source={require('./Assets/Vector-2.png')} style={styles.headerIcon} />
          <View style={styles.stepIndicator}>
            <Text style={styles.stepText}>Step 1/3</Text>
            <View style={styles.progressBar}>
              <View style={styles.activeStep} />
              <View style={styles.inactiveStep} />
              <View style={styles.inactiveStep} />
            </View>
          </View>
        </LinearGradient>
      </View>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Personal Info</Text>
        <View style={styles.uploadImgCant}>
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={pickImage}
          >
            <Text style={{ fontSize: 16,}}>+</Text>
          </TouchableOpacity>
          <View>
            {selectedImage ? (
              <>
                <Image source={{ uri: selectedImage }} style={styles.profileImage} />
              </>
            ) : (
              <View >
                <Text style={styles.addImageText}>Add profile image</Text>
              </View>
            )}
          </View>
        </View>


        {/* Input Fields */}
        <View style={[styles.inputContainer, errors.firstName ?
          { borderBottomColor: '#ff0000' } : { borderBottomColor: '#dddddd' }]}>
          <Image source={require('./Assets/User.png')} style={styles.iconStyle} />
          <TextInput
            placeholder="First Name"
            style={styles.input}
            value={inputs.firstName}
            onChangeText={(value) => handleInputChange('firstName', value)}
          />
        </View>
        {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}

        <View style={[styles.inputContainer, errors.lastName ?
          { borderBottomColor: '#ff0000' } : { borderBottomColor: '#dddddd' }]}>
          <Image source={require('./Assets/User.png')} style={styles.iconStyle} />
          <TextInput
            placeholder="Last Name"
            style={styles.input}
            value={inputs.lastName}
            onChangeText={(value) => handleInputChange('lastName', value)}
          />
        </View>
        {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}
        <View style={[styles.inputContainer, errors.firstName ?
          { borderBottomColor: '#ff0000' } : { borderBottomColor: '#dddddd' }]}>
          <Image source={require('./Assets/Email.png')} style={styles.iconStyle} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            value={inputs.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
        </View>
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

        <View style={[styles.inputContainer, errors.phone ?
          { borderBottomColor: '#ff0000' } : { borderBottomColor: '#dddddd' }]}>
          <Image source={require('./Assets/Phone.png')} style={styles.iconStyle} />
          <TextInput
            placeholder="Phone"
            style={styles.input}
            keyboardType="phone-pad"
            value={inputs.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
          />

        </View>
        {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}

        <View style={[styles.inputContainer, errors.country ?
          { borderBottomColor: '#ff0000' } : { borderBottomColor: '#dddddd' }]}>
          <Image source={require('./Assets/world.png')} style={styles.iconStyle} />
          <TextInput
            placeholder="Country"
            style={styles.input}
            value={inputs.country}
            onChangeText={(value) => handleInputChange('country', value)}
          />
        </View>
        {errors.country ? <Text style={styles.errorText}>{errors.country}</Text> : null}

        <View style={[styles.inputContainer, errors.city ?
          { borderBottomColor: '#ff0000' } : { borderBottomColor: '#dddddd' }]}>
          <Image source={require('./Assets/City.png')} style={styles.iconStyle} />
          <TextInput
            placeholder="City"
            style={styles.input}
            value={inputs.city}
            onChangeText={(value) => handleInputChange('city', value)}
          />
        </View>
        {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}

        <View style={[styles.inputContainer, errors.experience ?
          { borderBottomColor: '#ff0000' } : { borderBottomColor: '#dddddd' }]}>
          <Image source={require('./Assets/Certificate.png')} style={styles.iconStyle} />
          <TextInput
            placeholder="Exprience"
            style={styles.input}
            value={inputs.experience}
            onChangeText={(value) => handleInputChange('experience', value)}
          />
        </View>
        {errors.experience ? <Text style={styles.errorText}>{errors.experience}</Text> : null}

        {/* Next Button */}

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={onSubmit}>
          <LinearGradient
            colors={['#5063ed', '#2a2e4a']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  statusBar: {
    height: 50,
  },
  header: {
    // alignItems: 'center',
    // marginVertical: 20,
  },
  headerIcon: {
    width: 68,
    height: 68,
  },
  stepIndicator: {
    // alignItems: 'center',
    // backgroundColor:'green',
    // width:'100%',
  },
  stepText: {
    fontSize: 16,
    color: '#ffffff',
  },
  progressBar: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  activeStep: {
    width: '30%',
    height: 8,
    backgroundColor: '#5063ee',
    borderRadius: 5,
    marginRight: 5,
  },
  inactiveStep: {
    width: '30%',
    height: 8,
    backgroundColor: '#c7c7c7',
    borderRadius: 5,
    marginRight: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },

  uploadImgCant:{
    flexDirection:'row',
    alignItems:'center',
    marginBottom:24,
  },

  uploadBtn:{
    width: 40,
    height: 40,
    backgroundColor: '#d9d9d9',
    borderRadius: 40,
    marginRight:  26,
    alignItems: 'center',
    justifyContent: 'center'
  },

  imagePicker: {
    alignSelf: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  addImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  iconStyle: {
    width: 16,
    height: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,

    // borderBottomColor: '#ddd',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#4f6df5',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonContainer: {
    marginVertical: 10,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default PersonalInfoScreen;
