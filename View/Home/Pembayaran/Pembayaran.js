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
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Style, { biru, black, WIDTH } from "./../../Style/Style";
import CalendarStrip from "react-native-calendar-strip";
import PembayaranStyle from "./../../Style/PembayranStyle";
import { Table, Row, Rows } from "react-native-table-component";
import callAPI from "./../../../Controller/CallAPI";
import { sub } from "react-native-reanimated";

const windowHeight = Dimensions.get('window').height;


const numColumn = 1;
class Pembayaran extends React.Component {
  constructor() {
    super();
    this.getDataRegistrasi();

    this.state = {
      refreshing: false,
      active: 0,
      regisData: [],
      colorButton1: "#B2B5BF",
      colorButton2: "#B2B5BF",
      Disbutton1: true,
      Disbutton2: true,
      colorText1: "#06BFAD",
      colorText2: "#06BFAD",
      iconPembayaran1: "ios-checkmark-circle",
      iconPembayaran2: "ios-checkmark-circle",
      ModelArray: [
        {
          billid: "",
          nmonth: 0,
          nyear: 0,
          studentid: "",
          description: "",
          paymentdate: "",
          billvalue: 0,
          schoolyearid: "",
          paymentid: "",
          paymentvalue: 0,
          isjurnalized: true,
          prstudentid: "",
          isfirstpay: 0,
          remarks: "",
        },
      ],
      refreshing: false,
      // tableHead: ['Kategori', 'Jml. Tagihan', 'Sisa/Status', 'Keterangan'],
      // tableData: [
      //   ['MOS', 'Rp. 440.000', 'Rp. 440.000', 'Lunas'],
      //   ['Perlengkapan', 'Rp. 2.664.000', 'Rp. 2.664.000', 'Lunas'],
      //   ['Pembangunan', 'Rp. 2.574.000', 'Rp. 2.574.000', 'Lunas'],
      //   ['SPP', 'Rp. 550.000', 'Rp. 550.000', 'Lunas'],
      // ]
    };
  }

  checkStatus(billvalue, pendingvalue) {
    if (pendingvalue == 0) {
      return " Lunas";
    } else {
      return " " + this.currencyFormat(pendingvalue);
    }
  }

  currencyFormat(num) {
    return "Rp " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  setRefreshing = () =>{
    if(this.state.refreshing == false){
       this.setState({ refreshing: true })
       this.getDataRegistrasi()
     }
  }

  checkWarna = (data) => {
    let array = [];
    array.push(data.detail);
    array.map((item, index) => {
      item.map((subItem, sIndex) => {
        if (subItem.pendingvalue === 0) {
          if (subItem.isfirstpay === 1) {
            this.setState({
              colorButton1: "#b2b5bf",
              Disbutton1: true,
              colorText1: "#06BFAD",
              iconPembayaran1: "ios-checkmark-circle",
            });
          } else {
            this.setState({
              colorButton2: "#b2b5bf",
              Disbutton2: true,
              colorText2: "#06BFAD",
              iconPembayaran2: "ios-checkmark-circle",
            });
          }
        } else {
          if (subItem.isfirstpay === 1) {
            this.setState({
              colorButton1: "#FF3737",
              Disbutton1: false,
              colorText1: "#F07031",
              iconPembayaran1: "ios-alert-circle",
            });
          } else {
            this.setState({
              colorButton2: "#FF3737",
              Disbutton2: false,
              colorText2: "#F07031",
              iconPembayaran2: "ios-alert-circle",
            });
          }
        }
      });
    });
  };

  getDataRegistrasi = async () => {
    const url = `http://104.248.156.113:8025/api/v1/AppAccount/RegistrationBill/MHS0001932`;
    const response = await callAPI.getData(url);
    const { data, statusCode } = response;
    this.checkWarna(data);
    this.setState({ regisData: data.detail });

    if(statusCode == 200){
      this.setState({ refreshing: false })
    }
  };

  // addModelPembayaran = async (data) => {
  //   let array = [];
  //   array.push(data);
  //   array.map((item, index) => {
  //     item.map((subItem, sIndex) => {
  //       var stateArray = this.state.ModelArray;
  //       var index = stateArray.findIndex(
  //         (obj) => obj.description === subItem.description
  //       );
  //       stateArray[index] = {
  //         ...stateArray[index],
  //         billid: subItem.billid,
  //         nmonth: subItem.nmonth,
  //         nyear: subItem.nyear,
  //         studentid: subItem.prstudentid,
  //         description: subItem.description,
  //         paymentdate: subItem.paymentdate,
  //         billvalue: subItem.billvalue,
  //         schoolyearid: subItem.schoolyearid,
  //         paymentid: subItem.paymentid,
  //         paymentvalue: subItem.paymentvalue,
  //         isjurnalized: true,
  //         prstudentid: subItem.prstudentid,
  //         isfirstpay: subItem.isfirstpay,
  //         remarks: "",
  //       };
  //       this.setState({ ModelArray: stateArray });
  //     });
  //   });
  //   console.log(this.state.ModelArray);
  // };

  _renderItem = ({ item, index }) => {
    if (item.isfirstpay === 1) {
      return (
        <View
          style={{
            margin: 25,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >

          <Text style={{fontsize: 12,}}>{item.description}</Text>
          <Text style={{fontsize: 12,}} >{this.currencyFormat(item.billvalue)}</Text>
          <View style={{flexDirection: "row", borderRadius: 50, borderWidth: 1, padding: 6, borderColor: '#06BFAD'}}>
              <Icon name={"ios-checkmark-circle"} size={18} color={"#06BFAD"}/>
              <Text style={{color: '#06BFAD'}}>{this.checkStatus(this.currencyFormat(item.billvalue),item.pendingvalue)}</Text>

          </View>
        </View>
      );
    }
  };

  _renderItemCicil = ({ item, index }) => {
    if (item.isfirstpay === 0) {
      return (
        <View
          style={{
            margin: 20,
            marginHorizontal: 15,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <View style={{ width: WIDTH / 3.2 }}>
            <Text style={{ fontSize: 12 }}>{item.description}</Text>
          </View>
          <View style={{ width: WIDTH / 3.7 }}>
            <Text style={{ fontSize: 12 }}>
              {this.currencyFormat(item.billvalue)}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              borderRadius: 50,
              borderWidth: 1,
              padding: 6,
              borderColor: this.state.colorText2,
              width: WIDTH / 3.5,
            }}
          >
            <Icon
              name={this.state.iconPembayaran2}
              size={18}
              color={this.state.colorText2}
            />
            <Text style={{ color: this.state.colorText2, fontSize: 12 }}>
              {this.checkStatus(item.billvalue, item.pendingvalue)}
            </Text>
          </View>
        </View>
      );
    }
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={Style.container}>
        <SafeAreaView>
          <ScrollView
          style={{height:windowHeight}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.setRefreshing}
            />
          }>
            <View style={Style.NavBackContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name={"ios-chevron-back-sharp"}
                  size={25}
                  color={"#000"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ position: "absolute", left: WIDTH - 85 }}
                onPress={() => navigation.navigate("RiwayatPembayaran")}
              >
                <Icon name={"ios-timer-outline"} size={25} color={"#000"} />
              </TouchableOpacity>
              <Text style={[Style.headerText, { marginVertical: 10 }]}>
                Pembayaran
              </Text>
            </View>

            <View
              style={[
                Style.ContainerViewBiasa,
                { flexDirection: "row", marginTop: 10 },
              ]}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={[
                    Style.textNormalGrey,
                    { fontWeight: "bold", fontSize: 14 },
                  ]}
                >
                  Nomor Pendaftaran
                </Text>

                <Text
                  style={[
                    Style.textNormalGrey,
                    { fontWeight: "bold", fontSize: 14 },
                  ]}
                >
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
                    { fontWeight: "bold", textAlign: "left", fontSize: 14 },
                  ]}
                >
                  : PB201-03-011233
                </Text>
                <Text
                  style={[
                    Style.textNormalBlack,
                    { fontWeight: "bold", fontSize: 14 },
                  ]}
                >
                  : 2021/2022 | Gelombang II
                </Text>
              </View>
            </View>

            <View style={PembayaranStyle.CardPembayaran}>
              <View style={{ padding: 25 }}>
                <View style={{ flexDirection: "row" }}>
                  <Icon name="ios-calendar-outline" size={26} color={black} />
                  <Text
                    style={[
                      Style.textNormalBlack,
                      { marginLeft: 10, marginTop: 3 },
                    ]}
                  >
                    Maret 2021
                  </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text style={Style.textBold20}>Rp. 550.000</Text>
                </View>
              </View>

              <View style={{ marginTop: 35 }}>
                <TouchableOpacity
                  style={PembayaranStyle.buttonRed}
                  onPress={() => navigation.navigate("Tagihan")}
                >
                  <Text
                    style={[
                      Style.textNormalWhite,
                      {
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop: 12,
                      },
                    ]}
                  >
                    Bayar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={PembayaranStyle.CardHarga}>
              <View
                style={{
                  paddingHorizontal: 25,
                  paddingVertical: 18,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <View style={{ marginTop: 10 }}>
                  <Icon
                    name="ios-information-circle-outline"
                    color="#3FA2F7"
                    size={25}
                  />
                </View>
                <View style={{ paddingHorizontal: 20 }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: "#55769F",
                      textAlign: "justify",
                    }}
                  >
                    Pembayaran dapat di cicil, Minimal Pembayaran Biaya
                    Formulir, Gelombang dan SPP 1 Bulan Pertama atau yang sesuai
                    tagihan.
                  </Text>
                </View>
              </View>
            </View>

            <Text style={{ marginLeft: 25, marginVertical: 15 }}>
              Pembayaran Pertama
            </Text>

            <View
              style={[
                PembayaranStyle.CardPembayaran,
                { flexDirection: "column", marginBottom: 20 },
              ]}
            >
              <View>
                {/* <Table>
                  <Row data={this.state.tableHead} style={styles.head} textStyle={[styles.text,{color:'#B2B5BF'}]}/>
                  <Rows data={this.state.tableData} textStyle={styles.text}/>
                </Table> */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#55769F",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Kategori
                  </Text>
                  <Text
                    style={{
                      color: "#55769F",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Jumlah Tagihan
                  </Text>
                  <Text
                    style={{
                      color: "#55769F",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Status
                  </Text>
                </View>
                <View>
                  <FlatList
                    data={this.state.regisData}
                    extraData={
                      this.state.selectedId // for single item
                    }
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={numColumn}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={{ marginRight: 28, alignSelf: "flex-end" }}
              disabled={this.state.Disbutton1}
              onPress={() =>
                navigation.navigate("RegistrasiBill", {
                  params: this.state.regisData,
                  isfirstpay: true,
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: this.state.colorButton1 }}>Bayar</Text>
                <Icon
                  name={"chevron-forward"}
                  style={{ marginLeft: 8 }}
                  size={20}
                  color={this.state.colorButton1}
                />
              </View>
            </TouchableOpacity>

            <Text style={{ marginLeft: 25, marginVertical: 15 }}>
              Pembayaran dapat di cicil
            </Text>

            <View
              style={[
                PembayaranStyle.CardPembayaran,
                { flexDirection: "column", marginBottom: 20 },
              ]}
            >
              <View>
                {/* <Table>
                  <Row data={this.state.tableHead} style={styles.head} textStyle={[styles.text,{color:'#B2B5BF'}]}/>
                  <Rows data={this.state.tableData} textStyle={styles.text}/>
                </Table> */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#55769F",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Kategori
                  </Text>
                  <Text
                    style={{
                      color: "#55769F",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Jumlah Tagihan
                  </Text>
                  <Text
                    style={{
                      color: "#55769F",
                      fontSize: 14,
                      fontWeight: "bold",
                    }}
                  >
                    Status
                  </Text>
                </View>
                <View>
                  <FlatList
                    data={this.state.regisData}
                    extraData={
                      this.state.selectedId // for single item
                    }
                    renderItem={this._renderItemCicil}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={numColumn}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={{
                marginRight: 28,
                marginBottom: 20,
                alignSelf: "flex-end",
              }}
              disabled={this.state.Disbutton2}
              onPress={() =>
                navigation.navigate("RegistrasiBill", {
                  params: this.state.regisData,
                  isfirstpay: false,
                })
              }
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: this.state.colorButton2 }}>Bayar</Text>
                <Icon
                  name={"chevron-forward"}
                  style={{ marginLeft: 8 }}
                  size={20}
                  color={this.state.colorButton2}
                />
              </View>
            </TouchableOpacity>

            <View
              style={{
                backgroundColor: "#06BFAD",
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 25,
                padding: 7,
                borderRadius: 15,
              }}
            >
              <Icon name={"md-checkmark-circle"} size={20} color={"#fff"} />
              <Text style={{ color: "#fff", fontSize: 12, marginLeft: 7 }}>
                Pembayaran ke-1 (15 Maret 2021) Telah Dikonfirmasi
              </Text>
            </View>

            <View
              style={[
                PembayaranStyle.CardPembayaran,
                { flexDirection: "column", marginVertical: 20 },
              ]}
            >
              <View style={{ margin: 20 }}>
                <Text style={{ fontSize: 14, color: "#B2B5BF" }}>
                  Pembayaran Dapat Melalui
                </Text>

                <View style={{ width: 250, marginVertical: 15 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Image
                      source={require("../../../assets/icon/BCAmini.png")}
                    />
                    <Image
                      source={require("../../../assets/icon/BNImini.png")}
                    />
                    <Image
                      source={require("../../../assets/icon/Brivamini.png")}
                    />
                    <Image
                      source={require("../../../assets/icon/Permatamini.png")}
                    />
                  </View>
                </View>

                {/* Untuk Text */}
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "column", width: 10 }}>
                    <View>
                      <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                        •{" "}
                      </Text>
                      <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                        •{" "}
                      </Text>
                    </View>
                  </View>

                  <View style={{ flexDirection: "column", width: 500 }}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                        Kode Pembayaran
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        {" "}
                        anda dapatkan setelah klik{" "}
                      </Text>
                      <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                        Bayar
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        flexWrap: "wrap",
                        width: WIDTH - 90,
                      }}
                    >
                      Apabila anda masih memiliki tagihan Virtual Account yang
                      belum dibayar, maka transaksi sebelumnya akan kami
                      batalkan secara otomatis.
                    </Text>
                  </View>
                </View>
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
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40 },
  text: { margin: 6, fontSize: 12 },
});

export default Pembayaran;
