/*
============ Import react, react native & expo modules ============ 
*/
import {  SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from "react-native";
import React from 'react';
import { useNavigation, useRoute } from "@react-navigation/native";
/*
============ Import modules ============ 
*/
import FontAwesome from 'react-native-vector-icons/FontAwesome';
/*
============ Import redux ============ 
*/
import { useSelector, useDispatch } from "react-redux";
/*
============ Import Components ============ 
*/
import Upload from "../../components/Profile/Upload";



/**
 *  DocumentScreen
 */


export default function ChatSection({ navigation }) {

   return (
      <Text>
         Welcome to ChatSection
      </Text>
   );

}
