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
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import {
  Style,
  greenDone,
  merah,
  cream,
  kuning,
  ungu,
  biruMuda,
  biruTua,
} from "./../Style/Style";

function HobiTextView({ item }) {
  if (item.key == 1) {
    return (
      <View style={Style.inputContainer}>
        <TextInput
          style={Style.input}
          placeholder={"Tambah Minat/Hobimu"}
          placeholderTextColor={"#B2B5BF"}
          underlineColorAndroid="transparent"
          // onChangeText={val => this.setState({email:val})}
        />
      </View>
    );
  } else {
    return (
      <View style={Style.inputContainer}>
        <TextInput
          style={Style.input}
          placeholder={"Tambah Minat/Hobimu"}
          placeholderTextColor={"#B2B5BF"}
          underlineColorAndroid="transparent"
          // onChangeText={val => this.setState({email:val})}
        />
        <TouchableOpacity
          style={Style.btnRemove}
          onPress={() => this.removeTextView(item.key)}
        >
          <Icon name={"ios-remove-circle"} size={26} color={"#FF3737"} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default HobiTextView;
