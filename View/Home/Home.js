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
    image: require("./../../assets/banner.png"),
    linkStack: "RegisterNewSiswa",
    linkScren: "RegisDataSiswa",
  },
  {
    image: require("./../../assets/banner2.png"),
    linkStack: "RegisterNewSiswa",
    linkScren: "RegisDataSiswa",
  },
  {
    image: require("./../../assets/banner3.png"),
    linkStack: "RegisterNewSiswa",
    linkScren: "RegisDataSiswa",
  },
];
const image = "./../../assets/banner3.png";
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
            <View style={Style.NavBackContainer}>
              <View style={{ flexDirection: "row" }}>
                <Image source={require("./../../assets/profile.png")} />
                <View style={{ marginLeft: 15 }}>
                  <Text style={Style.textBold}>Jenny Willson</Text>
                  <Text style={Style.textNormalGrey}>
                    Kelas XI Teknik Komputer
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
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                {slider.map((item, index) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(item.linkStack, {
                        screen: item.linkScren,
                      })
                    }
                  >
                    <Image source={item.image} style={Style.imageSlider} />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <View style={Style.paging}>
              {slider.map((i, k) => (
                <View style={{ marginHorizontal: 10 }}>
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
        </SafeAreaView>
      </View>
    );
  }
}

export default Home;
