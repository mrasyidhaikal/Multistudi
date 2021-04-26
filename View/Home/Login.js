import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ScrollView,
  RefreshControl,
  ImageBackground,
  ViewPropTypes,
  Alert,
  ToastAndroid,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

import CallAPIData from '../../Controller/CallAPI';

import Style, { black, WIDTH, merah, windowHeight } from "../Style/Style";

class Welcome extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
      email: "zivadasfi@gmail.com",
      // email: "",
      password: "_ZIVADASFISADIRAz26042114", 
      // password: "", 
    }
  }

  showToast = (val) => {
    ToastAndroid.show(val, ToastAndroid.SHORT);
  };

  handleLogin = async () => {
    // console.log('masuk handleLogin')
    const { navigation } = this.props;
    
   try{
    const response = await CallAPIData.getAPI('http://104.248.156.113:8025/api/v1/AppAccount/login',
    JSON.stringify({
      "username": this.state.email,
      "pw": this.state.password,
      "rememberme": true,
      "remembermex": "string",
      "op": "string",
      "pc": "string"
    })
    )
            const { data,statusCode } = response;

            if (statusCode == 200){
             
               AsyncStorage.multiSet([
                ['objectReturn',JSON.stringify(data)],
                ['token',JSON.stringify(data.token)],
              ])

              this.showToast('Selamat Datang, ' + data.name);

              navigation.navigate('MainStack',{
                token : data.token
              })
              //dont forget add token
              // console.log(data.token)
            }else{
            
              Alert.alert('Login Gagal','Periksa Kembali Email dan Password anda !',[
                {text: 'Oke',onPress:() => console.log("closed")}
              ])
            } 
          }
    catch(error) {
      console.error(error);
    }
    
    // await AsyncStorage.setItem('username',this.state.username)
    // await AsyncStorage.setItem('token','abc123')
  
  }

  

  render() {
    const { navigation } = this.props;
    return (
      <View style={[Style.container,{backgroundColor: merah}]}>
        <SafeAreaView>
          <ScrollView>
            
          <View style={{height: windowHeight /5, marginLeft: 25, justifyContent:"flex-end", marginBottom: 30}}>
            <Image source={require('../../assets/dotLogin.png')} style={{opacity: 0.3, width: 80, height: 100, alignSelf: 'flex-end'}} />
            <Text style={{fontSize: 24, color: '#fff'}}>Selamat Datang</Text>
            <Text style={{fontSize: 24, color: '#fff'}}>Kembali</Text>
          </View>

          <View style={{height: windowHeight-145, backgroundColor: 'white'}}>
            <View style={[Style.inputContainer,{marginTop: 30,marginHorizontal: 30}]}>
              <TextInput 
                // style={{marginTop: 30, marginHorizontal: 30, borderRadius: 5, height: 50}}
                style={[Style.input,{borderWidth: 0}]}
                placeholder= 'Email'
                onChangeText={val => this.setState({email: val})}
                placeholderTextColor={"#B2B5BF"}
                underlineColorAndroid="transparent"
                backgroundColor= '#F6F6FA'
                >
              </TextInput>
            </View>

            <View style={[Style.inputContainer,{marginHorizontal: 30}]}>
                <TextInput 
                  // style={{marginTop: 30, marginHorizontal: 30, borderRadius: 5, height: 50}}
                  style={[Style.input,{borderWidth: 0}]}
                  placeholder= 'Password'
                  onChangeText={val => this.setState({password: val})}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  backgroundColor= '#F6F6FA'
                  >
                </TextInput>
            </View>

            <TouchableOpacity style={{backgroundColor: '#23243B', alignSelf: 'center', width: '85%', borderRadius: 7, marginTop: 80}} onPress={this.handleLogin}>
              <Text style={{alignSelf:'center', margin: 15, color: '#fff'}}>Masuk</Text>
            </TouchableOpacity>

          </View>

          </ScrollView>
        </SafeAreaView>
        <StatusBar backgroundColor={merah} barStyle="light-content" />
      </View>
    );
  }
}

export default Welcome;
