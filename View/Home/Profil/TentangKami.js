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

class TentangKami extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
      whatsappUrl: 'https://api.whatsapp.com/send/?phone=628117099959',
      twitterUrl: 'https://twitter.com/smk_mhs_batam',
      facebookUrl: 'https://www.facebook.com/smk.multistudi',
      instagramUrl: 'https://www.instagram.com/smk_multistudi_batam/',
      youtubeUrl: 'https://www.youtube.com/channel/UCftjInE04jsLOo3PO-mtsYg',
      emailUrl: 'mailto:humas@multistudi.sch.id',
    };
  }

  handleWhatsapp = () => {
    Linking.openURL(this.state.whatsappUrl).catch(err => console.error("Couldn't load page", err));
  };

  handleTwitter = () => {
    Linking.openURL(this.state.twitterUrl).catch(err => console.error("Couldn't load page", err));
  };

  handleFacebook = () => {
    Linking.openURL(this.state.facebookUrl).catch(err => console.error("Couldn't load page", err));
  };

  handleInstagram = () => {
    Linking.openURL(this.state.instagramUrl).catch(err => console.error("Couldn't load page", err));
  };

  handleYoutube = () => {
    Linking.openURL(this.state.youtubeUrl).catch(err => console.error("Couldn't load page", err));
  };

  handleMail = () => {
    Linking.openURL(this.state.emailUrl).catch(err => console.error("Couldn't load page", err));
  };

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
                    <Text style={Style.headerText}>Tentang Kami</Text>
                </View>

            <View style={[Style.ContainerViewBiasa,{marginTop: 25}]}>
                <TouchableOpacity style={{marginTop: 20}} onPress={this.handleWhatsapp}>
                    <View style={{flexDirection:"row", borderBottomColor:'#F6F6FA', borderBottomWidth:1, width:'95%', paddingBottom:15}}>
                      <Icon name="ios-logo-whatsapp" style={{paddingRight:10}} color={'#00B960'} size={28} />
                      <Text style={{margin: 5, fontSize: 14}}>+62 811-7099-959</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 20}} onPress={this.handleTwitter}>
                    <View style={{flexDirection:"row", borderBottomColor:'#F6F6FA', borderBottomWidth:1, width:'95%', paddingBottom:15}}>
                      <Icon name="ios-logo-twitter" style={{paddingRight:10}} color={'#1DC9FF'} size={28} />
                      <Text style={{margin: 5, fontSize: 14}}>@smk_mhs_batam</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 20}} onPress={this.handleFacebook}>
                    <View style={{flexDirection:"row", borderBottomColor:'#F6F6FA', borderBottomWidth:1, width:'95%', paddingBottom:15}}>
                      <Icon name="ios-logo-facebook" style={{paddingRight:10}} color={'#3B77BE'} size={28} />
                      <Text style={{margin: 5, fontSize: 14}}>SMK Multistudi High School - Batam</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={{marginTop: 20}} onPress={this.handleInstagram}>
                    <View style={{flexDirection:"row", borderBottomColor:'#F6F6FA', borderBottomWidth:1, width:'95%', paddingBottom:15}}>
                      <Icon name="ios-logo-instagram" style={{paddingRight:10}} color={'#D952CB'} size={28} />
                      <Text style={{margin: 5, fontSize: 14}}>@smk_multistudi_batam</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 20}} onPress={this.handleYoutube}>
                    <View style={{flexDirection:"row", borderBottomColor:'#F6F6FA', borderBottomWidth:1, width:'95%', paddingBottom:15}}>
                      <Icon name="ios-logo-youtube" style={{paddingRight:10}} color={'#EB3C3C'} size={28} />
                      <Text style={{margin: 5, fontSize: 14}}>SMK MULTISTUDI HIGH SCHOOL</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 20}} onPress={this.handleMail}>
                    <View style={{flexDirection:"row", borderBottomColor:'#F6F6FA', borderBottomWidth:1, width:'95%', paddingBottom:15}}>
                      <Icon name="ios-mail-outline" style={{paddingRight:10}} color={'#23243B'} size={28} />
                      <Text style={{margin: 5, fontSize: 14}}>humas@multistudi.sch.id</Text>
                    </View>
                </TouchableOpacity>

            </View>

            </ScrollView>
        </SafeAreaView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
      </View>
    );
  }
}

export default TentangKami;
