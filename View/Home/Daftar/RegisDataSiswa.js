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

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-community/picker";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Style from "./../../Style/Style";

const numColumn = 1;
class RegisDataSiswa extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      kodeJurusan: "",
      Agama: "",
      display: 1,
      displayFormat: "DD MMM YYYY",
      DateDisplay: "",
      DateDisplay2: "",
      DateDisplay3: "",
      Wali1: "Ayah",
      Wali2: "Ibu",
      agamaWali1: "Islam",
      agamaWali2: "Islam",
      jumlahHobi: [{ key: 1, textHobi: "asd" }],
      counterHobi: 0,
      jumlahPrestasi: [{ key: 1, textHobi: "asd" }],
      counterPrestasi: 0,
    };
  }

  _renderItemHobi = ({ item, index }) => {
    if (item.key == 1) {
      return (
        <View style={Style.inputContainer}>
          <TextInput
            style={Style.input}
            placeholder={"Tambah Minat/Hobimu"}
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
            placeholder={"Tambah Minat/Hobimu"}
            placeholderTextColor={"#B2B5BF"}
            underlineColorAndroid="transparent"
            // onChangeText={val => this.setState({email:val})}
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

  addTextViewHobi = () => {
    var keys = this.state.jumlahHobi[this.state.counterHobi].key + 1;
    var joined = this.state.jumlahHobi.concat({ key: keys, textHobi: "ads" });
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
  handleConfirm = (date) => {
    this.setState({ DateDisplay: date });
    this.setState({ visibility: false });
    this.setState({ TextInputDisableStatus: true });
  };
  onPressCancel = () => {
    this.setState({ visibility: false });
    this.setState({ TextInputDisableStatus: true });
  };
  onPressButton = () => {
    this.setState({ visibility: true });
    this.setState({ TextInputDisableStatus: false });
  };
  handleTitle = (display) => {
    if (display === 1) return "Data Diri";
    if (display === 2) return "Data Orang Tua/Wali 1";
    if (display === 3) return "Hobi/Minat";
    if (display === 4) return "Prestasi";
    if (display === 5) return "Dokumen";
  };

  handlePress = (e) => {
    if (this.state.display >= 6) {
      return;
    }
    this.setState({ display: this.state.display + 1 });
  };

  render() {
    const layer = 5;
    const { navigation } = this.props;
    return (
      <View style={Style.container}>
        <SafeAreaView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <View style={Style.NavBackContainer}>
              <TouchableOpacity
                onPress={() => {
                  this.state.display === 1
                    ? navigation.goBack()
                    : this.setState({ display: this.state.display - 1 });
                }}
              >
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
                <Text style={Style.headerText}>Registrasi</Text>
              </View>
            </View>

            <View style={Style.ContainerViewHorizontal}>
              <ScrollView
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity
                  style={
                    this.state.display === 1
                      ? Style.buttonBlueActive
                      : Style.buttonBlank
                  }
                >
                  <Text
                    style={
                      this.state.display === 1
                        ? Style.textNormalWhite
                        : Style.textNormalGrey
                    }
                  >
                    Data Siswa
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    this.state.display === 2
                      ? Style.buttonBlueActive
                      : Style.buttonBlank
                  }
                >
                  <Text
                    style={
                      this.state.display === 2
                        ? Style.textNormalWhite
                        : Style.textNormalGrey
                    }
                  >
                    Data Wali
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    this.state.display === 3
                      ? Style.buttonBlueActive
                      : Style.buttonBlank
                  }
                >
                  <Text
                    style={
                      this.state.display === 3
                        ? Style.textNormalWhite
                        : Style.textNormalGrey
                    }
                  >
                    Hobi/Minat
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={
                    this.state.display === 4
                      ? Style.buttonBlueActive
                      : Style.buttonBlank
                  }
                >
                  <Text
                    style={
                      this.state.display === 4
                        ? Style.textNormalWhite
                        : Style.textNormalGrey
                    }
                  >
                    Prestasi
                  </Text>
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
              <Text style={Style.textBold}>
                {this.handleTitle(this.state.display)}
              </Text>
            </View>
            {
              // layer 1
            }
            <View
              style={[
                Style.ContainerViewBiasa,
                { display: this.state.display === 1 ? "flex" : "none" },
              ]}
            >
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Nomor Pendaftaran"}
                  editable={false}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  value="MHS-08729021"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={Style.inputContainer}>
                <View style={Style.input}>
                  <Picker
                    mode="dropdown"
                    style={{ margin: -4 }}
                    selectedValue={this.state.kodeJurusan}
                    placeholder="Pilih Jurusan"
                    placeholderTextColor={"#B2B5BF"}
                    underlineColorAndroid="transparent"
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ kodeJurusan: itemValue })
                    }
                  >
                    <Picker.Item label="Rekayasa Perangkat Lunak" value="rpl" />
                    <Picker.Item
                      label="Teknik Komputer dan Jaringan"
                      value="tkj"
                    />
                    <Picker.Item label="Akuntansi" value="akuntansi" />
                    <Picker.Item label="Seni Tari" value="senitari" />
                    <Picker.Item label="Multimedia" value="multimedia" />
                  </Picker>
                </View>
              </View>
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Nama Lengkap"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Nama Panggilan"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Jenis Kelamin"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={Style.inputContainer}>
                {/* <TextInput
                    style={Style.input}
                    placeholder={'Agama'}
                    placeholderTextColor={'#B2B5BF'}
                    underlineColorAndroid='transparent'
                   // onChangeText={val => this.setState({email:val})}
                /> */}

                <View style={Style.input}>
                  <Picker
                    mode="dropdown"
                    style={{ margin: -4 }}
                    selectedValue={this.state.Agama}
                    placeholderTextColor={"#B2B5BF"}
                    underlineColorAndroid="transparent"
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ Agama: itemValue })
                    }
                  >
                    {/* <Picker.Item label="-Pilih Jurusan-" value="" enabled={false} /> */}
                    <Picker.Item label="Islam" value="islam" />
                    <Picker.Item label="Kristen" value="kristen" />
                    <Picker.Item label="Katolik" value="katolik" />
                    <Picker.Item label="Buddha" value="buddhas" />
                    <Picker.Item label="Hindu" value="hindu" />
                  </Picker>
                </View>
              </View>
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Tempat Lahir"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Tanggal Lahir"}
                  placeholderTextColor={"#666872"}
                  underlineColorAndroid="transparent"
                  editable={this.state.TextInputDisableStatus}
                  pointerEvents="none"
                  selectTextOnFocus={false}
                  onTouchStart={this.onPressButton}
                  value={
                    this.state.DateDisplay
                      ? moment(this.state.DateDisplay).format(
                          this.state.displayFormat
                        )
                      : ""
                  }
                />

                <DateTimePickerModal
                  mode="date"
                  isVisible={this.state.visibility}
                  onConfirm={this.handleConfirm}
                  onCancel={this.onPressCancel}
                />
              </View>
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Alamat"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  keyboardType="number-pad"
                  placeholder={"Nomor HP"}
                  maxLength={13}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Email"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Sekolah Asal"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Alamat Sekolah Asal"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  keyboardType="number-pad"
                  placeholder={"Anak No."}
                  maxLength={2}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Jumlah Saudara"}
                  maxLength={2}
                  keyboardType="number-pad"
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
            </View>

            {
              // Layer 2
            }
            <View
              style={[
                Style.ContainerViewBiasa,
                { display: this.state.display === 2 ? "flex" : "none" },
              ]}
            >
              <View style={Style.inputContainer}>
                <View style={Style.input}>
                  <Picker
                    mode="dropdown"
                    style={{ margin: -4 }}
                    selectedValue={this.state.Wali1}
                    placeholderTextColor={"#B2B5BF"}
                    underlineColorAndroid="transparent"
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ Wali1: itemValue })
                    }
                  >
                    {/* <Picker.Item label="-Pilih Jurusan-" value="" enabled={false} /> */}
                    <Picker.Item label="Ayah" value="ayah" />
                    <Picker.Item label="Ibu" value="ibu" />
                    <Picker.Item label="Kakak" value="kakak" />
                    <Picker.Item label="Adik" value="adik" />
                    <Picker.Item label="Paman" value="paman" />
                    <Picker.Item label="Bibi" value="hindu" />
                    <Picker.Item label="Orang Tua Asuh" value="orangtuaasuh" />
                  </Picker>
                </View>
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  placeholder={"Nama Wali"}
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Nomor HP"}
                  maxLength={13}
                  keyboardType="number-pad"
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Alamat Tempat Tinggal"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Tempat Lahir"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Tanggal Lahir"}
                  placeholderTextColor={"#666872"}
                  underlineColorAndroid="transparent"
                  editable={this.state.TextInputDisableStatus}
                  pointerEvents="none"
                  selectTextOnFocus={false}
                  onTouchStart={this.onPressButton}
                  value={
                    this.state.DateDisplay3
                      ? moment(this.state.DateDisplay3).format(
                          this.state.displayFormat
                        )
                      : ""
                  }
                />

                <DateTimePickerModal
                  mode="date"
                  isVisible={this.state.visibility}
                  onConfirm={this.handleConfirm}
                  onCancel={this.onPressCancel}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Pendidikan"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={Style.inputContainer}>
                <View style={Style.input}>
                  <Picker
                    mode="dropdown"
                    style={{ margin: -4 }}
                    selectedValue={this.state.agamaWali1}
                    placeholderTextColor={"#B2B5BF"}
                    underlineColorAndroid="transparent"
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ agamaWali1: itemValue })
                    }
                  >
                    {/* <Picker.Item label="-Pilih Jurusan-" value="" enabled={false} /> */}
                    <Picker.Item label="Islam" value="islam" />
                    <Picker.Item label="Kristen" value="kristen" />
                    <Picker.Item label="Katolik" value="katolik" />
                    <Picker.Item label="Buddha" value="buddhas" />
                    <Picker.Item label="Hindu" value="hindu" />
                  </Picker>
                </View>
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Pekerjaan"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Alamat Pekerjaan"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>

              <View style={Style.inputContainer}>
                <Text style={Style.textBold}>Data Orang Tua/Wali 2</Text>
              </View>
              <View style={Style.inputContainer}>
                <View style={Style.input}>
                  <Picker
                    mode="dropdown"
                    style={{ margin: -4 }}
                    selectedValue={this.state.Wali2}
                    placeholderTextColor={"#B2B5BF"}
                    underlineColorAndroid="transparent"
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ Wali2: itemValue })
                    }
                  >
                    {/* <Picker.Item label="-Pilih Jurusan-" value="" enabled={false} /> */}
                    <Picker.Item label="Ayah" value="ayah" />
                    <Picker.Item label="Ibu" value="ibu" />
                    <Picker.Item label="Kakak" value="kakak" />
                    <Picker.Item label="Adik" value="adik" />
                    <Picker.Item label="Paman" value="paman" />
                    <Picker.Item label="Bibi" value="hindu" />
                    <Picker.Item label="Orang Tua Asuh" value="orangtuaasuh" />
                  </Picker>
                </View>
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Nama Wali"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Nomor HP"}
                  maxLength={13}
                  keyboardType="number-pad"
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Alamat Tempat Tinggal"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Tempat Lahir"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Tanggal Lahir"}
                  placeholderTextColor={"#666872"}
                  underlineColorAndroid="transparent"
                  editable={this.state.TextInputDisableStatus}
                  pointerEvents="none"
                  selectTextOnFocus={false}
                  onTouchStart={this.onPressButton2}
                  value={
                    this.state.DateDisplay2
                      ? moment(this.state.DateDisplay2).format(
                          this.state.displayFormat
                        )
                      : ""
                  }
                />

                <DateTimePickerModal
                  mode="date"
                  isVisible={this.state.visibility2}
                  onConfirm={this.handleConfirm2}
                  onCancel={this.onPressCancel2}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Pendidikan"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={Style.inputContainer}>
                <View style={Style.input}>
                  <Picker
                    mode="dropdown"
                    style={{ margin: -4 }}
                    selectedValue={this.state.agamaWali2}
                    placeholderTextColor={"#B2B5BF"}
                    underlineColorAndroid="transparent"
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ agamaWali2: itemValue })
                    }
                  >
                    {/* <Picker.Item label="-Pilih Jurusan-" value="" enabled={false} /> */}
                    <Picker.Item label="Islam" value="islam" />
                    <Picker.Item label="Kristen" value="kristen" />
                    <Picker.Item label="Katolik" value="katolik" />
                    <Picker.Item label="Buddha" value="buddhas" />
                    <Picker.Item label="Hindu" value="hindu" />
                  </Picker>
                </View>
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Pekerjaan"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Alamat Pekerjaan"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  // onChangeText={val => this.setState({email:val})}
                />
              </View>
            </View>

            {
              // Layer 3
            }
            <View
              style={[
                Style.ContainerViewBiasa,
                { display: this.state.display === 3 ? "flex" : "none" },
              ]}
            >
              <TouchableOpacity
                style={{
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 8,
                  alignSelf: "flex-end",
                }}
                onPress={this.addTextViewHobi}
              >
                <View style={{ marginHorizontal: 1 }}>
                  <Icon name={"ios-add"} size={25} color={"#000"} />
                </View>
              </TouchableOpacity>

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

            {
              // Layer 4
            }
            <View
              style={[
                Style.ContainerViewBiasa,
                { display: this.state.display === 4 ? "flex" : "none" },
              ]}
            >
              <TouchableOpacity
                style={{
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 8,
                  alignSelf: "flex-end",
                }}
                onPress={this.addTextViewHobi}
              >
                <View style={{ marginHorizontal: 1 }}>
                  <Icon name={"ios-add"} size={25} color={"#000"} />
                </View>
              </TouchableOpacity>

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

            {
              // Layer 5
            }

            <View style={[Style.ContainerViewHorizontalSpace]}>
              <TouchableOpacity
                style={Style.buttonBlank}
                onPress={() => {
                  this.state.display === 1
                    ? navigation.goBack()
                    : this.setState({ display: this.state.display - 1 });
                }}
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
                onPress={this.handlePress}
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
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      </View>
    );
  }
}

export default RegisDataSiswa;
