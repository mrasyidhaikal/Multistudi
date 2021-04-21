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
  FlatList,
} from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import Style, {
  black,
  greyBorder,
  greyText,
  greenDone,
  merah,
  cream,
  kuning,
  ungu,
  biruMuda,
  biruTua,
} from "./../Style/Style";
import CalendarStrip from "react-native-calendar-strip";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import AddColorPick from "./../Component/AddColorPick";
import ColorPick from "./../Component/ColorPick";

const { width: WIDTH } = Dimensions.get("window");

const datesWhitelist = [
  moment(),

  // date range
  {
    start: moment(),
    end: moment().add(3, "days"),
  },
];

export const handleAddColor = async (warna) => {
  try {
    await AsyncStorage.setItem("warnaInputCard", warna);
  } catch (e) {
    // saving error
  }
};
const numColumn = 1;
class NotesView extends React.Component {
  constructor() {
    super();

    this.state = {
      refreshing: false,
      active: 0,
      selectDate: moment().format("MM/DD/YYYY"),
      notesData: [],
      titleText: "",
      bodyText: "",
      counter: 0,
      DateDisplay: "",
      displayFormat: "HH:mm",
      press: true,
      showColor: false,
      colorCard: "",
      TextInputDisableStatus: true,
    };
  }
  SelectedDate = (val) => {
    val = moment(val).format("MM/DD/YYYY");
    console.log(val);
    this.setState({ selectDate: val });
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
  showColor = () => {
    if (this.state.press == false) {
      this.setState({ showColor: false, press: true });
    } else {
      console.log("1");
      this.setState({ showColor: true, press: false });
    }
  };
  addNotes = async () => {
    try {
      let waktu = moment(
        this.state.selectDate +
          " " +
          moment(this.state.DateDisplay).format("HH:mm")
      );
      let data = {
        title: this.state.titleText,
        body: this.state.bodyText,
        warna: this.state.colorCard,
        waktu: waktu.format(),
      };

      await AsyncStorage.removeItem("warnaInputCard");
      this.setState({ colorCard: "" });

      const card = await AsyncStorage.getItem("cardCore").then((cardCore) => {
        const c = cardCore ? JSON.parse(cardCore) : [];
        c.push(data);
        this.setState({ notesData: c });

        AsyncStorage.setItem("cardCore", JSON.stringify(c));
      });
    } catch (e) {
      console.log(e);
    }
  };
  addColor = async () => {
    try {
      const value = await AsyncStorage.getItem("warnaInputCard");

      if (value !== null) {
        this.setState({ colorCard: value });
      }
    } catch (e) {
      // error reading value
    }
  };
  componentDidMount = async () => {
    const card = await AsyncStorage.getItem("cardCore");

    this.setState({ notesData: JSON.parse(card) });
  };

  // getDataByDate = async (selectedDate) => {
  //   const card = await AsyncStorage.getItem("cardCore");
  //   const card2 = JSON.parse(card);
  //   console.log(card2);
  //   // this.setState({ notesData: card });

  //   return card;
  // };

  _renderItemNotes = ({ item, index }) => {
    return (
      <View style={[Style.CardAddNotes]}>
        <View style={{ padding: 20, flexDirection: "row" }}>
          <AddColorPick warna={item.warna} />
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={Style.textBold20}>{item.title}</Text>
              <TouchableOpacity
                style={{
                  borderColor: "#000",
                  borderWidth: 1,
                  borderRadius: 8,
                  height: 30,
                  alignSelf: "flex-end",
                }}
              >
                <View style={{ marginHorizontal: 1 }}>
                  <Icon name={"ios-add"} size={25} color={"#000"} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: -10 }}>
              <Text style={Style.textNormalGrey}>{item.body}</Text>
              <Text style={Style.textNormalGrey}>{item.waktu}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    this.addColor();
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
                onDateSelected={(val) => this.SelectedDate(val)}
              />
            </View>
            <View style={[Style.CardAddNotes]}>
              <View style={{ padding: 20, flexDirection: "row" }}>
                <AddColorPick
                  warna={this.state.colorCard == "" ? "" : this.state.colorCard}
                />
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      placeholder="Tittle"
                      placeholderTextColor={greyText}
                      style={{ width: WIDTH - 120, height: 50, fontSize: 24 }}
                      onChangeText={(val) => this.setState({ titleText: val })}
                    />
                    <TouchableOpacity
                      style={{
                        borderColor: "#000",
                        borderWidth: 1,
                        borderRadius: 8,
                        height: 30,
                      }}
                      onPress={() => this.addNotes()}
                    >
                      <View style={{ marginHorizontal: 1 }}>
                        <Icon name={"ios-add"} size={25} color={"#000"} />
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{ marginTop: -10 }}>
                    <TextInput
                      placeholder="Your Note Here"
                      placeholderTextColor={black}
                      style={{ width: WIDTH - 55, height: 50, fontSize: 16 }}
                      onChangeText={(val) => this.setState({ bodyText: val })}
                    />
                  </View>

                  <View>
                    <TextInput
                      style={{
                        backgroundColor: greyBorder,
                        borderRadius: 10,
                        padding: 8,
                        width: 100,
                        paddingLeft: 45,
                      }}
                      placeholder={"Waktu"}
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
                  </View>

                  <DateTimePickerModal
                    mode="time"
                    isVisible={this.state.visibility}
                    onConfirm={this.handleConfirm}
                    onCancel={this.onPressCancel}
                  />

                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 15,
                      justifyContent: "flex-start",
                    }}
                  >
                    <TouchableOpacity onPress={this.showColor.bind(this)}>
                      <Icon
                        size={30}
                        color={greyText}
                        style={{ marginRight: 40 }}
                        name={
                          this.state.press == false
                            ? "ios-close"
                            : "ios-color-palette-outline"
                        }
                      />
                    </TouchableOpacity>
                    <View style={{ marginTop: 5, marginRight: -50 }}>
                      {this.state.showColor == true ? (
                        <ColorPick />
                      ) : (
                        <Text style={Style.textNormalBlack}>
                          {this.state.colorCard == "" ? (
                            "Pilih Warna"
                          ) : (
                            <View
                              style={{
                                borderRadius: 50,
                                width: 25,
                                height: 25,
                                backgroundColor: this.state.colorCard,
                                marginHorizontal: 1.5,
                              }}
                            />
                          )}
                        </Text>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={Style.ContainerViewBiasa}>
              <Text style={Style.headerText}>My Notes</Text>
            </View>

            <FlatList
              data={this.state.notesData}
              renderItem={this._renderItemNotes}
              keyExtractor={(item, index) => index.toString()}
              numColumns={numColumn}
            />
          </ScrollView>
        </SafeAreaView>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      </View>
    );
  }
}

export default NotesView;
