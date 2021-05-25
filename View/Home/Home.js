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
import CallAsyncData from "../../Controller/CallAsyncData";

import moment from "moment";
import Style from "./../Style/Style";
import PembayaranStyle from "./../Style/PembayranStyle";
import HomeStyle from "../Style/HomeStyle";
import { FlatList } from "react-native-gesture-handler";

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
    linkStack: "RegisterNewSiswa",
    linkScren: "RegisDataWali",
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

  change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== this.state.active) {
      this.setState({ active: slide });
    }
  };
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
                    key={item.key}
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

            <View style={Style.ContainerViewBiasa}>
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
            </View>

            <View style={[Style.ContainerViewBiasa]}>
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
            </View>
            <View>
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
                    name={"ios-people-outline"}
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
                    Kehadiran
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={Style.cardFeature}>
                  <Icon
                    style={{ alignSelf: "center", marginVertical: 7 }}
                    name={"ios-book-outline"}
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
                    Guru
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
            </View>
          </ScrollView>
        </SafeAreaView>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      </View>
    );
  }
}

export default Home;
