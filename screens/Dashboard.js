import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Platform, SafeAreaView, StatusBar, Text, View, FlatList, RefreshControl, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import loginlogo from "../assets/sanlam.png";
import Modal from "react-native-modal";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';



const Dashboard= () =>{

    const details = [
        {
          id: 1,
          name: 'Samuel Emmanuel',
          dob: '10 June 1995',
          number: '0816484638',
          Product: 'A plot of Land at Lekki',
          amount: '#21,000,000',
          date_payment: '15th Sept. 2022',
        },
        {
          id: 2,
          name: 'Tosin Collins',
          dob: '13 April 1999',
          number: '08164473638',
          Product: 'MTN Nigeria',
          amount: '#3,000',
          date_payment: '15th May 2018',
        }
      ];

      const [values, setValue] = useState(details);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [number, setNumber] = useState('');
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [dop, setDop] = useState('');
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);


   const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html: createDynamicTable(),
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html: createDynamicTable() });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };


  const openModal = () =>{
    setIsModalVisible(true)
  }

  const closeModal =() =>{
    setIsModalVisible(false)
  }

  const addModal = () =>{
    const adder = {
      id: 4,
      name:name,
      dob: dob,
      number: number,
      Product: product,
      amount: amount,
      date_payment: dop
    }
    setValue([...values, adder]);
    console.log(values)
    setIsModalVisible(false)
  }
  
  const onRefresh = async () => {
    setLoader(true);
    // await dispatch(GetTrips());
    setLoader(false);
  };

  const array = values;
const createDynamicTable = () =>{
  var table= '';
  for (let i in array){
    const item = array[i]
    table= table + `
    <tr> 
      <td>${item?.name}</td>
      <td>${item?.dob}</td>
      <td>${item?.number}</td>
      <td>${item?.Product}</td>
      <td>${item?.amount}</td>
      <td>${item?.date_payment}</td>
    </tr>
    `
  }
  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <table>
        <tr>
          <th>Name</th>
          <th>Date of Birth</th>
          <th>Telephone Number</th>
          <th>Product</th>
          <th>Amount paid</th>
          <th>Date of Payment</th>
        </tr>
        ${table}
      </table>
  </body>
</html>`;

    return html;
}








    return (
        <SafeAreaView style={{ padding: Platform.OS == "ios" ? 0 : 10}}>
            <StatusBar style="auto" />  
            <View style={{padding: 10, justifyContent: "center", alignItems:"center", shadowOffset:{
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        shadowColor:"gray",
        elevation: 3,
        backgroundColor:"white",}}>
                <Image source={loginlogo} />
            </View>
            <View >
                <View style={{width: "90%", shadowOffset:{
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        shadowColor:"gray",
        elevation: 3,
        backgroundColor:"white", marginLeft:"5%", justifyContent: "center", alignItems:"center", marginTop: 20, borderRadius: 5, padding: 10}}>
            <MaterialIcons name="attach-money" size={27} color="#0074c8" />
            <Text>Total Expense:</Text>
            <Text style={{fontSize: 18}}>#50,000,000</Text>
        </View>
        <View style={{width: "90%", shadowOffset:{
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        shadowColor:"gray",
        elevation: 3,
        backgroundColor:"white", marginLeft:"5%", justifyContent: "center", alignItems:"center", marginTop: 20, borderRadius: 5, padding: 10}}>
            <FontAwesome5 name="house-user" size={24} color="#0074c8" />
            <Text>Landed Properties:</Text>
            <Text style={{fontSize: 18}}>2</Text>
        </View>
        <View style={{width: "90%", shadowOffset:{
            width: 0,
            height: 1
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        shadowColor:"gray",
        elevation: 3,
        backgroundColor:"white", marginLeft:"5%", justifyContent: "center", alignItems:"center", marginTop: 20, borderRadius: 5, padding: 10}}>
            <FontAwesome5 name="money-bill-wave" size={24} color="#0074c8" />
            <Text>Stocks:</Text>
            <Text style={{fontSize: 18}}>MTN NIGERIA: 3</Text>
            <Text style={{fontSize: 18}}>GUINESS NIGERIA: 3</Text>
        </View>
        <Text style={{color:"#0074c8",fontSize: 24, marginLeft:20, marginTop: 20}}>Transactions</Text>
        <View style={{flexDirection:"row", justifyContent:"space-between", width: "90%", marginLeft:"5%"}}>
            <TouchableOpacity style={{backgroundColor:"#0074c8", padding: 7, width:130}} onPress={openModal}>
                <Text style={{color:"white"}}  onPress={openModal}>Add Transaction</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:"#0074c8", padding: 7}} onPress={openModal}>
                <Text style={{color:"white"}}  onPress={printToFile}>Download Transaction</Text>
            </TouchableOpacity>
        </View>
        <FlatList
            data={values}
            refreshControl={
                <RefreshControl refreshing={loader} onRefresh={onRefresh}/>
              }
            keyExtractor={item=> item?.id}
            renderItem={({item})=>{
            return  <View style={{width: "90%", shadowOffset:{
                width: 0,
                height: 1
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            shadowColor:"gray",
            elevation: 3,
            backgroundColor:"white", marginLeft:"5%", marginTop: 20, borderRadius: 5, padding: 10}}>
                
                <Text>Name: {item?.name}</Text>
                <Text>Date of Birth: {item?.dob}</Text>
                <Text>Number: {item?.number}</Text>
                <Text>Product: {item?.Product}</Text>
                <Text>Amount: {item?.amount}</Text>
                <Text>Date of Payment: {item?.date_payment}</Text>
                </View> }}/>
            </View>

            <Modal isVisible={isModalVisible}>
        <KeyboardAvoidingView
          style={{
            backgroundColor: "#fff",
            width: "98%",
            minHeight: 300,
            padding: 15,
            paddingTop: 5,
            marginRight: 0,
            alignSelf: "center",
          }}
        >
            <ScrollView>
          <View style={styles.inputemailtog}>
                    <Text style={styles.emailtog}>Name</Text>
                    <View style={styles.emailinputhold}>
                    <TextInput style={styles.emailinput} value={name} onChangeText={setName}  />
                    </View>
                </View>
                <View style={styles.inputemailtog}>
                    <Text style={styles.emailtog}>Date of Birth</Text>
                    <View style={styles.emailinputhold}>
                    <TextInput style={styles.emailinput} value={dob} onChangeText={setDob}  />
                    </View>
                </View>
                <View style={styles.inputemailtog}>
                    <Text style={styles.emailtog}>Number</Text>
                    <View style={styles.emailinputhold}>
                    <TextInput style={styles.emailinput} value={number} onChangeText={setNumber}  />
                    </View>
                </View>
                <View style={styles.inputemailtog}>
                    <Text style={styles.emailtog}>Product</Text>
                    <View style={styles.emailinputhold}>
                    <TextInput style={styles.emailinput} value={product} onChangeText={setProduct}  />
                    </View>
                </View>
                <View style={styles.inputemailtog}>
                    <Text style={styles.emailtog}>Amount</Text>
                    <View style={styles.emailinputhold}>
                    <TextInput style={styles.emailinput} value={amount} onChangeText={setAmount}  />
                    </View>
                </View>
                <View style={styles.inputemailtog}>
                    <Text style={styles.emailtog}>Date of Payment</Text>
                    <View style={styles.emailinputhold}>
                    <TextInput style={styles.emailinput}  value={dop} onChangeText={setDop} />
                    </View>
                </View>
                <View style={{justifyContent:"space-between", marginTop: 10, flexDirection:"row", width:"95%", marginLeft:"2.5%"}}>
                <TouchableOpacity style={{backgroundColor:"red", padding: 7, borderRadius: 5 }} onPress={closeModal}>
                <Text style={{color:"white"}}  onPress={closeModal}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:"#0074c8", padding: 7, borderRadius: 5 }} onPress={openModal}>
                <Text style={{color:"white"}}  onPress={addModal}>Add </Text>
            </TouchableOpacity>
                </View>
                </ScrollView>
        </KeyboardAvoidingView>
        </Modal>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
  
  networks: {
      flexDirection:"row",
      marginTop: 40,
      justifyContent: "space-evenly",
      width: "100%"
  },
  signup: {
      color: "#1E6738"
  },
  notyet: {
      flexDirection: "row",
      marginTop: 40
  },
  notmember: {
      color: "#5F6160"
  },
  child:{
      // width: "100%",
      // height: "55%"
      flex: 1
  },
  coverchild: {
  backgroundColor: 'rgba(0,0,0,0.7)',
  width: "100%",
  height: "100%"
  },
  logininfo: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center"
  },
  signin: {
      color: "#0074c8",
      fontSize: 30
  },
  loginlogo :{
      marginBottom: 10
  },
  emailinputhold:{
      backgroundColor: "#DCDCDC",
      borderRadius: 5,
      flexDirection: "row"
  },
  inputemailtog:{
      width: "95%",
      marginTop: 30,
      marginLeft:"2.5%"
  },
  emailinput:{
      fontSize:18,
      padding: 10,
      flex: 1
  },
  emailtog: {
      color: "#0074c8",
      fontWeight: "600"
  }
})

export default Dashboard;