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
  FlatList,
  Alert,
  Linking,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-community/picker";
import moment from "moment";
import Style, { black, WIDTH } from "../../Style/Style";
import callAPI from "./../../../Controller/CallAPI";
import PembayaranStyle from "../../Style/PembayranStyle";

const numColumn = 1;
class DetailPembayaran extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
      nohp:"",
    };
  }

  currencyFormat(num) {
    return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
 }
 submitSPP = async() =>{
  //  console.log('masuk')
  const { navigation, route } = this.props;
  const {
    billid: billid,
    billvalue: billvalue,
    schoolyearid: schoolyearid,
    studentid: studentid,
    paymentmethod : paymentmethod,
  } = route.params;

  let url = "http://104.248.156.113:8025/api/v1/AppAccount/MonthlyBillPay";
  let body = {
    "schoolyearid": schoolyearid,
    "studentid": studentid,
    "billid": billid,
    "bank_code": paymentmethod,
    "nohp": this.state.nohp
  }
  const response = await callAPI.postAPI(url,JSON.stringify(body));
  // console.log(response)
  const {data,statusCode} = response

  if (data.success == false){
      Alert.alert('Generate Kode Gagal',data.responseText,[
        {text: 'Oke',onPress:() => console.log("closed")}
      ])
    }else{
      navigation.navigate('RiwayatPembayaran')
  }
 }

 checkPaymentMethod(payMethod) {
    switch(payMethod){
      case 'ovo':
        return require('./../../../assets/pembayaran/ovo.png');
      case 'mandiri':
        return require('./../../../assets/pembayaran/mandiri.png');
      case 'alfamart':
        return require('./../../../assets/pembayaran/alfamart.png');
      case 'bca':
        return require('./../../../assets/pembayaran/bca.png');
      case 'bni':
        return require('./../../../assets/pembayaran/bni.png');
      case 'permata':
        return require('./../../../assets/pembayaran/permata.png');
    }
 }

  render() {
    const { navigation, route } = this.props;
    const {
      billid: billid,
      billvalue: billvalue,
      schoolyearid: schoolyearid,
      studentid: studentid,
      paymentmethod : paymentmethod,
    } = route.params;

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
                Konfirmasi Pembayaran
              </Text>
             
            </View>
            <View
              style={[
                PembayaranStyle.CardPembayaran,
                { flexDirection: "column", marginVertical: 20 },
              ]}
            >
            <View  style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 20,
                }}
            >
              <Text>Tanggal Pembayaran</Text>
            <Text style={Style.textNormalBlack}>15 Maret 2020</Text>
            </View>
              </View>
            

            <View
              style={[
                PembayaranStyle.CardPembayaran,
                { flexDirection: "column", marginVertical: 20 },
              ]}
            >
              
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 20,
                }}
              >
                <Text style={{ fontSize: 12 }}>
                  Nomor Pembayaran : 
                </Text>
                <Text style={{ fontSize: 12 }}>{billid}</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 20,
                }}
              >
                <Text style={{ fontSize: 12 }}>
                 SPP
                </Text>
                <Text style={{ fontSize: 12 }}>{this.currencyFormat(billvalue)}</Text>
              </View>
            
             
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 20,
                  marginVertical: 30,
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "bold" }}>Total</Text>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {this.currencyFormat(billvalue)}
                </Text>
              </View>
            </View>

            <View
              style={[
                PembayaranStyle.CardPembayaran,
                { flexDirection: "column", marginVertical: 20 },
              ]}
            >
               <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 20,
                }}
              >
                <Text style={{ fontSize: 12,marginTop:10 }}>
                 Metode Pembayaran
                </Text>
                <View style={{flexDirection:'row'}}>
                  <Image source={this.checkPaymentMethod(paymentmethod)} style={{width:40,height:40,marginRight:20}} />
                  <Text style={[Style.textNormalBlack,{marginTop:8}]}>{paymentmethod.toUpperCase()}</Text>
                </View>
              </View>
                 
                {paymentmethod.toUpperCase() == "OVO"  ? 
                      <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      margin: 20,
                    }}>
                      <Text style={{ fontSize: 12,marginTop:8 }}>
                      No Handphone
                      </Text>
                      <TextInput style={[Style.input,{width:'50%',height:35}]} onChangeText={(val)=> this.setState({nohp:val})} keyboardType={"number-pad"} />
                    </View>
                : 
                // Buat yang kosong
                <View></View>

                }
               
             
              </View>
              <TouchableOpacity style={Style.buttonRed} onPress={this.submitSPP}>
                <Text style={[Style.textNormalWhite,{textAlign:'center'}]}>Generate Kode Bayar</Text>
              </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      </View>
    );
  }
}

export default DetailPembayaran;
