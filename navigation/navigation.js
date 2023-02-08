
import Login from "../screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import Profile from "../screens/Profile";
import Dashboard from "../screens/Dashboard";


const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();





export function TabNavigation() {
  return (
    <Tab.Navigator initialRouteName="Sidebar"
    screenOptions={{
      tabBarActiveTintColor: 'rgba(72, 130, 101, 0.5)',
      tabBarShowLabel: false,
    }} >
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: 'Dashboard', tabBarActiveTintColor: '#0074c8',  headerShown: false, tabBarIcon: ({focused}) => {
            return <Ionicons name="ios-home" size={30} color={focused ? "#0074c8" : "gray"} />
            },
         }}
        />
      
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Profile', tabBarActiveTintColor: '#0074c8',  headerShown: false, tabBarIcon: ({focused}) => {
            return <Ionicons name="person" size={30} color={focused ? "#0074c8" : "gray"} />
            },
         }}
        />
        
        
      </Tab.Navigator>
  );
}

function Navigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Signin',  headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigation"
          component={TabNavigation}
          options={{ title: 'Signin',  headerShown: false }}
        />       
        
      </Stack.Navigator>
      </NavigationContainer>
  );
}



export  default Navigation;
