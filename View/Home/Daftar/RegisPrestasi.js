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
const jumlahHobi = [{ key: 1, textHobi: "asdas" }];
class RegisPrestasi extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      jumlahHobi: [{ key: 1, textHobi: "asd" }],
      counterPrestasi: 0,
    };
  }

  componentDidMount() {
    // setTimeout(() => {
    //   console.log('masuk cok')
    //   this.scrollView.scrollTo({y: 100});
    // }, 0);
  }

  addTextViewPrestasi = () => {
    var keys = this.state.jumlahHobi[this.state.counterPrestasi].key + 1;
    var joined = this.state.jumlahHobi.concat({ key: keys, textHobi: "ads" });
    this.setState({
      jumlahHobi: joined,
      counterPrestasi: this.state.counterPrestasi + 1,
    });
  };
  removeTextViewPrestasi = (count) => {
    if (this.state.counterPrestasi <= 0) {
      console.log("gabisa hapus");
    } else {
      var array = this.state.jumlahHobi;
      var index = array.findIndex((obj) => obj.key === count);
      array.splice(index, 1);
      this.setState({
        jumlahHobi: array,
        counterPrestasi: this.state.counterPrestasi - 1,
      });
    }
  };

  _renderItemPrestasi = ({ item, index }) => {
    if (item.key == 1) {
      return (
        <View style={Style.inputContainer}>
          <TextInput
            style={Style.input}
            placeholder={"Tambah Prestasimu"}
            placeholderTextColor={"#B2B5BF"}
            underlineColorAndroid="transparent"
            // onChangeText={val => this.setState({email:val})}
          />
        </View>
      );
    } else {
      return (
        <View style={Style.inputContainer}>
          <TextInput
            style={Style.input}
            placeholder={"Tambah Prestasimu"}
            placeholderTextColor={"#B2B5BF"}
            underlineColorAndroid="transparent"
            // onChangeText={val => this.setState({email:val})}
          />
          <TouchableOpacity
            style={Style.btnRemove}
            onPress={() => this.removeTextViewPrestasi(item.key)}
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
                <TouchableOpacity
                  style={Style.buttonBlank}
                  onPress={() => navigation.navigate("RegisHobi")}
                >
                  <Text style={Style.textNormalGrey}>Hobi/Minat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.buttonBlueActive}>
                  <Text style={Style.textNormalWhite}>Prestasi</Text>
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
                <Text style={Style.textBold}>Prestasi</Text>
                <TouchableOpacity
                  style={{
                    borderColor: "#000",
                    borderWidth: 1,
                    borderRadius: 8,
                  }}
                  onPress={this.addTextViewPrestasi}
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
                renderItem={this._renderItemPrestasi}
                keyExtractor={(item, index) => index.toString()}
                numColumns={numColumn}
              />
            </View>
            <View style={Style.ContainerViewHorizontalSpace}>
              <TouchableOpacity
                style={Style.buttonBlank}
                onPress={() => navigation.navigate("RegisHobi")}
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
                onPress={() => navigation.navigate("RegisDataFoto")}
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

export default RegisPrestasi;
