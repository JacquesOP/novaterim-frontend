import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  { Picker }  from '@react-native-picker/picker';

const CountryPicker = () => {
  const [selectedCountry, setSelectedCountry] = useState(''); // État pour suivre la nationalité sélectionnée

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
  };

  return (
    <View style={styles.container}>
      <Text>Sélectionnez votre pays :</Text>
      <Picker
        selectedValue={selectedCountry}
        onValueChange={handleCountryChange}
        style={styles.picker}
      >
        <Picker.Item label="Choisissez un pays" value="" />
        <Picker.Item label="France" value="FRA" />
        <Picker.Item label="États-Unis" value="USA" />
        <Picker.Item label="Canada" value="CAN" />
        
        {/* Ajoutez d'autres options selon vos besoins */}
      </Picker>

      {selectedCountry !== '' && (
        <Text>Nationalité sélectionnée : {selectedCountry}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    width: 200,
    height: 50,
    marginTop: 10,
  },
});

export default CountryPicker;