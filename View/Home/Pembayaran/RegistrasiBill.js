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
} from "react-native";

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
import { Table, Row, Rows } from "react-native-table-component";

class RegistasiBill extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
      numberQuanity: null,
      dataSemua: [],
      dataContent: [
        {
          billid: "",
          nmonth: 0,
          nyear: 0,
          studentid: "",
          description: "",
          paymentdate: "",
          billvalue: "",
          schoolyearid: "",
          paymentid: "",
          paymentvalue: 0,
          isjurnalized: true,
          prstudentid: "",
          isfirstpay: "",
          remarks: "",
        },
      ],
    };
  }
  currencyFormat(num) {
    return "Rp " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
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
    isfirstpay
  ) => {
    const parsedQty = Number.parseInt(value);
    const { navigation, route } = this.props;
    const { params: data } = route.params;

    var array = data;
    var stateArray = this.state.dataContent;

    var index = array.findIndex((obj) => obj.billid === billid);
    // console.log(index);

    stateArray[index] = {
      ...stateArray[index],
      billid: billid,
      nmonth: nmonth,
      nyear: nyear,
      studentid: prstudentid,
      description: description,
      paymentdate: moment().format(),
      billvalue: billvalue,
      schoolyearid: "",
      paymentid: "",
      paymentvalue: parsedQty,
      isjurnalized: true,
      prstudentid: prstudentid,
      isfirstpay: isfirstpay,
      remarks: "",
    };
    this.setState({ dataContent: stateArray });
    console.log(this.state.dataContent);

    if (Number.isNaN(parsedQty)) {
      this.setState({ numberQuanity: 0 }); //setter for state
    } else if (parsedQty > pendingvalue) {
      console.log("lebih");
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
                  keyboardType={"number-pad"}
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
                      item.isfirstpay
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
                  keyboardType={"number-pad"}
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
                      item.isfirstpay
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

  submitBayar = async () => {
    let url =
      "http://104.248.156.113:8025/api/v1/AppAccount/RegistrationPayment";
  };

  render() {
    const { navigation, route } = this.props;
    const { params: data, isfirstpay: isfirstpay } = route.params;

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
          </ScrollView>
        </SafeAreaView>
        <View
          style={{
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            width: WIDTH,
            height: 150,
            backgroundColor: "#23243B",
            position: "absolute", //Here is the trick
            bottom: 0, //Here is the trick
          }}
        >
          <View
            style={{
              margin: 25,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={[
                  Style.textBold20,
                  { color: white, fontWeight: "normal", fontSize: 16 },
                ]}
              >
                Total Pembayaran
              </Text>
              <Text style={[Style.textBold20, { color: white }]}>
                Rp.440.000
              </Text>
            </View>
            <TouchableOpacity
              style={[
                Style.buttonRed,
                { width: WIDTH / 2.2, alignSelf: "flex-end" },
              ]}
              onPress={() => this.submitBayar()}
            >
              <Text style={[Style.textNormalWhite, { alignSelf: "center" }]}>
                Generate Kode Bayar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      </View>
    );
  }
}

export default RegistasiBill;
