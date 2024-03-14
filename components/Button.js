import React from "react";
import { 
   Text,
   View,
   StyleSheet,
   TouchableOpacity,

} from "react-native"


export default function Button(props) {

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
      color: '#1F5895',
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 28,
      letterSpacing: 0.2,
   },
   buttonContainer: {
      width: '100%',
      height: 50,
      backgroundColor: '#ffffff',
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      // shadowColor: "#000000",
		// shadowOffset: {
		// width: 0,
		// height: 4,
		// },
		// shadowOpacity:  0.19,
		// shadowRadius: 5.62,
		elevation: 6
   }
})