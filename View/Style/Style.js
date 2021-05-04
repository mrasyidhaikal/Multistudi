import * as React from "react";

import { StyleSheet, Dimensions } from "react-native";
export const { width: WIDTH } = Dimensions.get("window");
export const windowHeight = Dimensions.get("window").height;
export const black = "#000000";
export const white = "#fff";
export const greyText = "#B2B5BF";
export const greyBorder = "#E7E9F1";
export const backgroundBlue = "#3FA2F7";
export const greenDone = "#06BFAD";
export const biru = "#3FA2F7";

export const merah = "#FF3737";
export const cream = "#FFAC7A";
export const kuning = "#FFD671";
export const ungu = "#7772D6";
export const biruMuda = "#3797DB";
export const biruTua = "#4951EC";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  textNormalBlack: {
    fontSize: 16,
    color: black,
  },
  textNormalWhite: {
    fontSize: 16,
    color: white,
  },
  textNormalGrey: {
    fontSize: 16,
    color: greyText,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: black,
  },
  textBold: {
    fontWeight: "bold",
    fontSize: 18,
    color: black,
  },
  textBold20: {
    fontWeight: "bold",
    fontSize: 20,
    color: black,
  },
  textBoldCenter: {
    fontWeight: "bold",
    fontSize: 18,
    color: black,
    textAlign: "center",
  },
  buttonGhostText: {
    fontSize: 16,
    fontWeight: "bold",
    color: greyText,
    textAlign: "center",
  },
  buttonGhost: {
    borderRadius: 10,
    borderColor: greyText,
    backgroundColor: white,
    borderWidth: 2,
    width: WIDTH - 55,
    height: 50,
    justifyContent: "center",
  },
  buttonBlueActive: {
    borderRadius: 10,
    backgroundColor: backgroundBlue,
    padding: 10,
  },
  buttonDokumen: {
    borderRadius: 10,
    borderColor: biru,
    backgroundColor: white,
    borderWidth: 1,
    height: 70,
    width: WIDTH - 55,
    marginVertical: 10,
    justifyContent: "center",
  },
  buttonBlank: {
    padding: 10,
  },
  buttonRed : {
    borderRadius: 10,
    backgroundColor: merah,
    height: 50,
    width: WIDTH - 55,
    marginVertical: 10,
    justifyContent: "center",
    alignSelf:'center',
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 20,
    backgroundColor: white,
    color: black,
    borderColor: greyText,
    borderWidth: 1,
  },
  NavBackContainer: {
    marginLeft: 20,
    marginTop: windowHeight / 20,
  },
  ContainerViewBiasa: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  ContainerViewHorizontal: {
    margin: 20,
    paddingVertical: 10,
    flexDirection: "row",
  },
  ContainerViewHorizontalSpace: {
    margin: 20,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  ContainerViewDokumen: {
    margin: 20,
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btnRemove: {
    position: "absolute",
    top: 8,
    right: 25,
  },
  imageSlider: {
    borderRadius: 10,
    height: 170,
    margin: 9,
  },
  paging: {
    flexDirection: "row",

    justifyContent: "center",
  },
  inputIcon: {
    position: "absolute",

    top: 8,
    left: 10,
    paddingRight: 5,
  },
  cardFeature: {
    padding: 5,
    margin: 5,
    backgroundColor: "#fff",
    borderRadius: 20,
    width: WIDTH / 3.7,
    shadowColor: "#93A5BA",
    shadowOpacity: 0.5,
    elevation: 3,
    shadowRadius: 35,
    shadowOffset: { width: 1, height: 13 },
  },
  CardAddNotes: {
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#93A5BA",
    shadowOpacity: 0.5,
    elevation: 3,
    shadowRadius: 35,
    shadowOffset: { width: 1, height: 13 },
    marginHorizontal: 20,
    marginBottom: 25,
  },
});

export default styles;
