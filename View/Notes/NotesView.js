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
  ImageBackground,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Style, { black, greyBorder, greyText } from "./../Style/Style";
import CalendarStrip from "react-native-calendar-strip";
import DateTimePickerModal from "react-native-modal-datetime-picker";
const { width: WIDTH } = Dimensions.get("window");
const datesWhitelist = [
  moment(),

  // date range
  {
    start: moment(),
    end: moment().add(3, "days"),
  },
];
class NotesView extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
      dateTest: Date(),
      jumlahNote: [{ key: 1, titleText: "", waktu: moment() }],
      counter: 0,
      displayFormat: "HH MM",
    };
  }
  Coba = (val) => {
    this.setState({ dateTest: val });
    console.log(val);
  };

  handleConfirm = (date) => {
    this.setState({ DateDisplay: date });
    this.setState({ visibility: false });
    this.setState({ TextInputDisableStatus: true });
  };
  onPressCancel = () => {
    this.setState({ visibility: false });
    this.setState({ TextInputDisableStatus: true });
  };
  onPressButton = () => {
    this.setState({ visibility: true });
    this.setState({ TextInputDisableStatus: false });
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={Style.container}>
        <SafeAreaView>
          <ScrollView>
            <View style={[Style.NavBackContainer, { marginTop: 40 }]}>
              <Text style={Style.headerText}>Notes</Text>
            </View>
            <View style={Style.ContainerViewBiasa}>
              <CalendarStrip
                datesWhitelist={datesWhitelist}
                scrollable={true}
                onDateSelected={(val) => this.Coba(val)}
              />
            </View>
            <View style={[Style.ContainerViewBiasa]}>
              <TextInput
                placeholder="Tittle"
                placeholderTextColor={greyText}
                style={{ width: WIDTH - 55, height: 50, fontSize: 24 }}
              />

              <TextInput
                placeholder="Your Note Here"
                placeholderTextColor={black}
                style={{ width: WIDTH - 55, height: 50, fontSize: 16 }}
              />
              <TextInput />
              <View>
                <TextInput
                  style={{
                    backgroundColor: greyBorder,
                    borderRadius: 10,
                    padding: 8,
                    width: 180,
                    paddingLeft: 45,
                  }}
                  placeholder={"Tambahkan Waktu"}
                  placeholderTextColor={greyText}
                  underlineColorAndroid="transparent"
                  editable={this.state.TextInputDisableStatus}
                  pointerEvents="none"
                  selectTextOnFocus={false}
                  onTouchStart={this.onPressButton}
                  value={
                    this.state.DateDisplay
                      ? moment(this.state.DateDisplay).format(
                          this.state.displayFormat
                        )
                      : ""
                  }
                />
                <Icon
                  name={"ios-time-outline"}
                  size={25}
                  color={greyText}
                  style={Style.inputIcon}
                />

                <DateTimePickerModal
                  mode="time"
                  isVisible={this.state.visibility}
                  onConfirm={this.handleConfirm}
                  onCancel={this.onPressCancel}
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      </View>
    );
  }
}

export default NotesView;
