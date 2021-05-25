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
  ToastAndroid,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Style, { black, WIDTH } from "../../Style/Style";
import CalendarStrip from "react-native-calendar-strip";
import PembayaranStyle from "../../Style/PembayranStyle";
import { Table, Row, Rows } from 'react-native-table-component';
import Pembayaran from "./Pembayaran";
import callAPI from "./../../../Controller/CallAPI";
import Clipboard from 'expo-clipboard';

class RiwayatPembayaran extends React.Component {
  constructor() {
    super();
    this.getDataStatusPembayaran()
    this.state = {
      refreshing: false,
      active: 0,
      contentData:[],
    }
  }

  getDataStatusPembayaran = async () => {
    const url = `http://104.248.156.113:8025/api/v1/AppAccount/MonthlyBillHeader/MHS0001332/`;
    const response = await callAPI.getData(url);
    const { data } = response;
   
    this.setState({ contentData: data });
  };


  currencyFormat(num) {
    return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  showToast = (val) => {
    ToastAndroid.show(val, ToastAndroid.SHORT);
  };
  
  copyToClipboard = () => {
    Clipboard.setString(this.state.contentData.virtualaccount_full)
    this.showToast('Text Copied !');
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
                   {moment(this.state.contentData.duedate).format("Do MMMM YYYY, HH:mm")} WIB
                  </Text>
                </View>
                <View style={{ flexDirection: "row"}}>
                  <Text style={{color: '#F15A23', fontWeight: "bold"}}>
                   {this.state.contentData.payment_status}
                  </Text>
                  <Icon name="ios-time-outline" style={{color: '#F15A23', marginLeft: 7}} size={20} />
                </View>
              </View>
              
              <Text style={{fontSize: 14, marginLeft: 20}}>Metode Pembayaran : {this.state.contentData.banklogo} Virtual Account </Text>
              
              <TouchableOpacity style={PembayaranStyle.containerMetodePembayaran} onPress={this.copyToClipboard}>
                    <Text style={{fontWeight: 'bold'}}>No. VA :</Text>
                    <Text>{this.state.contentData.virtualaccount_full}</Text>
                    <View >
                        <Icon name={'ios-copy-outline'} size={25} color={'#000'}/>
                    </View>
              </TouchableOpacity>
              
              <View style={{flexDirection: 'row', justifyContent: 'space-between', margin: 20, alignItems: 'center'}}>
                <View>
                  <Text>Jumlah</Text>
                  <Text style={{fontWeight: 'bold', fontSize: 16, marginTop: 2}}>{this.currencyFormat(Number(this.state.contentData.strtotal))}</Text>      
                </View>
                {/* Tombol Detail di History */}
                {/* <TouchableOpacity onPress={() => navigation.navigate('DetailPembayaran')}>
                  <View style={{flexDirection: 'row',}}>
                      <Text style={{fontSize: 16, color: '#FF3737', fontWeight: 'bold'}}>Lihat Detail</Text>
                      <Icon name="ios-chevron-forward" style={{color: '#FF3737', marginLeft: 5}} size={20} />
                  </View>
                </TouchableOpacity> */}
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
