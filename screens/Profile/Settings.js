/*
============ Import react, react native & expo modules ============ 
*/
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
/*
============ Import modules ============ 
*/

/*
============ Import redux ============ 
*/

/*
============ Import Components ============ 
*/

import NotificationButton from "../../components/NotificationButton.Js";

/**
 *  SettingsScreen
 */

export default function Settings({ navigation }) {
   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <Text style={styles.heading}>Notifications</Text>
            <Text style={styles.textAlign}>
               Quels type de notifications souhaitez vous recevoir ?
            </Text>

            <NotificationButton text="Notifications Importantes"></NotificationButton>

            <NotificationButton text="Informations"></NotificationButton>
         </View>

         <View style={styles.header}>
            <Text style={styles.heading}>Préférences</Text>
            <Text style={styles.textAlign}>
               Comment souhaitez vous recevoir vos notifications ?
            </Text>

            <NotificationButton text="Email"></NotificationButton>

            <NotificationButton text="Notifications"></NotificationButton>

            <NotificationButton text="SMS"></NotificationButton>
         </View>

         <View style={styles.header}>
            <Text style={styles.heading}>Application</Text>

            <View style={styles.versionContainer}>
               <Text>Version 0.0.1</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate("CGUScreen")}>
               <Text style={styles.smallBlueUnderline}>
                  Conditions Générales d'Utilisation
               </Text>
            </TouchableOpacity>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#F8F8F8",
      paddingHorizontal: 15,
   },
   textAlign: {
      marginBottom: 6,
   },
   textContainer: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 10,
      padding: 8,
      borderRadius: 10,
      margin: 15,
      backgroundColor: "#ffffff",
      marginTop: 5,
   },
   heading: {
      fontSize: 18,
      fontWeight: "bold",
      color: "black",
      marginTop: 20,
      marginLeft: 5,
      marginBottom: 6,
   },
   smallBlueUnderline: {
      fontSize: 14,
      color: "blue",
      textDecorationLine: "underline",
      marginTop: 10,
   },
   versionContainer: {
      width: "99%",
      height: 40,
      padding: 5,
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "flex-start",
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
      marginTop: 4,
   },
});
