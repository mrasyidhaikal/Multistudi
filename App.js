import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import HomeScreen from "./View/Home/Home";

// Screen Register Siswa Baru
import RegisDataSiswa from "./View/Home/Daftar/RegisDataSiswa";
import RegisDataWali from "./View/Home/Daftar/RegisDataWali";
import RegisHobi from "./View/Home/Daftar/RegisHobi";
import RegisPrestasi from "./View/Home/Daftar/RegisPrestasi";
import RegisDataFoto from "./View/Home/Daftar/RegisDataFoto";
import RegisSelesai from "./View/Home/Daftar/RegisSelesai";
import Guru from "./View/Home/Guru";
import DetailGuru from "./View/Home/DetailGuru";

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const Main = createStackNavigator();
const RegisterNewSiswa = createStackNavigator();

const RegisterNewSiswaStack = () => {
  return (
    <RegisterNewSiswa.Navigator screenOptions={{ headerShown: false }}>
      <RegisterNewSiswa.Screen
        name="RegisDataSiswa"
        component={RegisDataSiswa}
      />
      <RegisterNewSiswa.Screen name="RegisDataWali" component={RegisDataWali} />
      <RegisterNewSiswa.Screen name="RegisHobi" component={RegisHobi} />
      <RegisterNewSiswa.Screen name="RegisPrestasi" component={RegisPrestasi} />
      <RegisterNewSiswa.Screen name="RegisDataFoto" component={RegisDataFoto} />
      <RegisterNewSiswa.Screen name="RegisSelesai" component={RegisSelesai} />
    </RegisterNewSiswa.Navigator>
  );
};

const MainStack = () => {
  return (
    <Main.Navigator screenOptions={{ headerShown: false }}>
      <Main.Screen name="AppTabs" component={AppTabs} />
      <Main.Screen name="RegisterNewSiswa" component={RegisterNewSiswaStack} />
      <Main.Screen name="Guru" component={Guru} />
      <Main.Screen name="DetailGuru" component={DetailGuru} />
    </Main.Navigator>
  );
};

const AppTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#FF3737",

        inactiveTintColor: "#B2B5BF",
        style: {
          backgroundColor: "#fff",
          paddingBottom: 10,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",

          tabBarIcon: ({ color }) => (
            <Icon name="ios-home-outline" color={color} size={26} />
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Main" component={MainStack} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
