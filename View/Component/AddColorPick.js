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

function AddColorPick({ warna }) {
  return (
    <View
      style={{
        width: 7,
        backgroundColor: warna,
        borderRadius: 10,
        marginRight: 15,
      }}
    ></View>
  );
}

export default AddColorPick;
