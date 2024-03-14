import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { loremIpsum } from "lorem-ipsum";

const LoremIpsumComponent = () => {
   const lorem = loremIpsum({
      count: 8,
      units: "paragraphs",
      sentenceLowerBound: 2,
      sentenceUpperBound: 8,
   });

   return <Text style={styles.text}>{lorem}</Text>;
};

const styles = StyleSheet.create({
   container: {
      backgroundColor: "red",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
   },
   text: {
      fontSize: 16,
      lineHeight: 24,
      textAlign: "justify",
   },
});

export default LoremIpsumComponent;
