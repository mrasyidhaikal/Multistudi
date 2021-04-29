import React, { Component } from "react";
import moment from "moment";

class RegistrasiNewSiswaModel extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      display: 1,
      displayFormat: "DD MMM YYYY",
      dataSiswa: [],

      //wali 1
      DateBirthWali1: "",
      Wali1: "",
      agamaWali1: "",
      LastEdWali1: "",
      mguardname: "",
      mguardmobile: "",
      mguardaddress: "",
      mguardbirthplace: "",
      mguardoccupation: "",
      mguardoccupationaddress: "",
      //Wali 2
      DateBirthWali2: "",
      Wali2: "",
      agamaWali2: "Islam",
      LastEdWali2: "",
      fguardname: "",
      fguardmobile: "",
      fguardaddress: "",
      fguardbirthplace: "",
      fguardoccupation: "",
      fguardoccupationaddress: "",
    };
  }
}
const RegisSiswaModel = new RegistrasiNewSiswaModel();

export default RegisSiswaModel;
