import * as React from "react";
import { StatusBar, StyleSheet } from "react-native";
import {
  biru,
  merah,
  windowHeight,
  WIDTH,
  greenDone,
  greyBorder,
  greyText,
  black,
  white,
} from "./Style";

const HomeStyle = StyleSheet.create({
  CardMapel: {
    width: 165,
    height: 209,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: "#7772D6",
  },
  CardProgramStudi: {
    padding: 5,
    margin: 5,
    borderRadius: 20,
    width: 165,
    height: 209,
    shadowColor: "#93A5BA",
    shadowOpacity: 0.5,
    elevation: 3,
    shadowRadius: 35,
    shadowOffset: { width: 1, height: 13 },
  },
});

export default HomeStyle;
