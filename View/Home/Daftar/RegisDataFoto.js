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
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Style from "./../../Style/Style";

class RegisDataFoto extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      image: null,
    };
  }

  pickImage = async () => {
    //File
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.All,

    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // if (!result.cancelled) {
    //   this.setState({ image: result.uri });
    // }

    //Camera
    let Camera = await ImagePicker.launchCameraAsync();
    if (!Camera.cancelled) {
      this.setState({ image: Camera.uri });
    }
  };

  componentWillUnmount = async () => {
    if (Platform.OS !== "web") {
      const {
        status,
      } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      await ImagePicker.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
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
                <TouchableOpacity style={Style.buttonBlank}>
                  <Text style={Style.textNormalGrey}>Data Siswa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.buttonBlank}>
                  <Text style={Style.textNormalGrey}>Data Wali</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.buttonBlank}>
                  <Text style={Style.textNormalGrey}>Hobi/Minat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.buttonBlank}>
                  <Text style={Style.textNormalGrey}>Prestasi</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.buttonBlueActive}>
                  <Text style={Style.textNormalWhite}>Dokumen</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.buttonBlank}>
                  <Text style={Style.textNormalGrey}>Selesai</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>

            <View style={Style.ContainerViewBiasa}>
              <Text style={Style.textBold}>Dokumen</Text>

              <View style={Style.inputContainer}>
                <TouchableOpacity
                  style={Style.buttonDokumen}
                  onPress={() => this.pickImage()}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={Style.ContainerViewHorizontal}>
                      <View>
                        {this.state.image ? (
                          <View>
                            <Image
                              source={{ uri: this.state.image }}
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
                      <View style={{ marginLeft: 20 }}>
                        <Text style={Style.textNormalBlack}>KTP Wali 1</Text>
                      </View>
                    </View>
                    <View style={{ margin: 25 }}>
                      <Icon
                        name={"ios-checkmark-circle-sharp"}
                        size={26}
                        color={"#06BFAD"}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default RegisDataFoto;
