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
import Style from "./../Style/Style";

const { width: WIDTH } = Dimensions.get("window");

class Guru extends React.Component {
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
                <Text style={[Style.headerText,{marginVertical:10}]}>Guru</Text>

                <ScrollView style={{}}>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('DetailGuru')}>
                            <View style={{flexDirection:"row",borderBottomColor:'#E7E9F1',borderBottomWidth:1,width:WIDTH-50}}>
                                <Image style={{margin:10}} source={require("./../../assets/profile.png")} />
                                <View style={{margin:10}}>
                                    <Text style={Style.textBold}>Joni Firdaus, S.S</Text>
                                    <Text style={{color:'#B2B5BF'}}>KEPALA SEKOLAH</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('DetailGuru')}>
                            <View style={{flexDirection:"row",borderBottomColor:'#E7E9F1',borderBottomWidth:1,width:WIDTH-50}}>
                                <Image style={{margin:10}} source={require("./../../assets/profile.png")} />
                                <View style={{margin:10}}>
                                    <Text style={Style.textBold}>Yulin Supriyatin, S.Pd</Text>
                                    <Text style={{color:'#B2B5BF'}}>WAKA HUMAS</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('DetailGuru')}>
                            <View style={{flexDirection:"row",borderBottomColor:'#E7E9F1',borderBottomWidth:1,width:WIDTH-50}}>
                                <Image style={{margin:10}} source={require("./../../assets/profile.png")} />
                                <View style={{margin:10}}>
                                    <Text style={Style.textBold}>Nico R Tambunan, S.Pd</Text>
                                    <Text style={{color:'#B2B5BF'}}>WAKA KURIKULUM</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('DetailGuru')}>
                            <View style={{flexDirection:"row",borderBottomColor:'#E7E9F1',borderBottomWidth:1,width:WIDTH-50}}>
                                <Image style={{margin:10}} source={require("./../../assets/profile.png")} />
                                <View style={{margin:10}}>
                                    <Text style={Style.textBold}>Juniarman Saragih, S.T</Text>
                                    <Text style={{color:'#B2B5BF'}}>WAKA SARPRAS</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('DetailGuru')}>
                            <View style={{flexDirection:"row",borderBottomColor:'#E7E9F1',borderBottomWidth:1,width:WIDTH-50}}>
                                <Image style={{margin:10}} source={require("./../../assets/profile.png")} />
                                <View style={{margin:10}}>
                                    <Text style={Style.textBold}>Nonita Br Barus, S.Pd</Text>
                                    <Text style={{color:'#B2B5BF'}}>WAKA KESISWAAN</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <TouchableOpacity  onPress={() => navigation.navigate('DetailGuru')}>
                            <View style={{flexDirection:"row",borderBottomColor:'#E7E9F1',borderBottomWidth:1,width:WIDTH-50}}>
                                <Image style={{margin:10}} source={require("./../../assets/profile.png")} />
                                <View style={{margin:10}}>
                                    <Text style={Style.textBold}>Renta Hutapea, S.E</Text>
                                    <Text style={{color:'#B2B5BF'}}>WAKA MANAJEMEN MUTU</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <TouchableOpacity>
                            <View style={{flexDirection:"row",borderBottomColor:'#E7E9F1',borderBottomWidth:1,width:WIDTH-50}}>
                                <Image style={{margin:10}} source={require("./../../assets/profile.png")} />
                                <View style={{margin:10}}>
                                    <Text style={Style.textBold}>Dedi Aviadi, S.Pd</Text>
                                    <Text style={{color:'#B2B5BF'}}>KAJUR IT RPL</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <TouchableOpacity>
                            <View style={{flexDirection:"row",borderBottomColor:'#E7E9F1',borderBottomWidth:1,width:WIDTH-50}}>
                                <Image style={{margin:10}} source={require("./../../assets/profile.png")} />
                                <View style={{margin:10}}>
                                    <Text style={Style.textBold}>Delly Afrianto, S.Pd</Text>
                                    <Text style={{color:'#B2B5BF'}}>KAJUR SENI TARI</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <TouchableOpacity>
                            <View style={{flexDirection:"row",borderBottomColor:'#E7E9F1',borderBottomWidth:1,width:WIDTH-50}}>
                                <Image style={{margin:10}} source={require("./../../assets/profile.png")} />
                                <View style={{margin:10}}>
                                    <Text style={Style.textBold}>Fandy Mahesa, S.Kom</Text>
                                    <Text style={{color:'#B2B5BF'}}>KAJUR TKJ</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <TouchableOpacity>
                            <View style={{flexDirection:"row",borderBottomColor:'#E7E9F1',borderBottomWidth:1,width:WIDTH-50}}>
                                <Image style={{margin:10}} source={require("./../../assets/profile.png")} />
                                <View style={{margin:10}}>
                                    <Text style={Style.textBold}>Joni Firdaus, S.S</Text>
                                    <Text style={{color:'#B2B5BF'}}>KEPALA SEKOLAH</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <TouchableOpacity>
                            <View style={{flexDirection:"row",borderBottomColor:'#E7E9F1',borderBottomWidth:1,width:WIDTH-50}}>
                                <Image style={{margin:10}} source={require("./../../assets/profile.png")} />
                                <View style={{margin:10}}>
                                    <Text style={Style.textBold}>Joni Firdaus, S.S</Text>
                                    <Text style={{color:'#B2B5BF'}}>KEPALA SEKOLAH</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <TouchableOpacity>
                            <View style={{flexDirection:"row",borderBottomColor:'#E7E9F1',borderBottomWidth:1,width:WIDTH-50}}>
                                <Image style={{margin:10}} source={require("./../../assets/profile.png")} />
                                <View style={{margin:10}}>
                                    <Text style={Style.textBold}>Joni Firdaus, S.S</Text>
                                    <Text style={{color:'#B2B5BF'}}>KEPALA SEKOLAH</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <TouchableOpacity>
                            <View style={{flexDirection:"row",borderBottomColor:'#E7E9F1',borderBottomWidth:1,width:WIDTH-50}}>
                                <Image style={{margin:10}} source={require("./../../assets/profile.png")} />
                                <View style={{margin:10}}>
                                    <Text style={Style.textBold}>Joni Firdaus, S.S</Text>
                                    <Text style={{color:'#B2B5BF'}}>KEPALA SEKOLAH</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <TouchableOpacity>
                            <View style={{flexDirection:"row",borderBottomColor:'#E7E9F1',borderBottomWidth:1,width:WIDTH-50}}>
                                <Image style={{margin:10}} source={require("./../../assets/profile.png")} />
                                <View style={{margin:10}}>
                                    <Text style={Style.textBold}>Joni Firdaus, S.S</Text>
                                    <Text style={{color:'#B2B5BF'}}>KEPALA SEKOLAH</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{marginTop:10, flexDirection:'row'}}>
                        <TouchableOpacity>
                            <View style={{flexDirection:"row",borderBottomColor:'#E7E9F1',borderBottomWidth:1,width:WIDTH-50}}>
                                <Image style={{margin:10}} source={require("./../../assets/profile.png")} />
                                <View style={{margin:10}}>
                                    <Text style={Style.textBold}>Joni Firdaus, S.S</Text>
                                    <Text style={{color:'#B2B5BF'}}>KEPALA SEKOLAH</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            </View>
        </SafeAreaView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content"/>
      </View>
    );
  }
}

export default Guru;
