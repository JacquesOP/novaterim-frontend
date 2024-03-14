/*
============ Import react, react native & expo modules ============ 
*/
import React from "react";
import {
   StyleSheet,
   SafeAreaView,
   Dimensions,
} from "react-native";
import Pdf from 'react-native-pdf';
/*
============ Import modules ============ 
*/

export default function PDFcontent(props) {

   return (
      <SafeAreaView style={styles.container}>
         <Pdf 
            trustAllCerts={false}
            source={props.source}
            onLoadComplete={(numberOfPages, filePath) => {
               console.log(`Number of pages : ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
               console.log(`Current page : ${page}`);
            }}
            onError={(error) => {
               console.log(error);
            }}
            onPressLink={(uri) => {
               console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
         />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({

   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 20
   },
   pdf: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
   }
})