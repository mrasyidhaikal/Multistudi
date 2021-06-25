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
    width: WIDTH - 25,
    marginLeft: 10,
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
  TextTagihanSPP: {
    fontWeight: "bold",
    color: "#3FA2F7",
  },
  buttonLunas: {
    borderRadius: 7,
    backgroundColor: "#F6F6FA",
    alignItems: "center",
    width: WIDTH - 300,
  },
  buttonLunasText: {
    color: "#B2B5BF",
    marginVertical: 10,
    fontWeight: "bold",
  },
  buttonBayar: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: "#FF3737",
    alignItems: "center",
    width: WIDTH - 300,
  },
  buttonBayarText: {
    color: "#FF3737",
    marginVertical: 10,
    fontWeight: "bold",
  },
  buttonMetodeBank: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 20,
    alignItems: "center",
    paddingBottom: 25,
    width: "85%",
    borderBottomWidth: 1,
    borderBottomColor: "#F6F6FA",
  },
  containerMetodePembayaran: {
    flexDirection: "row",
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#E7E9F1",
    width: WIDTH - 80,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  containerCicilan: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#E7E9F1",
    width: WIDTH / 2.3,
  },
});

export default PembayranStyle;
