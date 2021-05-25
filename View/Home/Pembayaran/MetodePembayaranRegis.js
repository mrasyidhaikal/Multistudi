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
  Touchable,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Style, { black, WIDTH } from "../../Style/Style";
import CalendarStrip from "react-native-calendar-strip";
import PembayaranStyle from "../../Style/PembayranStyle";
import { Table, Row, Rows } from 'react-native-table-component';

class Tagihan extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
    }
  }

  RegisBill = (paymentmethod) => {
    console.log(paymentmethod);
    const { navigation } = this.props;
    navigation.navigate("RegistrasiBill", {paymentmethod : paymentmethod});
  };

  render() {
    const { navigation, route } = this.props;
    // const {
    //   billid: billid,
    //   billvalue: billvalue,
    //   schoolyearid: schoolyearid,
    //   studentid: studentid,
    // } = route.params;

    return (
      <View style={Style.container}>
        <SafeAreaView>
          <ScrollView>
            <View style={Style.NavBackContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name={"ios-chevron-back-sharp"}
                  size={25}
                  color={"#000"}
                />
              </TouchableOpacity>
              <Text style={[Style.headerText, { marginVertical: 5 }]}>
                Metode Pembayaran Registrasi
              </Text>
            </View>
            
            <View>
              <View style={Style.ContainerViewHorizontal}>
                <Text style={{color: '#B2B5BF', fontSize: 18, fontWeight: 'bold'}}>Transfer Virtual Account</Text> 
              </View>
              
              <View>
                <TouchableOpacity style={PembayaranStyle.buttonMetodeBank}
                onPress={() => this.RegisBill('bca')}>
                    <Image source={require('../../../assets/pembayaran/bca.png')} style={{width:40,height:40}}/>
                    <Text style={{fontSize: 14, marginHorizontal: 10}}>Bank Central Asia</Text>
                </TouchableOpacity>
              </View>
              
              <View>
                  <TouchableOpacity style={PembayaranStyle.buttonMetodeBank}
                    onPress={() => this.RegisBill('mandiri')}
                  
                  >
                    <Image source={require('../../../assets/pembayaran/mandiri.png')} style={{width:40,height:40}} />
                    <Text style={{fontSize: 14, marginHorizontal: 10}}>Bank Mandiri</Text>
                  </TouchableOpacity>
              </View>
              
              <View>
                  <TouchableOpacity style={PembayaranStyle.buttonMetodeBank}
                   onPress={() => this.RegisBill('bni')}
                  >
                    <Image source={require('../../../assets/pembayaran/bni.png')} style={{width:40,height:40}} />
                    <Text style={{fontSize: 14, marginHorizontal: 10}}>Bank Negara Indonesia</Text>
                  </TouchableOpacity>
              </View>
              
              <View>
                  <TouchableOpacity style={PembayaranStyle.buttonMetodeBank}
                   onPress={() => this.RegisBill('permata')}>
                    <Image source={require('../../../assets/pembayaran/permata.png')} style={{width:40,height:40}} />
                    <Text style={{fontSize: 14, marginHorizontal: 10}}>Permata Bank</Text>
                  </TouchableOpacity>
              </View>
            </View>

            <View>
              <View style={Style.ContainerViewHorizontal}>
                <Text style={{color: '#B2B5BF', fontSize: 18, fontWeight: 'bold'}}>Retail Outlet</Text> 
              </View>
              
              <View>
                  <TouchableOpacity style={PembayaranStyle.buttonMetodeBank}
                    onPress={() => this.RegisBill('alfamart')}
                  >
                    <Image source={require('../../../assets/pembayaran/alfamart.png')} style={{width:40,height:40}}/>
                    <Text style={{fontSize: 14, marginHorizontal: 10}}>Alfamart</Text>
                  </TouchableOpacity>
              </View>
            </View>
            
            <View>
              <View style={Style.ContainerViewHorizontal}>
                <Text style={{color: '#B2B5BF', fontSize: 18, fontWeight: 'bold'}}>eWallet</Text> 
              </View>
              
              <View>
                  <TouchableOpacity style={PembayaranStyle.buttonMetodeBank} 
                    onPress={() => this.RegisBill('OVO')}
                  >
                    <Image source={require('../../../assets/pembayaran/ovo.png')} style={{width:40,height:40}} />
                    <Text style={{fontSize: 14, marginHorizontal: 10}}>OVO</Text>
                  </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        </SafeAreaView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: 40 },
  text: { margin: 6, fontSize: 12 }
});

export default Tagihan;
