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
class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={Style.container}>
        <SafeAreaView>
          <ScrollView>
            <View style={Style.NavBackContainer}>
              <View style={{ flexDirection: "row" }}>
                <Image source={require("./../../assets/profile.png")} />
                <View>
                  <Text style={Style.textBold}>Jenny Willson</Text>
                  <Text style={Style.textNormalGrey}>
                    Kelas XI Teknik Komputer
                  </Text>
                </View>
              </View>
            </View>
            <View style={Style.ContainerViewBiasa}>
              <TouchableOpacity
                style={Style.buttonBlank}
                onPress={() =>
                  navigation.navigate("RegisterNewSiswa", {
                    screen: "RegisDataSiswa",
                  })
                }
              >
                <ImageBackground
                  source={require("./../../assets/banner.png")}
                  style={{
                    justifyContent: "center",
                    alignContent: "flex-start",
                    height: 170,
                    width: WIDTH - 50,

                    flex: 1,
                  }}
                ></ImageBackground>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default Home;
