import React from "react";
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";


export default function Upload(props) {

   return (
      <View>         
         <Text>{props.text}</Text>
         <TouchableOpacity
            onPress={props.onPress}
            activeOpacity={props.activeOpacity}
            >
            <Text>{props.buttonText}</Text>
         </TouchableOpacity>
         <FontAwesome name={props.name} size={props.size} color={props.color} />
      </View>
   );
}