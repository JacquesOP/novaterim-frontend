import React from "react"
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  ScrollView,
} from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"

import { faWallet } from "@fortawesome/free-solid-svg-icons"
import { useState,useEffect } from "react"
import * as FileSystem from "expo-file-system"
import { shareAsync } from "expo-sharing"
import * as WebBrowser from 'expo-web-browser';
import { useSelector } from "react-redux"








const DropdownMenu = ({ items, onSelect }) => {
  const [visible, setVisible] = useState(false)
  const buttonText = items.length > 0 ;

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setVisible(!visible)}
      >
        <Text>{buttonText? 'Sélection Entreprise' : "Il n'y a pas encore de fiche de paye"}</Text>
      </TouchableOpacity>

      <Modal
        visible={buttonText?visible:false}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdownListContainer}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    onSelect(item)
                    setVisible(false)
                  }}
                >
                  <Text>{item.companyName}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

function SalariesScreen() {
  const token = useSelector(state => state.user.value.token);
  const [selectedCompany, setSelectedCompany] = useState()

  const [salaries,setSalaries]=useState([])

  useEffect(() => {
    if (token) {
        const url = `https://novaterim-backend-iota.vercel.app/users/salaries/${token}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Check directly if data is meaningful
                if (Array.isArray(data) && data.length > 0) {
                    setSalaries(data);
                } else {
                    // This ensures the message stays if data is not an array or is empty
                    setSalaries([]);
                }
            })
            .catch(error => {
                console.error("Error fetching contracts:", error);
            
                setSalaries([]);
            });
    } else {

        setSalaries([]);
    }
  }, [token]);
  const handleDownload = async (url, fileName) => {
    await WebBrowser.openBrowserAsync(url);
    setPdfUrl(url);
    try {
      const {uri} = await FileSystem.downloadAsync(
        url,
        FileSystem.documentDirectory + fileName
      );
      console.log('Finished downloading to ', uri);
      // saveFile(uri);
    } catch (e) {
      console.error('Error downloading the file: ', e);
    }
  };

  // const saveFile = async (fileUri) => {
  //   try {
  //     await shareAsync(fileUri);
  //     // Additional success handling
  //   } catch (error) {
  //     console.error('Error sharing the file: ', error);
  //   }
  // };
  return (
    <SafeAreaView style={styles.container}>
    
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>NOVATERIM</Text>
      </View>

      <Text style={styles.headingSecondary}>Salaries</Text>
      <Text style={styles.subtitle}>Vos fiches de paie.</Text>

      <View style={styles.dropdownContainer}>
        <Text style={{ marginBottom: 20 }}>
          Entreprise sélectionné:{" "}
          {selectedCompany ? selectedCompany.companyName : "None"}
        </Text>
        <DropdownMenu
          items={salaries}
          onSelect={(item) => setSelectedCompany(item)}
        />
      </View>

      <FlatList
        data={selectedCompany?.salaryData}
        keyExtractor={(item,index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.salaryItem}>
            <FontAwesomeIcon icon={faWallet} size={24} color="#9ca3af" />
            <View style={styles.salaryDetails}>
              <Text style={styles.salaryPeriod}>{item.period}</Text>
              <Text style={styles.salaryAmount}>{item.amount}</Text>
            </View>
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => {
                handleDownload(
                  "https://drive.google.com/uc?export=download&id=1C33Jo199AdOFmuyMYVW2iA20tqdabsfA",
                  "fichedepaye1"
                )
              }}
            >
              <Text style={styles.downloadButtonText}>Télécharger</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontWeight: "bold",
    color: "#277aba",
    fontSize: 20,
  },
  headingSecondary: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
    marginLeft: 20,
  },

  subtitle: {
    fontSize: 14,
    marginTop: 20,
    marginLeft: 20,
    color: "#6B7280",
  },
  dropdown: {
    backgroundColor: "#EFEFEF",
    borderRadius: 25,
    padding: 16,
    margin: 16,
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  salaryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  salaryDetails: {
    flex: 1,
    marginLeft: 16,
  },
  salaryPeriod: {
    fontSize: 14,
    color: "#1C7ABA",
    marginBottom: 4,
  },
  salaryAmount: {
    fontSize: 14,
    color: "#6B7280",
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#277aba",
    padding: 4,
    borderRadius: 25,
  },
  downloadButtonText: {
    paddingHorizontal: 8,
    fontSize: 12,
    color: "#ffff",
  },
  dropdownContainer: {
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 20,
  },
  dropdownListContainer: {
    width: "80%",
    backgroundColor: "#fff",
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
})

export default SalariesScreen
