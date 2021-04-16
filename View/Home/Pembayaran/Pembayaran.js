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
import Style, { black } from "./../../Style/Style";
import CalendarStrip from "react-native-calendar-strip";
import PembayaranStyle from "./../../Style/PembayranStyle";

class Pembayaran extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
    };
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
                Pembayran
              </Text>
            </View>

            <View style={[Style.ContainerViewBiasa, { marginTop: 10 }]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={[Style.textNormalGrey, { fontWeight: "bold" }]}>
                  Nomor Pendaftaran
                </Text>
                <Text
                  style={[
                    Style.textNormalBlack,
                    { fontWeight: "bold", textAlign: "left" },
                  ]}
                >
                  : PB201-03-011233
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={[Style.textNormalGrey, { fontWeight: "bold" }]}>
                    Tahun Ajaran
                  </Text>
                </View>
                <View>
                  <Text style={[Style.textNormalBlack, { fontWeight: "bold" }]}>
                    : 2021/2022 | Gelombang II
                  </Text>
                </View>
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
                  <Text style={Style.textBold20}>Rp.550.000</Text>
                </View>
              </View>

              <View style={{ marginTop: 35 }}>
                <TouchableOpacity style={PembayaranStyle.buttonRed}>
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
                    Pembayaran dapat di cicil,Minimal Pembayaran Biaya
                    Formulir,Gelombang dan SPP 1 Bulan Pertama atau yang sesuai
                    tagihan
                  </Text>
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

export default Pembayaran;
