import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

export default function NotificationButton(props) {
   const [isActive, setIsActive] = useState(false);

   const handleToggle = () => {
      setIsActive(!isActive);
   };

   return (
      <View style={styles.container} ref={props.ref}>
         <View style={styles.textContainer}>
            <Text style={styles.textStyle}>{props.text}</Text>
         </View>
         <Switch
            trackColor={{ false: "grey", true: "#028AC6" }}
            thumbColor={isActive ? "lightblue" : "lightgrey"}
            ios_backgroundColor="grey"
            onValueChange={handleToggle}
            value={isActive}
         ></Switch>
      </View>
   );
}

const styles = StyleSheet.create({
   activeButton: {
      backgroundColor: "lightblue",
   },
   inactiveButton: {
      backgroundColor: "lightgray",
   },
   container: {
      width: "99%",
      height: 55,
      padding: 5,
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      columnGap: 10,
      borderRadius: 5,
      shadowColor: "#000000",
      shadowOffset: {
         width: 0,
         height: 7,
      },
      shadowOpacity: 0.17,
      shadowRadius: 3.05,
      elevation: 4,
      marginBottom: 3,
      marginTop: 2,
   },
   textContainer: {
      width: "80%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
   },
   textStyle: {
      fontSize: 14,
      lineHeight: 28,
      letterSpacing: 0.2,
   },
   buttonStyle: {
      width: 20,
      height: 20,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "lightgray",
   },
   buttonTextStyle: {
      color: "#fff",
      fontSize: 14,
      lineHeight: 28,
      letterSpacing: 0.2,
   },
});
