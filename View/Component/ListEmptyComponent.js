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
import { greyText } from "../Style/Style";

function listEmptyComponent() {
  return (
    <View style={{ marginVertical: 25, alignItems: "center" }}>
      <Icon name={"ios-reader"} size={64} color={greyText} />
      <Text
        style={{
          color: "#B2B5BF",
          marginTop: 10,
          fontWeight: "bold",
          fontSize: 20,
        }}
      >
        Belum ada Data
      </Text>
    </View>
  );
}

export default listEmptyComponent;
