import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  { Picker }  from '@react-native-picker/picker';

const FamilyPicker = () => {
  const [selectedFamilySituation, setSelectedFamilySituation] = useState(''); // État pour suivre la nationalité sélectionnée

  const handleFamilySituationChange = (value) => {
    setSelectedFamilySituation(value);
  };

  return (
    <View style={styles.container}>
      <Text>Sélectionnez votre situation familiale :</Text>
      <Picker
        selectedValue={selectedFamilySituation}
        onValueChange={handleFamilySituationChange}
        style={styles.picker}
      >
        <Picker.Item label="Choisissez votre situation familiale" value="" />
        <Picker.Item label="Célibataire" value="Célibataire" />
        <Picker.Item label="En couple" value="En couple" />
        <Picker.Item label="Pacsé" value="Pacsé" />
        <Picker.Item label="Marié" value="Marié" />
        <Picker.Item label="Divorcé" value="Divorcé" /> 
        
        
        {/* Ajoutez d'autres options selon vos besoins */}
      </Picker>

      {selectedFamilySituation !== '' && (
        <Text>Situation familiale : {selectedFamilySituation}</Text>
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

export default FamilyPicker;