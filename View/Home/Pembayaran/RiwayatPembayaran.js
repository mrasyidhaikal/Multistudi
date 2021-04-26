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
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Style, { black, WIDTH } from "../../Style/Style";
import CalendarStrip from "react-native-calendar-strip";
import PembayaranStyle from "../../Style/PembayranStyle";
import { Table, Row, Rows } from 'react-native-table-component';
import Pembayaran from "./Pembayaran";

class RiwayatPembayaran extends React.Component {
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
              <Text style={[Style.headerText, { marginVertical: 10 }]}>
                Riwayat Pembayaran
              </Text>
            </View>


            {/* Content */}
            <View style={[PembayaranStyle.CardPembayaran,{flexDirection: "column", marginVertical: 20}]}>

              <View style={{ flexDirection: "row", margin: 20, justifyContent: "space-between", width: WIDTH-80}}>
                <View style={{ flexDirection: "row"}}>
                  <Icon name="ios-calendar-outline" size={20} color={black} />
                  <Text
                    style={[
                      Style.textNormalBlack,
                      {marginLeft: 10,fontSize: 14, },
                    ]}
                  >
                    15 Maret 2021
                  </Text>
                </View>
                <View style={{ flexDirection: "row"}}>
                  <Text style={{color: '#06BFAD', fontWeight: "bold"}}>
                    Sudah Terbayar
                  </Text>
                  <Icon name="ios-checkmark-circle" style={{color: '#06BFAD', marginLeft: 7}} size={20} />
                </View>
              </View>
              
              <Text style={{fontSize: 14, marginLeft: 20}}>Nomor Pembayaran : PS2021-03-19399</Text>
              
              <View style={PembayaranStyle.containerMetodePembayaran}>
                    <Text style={{fontWeight: 'bold'}}>Metode Pembayaran</Text>
                    <Text> VA BCA </Text>
              </View>
              
              <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 20, alignItems: 'center'}}>
                <View>
                  <Text>Jumlah</Text>
                  <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 2}}>Rp. 550.000</Text>      
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('DetailPembayaran')}>
                  <View style={{flexDirection: 'row',}}>
                      <Text style={{fontSize: 16, color: '#FF3737', fontWeight: 'bold'}}>Lihat Detail</Text>
                      <Icon name="ios-chevron-forward" style={{color: '#FF3737', marginLeft: 5}} size={20} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>


            <View style={[PembayaranStyle.CardPembayaran,{flexDirection: "column", marginVertical: 20}]}>

              <View style={{ flexDirection: "row", margin: 20, justifyContent: "space-between", width: WIDTH-80}}>
                <View style={{ flexDirection: "row"}}>
                  <Icon name="ios-calendar-outline" size={20} color={black} />
                  <Text
                    style={[
                      Style.textNormalBlack,
                      {marginLeft: 10,fontSize: 14, },
                    ]}
                  >
                    15 April 2021
                  </Text>
                </View>
                <View style={{ flexDirection: "row"}}>
                  <Text style={{color: '#F15A23', fontWeight: "bold"}}>
                    Menunggu Konfirmasi
                  </Text>
                  <Icon name="ios-time-outline" style={{color: '#F15A23', marginLeft: 7}} size={20} />
                </View>
              </View>
              
              <Text style={{fontSize: 14, marginLeft: 20}}>Nomor Pembayaran : PS2021-03-19399</Text>
              
              <View style={PembayaranStyle.containerMetodePembayaran}>
                    <Text style={{fontWeight: 'bold'}}>Metode Pembayaran</Text>
                    <Text> VA BCA </Text>
              </View>
              
              <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 20, alignItems: 'center'}}>
                <View>
                  <Text>Jumlah</Text>
                  <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 2}}>Rp. 550.000</Text>      
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('DetailPembayaran')}>
                  <View style={{flexDirection: 'row',}}>
                      <Text style={{fontSize: 16, color: '#FF3737', fontWeight: 'bold'}}>Lihat Detail</Text>
                      <Icon name="ios-chevron-forward" style={{color: '#FF3737', marginLeft: 5}} size={20} />
                  </View>
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

export default RiwayatPembayaran;
