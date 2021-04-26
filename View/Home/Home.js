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
import CallAsyncData from '../../Controller/CallAsyncData';

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
      dataprofile: [],
    };
  }

  getProfile = async() =>{
    const token = await CallAsyncData.getData('token')
    const emailUser = await CallAsyncData.getData('email')
    const userName = await CallAsyncData.getData('name')
    const userMajor = await CallAsyncData.getData('major')
    const userClass = await CallAsyncData.getData('kelas')
    const userPhone = await CallAsyncData.getData('phone')
    const userBirth = await CallAsyncData.getData('tgllahir')
    const userAddress = await CallAsyncData.getData('address')
    const userStatus = await CallAsyncData.getData('status')
    const userPicture = await CallAsyncData.getData('fotoprofile')
    const userPicture2 = await CallAsyncData.getData('fotoprofile2')

    // Profile Data
    const profile = {
      'Email': emailUser,
      'Nama': userName,
      'Jurusan': userMajor,
      'Kelas': userClass,
      'Alamat': userAddress,
      'Handphone': userPhone,
      'Tgllahir': moment(userBirth).format('DD MMM YYYY'),
      'Status': userStatus,
      'Picture': userPicture,
      'Picture2': userPicture2
    }
      
      this.setState({dataprofile: profile})
      // console.log(this.state.dataprofile['Picture'])
  }

  componentDidMount(){
    this.getProfile()
  }

  loadFallBack(){
    // console.log('masuk loadFallBack')
    var dataprofile2 = this.state.dataprofile
    dataprofile2['Picture'] =  dataprofile2['Picture2']
    
    this.setState({dataprofile : dataprofile2})
    
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
  render() {
    const { navigation } = this.props;
    return (
      <View style={Style.container}>
        <SafeAreaView>
          <ScrollView>
            <View style={[Style.NavBackContainer, { marginTop: 40 }]}>
              <View style={{ flexDirection: "row" }}>
                <View style={{width: 50, height: 50, overflow: 'hidden', borderRadius: 25}}>
                  <Image style={{width: '100%', height: '125%'}} source={{uri : this.state.dataprofile['Picture']}} onError={() => this.loadFallBack()} />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Text style={Style.textBold}>{this.state.dataprofile['Nama']}</Text>
                  <Text style={[Style.textNormalGrey,{fontSize: 14}]}>
                    {this.state.dataprofile['Kelas']} • {this.state.dataprofile['Jurusan']}
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
                navigation.navigate("pembayranStacks", { screen: "Pembayran" })
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
        </SafeAreaView>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      </View>
    );
  }
}

export default Home;
