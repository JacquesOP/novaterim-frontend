/*
============ Import react, react native & expo modules ============ 
*/
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from "react-native"
import React from "react"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useState,useEffect } from "react"
/*
============ Import modules ============ 
*/
import FontAwesome from "react-native-vector-icons/FontAwesome"
/*
============ Import redux ============ 
*/
import { useSelector, useDispatch } from "react-redux"
import user, { updateAddress } from "../../reducers/user"

/*
============ Import Components ============ 
*/
import Upload from "../../components/Profile/Upload"
import Button from "../../components/Button"

/**
 *  DocumentScreen
 */

export default function Address({ navigation }) {
  const addressFields = ["street", "zipCode", "city", "country"]


  let initialState = {}
  let initialFocusState = {}
  addressFields.forEach((field) => {
    initialState[field] = ""
    initialFocusState[field] = false
  })
  const [addressData, setAddressData] = useState(initialState)
  const [inputFocused, setInputFocused] = useState(initialFocusState)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.value.token)
  
  useEffect(() => {
    if (token) {
        const url = `http://192.168.1.178:3000/users/${token}`;
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            let fetchedData = {};
            if (data.addresses) {  
                addressFields.forEach((field) => {
                    fetchedData[field] = data.addresses[field] ? data.addresses[field] : "";
                });
            } else {
             
                addressFields.forEach((field) => {
                    fetchedData[field] = "";
                });
            }
            setAddressData(fetchedData);
        });
    }
}, [token]);

  const handleUpdate = async () => {
    try {
      const newaddressData = {}
      addressFields.forEach((field) => {
        newaddressData[field] =
           addressData[field]
      })

      const dataForBackend = {
        addresses: newaddressData,
      }

      const response = await fetch(
        `http://192.168.1.178:3000/users/update/${token}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataForBackend),
        }
      )

      if (!response.ok) {
        const errorMessage = await response.json()
        throw new Error("Error in response")
      }

      const updatedItem = await response.json()
      // dispatch(updateAddress(updatedItem))
      Alert.alert(
        "Update Successful",
        "Your information has been successfully updated.",
        [{ text: "OK" }]
      )
    } catch (error) {
      console.error("Error", error.message)
    }
  }
  const handleChange = (fieldName, value) => {
    setAddressData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }))
  }
  const handleFocus = (fieldName) => {
    setInputFocused({ ...inputFocused, [fieldName]: true })
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 20}
      >
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.centerText}>
              <Text style={styles.boldText}>Adresse Domicile</Text>
              <Text >Pour mettre à jour vos informations, cliquez sur les champs préremplis.</Text>
            </View>
            <View>
              <Text style={styles.label}>L'adresse</Text>
              <TextInput
                style={
                  addressData?.street && !inputFocused.street
                    ? styles.savedTextInput
                    : styles.textContainer
                }
           
                placeholder="Entrez votre rue"
                value={addressData.street}
                onChangeText={(text) => handleChange("street", text)}
                onFocus={() => handleFocus("street")}
              />
            </View>

           

            <View>
              <Text style={styles.label}>Code Postale</Text>
              <TextInput
                style={
                  addressData?.zipCode && !inputFocused.zipCode
                    ? styles.savedTextInput
                    : styles.textContainer
                }
                placeholder="Entrez votre code postal"
                value={addressData.zipCode}
                onChangeText={(text) => handleChange("zipCode", text)}
                onFocus={() => handleFocus("zipCode")}
              />
            </View>

            <View>
              <Text style={styles.label}>Ville</Text>
              <TextInput
                 style={
                  addressData?.city && !inputFocused.city
                    ? styles.savedTextInput
                    : styles.textContainer
                }
                placeholder="Entrez votre ville"
                value={addressData.city}
                onChangeText={(text) => handleChange("city", text)}
                onFocus={() => handleFocus("city")}
              />
            </View>
            <Text style={styles.label}>Pays</Text>
            <TextInput
              style={
                addressData?.country && !inputFocused.country
                  ? styles.savedTextInput
                  : styles.textContainer
              }
              placeholder="Entrez votre pays"
              value={addressData.country}
              onChangeText={(text) => handleChange("country", text)}
              onFocus={() => handleFocus("country")}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleUpdate}
                style={styles.actionButton}
              >
                <Text style={styles.actionButtonText}>Sauvegarder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 15,
  },

 
  textButton: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  actionButton: {
    backgroundColor: "#277aba",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 46,
    marginBottom: 16,
    marginHorizontal: 46,
  },
  actionButtonText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  buttonContainer: {
    marginBottom: 150,
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
  
  savedTextInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 10,
    margin: 15,
    backgroundColor: "#d3d4d7",
    marginTop: 5,
  },
  label: {
    marginLeft: 15,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
    marginBottom: 10,

  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 15,
  },
  centerText: {
    
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
})
