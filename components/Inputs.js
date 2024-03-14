import React from "react";
import {
   View,
   TextInput,
   StyleSheet,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Inputs(props) {
   return (
      <View style={styles.inputBox}>
         <FontAwesome name={props.name} size={18} color={"#ffffff"} />
         <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={"rgba(255, 255, 255, 0.7)"}
            value={props.value}
            onChangeText={props.onChangeText}
            secureTextEntry={props.secureTextEntry}
            inputMode={props.inputMode}
            style={styles.input}
         />
      </View>
   );
}

const styles = StyleSheet.create({

   input: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: 40,
      width: "90%",
      color: "#ffffff",
      fontWeight: "600"
   },
   inputBox: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomColor: "#2596be",
      borderBottomWidth: 1,
   },

});
