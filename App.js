import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'



import HomeScreen from './View/Home/Home'
import RegisDataSiswa from './View/Home/Daftar/RegisDataSiswa'

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const RegisNewSiswa = createStackNavigator();

const RegisNewSiswaa =()=>{
  return(
    <RegisNewSiswa.Navigator
    screenOptions={{ headerShown: false }}>
        <AuthStack.Screen
          name="AppTabs"
          component={AppTabs}
        />
      <RegisNewSiswa.Screen
          name="RegisDataSiswa"
          component={RegisDataSiswa}
      />
    </RegisNewSiswa.Navigator>
  )
}
const AppTabs = () =>{
  return (

    <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#FF3737',
      
      inactiveTintColor: '#B2B5BF',
      style: {
        backgroundColor: '#fff',
        paddingBottom: 10,
        borderTopWidth:0,
  }
    }}
    >
  
      <Tab.Screen name="Home" component={HomeScreen} 
      options={{
        tabBarLabel: 'Home',
        
        tabBarIcon: ({color}) => (
          <Icon name="ios-home-outline" color={color} size={26} />
        ),
      }}
      />
     
    </Tab.Navigator>

  );
}

export default function App() {
  return (
    <NavigationContainer>
    <AuthStack.Navigator
 screenOptions={{  headerShown: false }}
   >

    <AuthStack.Screen
    name="RegisNewSiswa"
    component={RegisNewSiswaa}
  />
 
</AuthStack.Navigator>
 </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
