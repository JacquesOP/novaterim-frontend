/*
============ Import react, react native & expo modules ============ 
*/
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
/*
============ Import modules ============ 
*/
import LottieView from 'lottie-react-native';
// create a component
export default function AppLoader() {

   return (
      <View style={[ StyleSheet.absoluteFillObject ,styles.container]}>
         <LottieView 
            style={{ height: 150, width: 150 }} 
            source={require('./assets/loading.json')} 
            autoPlay 
            loop 

            />
      </View>
   );
};

// define your styles
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 100
   },
});


