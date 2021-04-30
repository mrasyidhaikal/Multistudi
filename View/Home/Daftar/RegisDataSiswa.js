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
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Style from "./../../Style/Style";
import callAPI from "./../../../Controller/CallAPI";
const numColumn = 1;

class RegisDataSiswa extends React.Component {
  constructor() {
    super();

    this.state = {
      isiFormData : [],
      refreshing: false,

      display: 1,
      displayFormat: "DD MMM YYYY",
      dataSiswa: [],
      // Siswa
      nameSiswa: "",
      nickname: "",
      birthplace: "",
      BirthDateSiswa: "",
      Agama: "",
      kodeJurusan: "",
      jenisKelaminSiswa: "",
      address: "",
      mobileno: "",

      lastschool: "",
      addresslastschool: "",
      childno: "",
      totalsiblings: "",
      //wali 1
      DateBirthWali1: "",
      Wali1: "",
      agamaWali1: "",
      LastEdWali1: "",
      mguardname: "",
      mguardmobile: "",
      mguardaddress: "",
      mguardbirthplace: "",
      mguardoccupation: "",
      mguardoccupationaddress: "",
      //Wali 2
      DateBirthWali2: "",
      Wali2: "",
      agamaWali2: "Islam",
      LastEdWali2: "",
      fguardname: "",
      fguardmobile: "",
      fguardaddress: "",
      fguardbirthplace: "",
      fguardoccupation: "",
      fguardoccupationaddress: "",
      // hobi
      jumlahHobi: [{ hobbyid: 1, studentid: "", description: "" }],
      counterHobi: 0,
      // prestasi
      jumlahPrestasi: [
        { achievementid: 1, studentid: "", description: "", year: 0 },
      ],
      counterPrestasi: 0,
      // dokumen
      imageAyah: null,
      imageIbu: null,
      imageKK: null,
      imageIjazah: null,
      imageSkhun: null,
      // account
      reginfo_origin: "",
      pwd: "",
      repw: "",
      studentemail: "",

      //
      warnacheckAyah: "#B2B5BF",
      warnacheckIbu: "#B2B5BF",
      warnacheckKK: "#B2B5BF",
      warnacheckIjazah: "#B2B5BF",
      warnacheckSkhun: "#B2B5BF",
      ukuranstate: 25,
      dialogvisible: false,
      //List data
      majorlist: [],
      religionlist: [],
      genderlist: [],
      lasteducation: [],
      mrelationshiplist: [],
      activeGelombang: [],
      reginfo_originlist: [],
    };
  }

  _renderItemHobi = ({ item, index }) => {
    if (item.hobbyid == 1) {
      return (
        <View style={Style.inputContainer}>
          <TextInput
            style={Style.input}
            placeholder={"Tambah Minat/Hobimu"}
            placeholderTextColor={"#B2B5BF"}
            underlineColorAndroid="transparent"
            onChangeText={(val) =>
              this.addArrayDescriptionHobi(val, item.hobbyid)
            }
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
            onChangeText={(val) =>
              this.addArrayDescriptionHobi(val, item.hobbyid)
            }
          />
          <TouchableOpacity
            style={Style.btnRemove}
            onPress={() => this.removeTextViewHobi(item.hobbyid)}
          >
            <Icon name={"ios-remove-circle"} size={26} color={"#FF3737"} />
          </TouchableOpacity>
        </View>
      );
    }
  };
  _renderItemPrestasi = ({ item, index }) => {
    if (item.achievementid == 1) {
      return (
        <View style={Style.inputContainer}>
          <TextInput
            style={Style.input}
            placeholder={"Tambah Prestasimu"}
            placeholderTextColor={"#B2B5BF"}
            underlineColorAndroid="transparent"
            onChangeText={(val) =>
              this.addArrayDescriptionPrestasi(val, item.achievementid)
            }
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
            onChangeText={(val) =>
              this.addArrayDescriptionPrestasi(val, item.achievementid)
            }
          />
          <TouchableOpacity
            style={Style.btnRemove}
            onPress={() => this.removeTextViewPrestasi(item.achievementid)}
          >
            <Icon name={"ios-remove-circle"} size={26} color={"#FF3737"} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  addTextViewPrestasi = () => {
    var keys =
      this.state.jumlahHobi[this.state.counterPrestasi].achievementid + 1;
    var joined = this.state.jumlahHobi.concat({
      achievementid: keys,
      description: "",
    });
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
      var index = array.findIndex((obj) => obj.achievementid === count);
      array.splice(index, 1);
      this.setState({
        jumlahHobi: array,
        counterPrestasi: this.state.counterPrestasi - 1,
      });
    }
  };

  addTextViewHobi = () => {
    var keys = this.state.jumlahHobi[this.state.counterHobi].hobbyid + 1;
    var joined = this.state.jumlahHobi.concat({
      hobbyid: keys,
      description: "",
    });
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
      var index = array.findIndex((obj) => obj.hobbyid === count);
      array.splice(index, 1);
      this.setState({
        jumlahHobi: array,
        counterHobi: this.state.counterHobi - 1,
      });
    }
  };
  addArrayDescriptionHobi = (text, id) => {
    var array = this.state.jumlahHobi;
    var index = array.findIndex((obj) => obj.hobbyid === id);
    array[index] = { ...array[index], description: text };
    this.setState({ jumlahHobi: array });
  };
  addArrayDescriptionPrestasi = (text, id) => {
    var array = this.state.jumlahPrestasi;
    var index = array.findIndex((obj) => obj.achievementid === id);
    array[index] = { ...array[index], description: text };
    this.setState({ jumlahPrestasi: array });
  };

  handleConfirm = (date) => {
    this.setState({ BirthDateSiswa: date });
    this.setState({ visibility: false });
    this.setState({ TextInputDisableStatus: true });
  };
  handleConfirmWali1 = (date) => {
    this.setState({ DateBirthWali1: date });
    this.setState({ visibilityWali1: false });
    this.setState({ TextInputDisableStatus: true });
    console.log(date);
    console.log(this.state.DateBirthWali1);
  };
  handleConfirmWali2 = (date) => {
    this.setState({ DateBirthWali2: date });
    this.setState({ visibilityWali2: false });
    this.setState({ TextInputDisableStatus: true });
    console.log(date);
    console.log(this.state.DateBirthWali2);
  };

  onPressCancel = () => {
    this.setState({ visibility: false });
    this.setState({ TextInputDisableStatus: true });
  };

  onPressCancelWali1 = () => {
    this.setState({ visibilityWali1: false });
    this.setState({ TextInputDisableStatus: true });
  };

  onPressCancelWali2 = () => {
    this.setState({ visibilityWali2: false });
    this.setState({ TextInputDisableStatus: true });
  };
  onPressButton = () => {
    this.setState({ visibility: true });
    this.setState({ TextInputDisableStatus: false });
  };
  onPressButtonWali1 = () => {
    this.setState({ visibilityWali1: true });
    this.setState({ TextInputDisableStatus: false });
  };
  onPressButtonWali2 = () => {
    this.setState({ visibilityWali2: true });
    this.setState({ TextInputDisableStatus: false });
  };
  handleTitle = (display) => {
    if (display === 1) return "Data Diri";
    if (display === 2) return "Data Orang Tua/Wali 1";
    if (display === 3) return "Hobi/Minat";
    if (display === 4) return "Prestasi";
    if (display === 5) return "Dokumen";
    if (display === 6) return "Silahkan Lengkapi informasi login anda";
  };

  handlePress = (e) => {
    if (this.state.display >= 6) {
      return;
    }
    this.setState({ display: this.state.display + 1 });
  };
  showDialog = () => {
    this.setState({ dialogvisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogvisible: false });
  };
  pickImage = async (type) => {
    //File
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      if (type === "Ayah") {
        this.setState({ imageAyah: result.uri });
        this.setState({ warnacheckAyah: "#06BFAD" });
      }
      if (type === "Ibu") {
        this.setState({ imageIbu: result.uri });
        this.setState({ warnacheckIbu: "#06BFAD" });
      }
      if (type === "KK") {
        this.setState({ imageKK: result.uri });
        this.setState({ warnacheckKK: "#06BFAD" });
      }
      if (type === "Ijazah") {
        this.setState({ imageIjazah: result.uri });
        this.setState({ warnacheckIjazah: "#06BFAD" });
      }
      if (type === "SKHUN") {
        this.setState({ imageSkhun: result.uri });
        this.setState({ warnacheckSkhun: "#06BFAD" });
      }
    }
  };

  componentWillUnmount = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };
  componentDidMount = async () => {
    this.getRegistrationData();
  };
  // API

  getRegistrationData = async () => {
    const url = `http://104.248.156.113:8025/api/v1/AppAccount/GetDataRegister`;
    const response = await callAPI.getData(url);
    const { data } = response;

    this.setState({
      dataSiswa: data,
      majorlist: data.majorlist,
      religionlist: data.religionlist,
      genderlist: data.genderlist,
      lasteducation: data.meducationlist,
      mrelationshiplist: data.mrelationshiplist,
      activeGelombang: data.activeGelombang,
      reginfo_originlist: data.reginfo_originlist,
    });
    //console.log(this.state.dataSiswa.majorlist);
  };

  onSubmitData = async () => {
    let url = "https://104.248.156.113:8025/api/v1/AppAccount/SaveRegister";

    let formData = new FormData();
    formData.append("prstudentid", "");
    formData.append("studentid", "");
    formData.append("roomid", "");
    formData.append("nisn", "");
    formData.append("nrs", "");
    formData.append("majorid", this.state.kodeJurusan);
    formData.append("name", this.state.nameSiswa);
    formData.append("nickname", this.state.nickname);
    formData.append("gender", this.state.jenisKelaminSiswa);
    formData.append("birthplace", this.state.birthplace);
    formData.append("birthdate", this.state.BirthDateSiswa);
    formData.append("registerdate", "");
    formData.append("birthdate_tgl", 0);
    formData.append("birthdate_month", "");
    formData.append("birthdate_year", 0);
    formData.append("religionid", this.state.Agama);
    formData.append("address", this.state.address);
    formData.append("mobileno", this.state.mobileno);
    formData.append("lastschool", this.state.lastschool);
    formData.append("addresslastschool", this.state.addresslastschool);
    formData.append("childno", this.state.childno);
    formData.append("totalsiblings", this.state.totalsiblings);
    formData.append("uniformsize", "");
    formData.append("homedistance", 0);
    formData.append("transport", "");

    // wali 1
    formData.append("mguardname", this.state.mguardname);
    formData.append("mguardreligion", this.state.agamaWali1);
    formData.append("mguardbirthplace", this.state.mguardbirthplace);
    formData.append("mguardbirthdate", this.state.DateBirthWali1);
    formData.append("mguardbirthdate_tgl", 0);
    formData.append("mguardbirthdate_month", "");
    formData.append("mguardbirthdate_year", 0);
    formData.append("mguardeducationid", this.state.LastEdWali1);
    formData.append("mguardoccupation", this.state.mguardoccupation);
    formData.append(
      "mguardoccupationaddress",
      this.state.mguardoccupationaddress
    );
    formData.append("mguardaddress", this.state.mguardaddress);
    formData.append("mguardmobile", this.state.mguardmobile);
    formData.append("mguardrelationshipid", this.state.Wali1);

    //wali 2
    formData.append("fguardname", this.state.fguardname);
    formData.append("fguardreligion", this.state.agamaWali2);
    formData.append("fguardbirthplace", this.state.fguardbirthplace);
    formData.append("fguardbirthdate", this.state.DateBirthWali2);
    formData.append("fguardbirthdate_tgl", 0);
    formData.append("fguardbirthdate_month", "");
    formData.append("fguardbirthdate_year", 0);
    formData.append("fguardeducationid", this.state.LastEdWali2);
    formData.append("fguardoccupation", this.state.fguardoccupation);
    formData.append(  
      "fguardoccupationaddress",
      this.state.fguardoccupationaddress
    );
    formData.append("fguardaddress", this.state.fguardaddress);
    formData.append("fguardmobile", this.state.fguardmobile);
    formData.append("fguardrelationshipid", this.state.Wali2);
    //
    formData.append("spp", null);
    formData.append("studentemail", this.state.studentemail);
    // 
    formData.append("uname", this.state.studentemail);
    formData.append("pwd", this.state.pwd);
    formData.append("repw", this.state.repw);
    formData.append("reginfo_origin", this.state.reginfo_origin);
    formData.append("reginfo_originlist", this.state.reginfo_originlist);
    formData.append("reginfo_origin_other", "");
    formData.append("hobbies", this.state.jumlahHobi);
    formData.append("achievement", this.state.jumlahPrestasi);
    formData.append("roomlist", []);
    formData.append("majorlist", this.state.majorlist);
    formData.append("genderlist", this.state.genderlist);
    formData.append("religionlist", this.state.religionlist);
    formData.append("meducationlist", this.state.lasteducation);
    formData.append("mrelationshiplist", this.state.mrelationshiplist);
    formData.append("mreligionlist", this.state.religionlist);
    formData.append("feducationlist", this.state.lasteducation);
    formData.append("frelationshiplist", this.state.mrelationshiplist);
    formData.append("freligionlist", this.state.religionlist);
    formData.append("monthList", []);
    formData.append("uniformList", []);
    formData.append("schoolyearid", this.state.dataSiswa.schoolyearid);
    formData.append("gelombangdetailid", "");
    formData.append(
      "activeGelombang.gelombangdetailid",
      this.state.activeGelombang.gelombangdetailid
    );
    formData.append(
      "activeGelombang.gelombangcode",
      this.state.activeGelombang.gelombangcode
    );
    formData.append(
      "activeGelombang.gelombangname",
      this.state.activeGelombang.gelombangname
    );
    formData.append(
      "activeGelombang.schoolyearid",
      this.state.activeGelombang.schoolyearid
    );
    formData.append(
      "activeGelombang.tahunajaran",
      this.state.activeGelombang.tahunajaran
    );

    // //Image
    // let coba = {
    //   uri: this.state.imageKK,
    //   type: "image/jpeg",
    //   name: "imagename.jpg",
    // };
    // const base64 = await FileSystem.readAsStringAsync(this.state.imageKK, {
    //   encoding: "base64",
    // });
    // console.log(base64);
    formData.append("docsupport", null);
    // formData.append("studentid", this.state.dataSiswa.studentid);
    // formData.append("prstudentid", null);
    // formData.append("description", null);
    // formData.append("docfile", base64);
    // formData.append("filedata", base64);

    formData.append("docsupportlist", "");

    const data = await callAPI.postAPIFormData(url, formData);
    this.setState({ isiFormData: formData });
    // console.log(data);
    
    console.log(JSON.stringify(isiFormData));

  };
  render() {
    const layer = 6;
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
                  value={this.state.dataSiswa.studentid}
                />
                <TextInput
                  style={Style.input}
                  placeholder={"isi form data"}
                  editable={false}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  value={this.state.isiFormData.toString()}
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
                    {this.state.majorlist.map((item, index) => (
                      <Picker.Item label={item.text} value={item.value} />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Nama Lengkap"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onChangeText={(val) => this.setState({ nameSiswa: val })}
                />
              </View>
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Nama Panggilan"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onChangeText={(val) => this.setState({ nickname: val })}
                />
              </View>

              <View style={[Style.input, Style.inputContainer]}>
                <Picker
                  mode="dropdown"
                  style={{ margin: -4 }}
                  selectedValue={this.state.jenisKelaminSiswa}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ jenisKelaminSiswa: itemValue })
                  }
                >
                  {/* <Picker.Item label="-Pilih Jurusan-" value="" enabled={false} /> */}
                  {this.state.genderlist.map((item, index) => (
                    <Picker.Item label={item.text} value={item.value} />
                  ))}
                </Picker>
              </View>
              <View style={Style.inputContainer}>
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
                    {this.state.religionlist.map((item, index) => (
                      <Picker.Item label={item.text} value={item.value} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Tempat Lahir"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onChangeText={(val) => this.setState({ birthplace: val })}
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
                    this.state.BirthDateSiswa
                      ? moment(this.state.BirthDateSiswa).format(
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
                  onChangeText={(val) => this.setState({ address: val })}
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
                  onChangeText={(val) => this.setState({ mobileno: val })}
                />
              </View>

              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Sekolah Asal"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onChangeText={(val) => this.setState({ lastschool: val })}
                />
              </View>
              <View style={Style.inputContainer}>
                <TextInput
                  style={Style.input}
                  placeholder={"Alamat Sekolah Asal"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onChangeText={(val) =>
                    this.setState({ addresslastschool: val })
                  }
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
                  onChangeText={(val) => this.setState({ childno: val })}
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
                  onChangeText={(val) => this.setState({ totalsiblings: val })}
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
                    {this.state.mrelationshiplist.map((item, index) => (
                      <Picker.Item label={item.text} value={item.value} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  placeholder={"Nama Wali"}
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onChangeText={(val) => this.setState({ mguardname: val })}
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
                  onChangeText={(val) => this.setState({ mguardmobile: val })}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Alamat Tempat Tinggal"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onChangeText={(val) => this.setState({ mguardaddress: val })}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Tempat Lahir"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onChangeText={(val) =>
                    this.setState({ mguardbirthplace: val })
                  }
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
                  onTouchStart={this.onPressButtonWali1}
                  value={
                    this.state.DateBirthWali1
                      ? moment(this.state.DateBirthWali1).format(
                          this.state.displayFormat
                        )
                      : ""
                  }
                />

                <DateTimePickerModal
                  mode="date"
                  isVisible={this.state.visibilityWali1}
                  onConfirm={this.handleConfirmWali1}
                  onCancel={this.onPressCancelWali1}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <Picker
                  mode="dropdown"
                  style={{ margin: -4 }}
                  selectedValue={this.state.LastEdWali1}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ LastEdWali1: itemValue })
                  }
                >
                  {/* <Picker.Item label="-Pilih Jurusan-" value="" enabled={false} /> */}
                  {this.state.lasteducation.map((item, index) => (
                    <Picker.Item label={item.text} value={item.value} />
                  ))}
                </Picker>
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
                    {this.state.religionlist.map((item, index) => (
                      <Picker.Item label={item.text} value={item.value} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Pekerjaan"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onChangeText={(val) =>
                    this.setState({ mguardoccupation: val })
                  }
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Alamat Pekerjaan"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onChangeText={(val) =>
                    this.setState({ mguardoccupationaddress: val })
                  }
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
                    {this.state.mrelationshiplist.map((item, index) => (
                      <Picker.Item label={item.text} value={item.value} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Nama Wali"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onChangeText={(val) => this.setState({ fguardname: val })}
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
                  onChangeText={(val) => this.setState({ fguardmobile: val })}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Alamat Tempat Tinggal"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onChangeText={(val) => this.setState({ fguardaddress: val })}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Tempat Lahir"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onChangeText={(val) =>
                    this.setState({ fguardbirthplace: val })
                  }
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
                  onTouchStart={this.onPressButtonWali2}
                  value={
                    this.state.DateBirthWali2
                      ? moment(this.state.DateBirthWali2).format(
                          this.state.displayFormat
                        )
                      : ""
                  }
                />

                <DateTimePickerModal
                  mode="date"
                  isVisible={this.state.visibilityWali2}
                  onConfirm={this.handleConfirmWali2}
                  onCancel={this.onPressCancelWali1}
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <Picker
                  mode="dropdown"
                  style={{ margin: -4 }}
                  selectedValue={this.state.LastEdWali2}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ LastEdWali2: itemValue })
                  }
                >
                  {/* <Picker.Item label="-Pilih Jurusan-" value="" enabled={false} /> */}
                  {this.state.lasteducation.map((item, index) => (
                    <Picker.Item label={item.text} value={item.value} />
                  ))}
                </Picker>
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
                    {this.state.religionlist.map((item, index) => (
                      <Picker.Item label={item.text} value={item.value} />
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Pekerjaan"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onChangeText={(val) =>
                    this.setState({ fguardoccupation: val })
                  }
                />
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <TextInput
                  style={{ marginTop: 7, fontSize: 16 }}
                  placeholder={"Alamat Pekerjaan"}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onChangeText={(val) =>
                    this.setState({ fguardoccupationaddress: val })
                  }
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
            <View
              style={[
                Style.ContainerViewBiasa,
                { display: this.state.display === 5 ? "flex" : "none" },
              ]}
            >
              <View style={Style.inputContainer}>
                <TouchableOpacity
                  style={Style.buttonDokumen}
                  onPress={() => this.pickImage("Ayah")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={Style.ContainerViewHorizontal}>
                      <View>
                        {this.state.imageAyah ? (
                          <View>
                            <Image
                              source={{ uri: this.state.imageAyah }}
                              style={{
                                width: 70,
                                height: 50,
                                borderRadius: 5,
                              }}
                            />
                          </View>
                        ) : (
                          <Icon
                            name={"images-outline"}
                            size={26}
                            color={"#B2B5BF"}
                          />
                        )}
                      </View>
                      <View style={{ marginLeft: 20, alignSelf: "center" }}>
                        <Text style={Style.textNormalBlack}>KTP Ayah</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        margin: this.state.ukuranstate,
                        alignSelf: "center",
                      }}
                    >
                      <Icon
                        name={"ios-checkmark-circle-sharp"}
                        size={26}
                        color={this.state.warnacheckAyah}
                        // color={"#06BFAD"}
                      />
                    </View>
                  </View>
                </TouchableOpacity>

                {/* KTP IBU */}
                <TouchableOpacity
                  style={Style.buttonDokumen}
                  onPress={() => this.pickImage("Ibu")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={Style.ContainerViewHorizontal}>
                      <View>
                        {this.state.imageIbu ? (
                          <View>
                            <Image
                              source={{ uri: this.state.imageIbu }}
                              style={{
                                width: 70,
                                height: 50,
                                borderRadius: 5,
                              }}
                            />
                          </View>
                        ) : (
                          <Icon
                            name={"images-outline"}
                            size={25}
                            color={"#B2B5BF"}
                          />
                        )}
                      </View>
                      <View style={{ marginLeft: 20, alignSelf: "center" }}>
                        <Text style={Style.textNormalBlack}>KTP Ibu</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        margin: this.state.ukuranstate,
                        alignSelf: "center",
                      }}
                    >
                      <Icon
                        name={"ios-checkmark-circle-sharp"}
                        size={26}
                        color={this.state.warnacheckIbu}
                        // color={"#06BFAD"}
                      />
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Kartu Keluarga */}
                <TouchableOpacity
                  style={Style.buttonDokumen}
                  onPress={() => this.pickImage("KK")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={Style.ContainerViewHorizontal}>
                      <View>
                        {this.state.imageKK ? (
                          <View>
                            <Image
                              source={{ uri: this.state.imageKK }}
                              style={{
                                width: 70,
                                height: 50,
                                borderRadius: 5,
                              }}
                            />
                          </View>
                        ) : (
                          <Icon
                            name={"images-outline"}
                            size={25}
                            color={"#B2B5BF"}
                          />
                        )}
                      </View>
                      <View style={{ marginLeft: 20, alignSelf: "center" }}>
                        <Text style={Style.textNormalBlack}>
                          Kartu Keluarga
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        margin: this.state.ukuranstate,
                        alignSelf: "center",
                      }}
                    >
                      <Icon
                        name={"ios-checkmark-circle-sharp"}
                        size={26}
                        color={this.state.warnacheckKK}
                        // color={"#06BFAD"}
                      />
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Ijazah */}
                <TouchableOpacity
                  style={Style.buttonDokumen}
                  onPress={() => this.pickImage("Ijazah")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={Style.ContainerViewHorizontal}>
                      <View>
                        {this.state.imageIjazah ? (
                          <View>
                            <Image
                              source={{ uri: this.state.imageIjazah }}
                              style={{
                                width: 70,
                                height: 50,
                                borderRadius: 5,
                              }}
                            />
                          </View>
                        ) : (
                          <Icon
                            name={"images-outline"}
                            size={25}
                            color={"#B2B5BF"}
                          />
                        )}
                      </View>
                      <View style={{ marginLeft: 20, alignSelf: "center" }}>
                        <Text style={Style.textNormalBlack}>Ijazah</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        margin: this.state.ukuranstate,
                        alignSelf: "center",
                      }}
                    >
                      <Icon
                        name={"ios-checkmark-circle-sharp"}
                        size={26}
                        color={this.state.warnacheckIjazah}
                        // color={"#06BFAD"}
                      />
                    </View>
                  </View>
                </TouchableOpacity>

                {/* SKHUN */}
                <TouchableOpacity
                  style={Style.buttonDokumen}
                  onPress={() => this.pickImage("SKHUN")}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={Style.ContainerViewHorizontal}>
                      <View>
                        {this.state.imageSkhun ? (
                          <View>
                            <Image
                              source={{ uri: this.state.imageSkhun }}
                              style={{
                                width: 70,
                                height: 50,
                                borderRadius: 5,
                              }}
                            />
                          </View>
                        ) : (
                          <Icon
                            name={"images-outline"}
                            size={25}
                            color={"#B2B5BF"}
                          />
                        )}
                      </View>
                      <View style={{ marginLeft: 20, alignSelf: "center" }}>
                        <Text style={Style.textNormalBlack}>SKHUN</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        margin: this.state.ukuranstate,
                        alignSelf: "center",
                      }}
                    >
                      <Icon
                        name={"ios-checkmark-circle-sharp"}
                        size={26}
                        color={this.state.warnacheckSkhun}
                        // color={"#06BFAD"}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {
              // Layer 6
            }
            <View
              style={[
                Style.ContainerViewBiasa,
                { display: this.state.display === 6 ? "flex" : "none" },
              ]}
            >
              <TouchableOpacity onPress={() => this.onSubmitData()}>
                <Text style={Style.textBold}>asd</Text>
              </TouchableOpacity>
              <View style={Style.inputContainer}>
                <Text style={Style.textNormalBlack}>Email</Text>
                <View style={Style.input}>
                  <TextInput
                    style={{ marginTop: 7, fontSize: 16 }}
                    placeholder={"Email"}
                    placeholderTextColor={"#B2B5BF"}
                    underlineColorAndroid="transparent"
                    onChangeText={(val) => this.setState({ studentemail: val })}
                  />
                </View>
              </View>
              <View style={Style.inputContainer}>
                <Text style={Style.textNormalBlack}>Kata Sandi</Text>
                <View style={Style.input}>
                  <TextInput
                    style={{ marginTop: 7, fontSize: 16 }}
                    placeholder={"Sandi"}
                    placeholderTextColor={"#B2B5BF"}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    onChangeText={(val) => this.setState({ pwd: val })}
                  />
                </View>
              </View>
              <View style={Style.inputContainer}>
                <Text style={Style.textNormalBlack}>Ketik ulang Sandi</Text>
                <View style={Style.input}>
                  <TextInput
                    style={{ marginTop: 7, fontSize: 16 }}
                    placeholder={"Konfirmasi Sandi"}
                    placeholderTextColor={"#B2B5BF"}
                    underlineColorAndroid="transparent"
                    secureTextEntry={true}
                    onChangeText={(val) => this.setState({ repw: val })}
                  />
                </View>
              </View>
              <View style={Style.inputContainer}>
                <Text style={Style.textBold}>
                  Silahkan Masukkan Informasi pendukung disini
                </Text>
              </View>
              <View style={Style.inputContainer}>
                <Text style={Style.textNormalBlack}>
                  Sekolah SMK MHS diketahui dari
                </Text>
              </View>
              <View style={[Style.inputContainer, Style.input]}>
                <Picker
                  mode="dropdown"
                  style={{ margin: -4 }}
                  selectedValue={this.state.reginfo_origin}
                  placeholderTextColor={"#B2B5BF"}
                  underlineColorAndroid="transparent"
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ reginfo_origin: itemValue })
                  }
                >
                  {this.state.reginfo_originlist.map((item, index) => (
                    <Picker.Item
                      label={item.description}
                      value={item.reginfo_originid}
                    />
                  ))}
                </Picker>
              </View>
            </View>

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
