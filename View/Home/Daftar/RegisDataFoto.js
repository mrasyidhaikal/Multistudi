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

import Dialog from "react-native-dialog";

class RegisDataFoto extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      imageAyah: null,
      imageIbu: null,
      imageKK: null,
      imageIjazah: null,
      imageSkhun: null,
      warnacheckAyah: '#B2B5BF',
      warnacheckIbu: '#B2B5BF',
      warnacheckKK: '#B2B5BF',
      warnacheckIjazah: '#B2B5BF',
      warnacheckSkhun: '#B2B5BF',
      ukuranstate: 25,
      textInputValue: '',
      dialogvisible: false,
    };
  }

  showDialog = () => {
    this.setState({ dialogvisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogvisible: false });
  };

  pickImageAyah = async () => {
    //File
    let resultAyah = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      aspect: [4, 3],
      quality: 1,
    });

    if (!resultAyah.cancelled) {
      this.setState({ imageAyah: resultAyah.uri });
      this.setState({ warnacheckAyah: '#06BFAD' });
    }

    //Camera
    // let Camera = await ImagePicker.launchCameraAsync();
    // if (!Camera.cancelled) {
    //   this.setState({ image: Camera.uri });
    // }
  };

  pickImageAyahCam = async () => {
    // //File
    // let resultAyah = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,

    //   aspect: [4, 3],
    //   quality: 1,
    // });

    // if (!resultAyah.cancelled) {
    //   this.setState({ imageAyah: resultAyah.uri });
    //   this.setState({ warnacheckAyah: '#06BFAD' });
    // }

    // Camera
    let Camera = await ImagePicker.launchCameraAsync();
    if (!Camera.cancelled) {
      this.setState({ imageAyah: Camera.uri });
      this.setState({ warnacheckAyah: '#06BFAD' });

    }
  };

  pickImageIbu = async () => {
    //File
    let resultIbu = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      aspect: [4, 3],
      quality: 1,
    });

    if (!resultIbu.cancelled) {
      this.setState({ imageIbu: resultIbu.uri });
      this.setState({ warnacheckIbu: '#06BFAD' });
    }

    //Camera
    // let Camera = await ImagePicker.launchCameraAsync();
    // if (!Camera.cancelled) {
    //   this.setState({ image: Camera.uri });
    // }
  };

  pickImageKK = async () => {
    //File
    let resultKK = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      aspect: [4, 3],
      quality: 1,
    });

    if (!resultKK.cancelled) {
      this.setState({ imageKK: resultKK.uri });
      this.setState({ warnacheckKK: '#06BFAD' });
    }

    //Camera
    // let Camera = await ImagePicker.launchCameraAsync();
    // if (!Camera.cancelled) {
    //   this.setState({ image: Camera.uri });
    // }
  };

  pickImageIjazah = async () => {
    //File
    let resultIjazah = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      aspect: [4, 3],
      quality: 1,
    });

    if (!resultIjazah.cancelled) {
      this.setState({ imageIjazah: resultIjazah.uri });
      this.setState({ warnacheckIjazah: '#06BFAD' });
    }

    //Camera
    // let Camera = await ImagePicker.launchCameraAsync();
    // if (!Camera.cancelled) {
    //   this.setState({ image: Camera.uri });
    // }
  };

  pickImageSkhun = async () => {
    //File
    let resultSkhun = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      aspect: [4, 3],
      quality: 1,
    });

    if (!resultSkhun.cancelled) {
      this.setState({ imageSkhun: resultSkhun.uri });
      this.setState({ warnacheckSkhun: '#06BFAD' });
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

                {/* <Button title="Show dialog" onPress={this.showDialogAyah} /> */}
                {/* <Dialog.Container visible={this.state.dialogvisible} onBackdropPress={this.handleCancel}>
                  <Dialog.Title>Document Upload</Dialog.Title>
                  <Dialog.Description>
                    Select File Source
                  </Dialog.Description>
                  <Dialog.Button label="Camera" onPress={this.pickImageAyahCam} />
                  <Dialog.Button label="Gallery" onPress={this.pickImageAyah} />
                </Dialog.Container> */}

                
                {/* KTP AYAH */}
                <TouchableOpacity
                  style={Style.buttonDokumen}
                  // onPress={this.showDialog}
                  onPress={() => this.pickImageAyah()}
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
                        color={this.state.warnacheckAyah}
                        // color={"#06BFAD"}
                      />
                    </View>
                  </View>

                </TouchableOpacity>

                {/* KTP IBU */}
                <TouchableOpacity
                  style={Style.buttonDokumen}
                  onPress={() => this.pickImageIbu()}
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
                      <View style={{ marginLeft: 20 }}>
                        <Text style={Style.textNormalBlack}>KTP Ibu</Text>
                      </View>
                    </View>
                    <View style={{margin: this.state.ukuranstate}}>
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
                  onPress={() => this.pickImageKK()}
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
                      <View style={{ marginLeft: 20 }}>
                        <Text style={Style.textNormalBlack}>Kartu Keluarga</Text>
                      </View>
                    </View>
                    <View style={{margin: this.state.ukuranstate}}>
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
                  onPress={() => this.pickImageIjazah()}
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
                      <View style={{ marginLeft: 20 }}>
                        <Text style={Style.textNormalBlack}>Ijazah</Text>
                      </View>
                    </View>
                    <View style={{margin: this.state.ukuranstate}}>
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
                  onPress={() => this.pickImageSkhun()}
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
                      <View style={{ marginLeft: 20 }}>
                        <Text style={Style.textNormalBlack}>SKHUN</Text>
                      </View>
                    </View>
                    <View style={{margin: this.state.ukuranstate}}>
                      <Icon
                        name={"ios-checkmark-circle-sharp"}
                        size={26}
                        color={this.state.warnacheckSkhun}
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
