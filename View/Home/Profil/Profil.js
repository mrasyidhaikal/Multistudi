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
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      whatsappUrl: 'https://api.whatsapp.com/send/?phone=628117099959',
    };
  }


  handleWhatsapp = () => {
    Linking.openURL(this.state.whatsappUrl).catch(err => console.error("Couldn't load page", err));
  };


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
                    <Image style={{width:120,height:120}} source={require("../../../assets/profile.png")} />
                    <Text style={[Style.textBold,{marginTop:20}]}>Jenny Wilson</Text>
                    <Text style={{color:'#B2B5BF',marginTop:5}}>Kelas XI • Teknik Komputer Jaringan</Text>

                    <View style={{flexDirection:"row", marginTop: 30, paddingBottom: 15, borderBottomWidth:1, borderBottomColor:'#E7E9F1'}}>
                    <View style={{flexDirection:"row"}}>
                        <Icon name="md-call-outline" style={{paddingRight:10}} color={'#B2B5BF'} size={24} />
                        <Text style={{paddingRight:15}}>+62812 1234 5678</Text>
                    </View>
                    <View style={{flexDirection:"row"}}>
                        <Icon name="ios-mail-outline" style={{paddingRight:10}} color={'#B2B5BF'} size={24} />
                        <Text style={{paddingRight:10}} >jennywilson@gmail.com</Text>
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
                  <TouchableOpacity style={{marginTop: 20}}>
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
