/*
============ Import react and react native modules ============ 
*/
import {
  React,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
/*
============ Import redux and reducers ============ 
*/
import { useDispatch } from "react-redux";
import { updateUser } from "../reducers/user";
/*
============ Import components ============ 
*/
import Button from "../components/Button";
import Inputs from "../components/Inputs";

export default function SignupScreen({ navigation }) {
  
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorSignUp, setErrorSignUp] = useState('');

  const handleSignUp = () => {
    const formData = JSON.stringify({
      name: name,
      firstName: firstName,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      username: firstName,
    });

    fetch("http://192.168.1.25:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          const userData = data.data;
          dispatch(updateUser(userData));
          setName("");
          setFirstName("");
          setEmail("");
          setPhoneNumber("");
          setPassword("");
          navigation.navigate("TabNavigator", { screen: "Profile" });
        }else{
          const userData = data.error
          setErrorSignUp(userData);
        }
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.logoContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/Logo_Novarterim_Blanc@2x 3.png")}
        />
        <Text style={styles.textLogo}>L'INTERIM EN LIBERTÉ</Text>
      </View>

      <View style={styles.textInputContainer}>
        <Inputs
          placeholder="Nom"
          name="user"
          value={name}
          secureTextEntry={false}
          inputMode={"text"}
          onChangeText={(value) => setName(value)}
        />
        <Inputs
          placeholder="Prénom"
          name=""
          value={firstName}
          secureTextEntry={false}
          inputMode={"text"}
          onChangeText={(value) => setFirstName(value)}
        />
        <Inputs
          placeholder="Email"
          name="envelope"
          value={email}
          secureTextEntry={false}
          inputMode={"email"}
          onChangeText={(value) => setEmail(value)}
        />
        <Inputs
          placeholder="Numéro Téléphone"
          name="phone"
          value={phoneNumber}
          secureTextEntry={false}
          inputMode={"numeric"}
          onChangeText={(value) => setPhoneNumber(value)}
        />
        <Inputs
          placeholder="Mot de passe"
          name="key"
          value={password}
          secureTextEntry={true}
          inputMode={"text"}
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Text>{errorSignUp}</Text>
        <Button onPress={() => handleSignUp()} name="Créer un compte" />
        <View style={{ display: 'flex', flexDirection: 'row'}}>
          <Text>Already an account ? </Text> 
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            >
            <Text style={{ fontWeight: '700', color: 'white'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    width: "80%",
    height: "35%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 10,
    marginTop: 20,
  },
  textLogo: {
    fontSize: 21,
    color: "#ffffff",
  },
  image: {
    width: 212,
    height: 150,
  },
  textInputContainer: {
    width: "80%",
    height: "30%",
    justifyContent: "flex-start",
  },
  forgetPassWordText: {
    padding: 5,
    textAlign: "right",
    color: "#ffffff",
    fontSize: 12,
  },
  input: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: "90%",
  },
  inputBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#2596be",
    borderBottomWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#277aba",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  buttonContainer: {
    width: "80%",
    flex: 1,
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 15,
  },
});
