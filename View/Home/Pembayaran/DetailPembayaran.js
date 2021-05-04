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
import Pembayaran from "./Pembayaran";

const numColumn = 1;
class DetailPembayaran extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
    };
  }

  render() {
    const { navigation, route } = this.props;
    const {
      billid: billid,
      billvalue: billvalue,
      schoolyearid: schoolyearid,
      studentid: studentid,
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
                Detail Pembayaran
              </Text>
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
                  Nomor Pembayaran : {billid}
                </Text>
                <Text style={{ fontSize: 12 }}>15 Mar 2021</Text>
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
                  Rp. 550.000
                </Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      </View>
    );
  }
}

export default DetailPembayaran;
