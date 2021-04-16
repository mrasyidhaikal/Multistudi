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

const PembayranStyle = StyleSheet.create({
  CardPembayaran: {
    width: WIDTH - 50,
    marginLeft: 20,
    borderRadius: 20,
    zIndex: 999,
    backgroundColor: "#F6F6FA",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  CardHarga: {
    width: WIDTH - 50,
    marginTop: -20,
    paddingTop: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    marginLeft: 20,
    borderRadius: 20,
    backgroundColor: "#eef3fa",
  },
  buttonRed: {
    backgroundColor: "#FF3737",
    borderRadius: 10,
    width: 121,
    height: 50,
  },
});

export default PembayranStyle;
