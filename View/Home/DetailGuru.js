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
import Style from "../Style/Style";

const { width: WIDTH } = Dimensions.get("window");

class DetailGuru extends React.Component {
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
            <View style={Style.NavBackContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon
                    name={"ios-chevron-back-sharp"}
                    size={25}
                    color={"#000"}
                    />
                </TouchableOpacity>

                <View style={{marginTop:30,marginRight:20,alignItems:"center"}}>
                    <Image style={{width:120,height:120}} source={require("./../../assets/profile.png")} />
                    <Text style={[Style.textBold,{marginTop:20}]}>Joni Firdaus, S.S</Text>
                    <Text style={{color:'#B2B5BF',marginTop:10}}>Kepala Sekolah</Text>
                    <Text style={{color:'#B2B5BF'}}>T29067601</Text>
                </View>

                <View style={[Style.inputContainer,{padding:15}]}>
                    <Text style={{color:'#B2B5BF'}}>Status</Text>
                    <TextInput style={[Style.input,{borderBottomColor:'#E7E9F1',borderColor:0,borderRadius:0,width:WIDTH-75}]} value="Permanen" editable={false}>
                    </TextInput>
                </View>

                <View style={[Style.inputContainer,{padding:15}]}>
                    <Text style={{color:'#B2B5BF'}}>Telepon</Text>
                    <TextInput style={[Style.input,{borderBottomColor:'#E7E9F1',borderColor:0,borderRadius:0,width:WIDTH-75}]} value="082171226322" editable={false}>
                    </TextInput>
                </View>

                <View style={[Style.inputContainer,{padding:15}]}>
                    <Text style={{color:'#B2B5BF'}}>Email</Text>
                    <TextInput style={[Style.input,{borderBottomColor:'#E7E9F1',borderColor:0,borderRadius:0,width:WIDTH-75}]} value="humas@multistudi.sch.id" editable={false}>
                    </TextInput>
                </View>

            </View>
        </SafeAreaView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
      </View>
    );
  }
}

export default DetailGuru;
