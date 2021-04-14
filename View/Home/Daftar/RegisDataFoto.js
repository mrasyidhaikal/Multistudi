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
  Switch,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import ModalSelector from 'react-native-modal-selector'
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
      warnacheck: '#B2B5BF',
      ukuranstate: 25,
      textInputValue: '',
    };
  }

  pickImage = async () => {
    //File
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.setState({ warnacheck: '#06BFAD' });
    }

    //Camera
    // let Camera = await ImagePicker.launchCameraAsync();
    // if (!Camera.cancelled) {
    //   this.setState({ image: Camera.uri });
    // }
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

    // let index = 0;
    //     const data = [
    //         { key: index++, section: true, label: 'Fruits' },
    //         { key: index++, label: 'Red Apples' },
    //         { key: index++, label: 'Cherries' },
    //         { key: index++, label: 'Cranberries', accessibilityLabel: 'Tap here for cranberries' },
    //         // etc...
    //         // Can also add additional custom keys which are passed to the onChange callback
    //         { key: index++, label: 'Vegetable', customKey: 'Not a fruit' }
    //     ];

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
               <TouchableOpacity style={Style.buttonBlank} onPress={() => navigation.navigate('RegisDataSiswa')}>
                  <Text style={Style.textNormalGrey}>Data Siswa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.buttonBlank}  onPress={() => navigation.navigate('RegisDataWali')}>
                  <Text style={Style.textNormalGrey}>Data Wali</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.buttonBlank}  onPress={() => navigation.navigate('RegisHobi')}>
                  <Text style={Style.textNormalGrey}>Hobi/Minat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={Style.buttonBlank} onPress={() => navigation.navigate('RegisPrestasi')}>
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
                        <Text style={Style.textNormalBlack}>KTP Ayah</Text>
                      </View>
                    </View>
                    <View style={{margin: this.state.ukuranstate}}>
                      <Icon
                        name={"ios-checkmark-circle-sharp"}
                        size={26}
                        color={this.state.warnacheck}
                        // color={"#06BFAD"}
                      />
                    </View>
                  </View>

                </TouchableOpacity>

                {/* <View style={{flex:1, justifyContent:'space-around', padding:50}}>
                  <ModalSelector
                      data={data}
                      initValue="Select something yummy!"
                      onChange={(option)=>{ alert(`${option.label} (${option.key}) nom nom nom`) }} />
                </View> */}


              </View>

            </View>

            <View style={Style.ContainerViewHorizontalSpace}>
              <TouchableOpacity style={Style.buttonBlank} 
                onPress={() => navigation.navigate("RegisPrestasi")}>
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
                onPress={() => navigation.navigate("RegisSelesai")}
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

export default RegisDataFoto;
