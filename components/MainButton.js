/**
 *  Import react, react native & expo modules
 */
import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native"


/**
 *  Logout Component
 */
export default function MainButton(props) {

   return (
     
         <TouchableOpacity style={[styles.actionButton,{backgroundColor:props.color}]} onPress={props.onPress}>
            <Text style={[styles.actionButtonText,{color:props.colorText}]}>
               {props.name}
            </Text>
         </TouchableOpacity>
 
   );

}


/**
 *  Styles
 */
const styles = StyleSheet.create({
   actionButton: {
      width: "100%",
      borderRadius: 8,
      padding: 16,
      alignItems: "center",
      marginTop: 46,
      marginBottom: 16,
      marginHorizontal: 46,
      // shadowColor: "#000000",
		// shadowOffset: {
		// width: 0,
		// height: 4,
		// },
		// shadowOpacity:  0.19,
		// shadowRadius: 5.62,
		elevation: 6
   },
   actionButtonText: {
      
      width: '100%',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 28,
      letterSpacing: 0.2,
   },

})