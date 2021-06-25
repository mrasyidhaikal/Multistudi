import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import moment from "moment";
class CallData extends React.Component {
  getData = async (UserData) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const data = await AsyncStorage.getItem("objectReturn");

      const newData = JSON.parse(data);
      // console.log(newData)

      if (UserData == "name") {
        return newData.name;
      } else if (UserData == "userid") {
        return newData.userid;
      } else if (UserData == "email") {
        return newData.email;
      } else if (UserData == "token") {
        return newData.token;
      } else if (UserData == "major") {
        return newData.major;
      } else if (UserData == "kelas") {
        return newData.kelas;
      } else if (UserData == "phone") {
        return newData.phone;
      } else if (UserData == "address") {
        return newData.address;
      } else if (UserData == "status") {
        return newData.status;
      } else if (UserData == "tgllahir") {
        return newData.tgllahir;
      } else if (UserData == "fotoprofile") {
        return newData.fotoprofile;
      } else if (UserData == "fotoprofile2") {
        return newData.fotoprofile2;
      } else if (UserData == "tokenExpire") {
        return moment(newData.tokenExpire).format("YYYY-MM-DD hh:mm");
      } else if (UserData == "dataLengkap") {
        return newData;
      }

      if (token !== null) {
        // value previously stored
        this.state({ token: token });
      }
      if (data !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };
}
const call = new CallData();

export default call;
