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
import Style from "../Style/Style";
import { abs } from "react-native-reanimated";
import { expo } from "../../app.json";

const { width: WIDTH } = Dimensions.get("window");

class StatusRegistration extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
      //   //Warna Belum Bayar
      //   textColor: 'black',
      //   numberColor: '#B2B5BF',
      //   statusColor: '#F6F6FA',
      //   statusborderColor: '#E7E9F1',
      // Warna sudah Bayar
      textColor: "#3FA2F7",
      numberColor: "#FFFFFF",
      statusColor: "#3FA2F7",
      statusborderColor: "#3FA2F7",
    };
  }

  change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== this.state.active) {
      this.setState({ active: slide });
    }
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={Style.container}>
        <SafeAreaView>
          <ScrollView>
            <View style={Style.NavBackContainer}>
              <Text style={Style.headerText}>Status Registrasi</Text>
            </View>

            <View style={Style.ContainerViewBiasa}>
              <View style={{ marginTop: 30 }}>
                <Text>Status Pendaftaran</Text>
                <TouchableOpacity
                  style={{
                    borderColor: this.state.statusborderColor,
                    backgroundColor: "#FBFBFF",
                    borderWidth: 1,
                    padding: 17.5,
                    borderRadius: 10,
                    marginTop: 25,
                    flexDirection: "row",
                  }}
                  onPress={() =>
                    navigation.navigate("RegisterNewSiswa", {
                      screen: "RegisDataSiswa",
                    })
                  }
                >
                  <View
                    style={{
                      padding: 7,
                      borderRadius: 20,
                      backgroundColor: this.state.statusColor,
                      width: 35,
                    }}
                  >
                    <Text
                      style={{
                        alignItems: "center",
                        marginLeft: 5,
                        fontWeight: "bold",
                        color: this.state.numberColor,
                      }}
                    >
                      1
                    </Text>
                  </View>
                  <Text
                    style={{
                      alignItems: "center",
                      marginTop: 7,
                      marginLeft: 10,
                      color: this.state.textColor,
                    }}
                  >
                    Pengisian Form Pendaftaran.
                  </Text>
                  <View style={{ position: "absolute", right: 20, top: 17 }}>
                    {/* <Icon
                      name="ios-checkmark-circle"
                      style={{ marginTop: 4 }}
                      color={"#06BFAD"}
                      size={28}
                    /> */}
                  </View>
                </TouchableOpacity>

                <View style={{ marginLeft: 30, marginBottom: 0 }}>
                  <Text
                    style={{ fontWeight: "bold", color: this.state.textColor }}
                  >
                    .
                  </Text>
                  <Text
                    style={{ fontWeight: "bold", color: this.state.textColor }}
                  >
                    .
                  </Text>
                  <Text
                    style={{ fontWeight: "bold", color: this.state.textColor }}
                  >
                    .
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    borderColor: this.state.statusborderColor,
                    backgroundColor: "#FBFBFF",
                    borderWidth: 1,
                    padding: 17.5,
                    borderRadius: 10,
                    marginTop: 10,
                    flexDirection: "row",
                  }}
                  onPress={() =>
                    navigation.navigate("pembayranStacks", {
                      screen: "Pembayran",
                    })
                  }
                >
                  <View
                    style={{
                      padding: 7,
                      borderRadius: 20,
                      backgroundColor: this.state.statusColor,
                      width: 35,
                    }}
                  >
                    <Text
                      style={{
                        alignItems: "center",
                        marginLeft: 5,
                        fontWeight: "bold",
                        color: this.state.numberColor,
                      }}
                    >
                      2{" "}
                    </Text>
                  </View>
                  <Text
                    style={{
                      alignItems: "center",
                      marginTop: 7,
                      marginLeft: 10,
                      color: this.state.textColor,
                    }}
                  >
                    Pembayaran Pendaftaran
                  </Text>
                  <View style={{ position: "absolute", right: 20, top: 17 }}>
                    {/* <Icon
                      name="ios-checkmark-circle"
                      style={{ marginLeft: 30, marginTop: 4 }}
                      color={"#06BFAD"}
                      size={28}
                    /> */}
                  </View>
                </TouchableOpacity>

                <View style={{ marginLeft: 30, marginBottom: 0 }}>
                  <Text
                    style={{ fontWeight: "bold", color: this.state.textColor }}
                  >
                    .
                  </Text>
                  <Text
                    style={{ fontWeight: "bold", color: this.state.textColor }}
                  >
                    .
                  </Text>
                  <Text
                    style={{ fontWeight: "bold", color: this.state.textColor }}
                  >
                    .
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    borderColor: this.state.statusborderColor,
                    backgroundColor: "#FBFBFF",
                    borderWidth: 1,
                    padding: 17.5,
                    borderRadius: 10,
                    marginTop: 10,
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      padding: 7,
                      borderRadius: 20,
                      backgroundColor: this.state.statusColor,
                      width: 35,
                    }}
                  >
                    <Text
                      style={{
                        alignItems: "center",
                        marginLeft: 5,
                        fontWeight: "bold",
                        color: this.state.numberColor,
                      }}
                    >
                      3
                    </Text>
                  </View>
                  <Text
                    style={{
                      alignItems: "center",
                      marginTop: 7,
                      marginLeft: 10,
                      color: this.state.textColor,
                    }}
                  >
                    Komfirmasi Pembayaran dari Admin
                  </Text>
                  <View style={{ position: "absolute", right: 20, top: 17 }}>
                    {/* <Icon
                      name="ios-checkmark-circle"
                      style={{ marginLeft: 30, marginTop: 4 }}
                      color={"#06BFAD"}
                      size={28}
                    /> */}
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

export default StatusRegistration;
