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
  Linking,
  ToastAndroid,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CallAsyncData from '../../../Controller/CallAsyncData';

import moment from "moment";
import Style from "../../Style/Style";
import { abs } from "react-native-reanimated";

const { width: WIDTH } = Dimensions.get("window");

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
      dataprofile:[],
      whatsappUrl: 'https://api.whatsapp.com/send/?phone=628117099959',
    };
  }


  handleWhatsapp = () => {
    Linking.openURL(this.state.whatsappUrl).catch(err => console.error("Couldn't load page", err));
  };

  showToast = (val) => {
    ToastAndroid.show(val, ToastAndroid.SHORT);
  };

  onLogout = async() =>{
    // console.log('masuk logout')
    const { navigation } = this.props;
    try{
      await AsyncStorage.clear()
        this.showToast('Logout Berhasil');
        navigation.push('Welcome')
    }catch(err){
      console.log(err)
    }
  }

  loadFallBack(){
    // console.log('masuk loadFallBack')
    var dataprofile2 = this.state.dataprofile
    dataprofile2['Picture'] =  dataprofile2['Picture2']
    
    this.setState({dataprofile : dataprofile2})
    
    // console.log(dataprofile2)
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
      // console.log(this.state.dataprofile)
  }

  componentDidMount(){
    this.getProfile()
  }



  change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== this.state.active) {
      this.setState({ active: slide });
    }
  };
  //  //Untuk Ambil Current Route
  // console.log(this.props.route)

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

                <View style={{marginTop:30,marginRight:20,alignItems:"center"}}>
                    <View style={{width: 120, height: 120, overflow: 'hidden', borderRadius: 60}}>
                      <Image style={{width: '100%', height: '125%'}} source={{uri: this.state.dataprofile['Picture'] }} onError={() => this.loadFallBack()} />
                    </View>
                    <Text style={[Style.textBold,{marginTop:20}]}>{this.state.dataprofile['Nama']}</Text>
                    <Text style={{color:'#B2B5BF',marginTop:5}}>{this.state.dataprofile['Kelas']} • {this.state.dataprofile['Jurusan']}</Text>

                    <View style={{flexDirection:"row", marginTop: 20, paddingBottom: 15, borderBottomWidth:1, borderBottomColor:'#E7E9F1'}}>
                    <View style={{flexDirection:"row" , maxWidth: WIDTH-20, flexWrap: 'wrap', justifyContent: 'center'}}>
                        <View style={{flexDirection:"row"}}>
                            <Icon name="md-call-outline" style={{paddingRight:10}} color={'#B2B5BF'} size={24} />
                            <Text style={{paddingRight:15}}>{this.state.dataprofile['Handphone']}</Text>
                        </View>
                        <View style={{flexDirection:"row"}}>
                            <Icon name="ios-mail-outline" style={{paddingRight:10}} color={'#B2B5BF'} size={24} />
                            <Text style={{paddingRight:10}} >{this.state.dataprofile['Email']}</Text>
                        </View>
                      </View>
                    </View>
                </View>

                <View style={{marginTop:30}}>
                  <TouchableOpacity>
                    <View style={{flexDirection:"row", borderBottomColor:'#F6F6FA', borderBottomWidth:1, width:'95%', paddingBottom:15}}>
                      <Icon name="ios-person-circle-outline" style={{paddingRight:10}} color={'#23243B'} size={28} />
                      <Text style={{margin: 5, fontSize: 14}}>Info Personal</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={{marginTop: 20}} onPress={() => navigation.navigate('Profil', {screen:"InfoAplikasi"})}>
                    <View style={{flexDirection:"row", borderBottomColor:'#F6F6FA', borderBottomWidth:1, width:'95%', paddingBottom:15}}>
                      <Icon name="ios-apps-outline" style={{paddingRight:10}} color={'#23243B'} size={28} />
                      <Text style={{margin: 5, fontSize: 14}}>Info Aplikasi</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={{marginTop: 20}} onPress={this.handleWhatsapp}>
                    <View style={{flexDirection:"row", borderBottomColor:'#F6F6FA', borderBottomWidth:1, width:'95%', paddingBottom:15}}>
                      <Icon name="ios-chatbubble-ellipses-outline" style={{paddingRight:10}} color={'#23243B'} size={28} />
                      <Text style={{margin: 5, fontSize: 14}}>Bantuan</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity style={{marginTop: 20}} onPress={() => navigation.navigate('Profil', {screen:"TentangKami"})}>
                    <View style={{flexDirection:"row", borderBottomColor:'#F6F6FA', borderBottomWidth:1, width:'95%', paddingBottom:15}}>
                      <Icon name="ios-information-circle-outline" style={{paddingRight:10}} color={'#23243B'} size={28} />
                      <Text style={{margin: 5, fontSize: 14}}>Tentang Kami</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{paddingTop: 75, paddingBottom: 10}}>
                  <TouchableOpacity style={{marginTop: 20}} onPress={this.onLogout}>
                    <View style={{flexDirection: "row"}}>
                      <Icon name="ios-exit-outline" style={{paddingRight:10}} color={'#EB3C3C'} size={28} />
                      <Text style={{margin: 5, fontSize: 14, color: '#EB3C3C'}}>Logout</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>
            </ScrollView>
        </SafeAreaView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
      </View>
    );
  }
}

export default Profile;
