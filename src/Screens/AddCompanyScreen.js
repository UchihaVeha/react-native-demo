import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Button, TextInput, Switch } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import useAddEntity from '../Hooks/useAddEntity';

export default function AddCompanyScreen({ navigation }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoading, addEntity] = useAddEntity('companies');

  const callback = () => {
    navigation.goBack();
  };

  function handleSave() {
    addEntity({ name, address, phone, isActive, image }, callback);
  }

  function handleSelectImage() {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      // TODO handle events
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        setImage(source);
      }
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.field}>
        <TextInput
          label="Address"
          value={address}
          onChangeText={text => setAddress(text)}
        />
      </View>
      <View style={styles.field}>
        <TextInput
          label="Phone"
          value={phone}
          onChangeText={text => setPhone(text)}
        />
      </View>
      <View style={styles.switch}>
        <Text>Active:</Text>
        <Switch
          value={isActive}
          onValueChange={() => {
            setIsActive(state => !state);
          }}
        />
      </View>
      <View style={styles.field}>
        {image && <Avatar.Image size={44} source={image} />}

        <Button compact={false} mode="outlined" onPress={handleSelectImage}>
          Upload image
        </Button>
      </View>
      <View style={styles.field}>
        <Button
          compact={false}
          mode="contained"
          loading={isLoading}
          onPress={handleSave}
        >
          Save
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  switch: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  field: {
    paddingHorizontal: 16,
    paddingTop: 16
  }
});
