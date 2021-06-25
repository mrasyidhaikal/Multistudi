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
  FlatList,
  Alert,
} from "react-native";

import { Picker } from "@react-native-community/picker";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Style, {
  biru,
  black,
  greyBorder,
  merah,
  white,
  WIDTH,
} from "../../Style/Style";
import CalendarStrip from "react-native-calendar-strip";
import PembayaranStyle from "../../Style/PembayranStyle";

import callAPI from "../../../Controller/CallAPI";
import { NavigationHelpersContext } from "@react-navigation/core";

class RegistasiBill extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
      numberQuanity: null,
      jumlahBayar: 0,
      dataSemua: [],
      nama_bank: "",
      nohp: "",
      dataContent: [],
    };
  }
  currencyFormat(num) {
    return "Rp " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }
  setDefaultValue() {
    this.setState({ numberQuanity: 0 }); //setter for state
  }

  onCheckLimit = (
    value,
    pendingvalue,
    description,
    billid,
    nmonth,
    nyear,
    prstudentid,
    billvalue,
    isfirstpay,
    index
  ) => {
    const parsedQty = Number.parseInt(value);
    const { navigation, route } = this.props;
    const {headerData: headerData} = route.params;
    
    var stateArray = this.state.dataContent;
    //console.log(headerData.schoolyearid)
    

    // Updated and Set new array
    stateArray[index] = {
      ...stateArray[index],
      billid: billid,
      nmonth: nmonth,
      nyear: nyear,
      studentid: prstudentid,
      description: description,
      paymentdate: moment().format(),
      billvalue: billvalue,
      schoolyearid: headerData.schoolyearid,
      paymentid: "",
      paymentvalue: parsedQty,
      isjurnalized: true,
      prstudentid: prstudentid,
      isfirstpay: isfirstpay,
      remarks: "",
    };
                //this.setState({ dataContent: stateArray });
                //console.log(this.state.dataContent);

    if (Number.isNaN(parsedQty)) {
      stateArray.splice(index, 1);
      this.setState({ dataContent: stateArray });
    } else {
      stateArray[index] = {
        ...stateArray[index],
        billid: billid,
        nmonth: nmonth,
        nyear: nyear,
        studentid: prstudentid,
        description: description,
        paymentdate: moment().format(),
        billvalue: billvalue,
        schoolyearid:headerData.schoolyearid,
        paymentid: "",
        paymentvalue: parsedQty,
        isjurnalized: true,
        prstudentid: prstudentid,
        isfirstpay: isfirstpay,
        remarks: "",
      };
    

       this.setState({ dataContent: stateArray });
     // console.log(this.state.dataContent);
    }

    // Count Total Registration fee
    let sum = 0;
    let total = this.state.dataContent;
    total.map((item, index) => {
      if (isNaN(item.paymentvalue)) {
        this.setState({ numberQuanity: 0 }); //setter for state
      } else {
        sum = sum + item.paymentvalue;
      }
    });

    this.setState({ jumlahBayar: sum });

    // // Validate Check Max Input
    if (Number.isNaN(parsedQty)) {
      this.setState({ numberQuanity: 0 }); //setter for state
    } else if (parsedQty > pendingvalue) {
      Alert.alert("Transaksi Gagal", "Jumlah Bayar Melebihi Jumlah Tagihan !", [
        { text: "Oke", onPress: () => console.log("closed") },
      ]);
    } else {
      this.setState({ numberQuanity: parsedQty });
    }
  };

  _renderFirstPay1 = ({ item, index }) => {
    if (item.isfirstpay === 1) {
      return (
        <View>
          <View style={Style.ContainerViewBiasa}>
            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
              {item.description}
            </Text>

            <View style={[Style.ContainerViewHorizontalSpace, { margin: 0 }]}>
              <View>
                <Text style={{ marginVertical: 10 }}>Jumlah Tagihan</Text>

                <View style={PembayaranStyle.containerCicilan}>
                  <Text style={[Style.textNormalBlack, { color: biru }]}>
                    {this.currencyFormat(item.pendingvalue)}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{ marginVertical: 10 }}>Jumlah Bayar</Text>
                <TextInput
                  style={[
                    PembayaranStyle.containerCicilan,
                    {
                      backgroundColor: white,
                      borderWidth: 1,
                      borderColor: greyBorder,
                      padding: 8,
                    },
                  ]}
                  placeholder={"Rp.440.000"}
                  placeholderTextColor={greyBorder}
                  keyboardType={"numeric"}
                  value={this.currencyFormat(item.pendingvalue)}
                  editable={false}
                />
              </View>
            </View>
          </View>
        </View>
      );
    }
  };
  _renderFirstPay0 = ({ item, index }) => {
    if (item.isfirstpay === 0) {
      return (
        <View>
          <View style={Style.ContainerViewBiasa}>
            <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>
              {item.description}
            </Text>

            <View style={[Style.ContainerViewHorizontalSpace, { margin: 0 }]}>
              <View>
                <Text style={{ marginVertical: 10 }}>Jumlah Tagihan</Text>

                <View style={PembayaranStyle.containerCicilan}>
                  <Text style={[Style.textNormalBlack, { color: biru }]}>
                    {this.currencyFormat(item.pendingvalue)}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={{ marginVertical: 10 }}>Jumlah Bayar</Text>
                <TextInput
         
                  style={[
                    PembayaranStyle.containerCicilan,
                    {
                      backgroundColor: white,
                      borderWidth: 1,
                      borderColor: greyBorder,
                      padding: 8,
                    },
                  ]}
                  placeholder={"Rp.440.000"}
                  placeholderTextColor={greyBorder}
                  keyboardType={"numeric"}
                  onChangeText={(val) =>
                    this.onCheckLimit(
                      val,
                      item.pendingvalue,
                      item.description,
                      item.billid,
                      item.nmonth,
                      item.nyear,
                      item.prstudentid,
                      item.billvalue,
                      item.isfirstpay,
                      index
                    )
                  }
                  value={this.state.numberQuanity}
                />
              </View>
            </View>
          </View>
        </View>
      );
    }
  };

  // MetodePembayaran = (prstudentid, schoolyearid, nopendaftaran, billValue) => {
  //   const { navigation } = this.props;
  //   navigation.navigate("MetodePembayaranRegis", {
  //     prstudentid: prstudentid,
  //     nopendaftaran: nopendaftaran,
  //     schoolyearid: schoolyearid,
  //     billValue : billValue,
  //   });
  // };

  submitBayar = async () => {
    const { navigation, route } = this.props;
    const {
      params: data,
      paymentmethod: paymentMethod,
      headerData: headerData,
    } = route.params;

  
    if (route.params.paymentmethod == undefined) {
      Alert.alert(
        "Transaksi Gagal",
        "Pilih Metode Pembayaran Terlebih Dahulu !",
        [{ text: "Oke", onPress: () => console.log("closed") }]
      );
    }

    let url =
      "http://104.248.156.113:8025/api/v1/AppAccount/RegistrationPayment";
    let body = {
      header: {
        prstudentid: headerData.prstudentid,
        schoolyearid: headerData.schoolyearid,
        nopendaftaran: headerData.nopendaftaran,
        paymentdate: moment().format(),
        total: this.state.jumlahBayar,
        paidby: paymentMethod,
        nama_bank: paymentMethod,
        paymethodtitle: "string",
        logoname: "string",
        nohp: this.state.nohp,
      },
      content: this.state.dataContent,
    };
   // console.log(body)

    const res = await callAPI.postAPI(url, JSON.stringify(body));
    console.log(res.data);
    if (res.data["success"] == false) {
      Alert.alert("Transaksi Gagal", res.data["responseText"], [
        { text: "Oke", onPress: () => console.log("closed") },
      ]);
    }
    if (res.data["success"] == true) {
      Alert.alert("Sukses", [res.data["responseText"],"Silahkan Lihat Virtual Account Di menu History Pembayaran"], [
        { text: "Oke", onPress: () =>  navigation.navigate("Pembayaran") },
      ]);
    }
  };

  checkMethod(method) {
    switch (method) {
      case "OVO":
        return "OVO";
      case "mandiri":
        return "BANK MANDIRI";
      case "alfamart":
        return "ALFAMART";
      case "bca":
        return "BANK CENTRAL ASIA";
      case "bni":
        return "BANK NEGARA INDONESIA";
      case "permata":
        return "PERMATA BANK";
    }
  }

  checkMethodImg(payMethod) {
    switch (payMethod) {
      case "OVO":
        return require("./../../../assets/pembayaran/ovo.png");
      case "mandiri":
        return require("./../../../assets/pembayaran/mandiri.png");
      case "alfamart":
        return require("./../../../assets/pembayaran/alfamart.png");
      case "bca":
        return require("./../../../assets/pembayaran/bca.png");
      case "bni":
        return require("./../../../assets/pembayaran/bni.png");
      case "permata":
        return require("./../../../assets/pembayaran/permata.png");
    }
  }
  getTotalNoCicil = (data)=>{
   
    data.map((item,index)=> {
      if (item.isfirstpay === 1) {
       
        this.onCheckLimit(
          item.pendingvalue,
          item.pendingvalue,
          item.description,
          item.billid,
          item.nmonth,
          item.nyear,
          item.prstudentid,
          item.billvalue,
          item.isfirstpay,
          index
        )
      //  console.log(item)
      }
     
       
    })
   
  }
  componentDidMount(){
    const { navigation, route } = this.props;
    const { params: data, isfirstpay: isfirstpay } = route.params;
    
      if (isfirstpay === true) {
        this.getTotalNoCicil(data)
      } 
  }

  render() {
    const { navigation, route } = this.props;
    const { params: data, isfirstpay: isfirstpay } = route.params;

    // console.log(route.params.paymentmethod);

    return (
      <View style={[Style.container]}>
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
                Billing
              </Text>
            </View>

            <View
              style={{
                marginTop: 20,
              }}
            >
              {isfirstpay === true ? (
                <View>
                  <FlatList
                    data={data}
                    extraData={
                      this.state.selectedId // for single item
                    }
                    renderItem={this._renderFirstPay1}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={1}
                  />
                </View>
              ) : (
                <FlatList
                  data={data}
                  extraData={
                    this.state.selectedId // for single item
                  }
                  renderItem={this._renderFirstPay0}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={1}
                />
              )}
            </View>
            {/* <View style={[Style.NavBackContainer,{marginTop: 5}]}>
              <Text style={{ color: "#000", fontSize: 16, fontWeight: "bold" }}>METODE PEMBAYARAN</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                
              </View>
            </View> */}
          </ScrollView>
        </SafeAreaView>
        <View
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            width: WIDTH,
            height: 200,
            backgroundColor: "#23243B",
            position: "absolute",
            bottom: 0,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("MetodePembayaranRegis")}
          >
            <View
              style={[
                PembayaranStyle.CardPembayaran,
                {
                  flexDirection: "column",
                  width: 330,
                  backgroundColor: "",
                  marginTop: 10,
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                {route.params.paymentmethod == undefined ? (
                  <View
                    style={{
                      margin: 20,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={{ color: "white" }}>
                      Pilih Metode Pembayaran
                    </Text>
                    <Icon
                      style={{ marginLeft: 140 }}
                      name={"ios-chevron-forward-sharp"}
                      size={22}
                      color={"#fff"}
                    />
                  </View>
                ) : (
                  // Buat yang kosong
                  <View style={{ margin: 20 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={this.checkMethodImg(route.params.paymentmethod)}
                        style={{ width: 40, height: 40 }}
                      />
                      {/* <Text style={{ fontSize: 13, marginTop:8, marginLeft: 15 }}>
                                  Metode Pembayaran : 
                                </Text> */}
                      <Text
                        style={{
                          fontSize: 13,
                          marginTop: 8,
                          marginLeft: 15,
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        {this.checkMethod(route.params.paymentmethod)}
                      </Text>
                    </View>

                    {/* check method , if OVO , show phone number field */}
                    {route.params.paymentmethod == "OVO" ? (
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{
                            fontSize: 12,
                            marginTop: 8,
                            marginRight: 15,
                            color: "white",
                          }}
                        >
                          No Handphone :
                        </Text>
                        <TextInput
                          style={[
                            Style.input,
                            { width: "65%", height: 35, paddingLeft: 15 },
                          ]}
                          onChangeText={(val) => this.setState({ nohp: val })}
                          keyboardType={"number-pad"}
                        />
                      </View>
                    ) : (
                      <View></View>
                    )}
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{
              marginHorizontal: 25,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* <Text
                style={[
                  Style.textBold20,
                  { color: white, fontWeight: "normal", fontSize: 16 },
                ]}
              >
                Total Pembayaran
              </Text>
              <Text style={[Style.textBold20, { color: white }]}>
                {this.currencyFormat(this.state.jumlahBayar)}
              </Text> */}
            </View>
            <TouchableOpacity
              style={[
                Style.buttonRed,
                { width: WIDTH - 50, alignSelf: "flex-end" },
              ]}
              onPress={() => this.submitBayar()}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {/* <Text style={[Style.textNormalWhite, { alignSelf: "center", marginLeft: 20 }]}>
                  Generate Kode Bayar
                </Text> */}
                <Text
                  style={[
                    Style.textBold20,
                    { fontSize: 18, color: white, marginLeft: 20 },
                  ]}
                >
                  {this.currencyFormat(this.state.jumlahBayar) }
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={[
                      Style.textNormalWhite,
                      { alignSelf: "center", marginLeft: 20 },
                    ]}
                  >
                    Generate Kode Bayar
                  </Text>
                  <Icon
                    style={{ marginRight: 20 }}
                    name={"ios-arrow-forward-sharp"}
                    size={25}
                    color={"#fff"}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      </View>
    );
  }
}

export default RegistasiBill;
