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
import AddColorPick from "./AddColorPick";
import { handleAddColor } from "./../../View/Notes/NotesView";

function ColorPick() {
  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity
        onPress={() => handleAddColor(merah)}
        style={{
          borderRadius: 50,
          width: 25,
          height: 25,
          backgroundColor: merah,
          marginHorizontal: 1.5,
        }}
      />
      <TouchableOpacity
        onPress={() => handleAddColor(cream)}
        style={{
          borderRadius: 50,
          width: 25,
          height: 25,
          backgroundColor: cream,
          marginHorizontal: 1.5,
        }}
      />
      <TouchableOpacity
        onPress={() => handleAddColor(kuning)}
        style={{
          borderRadius: 50,
          width: 25,
          height: 25,
          backgroundColor: kuning,
          marginHorizontal: 1.5,
        }}
      />
      <TouchableOpacity
        onPress={() => handleAddColor(greenDone)}
        style={{
          borderRadius: 50,
          width: 25,
          height: 25,
          backgroundColor: greenDone,
          marginHorizontal: 1.5,
        }}
      />
      <TouchableOpacity
        onPress={() => handleAddColor(ungu)}
        style={{
          borderRadius: 50,
          width: 25,
          height: 25,
          backgroundColor: ungu,
          marginHorizontal: 1.5,
        }}
      />
      <TouchableOpacity
        onPress={() => handleAddColor(biruMuda)}
        style={{
          borderRadius: 50,
          width: 25,
          height: 25,
          backgroundColor: biruMuda,
          marginHorizontal: 1.5,
        }}
      />
      <TouchableOpacity
        onPress={() => handleAddColor(biruTua)}
        style={{
          borderRadius: 50,
          width: 25,
          height: 25,
          backgroundColor: biruTua,
          marginHorizontal: 1.5,
        }}
      />
    </View>
  );
}

export default ColorPick;
