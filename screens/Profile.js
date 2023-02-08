import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

const Profile = ({ navigation }) => {
  const handleLogout = async () => {
    navigation.navigate("Login");
  };



  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          marginTop: Platform.OS == "iOS" ? 40 : 0,
          paddingTop: Platform.OS === "android" ? 45 : 20,
          backgroundColor: "#0074c8",
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
        }}
      >
        <View style={{ width: "25%" }}>
          <Image
            source={require("../assets/profile.jpg")}
            style={{ width: 80, height: 80, borderRadius: 40 }}
          />
        </View>
        <View style={{ width: "75%" }}>
          <Text style={{ color: "#fff", marginTop: 10 }}>Username: Sanlam</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: "50%" }}>
              <Text style={{ color: "#fff", marginTop: 4, fontSize: 13 }}>
                Role
              </Text>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  marginTop: 4,
                  fontSize: 13,
                }}
              >
                Admin
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20, padding: 10 }}>
        

        <TouchableOpacity
          style={{ flexDirection: "row", marginTop: 10 }}
          onPress={handleLogout}
        >
          <View style={{ width: "10%", marginTop: 30 }}>
            <IonIcon name="md-log-out" size={20} color="#000000"></IonIcon>
          </View>
          <View style={{ flexDirection: "row", width: "90%", marginTop: 30 }}>
            <Text style={{ fontSize: 12, width: "90%" }}>Log Out</Text>
          </View>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};
export default Profile;
