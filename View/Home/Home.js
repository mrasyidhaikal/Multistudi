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
import Style from "./../Style/Style";

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
    linkScren: "RegisDataSiswa",
  },
  {
    key: 3,
    image: require("./../../assets/banner3.png"),
    linkStack: "RegisterNewSiswa",
    linkScren: "RegisDataSiswa",
  },
];

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
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
            <View style={[Style.NavBackContainer, { marginTop: 40 }]}>
              <View style={{ flexDirection: "row" }}>
                <Image source={require("./../../assets/profile.png")} />
                <View style={{ marginLeft: 15 }}>
                  <Text style={Style.textBold}>Jenny Willson</Text>
                  <Text style={Style.textNormalGrey}>
                    Kelas XI • Teknik Komputer Jaringan
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
              {slider.map((i, k) => (
                <View style={{ marginHorizontal: 3 }}>
                  <Text
                    style={
                      k == this.state.active
                        ? Style.textNormalBlack
                        : Style.textNormalGrey
                    }
                    key={k}
                  >
                    ⬤
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>

          <Text
            style={[Style.textBoldCenter, { marginTop: 30, marginBottom: 10 }]}
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
            <TouchableOpacity
              style={{
                padding: 5,
                margin: 5,
                backgroundColor: "#fff",
                borderRadius: 20,
                width: WIDTH / 3.7,
                shadowColor: "#93A5BA",
                shadowOpacity: 0.8,
                elevation: 3,
                shadowRadius: 35,
                shadowOffset: { width: 1, height: 13 },
              }}
            >
              <Icon
                style={{ alignSelf: "center", marginVertical: 7 }}
                name={"ios-people-outline"}
                size={48}
                color={"#FF5B7E"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  marginBottom: 10,
                  color: "#FF5B7E",
                }}
              >
                Kehadiran
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 5,
                margin: 5,
                backgroundColor: "#fff",
                borderRadius: 20,
                width: WIDTH / 3.7,
                shadowColor: "#93A5BA",
                shadowOpacity: 0.8,
                elevation: 3,
                shadowRadius: 35,
                shadowOffset: { width: 1, height: 13 },
              }}
            >
              <Icon
                style={{ alignSelf: "center", marginVertical: 7 }}
                name={"ios-book-outline"}
                size={48}
                color={"#FF5B7E"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  marginBottom: 10,
                  color: "#FF5B7E",
                }}
              >
                Jadwal Pel.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 5,
                margin: 5,
                backgroundColor: "#fff",
                borderRadius: 20,
                width: WIDTH / 3.7,
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOpacity: 0.8,
                elevation: 3,
                shadowRadius: 35,
                shadowOffset: { width: 1, height: 13 },
              }}
              onPress={() =>
                navigation.navigate("guruStacks", { screen: "Guru" })
              }
            >
              <Icon
                style={{ alignSelf: "center", marginVertical: 7 }}
                name={"ios-person-circle-outline"}
                size={48}
                color={"#FF5B7E"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  marginBottom: 10,
                  color: "#FF5B7E",
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
            <TouchableOpacity
              style={{
                padding: 5,
                margin: 5,
                backgroundColor: "#fff",
                borderRadius: 20,
                width: WIDTH / 3.7,
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOpacity: 0.8,
                elevation: 3,
                shadowRadius: 35,
                shadowOffset: { width: 1, height: 13 },
              }}
            >
              <Icon
                style={{ alignSelf: "center", marginVertical: 7 }}
                name={"ios-star"}
                size={48}
                color={"#FF5B7E"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  marginBottom: 10,
                  color: "#FF5B7E",
                }}
              >
                Nilai
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 5,
                margin: 5,
                backgroundColor: "#fff",
                borderRadius: 20,
                width: WIDTH / 3.7,
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOpacity: 0.8,
                elevation: 3,
                shadowRadius: 35,
                shadowOffset: { width: 13, height: 13 },
              }}
            >
              <Icon
                style={{ alignSelf: "center", marginVertical: 7 }}
                name={"ios-reader-outline"}
                size={48}
                color={"#FF5B7E"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  marginBottom: 10,
                  color: "#FF5B7E",
                }}
              >
                Rapor
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 5,
                margin: 5,
                backgroundColor: "#fff",
                borderRadius: 20,
                width: WIDTH / 3.7,
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowOpacity: 0.8,
                elevation: 3,
                shadowRadius: 35,
                shadowOffset: { width: 1, height: 13 },
              }}
              onPress={() =>
                navigation.navigate("pembayranStacks", { screen: "Pembayran" })
              }
            >
              <Icon
                style={{ alignSelf: "center", marginVertical: 7 }}
                name={"ios-wallet-outline"}
                size={48}
                color={"#FF5B7E"}
              />
              <Text
                style={{
                  alignSelf: "center",
                  marginBottom: 10,
                  color: "#FF5B7E",
                }}
              >
                Pembayaran
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      </View>
    );
  }
}

export default Home;
