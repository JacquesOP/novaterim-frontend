import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {
  faClock,
  faMapMarkerAlt,
  faCalendarAlt,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { useSelector } from 'react-redux';


const colors = {
  primary: "#9ca3af",
  secondary: "#FFFFFF",
  title: "#277aba",
  background: "#F8F8F8",
  active: "#d1fae5",
  inactive: "#fde2e2",
  buttonTextGreen: "#39866e",
  buttonTextRed: "#ac4141",
}



const ContractItem = ({
  title,
  duration,
  location,
  status,
  endDate,
  navigation,
  workingType,
  role,
  description,
  company,
  reference,
  dates,
  salary,
  urlPdf,
  signatureUrl


}) =>{
  
  
  
  
  return (
  <View style={styles.itemContainer}>
    <View style={styles.leftContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.detailContainer}>
        <FontAwesomeIcon icon={faClock} color={colors.primary} size={20} />
        <Text style={styles.detailText}>{duration}</Text>
      </View>
      <View style={styles.detailContainer}>
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          color={colors.primary}
          size={20}
        />
        <Text style={styles.detailText}>{workingType}</Text>
      </View>
      <View style={styles.detailContainer}>
        <FontAwesomeIcon
          icon={faCalendarAlt}
          color={colors.primary}
          size={20}
        />
        <Text style={styles.detailText}>{endDate}</Text>
      </View>
    </View>

    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => {navigation.navigate('ContractDetails', {
        title: title,
        role: role,
        description: description,
        duration: duration,
        location: location,
        workingType: workingType, 
        company: company,
        reference: reference,
        dates: dates,
        salary: salary,
        status: status, 
        endDate: endDate,
        urlPdf: urlPdf ,
        signatureUrl:signatureUrl
       

      })}}
    >
      <View
        style={[
          styles.statusButton,
          status === "En Cours" ? styles.statusActive : styles.statusInactive,
        ]}
      >
        <Text
          style={[
            styles.statusText,
            {
              color:
                status === "En Cours"
                  ? colors.buttonTextGreen
                  : colors.buttonTextRed,
            },
          ]}
        >
          {status}
        </Text>
      </View>

      <FontAwesomeIcon icon={faChevronRight} color={"black"} size={17} />
    </TouchableOpacity>
  </View>
)
 } 

const ContractsPage = ({ navigation }) => {
  const [contracts, setContracts] = useState([]);
  
  const token = useSelector(state => state.user.value.token);

  console.log(contracts)
  useEffect(() => {
    if (token) {
        const url = `http://192.168.1.25:3000/contracts/${token}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Check directly if data is meaningful
                if (Array.isArray(data) && data.length > 0) {
                    setContracts(data);
                } else {
                    // This ensures the message stays if data is not an array or is empty
                    setContracts([]);
                }
            })
            .catch(error => {
                console.error("Error fetching contracts:", error);
                // Handle error or no data scenario
                setContracts([]);
            });
    } else {

        setContracts([]);
    }
  }, [token]);
  

 

  const contractItems =contracts.length>0  && contracts.map((contract,index) => (
    <ContractItem
    key={index}
    id={contract.id}
    title={contract.title}
    duration={contract.duration}
    location={contract.location}
    status={contract.status}
    endDate={contract.endDate}
    navigation={navigation}
    workingType={contract.workingType}
    role={contract.role}
    description={contract.description}
    company={contract.company}
    reference={contract.reference}
    dates={contract.dates}
    salary={contract.salary}
    signatureUrl={contract.signatureUrl}

    />
  ));


  return (
    <SafeAreaView  style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>NOVATERIM</Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          color: "black",
          marginTop: 20,
          marginLeft: 20,
        }}
      >
        Tous les contrats
      </Text>
      <ScrollView style={styles.containerTitle}>
    
        {contracts.length === 0 ?  (
          <View style={styles.centeredMessage}>
            <Text>Vous n'avez aucun contrat</Text>
          </View>
        ) :contractItems }

    
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  containerTitle: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 10,
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
  centeredMessage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop:60
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.secondary,
    marginHorizontal: 10,
    marginTop: 10,
    padding: 20,
    borderRadius: 5,
  },
  leftContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: colors.title,
  },
  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 10,
  },
  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusActive: {
    backgroundColor: colors.active,
  },
  statusInactive: {
    backgroundColor: colors.inactive,
  },
  statusText: {
    fontWeight: "bold",
    marginRight: 5,
  },
})

export default ContractsPage
