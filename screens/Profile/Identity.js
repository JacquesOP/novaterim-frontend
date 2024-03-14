/*
============ Import react, react native & expo modules ============ 
*/
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native"
import { useState, useEffect } from "react"
/*
============ Import Redux ============ 
*/
import { useSelector, useDispatch } from "react-redux"
import user, {  updateUser,updateIdentity } from "../../reducers/user"
/*
============ Import Modules ============ 
*/
import CountryPicker from "react-native-country-picker-modal"
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker"
/*
============ Import Components ============ 
*/

/**
 *  Identity Screen
 */

export default function Identity({ navigation }) {
  const [countryCode, setCountryCode] = useState("")
  const [country, setCountry] = useState(null)
  const [withCountryNameButton, setWithCountryNameButton] = useState(true)
  const [withFlag, setWithFlag] = useState(true)
  const [withEmoji, setWithEmoji] = useState(true)
  const [withFilter, setWithFilter] = useState(true)
  const [withAlphaFilter, setWithAlphaFilter] = useState(false)
  const [withCallingCode, setWithCallingCode] = useState(false)

  const onSelect = (country) => {
    setCountryCode(country.cca2)
    setCountry(country)
  }

  const onChange = (e, selectedDate) => {
    setDate(selectedDate)
    setShowPicker(false)
  }

  const showMode = (modeToShow) => {
    setShowPicker(true)
    setMode(modeToShow)
  }

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false)
  const today = new Date()
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  )

  const [selectedDate, setSelectedDate] = useState("2024/01/01")

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker)
  }
  const handleDate = (date) => {
    setSelectedDate(date)

  }



  const userFields = [
    "phoneNumber",
    "name",
    "firstName",
    "birthDate",
    "nationality",
    "countryBirth",
    "familySituation",
    "birthTown",
    "birthDistrict",
    "socialSecurityNumber",
  ]

  let initialState = {}
  let initialFocusState = {}
  userFields.forEach((field) => {
    initialState[field] = ""
    initialFocusState[field] = false
  })
  const [userData, setUserData] = useState(initialState)
  const [inputFocused, setInputFocused] = useState(initialFocusState)
  const [infosUser, setInfosUser] = useState("")
  const [compteData, setCompteData] = useState({
    email: "",
    password: "",
    inscriptionDate: selectedDate,
  })
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.value.token)

  useEffect(() => {
    if (token) {
      const url = `http://192.168.1.178:3000/users/${token}`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          let fetchedData = {}
          userFields.forEach((field) => {
            fetchedData[field] =
              data.identity && data.identity[field] ? data.identity[field] : ""
          })

          setInfosUser(data)
          setUserData(fetchedData)
          setCompteData({
            email: data.email,
            password: data.password,
            inscriptionDate: data.inscriptionDate,
          })
          setSelectedDate(data.identity.birthDate || "2024/01/01");
          setCountryCode(data.identity.countryBirth)

        })
    }
  }, [token])

  const handleUpdate = async () => {
    try {
      const identityData = {}
      userFields.forEach((field) => {
        identityData[field] =
          field === "phoneNumber" ? Number(userData[field]) : userData[field]
      })
      identityData.birthDate = selectedDate
    
      identityData.countryBirth = country ? country.cca2 : "";
      const dataForBackend = { 
        identity: identityData,
        email: compteData.email,
        password: compteData.password,
        inscriptionDate: compteData.inscriptionDate,
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
      dispatch(updateUser(updatedItem))
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
    // Check if the field is part of the userFields array which represents identity data
    if (userFields.includes(fieldName)) {
      setUserData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }))
    } else if (fieldName === "email" || fieldName === "password") {
      // If the field is 'email' or 'password', update compteData
      setCompteData((prevData) => ({
        ...prevData,
        [fieldName]: value,
      }))
    }
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
              <Text style={styles.boldText}>Les informations du compte</Text>
            </View>

            <View>
              <Text style={styles.label}>Adresse Email</Text>
              <TextInput
                style={
                  compteData?.email && !inputFocused.email
                    ? styles.savedTextInput
                    : styles.textContainer
                }
                value={compteData.email}
                placeholder={"Votre adresse e-mail"}
                onChangeText={(text) => handleChange("email", text)}
                onFocus={() => handleFocus("email")}
              />

              <Text style={styles.label}>Mot de Passe</Text>
              <TextInput
                // value={password}
                style={styles.textContainer}
                // value={compteData.password}
                placeholder="*********"
                onChangeText={(text) => handleChange("password", text)}
                onFocus={() => handleFocus("password")}
              />
              {/* <Text style={styles.forgetPassWordText}>Mot de passe oublié</Text> */}

              <Text style={styles.label}>Numéro de Téléphone</Text>
              <TextInput
                style={
                  userData?.phoneNumber && !inputFocused.phoneNumber
                    ? styles.savedTextInput
                    : styles.textContainer
                }
                value={userData.phoneNumber.toString()}
                placeholder={"Votre numéro de téléphone"}
                onChangeText={(text) => handleChange("phoneNumber", text)}
                onFocus={() => handleFocus("phoneNumber")}
              />

              
            </View>

            <View style={styles.bar}></View>

            <View style={styles.centerText}>
              <Text style={styles.boldText}>Informations d'Identité</Text>
            </View>
            <View>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={
                  userData?.name && !inputFocused.name
                    ? styles.savedTextInput
                    : styles.textContainer
                }
                value={userData.name}
                placeholder="Nom"
                onChangeText={(text) => handleChange("name", text)}
                onFocus={() => handleFocus("name")}
                editable={false}
              />

              <Text style={styles.label}>Prénom</Text>
              <TextInput
                style={
                  userData?.firstName && !inputFocused.firstName
                    ? styles.savedTextInput
                    : styles.textContainer
                }
                value={userData.firstName}
                placeholder="Prénom"
                onChangeText={(text) => handleChange("firstName", text)}
                onFocus={() => handleFocus("firstName")}
                editable={false}
              />

              <Text style={styles.label}>Pays de naissance</Text>
              <View style={{...styles.countryPicker,backgroundColor: userData.countryBirth ? '#D3D4D7' : 'white',}}>
                <View
                  style={{
                    alignItems: "flex-start",
                    width: "80%",
                    marginLeft: 20,
                  }}
                >
                  <CountryPicker
                    {...{
                      countryCode,
                      withFilter,
                      withFlag,
                      withCountryNameButton,
                      withAlphaFilter,
                      withCallingCode,
                      withEmoji,
                      onSelect,
                    }}
                  />
                </View>
              </View>
            </View>

            <View>
            <Text style={styles.label}>Date de naissance</Text>
          
              <TouchableOpacity
                onPress={handleOnPressStartDate}
               
                style={
                  userData.birthDate && !inputFocused.birthDate
                    ? styles.savedTextInput
                    : styles.datePicker
                }
              
             
              >
                <Text style={{ fontSize: 14 }}>{selectedDate}</Text>
              </TouchableOpacity>

              <Modal
                animationType="slide"
                transparent={true}
                visible={openStartDatePicker}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <DatePicker
            
                      mode="calendar"
                      // minimumDate={startDate}
                      selected={selectedDate}
                      onSelectedChange={handleDate}
                      options={{
                        backgroundColor: "#00638F",
                        textHeaderColor: "#fff",
                        textDefaultColor: "#fff",
                        selectedTextColor: "#000",
                        mainColor: "#fff",
                        textSecondaryColor: "#dbdbdb",
                        borderColor: "#00638F",
                      }}
                    />

                    <TouchableOpacity onPress={handleOnPressStartDate}>
                      <Text style={{ color: "#fff" }}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Text style={styles.label}>Ville de naissance</Text>
              <TextInput
                style={
                  userData.birthTown && !inputFocused.birthTown
                    ? styles.savedTextInput
                    : styles.textContainer
                }
                value={userData.birthTown}
                placeholder="Votre ville de naissance"
                onChangeText={(text) => handleChange("birthTown", text)}
                onFocus={() => handleFocus("birthTown")}
              />
              <Text style={styles.label}>Nationalité</Text>
              <TextInput
                style={
                  userData.nationality && !inputFocused.nationality
                    ? styles.savedTextInput
                    : styles.textContainer
                }
                value={userData.nationality}
                placeholder="Votre nationalité"
                onChangeText={(text) => handleChange("nationality", text)}
                onFocus={() => handleFocus("nationality")}
                // editable={userData.nationality?false:true}
              />

              <Text style={styles.label}>Département de naissance</Text>
              <TextInput
                style={
                  userData.birthDistrict &&
                  !inputFocused.birthDistrict
                    ? styles.savedTextInput
                    : styles.textContainer
                }
                value={userData.birthDistrict}
                placeholder="Votre département de naissance"
                onChangeText={(text) => handleChange("birthDistrict", text)}
                onFocus={() => handleFocus("birthDistrict")}
              />

              <Text style={styles.label}>Numéro de sécurité sociale</Text>
              <TextInput
                style={
                  infosUser?.identity?.socialSecurityNumber &&
                  !inputFocused.socialSecurityNumber
                    ? styles.savedTextInput
                    : styles.textContainer
                }
                value={userData.socialSecurityNumber.toString()}
                placeholder="Votre numéro de sécurité sociale"
                onChangeText={(text) =>
                  handleChange("socialSecurityNumber", text)
                }
                onFocus={() => handleFocus("socialSecurityNumber")}
              />

              <Text style={styles.label}></Text>
            </View>
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
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#00638F",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
  },

  label: {
    marginLeft: 15,
  },
  centerText: {
    
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
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

  textButton: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  buttonContainer: {
    marginBottom: 50,
  },

  bar: {
    width: "80%",
    borderColor: "grey",
    borderWidth: 0.5,
    margin: 30,
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
 
  datePicker: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 10,
    margin: 15,
    backgroundColor: "white",
    marginTop: 5,
  },
  countryPicker: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    margin: 15,
    // backgroundColor: "white",
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
})
