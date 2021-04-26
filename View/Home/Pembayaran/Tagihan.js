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
              <TouchableOpacity style={{position: 'absolute', left: WIDTH-85}} onPress={() => navigation.navigate('RiwayatPembayaran')}>
                <Icon
                  name={"ios-timer-outline"}
                  size={25}
                  color={"#000"}
                />
              </TouchableOpacity>
              <Text style={[Style.headerText, { marginVertical: 10 }]}>
                Informasi Tagihan
              </Text>
            </View>

            <View style={[Style.ContainerViewBiasa, { flexDirection: "row" ,marginTop: 10 }]}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text style={[Style.textNormalGrey, { fontWeight: "bold", fontSize: 14, }]}>
                  Nomor Pendaftaran
                </Text>

                <Text style={[Style.textNormalGrey, { fontWeight: "bold", fontSize: 14, }]}>
                    Tahun Ajaran
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  marginLeft: 25,
                }}
              >
                
                <Text
                  style={[
                    Style.textNormalBlack,
                    { fontWeight: "bold", textAlign: "left", fontSize: 14, },
                  ]}
                >
                  : PB201-03-011233
                </Text>
                  <Text style={[Style.textNormalBlack, { fontWeight: "bold", fontSize: 14, }]}>
                    : 2021/2022 | Gelombang II
                  </Text>

              </View>
            </View>

            <View style={{borderRadius: 20, borderWidth: 1, borderColor: '#E7E9F1', margin: 25,}}>
                <View style={{margin:25, flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text>Jul 2020</Text>
                  <Text style={PembayaranStyle.TextTagihanSPP}>Rp. 550.000</Text>
                  <TouchableOpacity style={PembayaranStyle.buttonLunas}>
                    <Text style={PembayaranStyle.buttonLunasText}>Lunas</Text>
                  </TouchableOpacity>
                </View>

                <View style={{margin:25, flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text>Agu 2020</Text>
                  <Text style={PembayaranStyle.TextTagihanSPP}>Rp. 550.000</Text>
                  <TouchableOpacity style={PembayaranStyle.buttonLunas}>
                    <Text style={PembayaranStyle.buttonLunasText}>Lunas</Text>
                  </TouchableOpacity>
                </View>
               
                <View style={{margin:25, flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text>Agu 2020</Text>
                  <Text style={PembayaranStyle.TextTagihanSPP}>Rp. 550.000</Text>
                  <TouchableOpacity style={PembayaranStyle.buttonLunas}>
                    <Text style={PembayaranStyle.buttonLunasText}>Lunas</Text>
                  </TouchableOpacity>
                </View>
                
                <View style={{margin:25, flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <Text>Sep 2020</Text>
                  <Text style={PembayaranStyle.TextTagihanSPP}>Rp. 550.000</Text>
                  <TouchableOpacity style={PembayaranStyle.buttonBayar} onPress={() => navigation.navigate('MetodePembayaran')}>
                    <Text style={PembayaranStyle.buttonBayarText}>Bayar</Text>
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
