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
import Style, { black, WIDTH } from "../../Style/Style";
import CalendarStrip from "react-native-calendar-strip";
import PembayaranStyle from "../../Style/PembayranStyle";
import { Table, Row, Rows } from "react-native-table-component";
import callAPI from "./../../../Controller/CallAPI";

const numColumn = 1;
class Tagihan extends React.Component {
  constructor() {
    super();
    this.getDataPembayaran();
    this.state = {
      refreshing: false,
      active: 0,
      headerData: [],
      contentData: [],
    };
  }

  currencyFormat(num) {
    return 'Rp ' + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  checkbulan(month){
    switch (month){
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'Mei';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Agu';
      case 9:
        return 'Sep';
      case 10:
        return 'Okt';
      case 11:
        return 'Nov';
      case 12:
        return 'Des';
      default:
        return '-';
    }
  }

  getDataPembayaran = async () => {
    const url = `http://104.248.156.113:8025/api/v1/AppAccount/MonthlyBillList/MHS0001418/`;
    const response = await callAPI.getData(url);
    const { data } = response;
    this.setState({ contentData: data });
  };

  MetodePembayaran = (id, billvalue, schoolyearid, studentid) => {
    const { navigation } = this.props;
    navigation.navigate("MetodePembayaran", {
      billid: id,
      billvalue: billvalue,
      schoolyearid: schoolyearid,
      studentid: studentid,
    });
  };

  _renderItem = ({ item, index }) => {
    if (item.costid === "MHS001" && item.ispaid === 1) {
      return (
        <View
          style={{
            margin: 25,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>
            {this.checkbulan(item.nmonth)} {item.nyear}
          </Text>
          <Text style={PembayaranStyle.TextTagihanSPP}>{this.currencyFormat(item.billvalue)}</Text>
          <TouchableOpacity disabled={true} style={PembayaranStyle.buttonLunas}>
            <Text style={PembayaranStyle.buttonLunasText}>Lunas</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (item.ispaid === 2) {
      return (
        <View
          style={{
            margin: 25,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text>
            {this.checkbulan(item.nmonth)} {item.nyear}
          </Text>
          <Text style={PembayaranStyle.TextTagihanSPP}>{this.currencyFormat(item.billvalue)}</Text>
          <TouchableOpacity
            style={PembayaranStyle.buttonBayar}
            onPress={() =>
              this.MetodePembayaran(
                item.billid,
                item.billvalue,
                item.schoolyearid,
                item.studentid
              )
            }
          >
            <Text style={PembayaranStyle.buttonBayarText}>Bayar</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

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
              <TouchableOpacity
                style={{ position: "absolute", left: WIDTH - 85 }}
                onPress={() => navigation.navigate("RiwayatPembayaran")}
              >
                <Icon name={"ios-timer-outline"} size={25} color={"#000"} />
              </TouchableOpacity>
              <Text style={[Style.headerText, { marginVertical: 10 }]}>
                Informasi Tagihan
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

            <View
              style={{
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#E7E9F1",
                margin: 25,
              }}
            >
              <FlatList
                data={this.state.contentData}
                extraData={
                  this.state.selectedId // for single item
                }
                renderItem={this._renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numColumn}
              />
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

export default Tagihan;
