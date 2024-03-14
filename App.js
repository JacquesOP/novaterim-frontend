/**
 *  Import react native navigation
 */
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
/**
 *  Import react, react native & expo modules
 */
import React, { useRef, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
/**
 *  Import Redux
 */
import { Provider } from "react-redux";
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from "./reducers/user";
import document from "./reducers/document";
/**
 *  Import Redux-persist
 */
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 *  Import react native Screens
 */
import ContractScreen from "./screens/ContractScreen/ContractScreen";
import NotificationsScreen from "./screens/NotificationsScreen/NotificationsScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import SalariesScreen from "./screens/Salaries/SalariesScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import ContractDetails from "./screens/ContractScreen/ContractDetails";

import Documents from "./screens/Profile/DocumentsStack/Documents";
import InfosPerso from "./screens/Profile/InfosPerso";
import Address from "./screens/Profile/Address";
import Identity from "./screens/Profile/Identity";
import Settings from "./screens/Profile/Settings";
import ChatSection from "./screens/Profile/ChatSection";
import PDFiDcard from "./screens/Profile/DocumentsStack/PDFiDcard";
import PDFhomeParer from "./screens/Profile/DocumentsStack/PDFhomeParer";
import PDFvitalCard from "./screens/Profile/DocumentsStack/PDFvitalCard";
import PDFresume from "./screens/Profile/DocumentsStack/PDFresume";
import PDFiban from "./screens/Profile/DocumentsStack/PDFiban";
/**
 *  Import regular files
 */
import Colors from "./constants/Colors";



/**
 *  Setup reducers`
 */
const reducers = combineReducers({ user, document });
const persistConfig = { key: 'novaterim', storage: AsyncStorage };
/**
 *  Store configuration
 */
const store = configureStore({
   reducer: persistReducer(persistConfig, reducers),
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
   })
});

const persistor = persistStore(store);

//* TopTabs Navigation *//
const TopTabs = createMaterialTopTabNavigator();

function TopTabsGroup() {
   return (
      <TopTabs.Navigator
         screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
               let iconName = "";

               if (route.name === "Identité") {
                  iconName = "finger-print";
               } else if (route.name === "Address") {
                  iconName = "pin";
               }

               return <Ionicons name={iconName} size={27} color={color} />;
            },
            tabBarActiveTintColor: "#b10f2e",
            tabBarInactiveTintColor: "#335561",
         })}
      >
         <TopTabs.Screen name="Identité" component={Identity} options={{ title: 'Identité'}}/>
         <TopTabs.Screen name="Address" component={Address} options={{ title: 'Adresse'}}/>
      </TopTabs.Navigator>
   );
}

/**
 *  Profile Stack Navigation
 */
//* Documents Stack Navigation *//

const DocumentStack = createNativeStackNavigator();

function DocumentsStackGroup() {
   return (
      <DocumentStack.Navigator>
         <DocumentStack.Screen
            name="Documents"
            component={Documents}
            options={{ headerShown: false, tabBarVisible: false }}
         />
         <DocumentStack.Screen
            name="PDFiDcard"
            component={PDFiDcard}
            options={{ title: "Justificatif d’identité" }}
         />
         <DocumentStack.Screen
            name="PDFhomeParer"
            component={PDFhomeParer}
            options={{ title: "Justificatif de domicile" }}
         />
         <DocumentStack.Screen
            name="PDFvitalCard"
            component={PDFvitalCard}
            options={{ title: "Carte Vitale" }}
         />
         <DocumentStack.Screen
            name="PDFresume"
            component={PDFresume}
            options={{ title: "Cv" }}
         />
         <DocumentStack.Screen
            name="PDFiban"
            component={PDFiban}
            options={{ title: "Iban" }}
         />
      </DocumentStack.Navigator>
   );
}

/**
 *  Bottom Tab Navigation SETUP
 */

//* routes array declaration *//

const TabArray = [
   {
      route: "Notifications",
      label: "Notifications",
      type: Ionicons,
      activeIcon: "notifications",
      inactiveIcon: "notifications-outline",
      component: NotificationsScreen,
   },
   {
      route: "Salaries",
      label: "Salaries",
      type: Ionicons,
      activeIcon: "wallet",
      inactiveIcon: "wallet-outline",
      component: SalariesScreen,
   },
   {
      route: "Contract",
      label: "Contract",
      type: Ionicons,
      activeIcon: "document-text",
      inactiveIcon: "document-text-outline",
      component: ContractScreen,
   },
   {
      route: "Profile",
      label: "Profile",
      type: Ionicons,
      activeIcon: "person-circle",
      inactiveIcon: "person-circle-outline",
      component: ProfileScreen,
   },
];

const Tab = createBottomTabNavigator();

//* Custom bottom tab memu *//
const TabButton = (props) => {
   const { item, onPress, accessibilityState } = props;
   const focused = accessibilityState.selected;
   const viewRef = useRef(null);

   useEffect(() => {
      if (focused) {
         viewRef.current.animate({ 0: { scale: 1 }, 1: { scale: 1.6 } });
      } else {
         viewRef.current.animate({ 0: { scale: 1.6 }, 1: { scale: 1 } });
      }
   }, [focused]);

   return (
      <TouchableOpacity
         onPress={onPress}
         activeOpacity={1}
         style={styles.container}
      >
         <Animatable.View ref={viewRef} duration={300} style={styles.container}>
            <Ionicons
               name={focused ? item.activeIcon : item.inactiveIcon}
               size={25}
               color={focused ? Colors.primary : Colors.primaryLite}
            />
         </Animatable.View>
      </TouchableOpacity>
   );
};

/**
 *  Tab Navigator
 */
const TabNavigator = () => {
   return (
      <Tab.Navigator
         screenOptions={{
            headerShown: false,
            tabBarStyle: {
               height: 70,
               position: "absolute",
               left: 10,
               right: 10,
               bottom: 10,
               borderRadius: 10,
               shadowColor: "#000000",
               shadowOffset: {
                  width: 0,
                  height: 7,
               },
               shadowOpacity: 0.17,
               shadowRadius: 3.05,
               elevation: 4,
            },
         }}
         initialRouteName="Notifications"
      >
         {TabArray.map((item, i) => {
            return (
               <Tab.Screen
                  key={i}
                  name={item.route}
                  component={item.component}
                  options={{
                     tabBarShowLabel: false,
                     tabBarButton: (props) => (
                        <TabButton {...props} item={item} />
                     ),
                  }}
               />
            );
         })}
      </Tab.Navigator>
   );
};

/**
 *  Stack Navigator
 */
const Stack = createNativeStackNavigator();
export default function App() {
   return (
      <Provider store={store}>
         <PersistGate persistor={persistor}>

            <NavigationContainer>
               <Stack.Navigator screenOptions={{ headerShown: false}}>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Signup" component={SignupScreen} />
                  <Stack.Screen name="TabNavigator" component={TabNavigator} />

                  <Stack.Screen
                     name="DocumentsStackGroup"
                     component={DocumentsStackGroup}
                     options={{ headerShown: false}}
                  />
                  <Stack.Screen
                     name="TopTabsGroup"
                     component={TopTabsGroup}
                     options={{ 
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                           color: 'rgb(0,110,177)',
                           fontWeight: '600'
                        },
                        headerShown: true,
                        title: 'NOVATERIM',
                        headerTitleStyle: {
                        color: 'rgb(0,110,177)',
                        fontWeight: '600'
                        },
                        headerBackTitleVisible: false,

                     }}
                  />
                  <Stack.Screen 
                  name="Settings" 
                  component={Settings}
                  options={{ 
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                           color: 'rgb(0,110,177)',
                           fontWeight: '600'
                        },
                        headerShown: true,
                        title: 'PARAMETRES'
                     }}
                  />

                  


                  <Stack.Screen 
                     name="ChatSection" 
                     component={ChatSection}
                     options={{ 
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                           color: 'rgb(0,110,177)',
                           fontWeight: '600'
                        },
                        headerShown: true,
                        title: 'MESSAGERIE'
                     }} 
                  />
                  
                  <Stack.Screen
                     name="ContractDetails"
                     component={ContractDetails}
                  />
               </Stack.Navigator>
            </NavigationContainer>

         </PersistGate>
      </Provider>
   );
}


/**
 *  Styles TopTabsGroup
 */
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
});
