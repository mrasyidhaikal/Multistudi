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
  FlatList,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Style from "./../../Style/Style";

const numColumn = 1;

class RegisHobi extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      jumlahHobi: [{ key: 1, textHobi: "" }],
      counterHobi: 0,
    };
  }
  addTextViewHobi = () => {
    var keys = this.state.jumlahHobi[this.state.counterHobi].key + 1;
    var joined = this.state.jumlahHobi.concat({ key: keys, textHobi: "" });
    this.setState({
      jumlahHobi: joined,
      counterHobi: this.state.counterHobi + 1,
    });
  };
  removeTextViewHobi = (count) => {
    if (this.state.counterHobi <= 0) {
      console.log("gabisa hapus");
    } else {
      var array = this.state.jumlahHobi;
      var index = array.findIndex((obj) => obj.key === count);
      array.splice(index, 1);
      this.setState({
        jumlahHobi: array,
        counterHobi: this.state.counterHobi - 1,
      });
    }
  };
  updateText = (text, id) => {
    var array = this.state.jumlahHobi;
    var index = array.findIndex((obj) => obj.key === id);
    array[index] = { ...array[index], textHobi: text };
    this.setState({ jumlahHobi: array });
    console.log(this.state.jumlahHobi);
  };

  _renderItemHobi = ({ item, index }) => {
    if (item.key == 1) {
      return (
        <View style={Style.inputContainer}>
          <TextInput
            style={Style.input}
            placeholder={"Tambah Minat/Hobimu"}
            placeholderTextColor={"#B2B5BF"}
            underlineColorAndroid="transparent"
            onChangeText={(val) => this.updateText(val, item.key)}
          />
        </View>
      );
    } else {
      return (
        <View style={Style.inputContainer}>
          <TextInput
            style={Style.input}
            placeholder={"Tambah Minat/Hobimu"}
            placeholderTextColor={"#B2B5BF"}
            underlineColorAndroid="transparent"
            onChangeText={(val) => this.updateText(val, item.key)}
          />
          <TouchableOpacity
            style={Style.btnRemove}
            onPress={() => this.removeTextViewHobi(item.key)}
          >
            <Icon name={"ios-remove-circle"} size={26} color={"#FF3737"} />
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={Style.headerText}>Registration</Text>
              </View>
            </View>

            <View style={Style.ContainerViewHorizontal}>
              <ScrollView
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity
                  style={Style.buttonBlank}
                  onPress={() => navigation.navigate("RegisDataSiswa")}
                >
                  <Text style={Style.textNormalGrey}>Data Siswa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Style.buttonBlank}
                  onPress={() => navigation.navigate("RegisDataWali")}
                >
                  <Text style={Style.textNormalGrey}>Data Wali</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.buttonBlueActive}>
                  <Text style={Style.textNormalWhite}>Hobi/Minat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Style.buttonBlank}
                  onPress={() => navigation.navigate("RegisPrestasi")}
                >
                  <Text style={Style.textNormalGrey}>Prestasi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={Style.buttonBlank}
                  onPress={() => navigation.navigate("RegisDataFoto")}
                >
                  <Text style={Style.textNormalGrey}>Dokumen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.buttonBlank}>
                  <Text style={Style.textNormalGrey}>Selesai</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

            <View style={Style.ContainerViewBiasa}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={Style.textBold}>Hobi/Minat</Text>
                <TouchableOpacity
                  style={{
                    borderColor: "#000",
                    borderWidth: 1,
                    borderRadius: 8,
                  }}
                  onPress={this.addTextViewHobi}
                >
                  <View style={{ marginHorizontal: 1 }}>
                    <Icon name={"ios-add"} size={25} color={"#000"} />
                  </View>
                </TouchableOpacity>
              </View>

              <FlatList
                data={this.state.jumlahHobi}
                extraData={
                  this.state.selectedId // for single item
                }
                renderItem={this._renderItemHobi}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numColumn}
              />
            </View>
            <View style={Style.ContainerViewHorizontalSpace}>
              <TouchableOpacity
                style={Style.buttonBlank}
                onPress={() => navigation.navigate("RegisDataWali")}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon
                    name={"ios-chevron-back-sharp"}
                    size={20}
                    color={"#000"}
                  />
                  <Text style={Style.textNormalBlack}>Sebelumnya</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={Style.buttonBlank}
                onPress={() => navigation.navigate("RegisPrestasi")}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text style={Style.textNormalBlack}>Selanjutnya</Text>
                  <Icon
                    name={"ios-chevron-forward-sharp"}
                    size={20}
                    color={"#000"}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default RegisHobi;
