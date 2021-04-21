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
  TouchableHighlightBase,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Style from "./../../Style/Style";
import CallAPIData from '../../../Controller/CallAPI';
import { FlatList } from "react-native-gesture-handler";

const { width: WIDTH } = Dimensions.get("window");

const numColumn = 1

class Guru extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
      dataTeacher: [],
      selectedId:'',
    };
  }

  getTeacher = async() =>{
    const url = `http://104.248.156.113:8025/api/v1/AppAccount/Teacher`
    const response = await CallAPIData.getData(url)
    const {data,statusCode} = response
    
    if(statusCode == 200){
      this.setState({dataTeacher:data})
      // console.log(this.state.dataTeacher)
    }else{
      console.log('Gagal Akses API')
    }
  }

  componentDidMount(){
    this.getTeacher()
  }

  checkIDGuru = (teacherID) => {
    const { navigation } = this.props
    navigation.navigate('DetailGuru',{params: teacherID})
  }
  

  _renderItem = ({item,index}) =>{
    return(
    <TouchableOpacity onPress={() => this.checkIDGuru(item.teacherid)}>
        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#E7E9F1",
            borderBottomWidth: 1,
            width: WIDTH - 50,
          }}
        >
          <Image
            style={{ margin: 10, width: 60, height: 60, borderRadius: 30 }}
            source={{uri:item.picture}}
          />
          <View style={{ margin: 10,flexDirection:'column'}}>
            <Text style={[Style.textBold,{fontSize: 16, width: 250, flexWrap: 'wrap'}]}>{item.name}</Text>
            <Text style={{ color: "#B2B5BF" }}>{item.title}</Text>
          </View>
        </View>
    </TouchableOpacity>
    )  
}


  render() {
    const { navigation } = this.props;
    return (
      <View style={Style.container}>
        <SafeAreaView>
          <View style={Style.NavBackContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name={"ios-chevron-back-sharp"} size={25} color={"#000"} />
            </TouchableOpacity>
            <Text style={[Style.headerText, { marginVertical: 10 }]}>Guru</Text>

            <ScrollView style={{}}>
              <View style={{ marginTop: 10, flexDirection: "row" }}>
                <FlatList
                  data = {this.state.dataTeacher}
                  renderItem = {this._renderItem}
                  keyExtractor={(item, index)=> index.toString()}
                  extraData={
                    this.state.selectedId     // for single item
                  }
                  numColumns = {numColumn}
                />
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      </View>
    );
  }
}

export default Guru;
