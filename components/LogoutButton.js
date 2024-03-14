/**
 *  Import react, react native & expo modules
 */
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"


/**
 *  Logout Component
 */
export default function LogoutButton(props) {

   return (
      <View style={styles.buttonContainer}>
         <TouchableOpacity style={styles.textContainer} onPress={props.onPress}>
            <Text style={styles.text}>
               {props.name}
            </Text>
         </TouchableOpacity>
      </View>
   );

}


/**
 *  Styles
 */
const styles = StyleSheet.create({
   textContainer: {
      width: '80%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
   },
   text: {
      width: '100%',
      textAlign: 'center',
      color: '#ffffff',
      fontSize: 18,
      fontWeight: '700',
      lineHeight: 28,
      letterSpacing: 0.2,
   },
   buttonContainer: {
      width: '50%',
      height: 50,
      backgroundColor: '#a4a5a7',
      borderRadius: 5,
      display: 'flex',
      alignItems: 'center',
      shadowColor: '#000000',
      shadowOffset: {
         width: 0,
         height: 7,
         },
      shadowOpacity:  0.17,
      shadowRadius: 3.05,
      elevation: 4
   }
})