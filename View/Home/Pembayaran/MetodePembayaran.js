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

  

  render() {
    const { navigation } = this.props;
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
                Metode Pembayaran
              </Text>
            </View>
            
            <View>
              <View style={Style.ContainerViewHorizontal}>
                <Text style={{color: '#B2B5BF', fontSize: 18, fontWeight: 'bold'}}>Transfer Virtual Account</Text> 
              </View>
              
              <View>
                <TouchableOpacity style={PembayaranStyle.buttonMetodeBank}>
                    <Image source={require('../../../assets/pembayaran/bca.png')} />
                    <Text style={{fontSize: 14, marginHorizontal: 10}}>Bank Central Asia</Text>
                </TouchableOpacity>
              </View>
              
              <View>
                  <TouchableOpacity style={PembayaranStyle.buttonMetodeBank}>
                    <Image source={require('../../../assets/pembayaran/mandiri.png')} />
                    <Text style={{fontSize: 14, marginHorizontal: 10}}>Bank Mandiri</Text>
                  </TouchableOpacity>
              </View>
              
              <View>
                  <TouchableOpacity style={PembayaranStyle.buttonMetodeBank}>
                    <Image source={require('../../../assets/pembayaran/bni.png')} />
                    <Text style={{fontSize: 14, marginHorizontal: 10}}>Bank Negara Indonesia</Text>
                  </TouchableOpacity>
              </View>
              
              <View>
                  <TouchableOpacity style={PembayaranStyle.buttonMetodeBank}>
                    <Image source={require('../../../assets/pembayaran/permata.png')} />
                    <Text style={{fontSize: 14, marginHorizontal: 10}}>Permata Bank</Text>
                  </TouchableOpacity>
              </View>
            </View>

            <View>
              <View style={Style.ContainerViewHorizontal}>
                <Text style={{color: '#B2B5BF', fontSize: 18, fontWeight: 'bold'}}>Retail Outlet</Text> 
              </View>
              
              <View>
                  <TouchableOpacity style={PembayaranStyle.buttonMetodeBank}>
                    <Image source={require('../../../assets/pembayaran/alfamart.png')} />
                    <Text style={{fontSize: 14, marginHorizontal: 10}}>Alfamart</Text>
                  </TouchableOpacity>
              </View>
            </View>
            
            <View>
              <View style={Style.ContainerViewHorizontal}>
                <Text style={{color: '#B2B5BF', fontSize: 18, fontWeight: 'bold'}}>eWallet</Text> 
              </View>
              
              <View>
                  <TouchableOpacity style={PembayaranStyle.buttonMetodeBank}>
                    <Image source={require('../../../assets/pembayaran/ovo.png')} />
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
