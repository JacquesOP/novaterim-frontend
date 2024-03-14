import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MyDatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 8, borderRadius: 10,margin: 15, backgroundColor: 'white', marginTop:5, }}>
      <Text>Inscrit depuis le : {date.toISOString().split('T')[0]}</Text>
      <TouchableOpacity
       onPress={showDatepicker}
       style={styles.button}>
        <FontAwesome name="calendar" size={27} color={'white'}  />
        <Text style={styles.buttonText}>Sélectionner une date</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
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
  button: {
    paddingLeft: 10,
    marginTop: 20,
    paddingTop: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  buttonText: {
    margin:10,
    padding:10,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MyDatePicker;