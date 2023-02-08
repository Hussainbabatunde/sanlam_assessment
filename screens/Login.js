import Icon  from 'react-native-vector-icons/FontAwesome';
import React, { useState, useEffect } from "react";
import { Button, Image, ImageBackground, StyleSheet, Text, TextInput, View } from "react-native";
import loginlogo from "../assets/sanlam.png";
import loginimg from "../assets/business.jpg";
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication'
import { Alert } from 'react-native';
// import {RadioGroup}  from 'react-native-radio-buttons-group';




const Login = ({navigation}) => {

    const[email, setEmail] =useState('')
    const[password, setPassword] =useState('')
    const [secure, setSecure] = useState(true);
    const [loading, setLoading] = useState(false)
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);

    const changeIcon= () => {
        setSecure(!secure)
    }

    useEffect(() => {
        (async () => {
          const compatible = await LocalAuthentication.hasHardwareAsync();
          setIsBiometricSupported(compatible);
          
        })();
        
      });

      const fallBackToDefaultAuth = () =>{
        console.log("fall back to password authentication")
      }

      const alertComponent = (title, mess, btnTxt, btnFunc) =>{
        return Alert.alert(title, mess, [{
            text: btnTxt,
            onPress: btnFunc
        }])
      }

      const TwoButtonAlert =() =>{
        Alert.alert("Welcome to App", 'Subscribe Now', [{
            text:'Back',
            onPress: ()=> console.log('Cancel Pressed'),
            style: 'cancel'
        },
    {
        text: 'OK', onPress: ()=> console.log('Ok Pressed')
    }])
      }
    
      const handleBiometricAuth = async () => {
        // check if hardware supports biometric
        const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();
          // fall back to default authentication method (password) if biometric is not available
          if (!isBiometricAvailable)
          return alertComponent(
            'Please Enter your Password',
            'Biometric auth not supported',
            'OK',
            ()=> fallBackToDefaultAuth()
          ) 

          //check biometric types available  (fingerprint, facial recognition, iris recognition)
          let supportedBiometrics;
          if (isBiometricAvailable)
          supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync()

          // check biometrics are saved locally in user's device
          const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
          if (!savedBiometrics)
          return alertComponent(
            'Biometric record not found',
            'Please Login with Password',
            'Ok',
            ()=> fallBackToDefaultAuth()
          ); 

          //authenticate with biometric
        
          const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login with Biometrics',
            cancelLabel: 'cancel',
            disableDeviceFallback: true,
          });

          //Login user on success
          if(biometricAuth){TwoButtonAlert()};
          console.log({isBiometricAvailable})
          console.log({supportedBiometrics})
          console.log({savedBiometrics})
          console.log({biometricAuth})
    }

    const onSubmithandler= async() =>{
        const name = {
            email: email,
            password: password
        }
        setLoading(true)
        navigation.navigate("TabNavigation", { screen: "Dashboard" })
        setLoading(false)
    }

    return(
        <View style={styles.body}>
            <ImageBackground source={loginimg} resizeMode="cover" style={styles.child}>
                <View style={styles.coverchild}>
                <View style={styles.logininfo}>
                <Image source={loginlogo} style={styles.loginlogo} />
                <Text style={styles.signin}>Sign In</Text>
                <View style={styles.inputemailtog}>
                    <Text style={styles.emailtog}>Email</Text>
                    <View style={styles.emailinputhold}>
                    <TextInput style={styles.emailinput} value={email} onChangeText={setEmail} placeholder="Input your email" />
                    </View>
                </View>
                <View style={styles.inputemailtog}>
                    <Text style={styles.emailtog}>Password</Text>
                    <View style={styles.emailinputhold}>
                    <TextInput secureTextEntry={secure} value={password} onChangeText={setPassword} style={styles.emailinput}/>
                    <Icon style={{ paddingRight: 15, color: "black", height:30, width:25, paddingTop: 10 }}
name={secure ? "eye" : 'eye-slash'}
size={20} color='gray' onPress={changeIcon}/>
                    </View>
                </View>
                {/* <View>
                    <RadioGroup  radioButtons={radioButtons} 
            onPress={onPressRadioButton}  />
                </View> */}
                {/* <TouchableOpacity style={{ backgroundColor: '#1E6738', width: "90%", marginTop: 30, padding: 8, borderRadius: 5 }} onPress={pressHandler}> */}
                <TouchableOpacity onPress={onSubmithandler} style={{ backgroundColor: '#0074c8', width: "90%", marginTop: 30, padding: 8, borderRadius: 5 }}>
                {loading?  <ActivityIndicator animating={true} color="white" />: <Text style={{ color: '#fff', textAlign: 'center', fontSize: 20}}>Sign in</Text>}
                </TouchableOpacity>
                {/* <Text> {isBiometricSupported ? 'Your device is compatible with Biometrics' 
                        : 'Face or Fingerprint scanner is available on this device'}
                            </Text> */}
                            <Button title="Login with Biometrics" color="#0074c8" onPress={handleBiometricAuth}/>
            </View>
                </View>
                </ImageBackground>
            
        </View>
    )
}

const styles= StyleSheet.create({
    body: {
        flex: 1
    },
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
        width: "90%",
        marginTop: 30
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

export default Login;