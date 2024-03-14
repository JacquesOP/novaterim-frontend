import React from "react";
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"


export default function Upload(props) {


   return (
      <View style={styles.container} ref={props.ref}>
         <View style={styles.textContainer}>
            <FontAwesomeIcon icon={props.name} size={props.size} color={props.color} />
            <Text style={styles.textStyle}>{props.text}</Text>
         </View>
         <TouchableOpacity 
            style={styles.buttonContainer}
            >
            <TouchableOpacity
               style={styles.buttonStyle}
               onPress={props.onPress}
               activeOpacity={props.activeOpacity}
               id={props.id}
               >
               <Text style={styles.buttonTextStyle}>{props.buttonText}</Text>
            </TouchableOpacity>

            <TouchableOpacity
               style={[styles.buttonStyle2, { display: props.display }]}
               onPress={props.onPressPreview}
               activeOpacity={props.activeOpacityPreview}
               id={props.id}
               >
               <Text style={styles.buttonTextStyle}>{props.buttonTextPreview}</Text>
            </TouchableOpacity>
         </TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({

   container: {
      width: '99%',
      height: 60,
      padding: 5,
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      columnGap: 10,
      borderRadius: 5,
      // shadowColor: '#000000',
      // shadowOffset: {
      //    width: 0,
      //    height: 7,
      //    },
      // shadowOpacity:  0.17,
      // shadowRadius: 3.05,
      elevation: 4
   },
   textContainer: {
      width: '50%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      columnGap: 10,
   },
   textStyle: {
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 28,
      letterSpacing: 0.2,
   },
   buttonContainer: {
      width: '30%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      columnGap: 10,
   },
   buttonStyle: {
      width: '45%',
      height: 30,
      backgroundColor: 'rgb(0,110,177)',
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // shadowColor: '#000000',
      // shadowOffset: {
      //    width: 0,
      //    height: 7,
      //    },
      // shadowOpacity:  0.17,
      // shadowRadius: 3.05,
      elevation: 4,
     
    
   },
   buttonStyle2: {
      width: '45%',
      height: 30,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: 'rgb(0,110,177)',
      borderRadius: 5,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // shadowColor: '#000000',
      // shadowOffset: {
      //    width: 0,
      //    height: 7,
      //    },
      // shadowOpacity:  0.17,
      // shadowRadius: 3.05,
      elevation: 4,
   
   },
   buttonTextStyle: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 28,
      letterSpacing: 0.2,
   }
})