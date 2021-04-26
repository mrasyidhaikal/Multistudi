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
import CallAPIData from '../../../Controller/CallAPI';


const { width: WIDTH } = Dimensions.get("window");

class DetailGuru extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
      dataTeacher: [],
    };
  }

  
  handleMail = () => {
    if (this.state.dataTeacher['email'] == null){
      return;
    }else{
      Linking.openURL('mailto:'+this.state.dataTeacher['email']).catch(err => console.error("Couldn't load page", err));
    }
  };

  handlePhone = () => {
    if (this.state.dataTeacher['mobileno'] == null){
      return;
    }else{
    Linking.openURL(`tel:${this.state.dataTeacher['mobileno']}`)
    }
  }

  change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== this.state.active) {
      this.setState({ active: slide });
    }
  };

  getTeacher = async() =>{
    const { navigation,route } = this.props;
    const { params: teacherID } = route.params;

    const url = `http://104.248.156.113:8025/api/v1/AppAccount/TeacherbyID/${teacherID}`
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

  render() {
    const { navigation } = this.props;
    return (
      <View style={Style.container}>
        <SafeAreaView>
          <View style={Style.NavBackContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name={"ios-chevron-back-sharp"} size={25} color={"#000"} />
            </TouchableOpacity>

            <View
              style={{ marginTop: 30, marginRight: 20, alignItems: "center" }}
            >
              <View style={{width: 120, height: 120, overflow: 'hidden', borderRadius: 60}}>
                <Image
                  style={{ width: '100%', height: '120%' }}
                  source={{uri:this.state.dataTeacher['picture']}}
                />
              </View>
              <Text style={[Style.textBold, { marginTop: 20 }]}>
                {this.state.dataTeacher['name']}
              </Text>
              <Text style={{ color: "#B2B5BF", marginTop: 10 }}>
                {this.state.dataTeacher['title']}
              </Text>
              <Text style={{ color: "#B2B5BF" }}>
                {this.state.dataTeacher['nrp']}
              </Text>
            </View>

            <View style={[Style.inputContainer, { padding: 15 }]}>
              <Text style={{ color: "#B2B5BF" }}>Status</Text>
              <TextInput
                style={[
                  Style.input,
                  {
                    borderBottomColor: "#E7E9F1",
                    borderColor: 0,
                    borderRadius: 0,
                    width: WIDTH - 75,
                  },
                ]}
                value={this.state.dataTeacher['empstatus']}
                editable={false}
              ></TextInput>
            </View>

            <View style={[Style.inputContainer, { padding: 15 }]}>
              <TouchableOpacity onPress={this.handlePhone} >
                <Text style={{ color: "#B2B5BF" }}>Telepon</Text>
                <TextInput
                  style={[
                    Style.input,
                    {
                      borderBottomColor: "#E7E9F1",
                      borderColor: 0,
                      borderRadius: 0,
                      width: WIDTH - 75,
                    },
                  ]}
                  value={this.state.dataTeacher['mobileno']}
                  editable={false}
                ></TextInput>
              </TouchableOpacity>
            </View>

            <View style={[Style.inputContainer, { padding: 15 }]}>
              <TouchableOpacity onPress={this.handleMail}>
                <Text style={{ color: "#B2B5BF" }}>Email</Text>
                <TextInput
                  style={[
                    Style.input,
                    {
                      borderBottomColor: "#E7E9F1",
                      borderColor: 0,
                      borderRadius: 0,
                      width: WIDTH - 75,
                    },
                  ]}
                  value={this.state.dataTeacher['email']}
                  editable={false}
                ></TextInput>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      </View>
    );
  }
}

export default DetailGuru;
