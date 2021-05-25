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
  ToastAndroid,
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

// const addColor = async () => {
//   try {
//     const value = await AsyncStorage.getItem("warnaInputCard");

//     if (value !== null) {
//       this.setState({ colorCard: value });
//     }
//   } catch (e) {
//     // error reading value
//   }
// };
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

      DateDisplay: "",
      displayFormat: "HH:mm A",
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
      // console.log("1");
      this.setState({ showColor: true, press: false });
    }
  };
  clearAsyncStorage = async () => {
    AsyncStorage.clear();
    this.setRefreshing();
    console.log("Async Storage Cleared !");
  };
  handleAddColor = async (warna) => {
    this.setState({ colorCard: warna });
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

      // await AsyncStorage.removeItem("warnaInputCard");
      //this.setState({ colorCard: "" });

      const card = await AsyncStorage.getItem("cardCore").then((cardCore) => {
        const c = cardCore ? JSON.parse(cardCore) : [];
        c.push(data);
        this.setState({ notesData: c });

        AsyncStorage.setItem("cardCore", JSON.stringify(c));
        this.showToast("Note Saved !");
        this.clearTextInput();
      });
    } catch (e) {
      console.log(e);
    }
  };
  clearTextInput = () => {
    this.textInput.clear();
    this.notetextInput.clear();
    this.hourtextInput.clear();
  };

  getDataCard = async () => {
    const card = await AsyncStorage.getItem("cardCore");

    // if (this.setState({ notesData: JSON.parse(card) })){
    this.setState({ notesData: JSON.parse(card) });
    this.setState({ refreshing: false });
    // }
  };

  setRefreshing = () => {
    if (this.state.refreshing == false) {
      this.setState({ refreshing: true });
      this.getDataCard();
    }
  };
  removeNotes = async (index) => {
    //AsyncStorage.removeItem("cardCore");
    //console.log(this.state.notesData);
    const card = await AsyncStorage.getItem("cardCore").then((cardCore) => {
      const c = cardCore ? JSON.parse(cardCore) : [];
      c.splice(index, 1);
      this.setState({ notesData: c });

      AsyncStorage.setItem("cardCore", JSON.stringify(c));
      this.showToast("Note Deleted !");
    });
  };

  componentDidMount = async () => {
    this.getDataCard();

    this.props.navigation.addListener("focus", this.getDataCard);
  };

  // getDataByDate = async (selectedDate) => {
  //   const card = await AsyncStorage.getItem("cardCore");
  //   const card2 = JSON.parse(card);
  //   console.log(card2);
  //   // this.setState({ notesData: card });

  //   return card;
  // };

  showToast = (val) => {
    ToastAndroid.show(val, ToastAndroid.SHORT);
  };

  _renderItemNotes = ({ item, index }) => {
    if (this.state.selectDate === moment(item.waktu).format("MM/DD/YYYY")) {
      return (
        <View style={[Style.CardAddNotes]}>
          <View style={{ padding: 20, flexDirection: "row" }}>
            <AddColorPick warna={item.warna} />
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: WIDTH - 100,
                }}
              >
                <Text style={Style.textBold20}>{item.title}</Text>
                <TouchableOpacity
                  style={{
                    borderColor: "#FF3737",
                    borderWidth: 1,
                    borderRadius: 8,
                    height: 30,
                    marginHorizontal: 10,
                    // backgroundColor: 'black'
                  }}
                  onPress={() => this.removeNotes(index)}
                >
                  <View style={{ marginHorizontal: 1 }}>
                    <Icon name={"ios-close"} size={25} color={"#FF3737"} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={Style.textNormalGrey}>{item.body}</Text>
                <Text style={Style.textNormalGrey}>
                  {moment(item.waktu).calendar(null, {
                    sameDay: "[Today]",
                    nextDay: "[Tomorrow]",
                    nextWeek: "dddd",
                    lastDay: "[Yesterday]",
                    lastWeek: "[Last] dddd",
                    sameElse: 'ddd, DD MMMM YYYY"',
                  })}
                </Text>
                <Text style={Style.textNormalGrey}>
                  {moment(item.waktu).format("HH:MM A")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    } else {
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
            Belum ada catatan
          </Text>
          <Text style={{ color: "#B2B5BF" }}>tambahkan catatan baru</Text>
        </View>
      );
    }
  };

  _listEmptyComponent = () => {
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
          Belum ada catatan
        </Text>
        <Text style={{ color: "#B2B5BF" }}>tambahkan catatan baru</Text>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;

    return (
      <View style={Style.container}>
        <SafeAreaView>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.setRefreshing}
              />
            }
          >
            <View style={[Style.NavBackContainer, { marginTop: 40 }]}>
              <Text style={Style.headerText}>Notes</Text>
            </View>
            <View style={Style.ContainerViewBiasa}>
              <CalendarStrip
                daySelectionAnimation={{
                  type: "background",
                  duration: 200,
                  borderWidth: 1,
                  highlightColor: greyBorder,
                }}
                datesWhitelist={datesWhitelist}
                scrollable={true}
                onDateSelected={(val) => this.SelectedDate(val)}
              />
            </View>
            <View style={Style.CardAddNotes}>
              <View style={{ padding: 20, flexDirection: "row" }}>
                <View
                  style={{
                    width: 7,
                    backgroundColor: this.state.colorCard,
                    borderRadius: 10,
                    marginRight: 15,
                  }}
                ></View>

                <View>
                  <View style={{ flexDirection: "row" }}>
                    <TextInput
                      placeholder="Title"
                      placeholderTextColor={greyText}
                      style={{ width: WIDTH - 120, height: 50, fontSize: 24 }}
                      onChangeText={(val) => this.setState({ titleText: val })}
                      clearButtonMode="always"
                      ref={(input) => {
                        this.textInput = input;
                      }}
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
                      placeholderTextColor={greyText}
                      style={{ width: WIDTH - 55, height: 50, fontSize: 16 }}
                      onChangeText={(val) => this.setState({ bodyText: val })}
                      ref={(input) => {
                        this.notetextInput = input;
                      }}
                    />
                  </View>

                  <View>
                    <TextInput
                      style={{
                        backgroundColor: greyBorder,
                        borderRadius: 10,
                        padding: 8,
                        width: 120,
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
                      ref={(input) => {
                        this.hourtextInput = input;
                      }}
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
                        <View style={{ flexDirection: "row" }}>
                          <TouchableOpacity
                            onPress={() => this.handleAddColor(merah)}
                            style={{
                              borderRadius: 50,
                              width: 25,
                              height: 25,
                              backgroundColor: merah,
                              marginHorizontal: 1.5,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => this.handleAddColor(cream)}
                            style={{
                              borderRadius: 50,
                              width: 25,
                              height: 25,
                              backgroundColor: cream,
                              marginHorizontal: 1.5,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => this.handleAddColor(kuning)}
                            style={{
                              borderRadius: 50,
                              width: 25,
                              height: 25,
                              backgroundColor: kuning,
                              marginHorizontal: 1.5,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => this.handleAddColor(greenDone)}
                            style={{
                              borderRadius: 50,
                              width: 25,
                              height: 25,
                              backgroundColor: greenDone,
                              marginHorizontal: 1.5,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => this.handleAddColor(ungu)}
                            style={{
                              borderRadius: 50,
                              width: 25,
                              height: 25,
                              backgroundColor: ungu,
                              marginHorizontal: 1.5,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => this.handleAddColor(biruMuda)}
                            style={{
                              borderRadius: 50,
                              width: 25,
                              height: 25,
                              backgroundColor: biruMuda,
                              marginHorizontal: 1.5,
                            }}
                          />
                          <TouchableOpacity
                            onPress={() => this.handleAddColor(biruTua)}
                            style={{
                              borderRadius: 50,
                              width: 25,
                              height: 25,
                              backgroundColor: biruTua,
                              marginHorizontal: 1.5,
                            }}
                          />
                        </View>
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
              ListEmptyComponent={this._listEmptyComponent}
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
