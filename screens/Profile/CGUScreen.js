import React from "react";
import { SafeAreaView, View, Text } from "react-native";
import LoremIpsumComponent from "../../components/Profile/LoremIpsumComponent";

const CGUScreen = () => {
   return (
      <SafeAreaView>
         <View>
            <LoremIpsumComponent />
         </View>
      </SafeAreaView>
   );
};

export default CGUScreen;
