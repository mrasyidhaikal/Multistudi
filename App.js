import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import CallAsyncData from './Controller/CallAsyncData';

import HomeScreen from "./View/Home/Home";

import WelcomeScreen from "./View/Home/Welcome";
import LoginScreen from "./View/Home/Login";


// Screen Register Siswa Baru
import RegisDataSiswa from "./View/Home/Daftar/RegisDataSiswa";
import RegisDataWali from "./View/Home/Daftar/RegisDataWali";
import RegisHobi from "./View/Home/Daftar/RegisHobi";
import RegisPrestasi from "./View/Home/Daftar/RegisPrestasi";
import RegisDataFoto from "./View/Home/Daftar/RegisDataFoto";
import RegisSelesai from "./View/Home/Daftar/RegisSelesai";
import Guru from "./View/Home/Guru/Guru";
import DetailGuru from "./View/Home/Guru/DetailGuru";
import NoteScreen from "./View/Notes/NotesView";
import StatusScreen from "./View/Home/StatusRegistration";
import Pembayaran from "./View/Home/Pembayaran/Pembayaran";
import Tagihan from "./View/Home/Pembayaran/Tagihan";
import MetodePembayaran from "./View/Home/Pembayaran/MetodePembayaran";
import RiwayatPembayaran from "./View/Home/Pembayaran/RiwayatPembayaran";
import DetailPembayaran from "./View/Home/Pembayaran/DetailPembayaran";
import Profil from "./View/Home/Profil/Profil";
import InfoAplikasi from "./View/Home/Profil/InfoAplikasi";
import TentangKami from "./View/Home/Profil/TentangKami";


const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const Main = createStackNavigator();
const Login = createStackNavigator();
const RegisterNewSiswa = createStackNavigator();
const guruStack = createStackNavigator();
const pembayaranStack = createStackNavigator();
const profilStack = createStackNavigator();

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
      <Main.Screen name="guruStacks" component={guruStacks} />
      <Main.Screen name="pembayranStacks" component={pembayranStacks} />
      <Main.Screen name="Profil" component={profilStacks} />
    </Main.Navigator>
  );
};

const LoginStack = () => {
  return(
    <Login.Navigator screenOptions={{headerShown : false}}>
      <Login.Screen name="Welcome" component={WelcomeScreen}/>
      <Login.Screen name="Login" component={LoginScreen}/>
      <Login.Screen name="MainStack" component={MainStack}/>
    </Login.Navigator>
  )
}

const guruStacks = () => {
  return (
    <guruStack.Navigator screenOptions={{ headerShown: false }}>
      <guruStack.Screen name="Guru" component={Guru} />
      <guruStack.Screen name="DetailGuru" component={DetailGuru} />
    </guruStack.Navigator>
  );
};

const pembayranStacks = () => {
  return (
    <pembayaranStack.Navigator screenOptions={{ headerShown: false }}>
      <pembayaranStack.Screen name="Pembayaran" component={Pembayaran} />
      <pembayaranStack.Screen name="Tagihan" component={Tagihan} />
      <pembayaranStack.Screen name="MetodePembayaran" component={MetodePembayaran} />
      <pembayaranStack.Screen name="RiwayatPembayaran" component={RiwayatPembayaran} />
      <pembayaranStack.Screen name="DetailPembayaran" component={DetailPembayaran} />
    </pembayaranStack.Navigator>
  );
};

const profilStacks = () => {
  return (
    <profilStack.Navigator screenOptions={{ headerShown: false }}>
      <profilStack.Screen name="Profil" component={Profil} />
      <profilStack.Screen name="InfoAplikasi" component={InfoAplikasi} />
      <profilStack.Screen name="TentangKami" component={TentangKami} />
      <profilStack.Screen name="LoginProfile" component={LoginStack} />
    </profilStack.Navigator>
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
      <Tab.Screen
        name="Notes"
        component={NoteScreen}
        options={{
          tabBarLabel: "Notes",

          tabBarIcon: ({ color }) => (
            <Icon name="document-text-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Registration"
        component={StatusScreen}
        options={{
          tabBarLabel: "Registration",

          tabBarIcon: ({ color }) => (
            <Icon name="ios-document-attach-outline" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="ProfilScreen"
        component={Profil}
        options={{
          tabBarLabel: "Profie",

          tabBarIcon: ({ color }) => (
            <Icon name="ios-person-circle-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default class App extends React.Component {

  constructor() {
    super()

    this.UserData()
    this.state = {
      tokenUser : "",
        tokenExpire : "",
      }
    }

  UserData = async() => {
    const tokenUser = await CallAsyncData.getData('token')
    const tokenExpire = await CallAsyncData.getData('tokenExpire')
    this.setState({tokenExpire: tokenExpire,tokenUser:tokenUser})
    
  }

  render(){
    return (
      <NavigationContainer>
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>

        {this.state.tokenUser ?(
       <AuthStack.Screen
       name="HomeStackScreen"
       component={MainStack}
     />
    ): (
      <AuthStack.Screen
      name="login"
      component={LoginStack}
    />
    )}

        </AuthStack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
