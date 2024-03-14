import React from "react"
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {
  faBuilding,
  faCalendarAlt,
  faCoins,
  faFileAlt,
  faChevronLeft,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons"
import { Linking } from "react-native"
import * as FileSystem from "expo-file-system"
// import { shareAsync } from "expo-sharing"
import * as WebBrowser from 'expo-web-browser';


import { useState } from "react"

export default function ContractDetails({ navigation, route }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const {
    title,
    role,
    description,
    location,
    company,
    reference,
    dates,
    salary,
    signatureUrl,
  } = route.params

  async function handleDownload(url, fileName) {
    await WebBrowser.openBrowserAsync(url);
    const downloadResumable = FileSystem.createDownloadResumable(
      url,
      FileSystem.documentDirectory + fileName
    )
    const { uri } = await downloadResumable.downloadAsync()

 setPdfUrl(url)
    // save(uri)
  }
  // const save = (uri) => {
  //   shareAsync(uri)
  // }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      
 
      <ScrollView style={styles.scrollView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NOVATERIM</Text>
          <FontAwesomeIcon icon={faQuestionCircle} size={24} color="#000" />
        </View>

        <View style={styles.contractInfoContainer}>
          <Text style={styles.contractTitle}>Contrat {reference}</Text>
          <Text style={styles.roleText}>{role}</Text>
          <Text style={styles.roleDescription}>{description}</Text>
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>{location}</Text>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailContainer}>
            <FontAwesomeIcon icon={faBuilding} size={24} color="#4B5563" />
            <Text style={styles.detailTitle}>Entreprise</Text>
            <Text style={styles.detailText}>{company}</Text>
          </View>
          <View style={styles.detailContainer}>
            <FontAwesomeIcon icon={faFileAlt} size={24} color="#4B5563" />
            <Text style={styles.detailTitle}>Référence</Text>
            <Text style={styles.detailText}>{reference}</Text>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailContainer}>
            <FontAwesomeIcon icon={faCalendarAlt} size={24} color="#4B5563" />
            <Text style={styles.detailTitle}>Dates</Text>
            <Text style={styles.detailText}>{dates}</Text>
          </View>
          <View style={styles.detailContainer}>
            <FontAwesomeIcon icon={faCoins} size={24} color="#4B5563" />
            <Text style={styles.detailTitle}>Salaire horaire</Text>
            <Text style={styles.detailText}>{salary}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            if (signatureUrl) {
              Linking.canOpenURL(signatureUrl).then((supported) => {
                if (supported) {
                  Linking.openURL(signatureUrl)
                } else {
                  console.log("Can't open URI: " + signatureUrl)
                }
              })
            } else {
            
              handleDownload(
                "https://drive.google.com/uc?export=download&id=1EfVHM5z3bRXPs4op2IQGA0Cwu3L0WtBI",
                `contract${reference}.pdf`
              )
            }
          }}
        >
          <Text style={styles.actionButtonText}>
            {!signatureUrl ? "Télécharger le contrat" : "Signer le contrat"}
          </Text>
          {/* <Image style={{width:300,height:300}} source={{ uri: docUri }} /> */}
        </TouchableOpacity>
        <Text style={styles.footerLink}>Comment s'y rendre?</Text>
        <Text style={styles.footerLink}>Déclarer un Arrêt</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    borderRadius: 25,
    paddingTop: 22,
    paddingBottom: 99,
    shadowColor: "#00000040",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    elevation: 4,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontWeight: "bold",
    color: "#277aba",
    fontSize: 18,
  },
  contractInfoContainer: {
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  contractTitle: {
    fontSize: 20,
    color: "#000",
    marginBottom: 8,
  },
  roleText: {
    fontSize: 16,
    color: "#1C7ABA",
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  locationContainer: {
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C7C7C7",
    padding: 8,
    marginVertical: 16,
  },
  locationText: {
    fontSize: 14,
    color: "#080808",
  },
  detailsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0f0f0",
    padding: 16,
  },
  detailContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    width: 150,
    height: 100,
  },
  detailTitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#4B5563",
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
  footerLink: {
    fontSize: 16,
    color: "#017FBE",
    textAlign: "center",
    marginBottom: 8,
  },
})
