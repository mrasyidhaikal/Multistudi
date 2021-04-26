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
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Style, { black, WIDTH, merah, windowHeight } from "../Style/Style";

class Welcome extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
    }
  }

  

  render() {
    const { navigation } = this.props;
    return (
      <View style={[Style.container,{backgroundColor: merah}]}>
        <SafeAreaView>
          <ScrollView>
            
            <View style={{marginTop: 50}}>
              <Image source={require('../../assets/dotLogin.png')} style={{width: 80, height: 80, opacity: 0.3, marginTop: 30}} />
              
              <View style={{alignItems: 'center'}}>
                <Image 
                source={require('../../assets/logomhs.png')}
                />
              </View>

              <Image source={require('../../assets/dotLogin.png')} style={{width: 80, height: 80, opacity: 0.3,alignSelf:'flex-end'}} />

            </View>
          
            <View style={{justifyContent: 'center', height: windowHeight / 2 }}>
                <View style={{marginTop: 30, marginLeft: 20}}>
                  <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold'}}>Multistudi High School</Text>
                  <Text style={{fontSize: 18, color: 'white'}}>Global Mind, High Tech, Personality</Text>
                </View>

                <View style={{marginTop: 30}}>
                  <TouchableOpacity style={{backgroundColor: '#FFFFFF', alignSelf: 'center', width: '85%', borderRadius: 15}} onPress={() => navigation.navigate('Login')}>
                    <Text style={{alignSelf:'center', margin: 15, color: '#FF3737'}}>Masuk</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={{backgroundColor: '#FF3737', borderColor: '#FFFFFF', borderWidth: 1, borderRadius: 15, alignSelf: 'center', width: '85%', marginTop: 10}}>
                  <Text style={{alignSelf:'center', margin: 15, color: '#FFFFFF'}}>Daftar</Text>
                  </TouchableOpacity>
                </View>
            </View>

          </ScrollView>
        </SafeAreaView>
        <StatusBar backgroundColor={merah} barStyle="light-content" />
      </View>
    );
  }
}

export default Welcome;
