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
import Style from "../../Style/Style";
import { abs } from "react-native-reanimated";
import {expo} from '../../../app.json'


const { width: WIDTH } = Dimensions.get("window");

class InfoAplikasi extends React.Component {
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
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon
                        name={"ios-chevron-back-sharp"}
                        size={25}
                        color={"#000"}
                        />
                    </TouchableOpacity>
                    <Text style={Style.headerText}>Info Aplikasi</Text>
                </View>

            <View style={Style.ContainerViewBiasa}>
                <Image style={{alignSelf:"center", marginTop:150}} source={require("./../../../assets/logomhs.png")}/>
                <View style={{marginTop: 30, alignItems:"center"}}>
                    <Text>Multistudi High School Mobile Apps</Text>
                    <Text>Version {expo.version}</Text>
                </View>
            </View>

            </ScrollView>
        </SafeAreaView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
      </View>
    );
  }
}

export default InfoAplikasi;
