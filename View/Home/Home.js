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
import CallAPI from "../../Controller/CallAPI";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CallAsyncData from "../../Controller/CallAsyncData";

import moment from "moment";
import Style, { black, oren, white } from "./../Style/Style";
import PembayaranStyle from "./../Style/PembayranStyle";
import HomeStyle from "../Style/HomeStyle";
import { FlatList } from "react-native-gesture-handler";
import callAPI from "../../Controller/CallAPI";
import { DataTable } from "react-native-paper";
import styles from "./../Style/Style";

const { width: WIDTH } = Dimensions.get("window");
const slider = [
  {
    key: 1,
    image: require("./../../assets/banner.png"),
    linkStack: "RegisterNewSiswa",
    linkScren: "RegisDataSiswa",
  },
  {
    key: 2,
    image: require("./../../assets/banner2.png"),
    linkStack: "guruStacks",
    linkScren: "Guru",
  },
  {
    key: 3,
    image: require("./../../assets/banner3.png"),
    linkStack: "RegisterNewSiswa",
    linkScren: "RegisDataSiswa",
  },
];

const dummyMapel = [
  {
    image: require("./../../assets/iconMapel/ind.png"),
    color: "#FFAC7A",
    judul: "Bahasa Indonesia",
    style: HomeStyle.CardMapel,
    theme: "#fff",
  },
  {
    image: require("./../../assets/iconMapel/english.png"),
    color: "#06BFAD",
    judul: "Bahasa Inggris",
    style: HomeStyle.CardMapel,
    theme: "#fff",
  },
  {
    image: require("./../../assets/iconMapel/kimia.png"),
    color: "#3B77BE",
    judul: "Kimia",
    style: HomeStyle.CardMapel,
    theme: "#fff",
  },
  {
    image: require("./../../assets/iconMapel/math.png"),
    color: "#7772D6",
    judul: "Matematika",
    style: HomeStyle.CardMapel,
    theme: "#fff",
  },
];

const dummyProgramStudi = [
  {
    image: require("./../../assets/iconProgramStudi/akuntansi.png"),
    color: "#FBFBFF",
    judul: "Akuntansi",
    style: HomeStyle.CardProgramStudi,
    theme: "#000",
  },
  {
    image: require("./../../assets/iconProgramStudi/budaya.png"),
    color: "#FBFBFF",
    judul: "Art and Culture",
    style: HomeStyle.CardProgramStudi,
    theme: "#000",
  },
  {
    image: require("./../../assets/iconProgramStudi/multimedia.png"),
    color: "#FBFBFF",
    judul: "Multimedia",
    style: HomeStyle.CardProgramStudi,
    theme: "#000",
  },
  {
    image: require("./../../assets/iconProgramStudi/network.png"),
    color: "#FBFBFF",
    judul: "Teknik Komputer & Jaringan",
    style: HomeStyle.CardProgramStudi,
    theme: "#000",
  },
  {
    image: require("./../../assets/iconProgramStudi/software.png"),
    color: "#FBFBFF",
    judul: "Rekayasa Perangkat Lunak",
    style: HomeStyle.CardProgramStudi,
    theme: "#000",
  },
];
const dummyExcul = [
  {
    image: require("./../../assets/iconEskul/badminton.png"),
    color: "#FBFBFF",
    judul: "Badminton",
    style: HomeStyle.CardProgramStudi,
    theme: "#000",
  },
  {
    image: require("./../../assets/iconEskul/basket.png"),
    color: "#FBFBFF",
    judul: "Basket",
    style: HomeStyle.CardProgramStudi,
    theme: "#000",
  },
  {
    image: require("./../../assets/iconEskul/soccer.png"),
    color: "#FBFBFF",
    judul: "Futsal",
    style: HomeStyle.CardProgramStudi,
    theme: "#000",
  },
  {
    image: require("./../../assets/iconEskul/voli.png"),
    color: "#FBFBFF",
    judul: "Voli",
    style: HomeStyle.CardProgramStudi,
    theme: "#000",
  },
];

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
      dataprofile: [],
      regisData: [],
      SPPData: [],
      totalSPP: 0,
    };
  }

  getProfile = async () => {
    const token = await CallAsyncData.getData("token");
    const emailUser = await CallAsyncData.getData("email");
    const userName = await CallAsyncData.getData("name");
    const userMajor = await CallAsyncData.getData("major");
    const userClass = await CallAsyncData.getData("kelas");
    const userPhone = await CallAsyncData.getData("phone");
    const userBirth = await CallAsyncData.getData("tgllahir");
    const userAddress = await CallAsyncData.getData("address");
    const userStatus = await CallAsyncData.getData("status");
    const userPicture = await CallAsyncData.getData("fotoprofile");
    const userPicture2 = await CallAsyncData.getData("fotoprofile2");

    // Profile Data
    const profile = {
      Email: emailUser,
      Nama: userName,
      Jurusan: userMajor,
      Kelas: userClass,
      Alamat: userAddress,
      Handphone: userPhone,
      Tgllahir: moment(userBirth).format("DD MMM YYYY"),
      Status: userStatus,
      Picture: userPicture,
      Picture2: userPicture2,
    };

    this.setState({ dataprofile: profile });
    this.getDataRegistrasi();
    this.getDataPembayaranSPP();
    // console.log(this.state.dataprofile['Picture'])
  };

  componentDidMount() {
    this.getProfile();
  }

  loadFallBack() {
    // console.log('masuk loadFallBack')
    var dataprofile2 = this.state.dataprofile;
    dataprofile2["Picture"] = dataprofile2["Picture2"];

    this.setState({ dataprofile: dataprofile2 });

    // console.log(dataprofile2)
  }
  getDataRegistrasi = async () => {
    const userid = await CallAsyncData.getData("userid");
    const url = `http://104.248.156.113:8025/api/v1/AppAccount/RegistrationBill/${userid}/`;

   // const url = `http://104.248.156.113:8025/api/v1/AppAccount/RegistrationBill/MHS0001932`;
    //Lunas : MHS0001418
    //Blm lunas : MHS0001932
    const response = await callAPI.getData(url);
    const { data, statusCode } = response;
  
    if (statusCode == 200) {
      this.setState({ refreshing: false });
      this.setState({ regisData: data.detail });
      //console.log(this.state.regisData);
    }
  };
  getDataPembayaranSPP = async () => {
    const userid = await CallAsyncData.getData("userid");

    const url = `http://104.248.156.113:8025/api/v1/AppAccount/MonthlyBillList/${userid}/`;
   // const url = `http://104.248.156.113:8025/api/v1/AppAccount/MonthlyBillList/MHS0001418/`;
    const response = await callAPI.getData(url);
    const { data } = response;
   
    if (!data.error) {
        var sum = 0;
    data.map((item, index) => {
      if (item.costid === "MHS001" && item.ispaid === 2) {
        sum = sum + item.billvalue;
      }
    });
   
    this.setState({ totalSPP: sum });

    this.setState({ SPPData: data });
    console.log("ga oke")
    }else{
      console.log("oke")
    }
  
  };

  change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== this.state.active) {
      this.setState({ active: slide });
    }
  };

  currencyFormat(num) {
    return "Rp " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }
  _renderMapel = ({ item, index }) => {
    return (
      <View style={[item.style, { backgroundColor: item.color }]}>
        <View style={{ flexDirection: "column" }}>
          <Image
            source={item.image}
            style={{
              width: 52,
              height: 52,
              alignSelf: "center",
              marginTop: 65,
            }}
          />
          <Text
            style={[
              Style.textNormalWhite,
              {
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 10,
                color: item.theme,
              },
            ]}
          >
            {item.judul}
          </Text>
        </View>
      </View>
    );
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={Style.container}>
        <SafeAreaView>
          <ScrollView>
            <View style={[Style.NavBackContainer, { marginTop: 40 }]}>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    overflow: "hidden",
                    borderRadius: 25,
                  }}
                >
                  <Image
                    style={{ width: "100%", height: "125%" }}
                    source={{ uri: this.state.dataprofile["Picture"] }}
                    onError={() => this.loadFallBack()}
                  />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Text style={Style.textBold}>
                    {this.state.dataprofile["Nama"]}
                  </Text>
                  <Text style={[Style.textNormalGrey, { fontSize: 14 }]}>
                    {this.state.dataprofile["Kelas"]} •{" "}
                    {this.state.dataprofile["Jurusan"]}
                  </Text>
                </View>
              </View>
            </View>

            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              onScroll={this.change}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 30,
                }}
              >
                {slider.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      navigation.navigate(item.linkStack, {
                        screen: item.linkScren,
                      })
                    }
                  >
                    <Image
                      source={item.image}
                      style={[
                        Style.imageSlider,
                        { width: WIDTH - 15, resizeMode: "contain" },
                      ]}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <View style={Style.paging}>
              {slider.map((item, index) => (
                <View style={{ marginHorizontal: 3 }}>
                  <Text
                    style={
                      index == this.state.active
                        ? Style.textNormalBlack
                        : Style.textNormalGrey
                    }
                    key={item.key}
                  >
                    ⬤
                  </Text>
                </View>
              ))}
            </View>

            {/* <View
              style={[PembayaranStyle.CardPembayaran, { marginVertical: 20 }]}
            >
              <View style={{ padding: 25 }}>
                <View style={{ flexDirection: "row" }}>
                  <Icon name="ios-calendar-outline" size={26} color={"#000"} />
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
                  <Text style={Style.textBold20}>Rp. 550.000</Text>
                </View>
              </View>

              <View style={{ marginTop: 35 }}>
                <TouchableOpacity
                  style={PembayaranStyle.buttonRed}
                  onPress={() =>
                    navigation.navigate("pembayranStacks", {
                      screen: "Tagihan",
                    })
                  }
                >
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
            </View> */}

            {/* <View style={Style.ContainerViewBiasa}>
              <View style={{ marginVertical: 15 }}>
                <Text style={Style.textBold}>Mata Pelajaran</Text>
                <Text style={Style.textNormalGrey}>Kelas XI</Text>
              </View>

              <FlatList
                data={dummyMapel}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={this._renderMapel}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
              />
            </View> */}

            {/* <View style={[Style.ContainerViewBiasa]}>
              <View style={{ marginVertical: 15 }}>
                <Text style={Style.textBold}>Program Studi</Text>
              </View>

              <FlatList
                data={dummyProgramStudi}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={this._renderMapel}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
              />
            </View>
            <View style={[Style.ContainerViewBiasa]}>
              <View style={{ marginVertical: 15 }}>
                <Text style={Style.textBold}>Extra Curicullar</Text>
              </View>

              <FlatList
                data={dummyExcul}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={this._renderMapel}
                keyExtractor={(item, index) => index.toString()}
                numColumns={1}
              />
            </View> */}

            {this.state.regisData.map((item, index) => {
              if (item.pendingvalue == 0) {
                null;
              } else {
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      padding: 10,
                      justifyContent: "center",
                    }}
                  >
                    <View
                      style={{
                        borderWidth: 1,
                        flexDirection: "row",
                        borderRadius: 17,
                        borderColor: oren,
                        paddingVertical: 2,
                        width: WIDTH - 160,
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Icon
                          name={"ios-alert-circle"}
                          size={18}
                          color={oren}
                        />
                        <Text>{item.description}</Text>
                      </View>
                      <View style={{ paddingRight: 10 }}>
                        <Text style={{ color: oren }}>
                          {this.currencyFormat(item.pendingvalue)}
                        </Text>
                      </View>
                    </View>
                    <View style={[Style.tableCell, { paddingLeft: 5 }]}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: oren,
                          borderRadius: 17,
                          paddingVertical: 5,
                          paddingHorizontal: 35,
                        }}
                        onPress={() =>
                          navigation.navigate("pembayranStacks", {
                            screen: "Pembayran",
                          })
                        }
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: "bold",
                            color: white,
                          }}
                        >
                          Details
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
            })}

            {this.state.totalSPP === 0 ? null : (
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    borderWidth: 1,
                    flexDirection: "row",
                    borderRadius: 17,
                    borderColor: oren,
                    paddingVertical: 2,
                    width: WIDTH - 160,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Icon name={"ios-alert-circle"} size={18} color={oren} />
                    <Text>SPP</Text>
                  </View>
                  <View style={{ paddingRight: 10 }}>
                    <Text style={{ color: oren }}>
                      {this.currencyFormat(this.state.totalSPP)}
                    </Text>
                  </View>
                </View>

                <View style={[Style.tableCell, { paddingLeft: 5 }]}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: oren,
                      borderRadius: 17,
                      paddingVertical: 5,
                      paddingHorizontal: 35,
                    }}
                    onPress={() =>
                      navigation.navigate("pembayranStacks", {
                        screen: "Tagihan",
                      })
                    }
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: white,
                      }}
                    >
                      Details
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* <View>
              <Text
                style={[
                  Style.textBoldCenter,
                  { marginTop: 30, marginBottom: 10 },
                ]}
              >
                Menu
              </Text>

              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity style={Style.cardFeature}>
                  <Icon
                    style={{ alignSelf: "center", marginVertical: 7 }}
                    name={"ios-star"}
                    size={48}
                    color={"#FF3737"}
                  />
                  <Text
                    style={{
                      alignSelf: "center",
                      marginBottom: 10,
                      color: "#FF3737",
                    }}
                  >
                    Nilai
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={Style.cardFeature}>
                  <Icon
                    style={{ alignSelf: "center", marginVertical: 7 }}
                    name={"ios-reader-outline"}
                    size={48}
                    color={"#FF3737"}
                  />
                  <Text
                    style={{
                      alignSelf: "center",
                      marginBottom: 10,
                      color: "#FF3737",
                    }}
                  >
                    Rapor
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={Style.cardFeature}
                  onPress={() =>
                    navigation.navigate("pembayranStacks", {
                      screen: "Pembayran",
                    })
                  }
                >
                  <Icon
                    style={{ alignSelf: "center", marginVertical: 7 }}
                    name={"ios-wallet-outline"}
                    size={48}
                    color={"#FF3737"}
                  />
                  <Text
                    style={{
                      alignSelf: "center",
                      marginBottom: 10,
                      color: "#FF3737",
                    }}
                  >
                    Pembayaran
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginTop: 10,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TouchableOpacity style={Style.cardFeature}>
                  <Icon
                    style={{ alignSelf: "center", marginVertical: 7 }}
                    name={"ios-people-outline"}
                    size={25}
                    color={"#FF3737"}
                  />
                  <Text
                    style={{
                      alignSelf: "center",
                      marginBottom: 10,
                      color: "#FF3737",
                    }}
                  >
                    Kehadiran
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={Style.cardFeature}>
                  <Icon
                    style={{ alignSelf: "center", marginVertical: 7 }}
                    name={"ios-book-outline"}
                    size={25}
                    color={"#FF3737"}
                  />
                  <Text
                    style={{
                      alignSelf: "center",
                      marginBottom: 10,
                      color: "#FF3737",
                    }}
                  >
                    Jadwal Pel.
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={Style.cardFeature}
                  onPress={() =>
                    navigation.navigate("guruStacks", { screen: "Guru" })
                  }
                >
                  <Icon
                    style={{ alignSelf: "center", marginVertical: 7 }}
                    name={"ios-person-circle-outline"}
                    size={25}
                    color={"#FF3737"}
                  />
                  <Text
                    style={{
                      alignSelf: "center",
                      marginBottom: 10,
                      color: "#FF3737",
                    }}
                  >
                    Guru
                  </Text>
                </TouchableOpacity>
              </View>
            </View> */}
          </ScrollView>
        </SafeAreaView>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      </View>
    );
  }
}

export default Home;
