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
import Pembayaran from "./Pembayaran";

class RiwayatPembayaran extends React.Component {
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
              <Text style={[Style.headerText, { marginVertical: 10 }]}>
                Riwayat Pembayaran
              </Text>
            </View>

            <View style={[PembayaranStyle.CardPembayaran]}>
              <Text></Text>
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

export default RiwayatPembayaran;
