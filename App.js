/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  FlatList,
  View,
  Modal,
  Picker,Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
    PermissionsAndroid,
  Alert
} from "react-native";
import { Navigation } from "react-native-navigation";

import RNHTMLtoPDF from "react-native-html-to-pdf";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      list: [],
      named: "",
      shash: [],
      modalVisible: false,
      loadModal: true,
      newUserModal: false,
      modalEdit: false
    };

    this.getHistory();
  }

  sendOrders() {
    Alert.alert(
      "ثبت سفارش...",
      "آیا مطمین هستید؟",
      [
        { text: "بله", onPress: () => this.sendToServer() },
        {
          text: "خیر",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  }
  deleteFromServer(id) {
    let gooz = { id: id };

    fetch("http://koalafruit.ir/api/remove_stationery.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gooz)
    }).then(response => {
      if (response.status === 200 && response.ok) {
        fetch("http://koalafruit.ir/api/get_stationery.php")
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson, "lqlqlqlqlqlq");
            this.setState({
              list: responseJson,
              list2: responseJson,
              refresh: !this.state.refresh
            });
          });
        alert("حذف با موفقیت انجام شد!");
      }
    });
  }
  sendToServer() {
    let r = this.state.list;
    let ghoo = r.filter(x => x.stationery_available !== "0");
    console.log(ghoo, "sjslsfklsdksklsj");
    let selectedFormat = "jYYYY/jMM/jDD";
    let time = "HH:MM";

    let rrr = moment().format(selectedFormat);

    for (let i = 0; i < ghoo.length; i++) {
      ghoo[i].stationery_mount = this.state.user;
      ghoo[i].date = rrr;
      ghoo[i].phone = this.state.phone;
    }
    console.log(ghoo, "sjslsfklsdksklsj");
    fetch("http://koalafruit.ir/api/oriori_stationery.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ghoo)
    }).then(response => {
      console.log(response.status, "dfdfdfdfd");
      if (response.status === 200 && response.ok) {
        alert("ثبت خرید با موفقیت انجام شد.");
      }
    });
  }
  getHistory() {
    console.log("hhhhhhh");
    fetch("http://koalafruit.ir/get_stationery_main.php")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, "lqlqlqlqlqlq");

        this.setState({
          list: responseJson,
          list2: responseJson,
          loadModal: false
        });
      })
      .catch(error => {
        console.error(error);
      });

    // this.setState({ goh: ui });
  }

  deleteIt(id) {
    Alert.alert(
      "حذف محصول",
      "آیا مطمین هستید؟",
      [
        { text: "بله", onPress: () => this.deleteFromServer(id) },
        {
          text: "خیر",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  }
  login() {
    if (
      this.state.mounut === "" ||
      this.state.name === "" ||
      this.state.price === ""
    ) {
      alert("ورودی ها کامل نیستند!!!");
    } else {
      this.setState({ loading: true });
      let omo = {
        name: this.state.name,
        price: this.state.price,
        mount: this.state.mount,
        type: this.state.type
      };
      console.log(omo, "kdfkljdfkldjkldj");

      fetch("http://koalafruit.ir/api/new_stationery.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(omo)
      }).then(response => {
        if (response.status === 200 && response.ok) {
          fetch("http://koalafruit.ir/api/get_stationery.php")
            .then(response => response.json())
            .then(responseJson => {
              console.log(responseJson, "lqlqlqlqlqlq");
              this.setState({
                list: responseJson,
                list2: responseJson,
                loading: false,
                refresh: !this.state.refresh,
                modalVisible: false
              });
            });
          alert("ثبت با موفقیت انجام شد!");
        }
      });
    }
  }
  
  login() {
    if (
      (this.state.mounut === "" ||
        this.state.name === "" ||
        this.state.price === "" ||
        this.state.whole_sale_name === "" ||
        this,
      this.state.whole_sale_price === "")
    ) {
      alert("ورودی ها کامل نیستند!!!");
    } else {
      this.setState({ loading: true });
      let omo = {
        name: this.state.name,
        price: this.state.price,
        mount: this.state.mount,
        type: this.state.type,
        whole_name: this.state.whole_sale_name,
        whole_price: this.state.whole_sale_price
      };
      console.log(omo, "kdfkljdfkldjkldj");

      fetch("http://koalafruit.ir/api/new_stationery.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(omo)
      }).then(response => {
        if (response.status === 200 && response.ok) {
          fetch("http://koalafruit.ir/api/get_stationery.php")
            .then(response => response.json())
            .then(responseJson => {
              console.log(responseJson, "lqlqlqlqlqlq");
              this.setState({
                list: responseJson,
                list2: responseJson,
                loading: false,
                refresh: !this.state.refresh,
                modalVisible: false,
                name: "",
                price: "",
                mount: "",
                type: "",
                whole_sale_name: "",
                whole_sale_price: ""
              });
            });
          alert("ثبت با موفقیت انجام شد!");
        }
      });
    }
  }
  editPro() {
    if (
      (this.state.mounut === "" ||
        this.state.name === "" ||
        this.state.price === "" ||
        this.state.whole_sale_name === "" ||
        this,
      this.state.whole_sale_price === "")
    ) {
      alert("ورودی ها کامل نیستند!!!");
    } else {
      this.setState({ loading: true });
      let omo = {
        id: this.state.edit_id,
        name: this.state.edit_name,
        price: this.state.edit_price,
        mount: this.state.edit_mount,
        type: this.state.edit_type,
        whole_name: this.state.edit_whole_name,
        whole_price: this.state.edit_whole_price
      };
      console.log(omo, "kdfkljdfkldjkldj");

      fetch("http://koalafruit.ir/api/edit_stationery.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(omo)
      }).then(response => {
        console.log(response, "dldlfkfdf");
        if (response.status === 200 && response.ok) {
          fetch("http://koalafruit.ir/api/get_stationery.php")
            .then(response => response.json())
            .then(responseJson => {
              console.log(responseJson, "lqlqlqlqlqlq");
              this.setState({
                list: responseJson,
                list2: responseJson,
                loading: false,
                refresh: !this.state.refresh,
                modalEdit: false
              });
            });
          alert("اصلاح با موفقیت انجام شد!");
        }
      });
    }
  }
  render() {
      let width= Dimensions.get('window').width;
          let ui = [];
    for (let i = 0; i <= 100; i++) {
      ui.push(i.toString());
    }
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            width: width,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ width: "25%" }}>{" " + "موجودی" + ":"}</Text>
          <View
            style={{
              flexDirection: "column",
              width: "25%",
              textAlign: "right",
              marginBottom: 13,
              marginTop: 13
            }}
          >
            <Text
              style={{
                textAlign: "center",
                marginBottom: 3,
                marginTop: 3,
                color: "green"
              }}
            >
              {"قیمت" + " "}
            </Text>
            <Text
              style={{
                textAlign: "center",
                marginBottom: 3,
                marginTop: 3,
                color: "orange"
              }}
            >
              {"قیمت خرید" + " "}
            </Text>
          </View>
          <Text style={{ width: "25%", textAlign: "center" }}>
            {"نوع محصول"}
          </Text>
          <View style={{ flexDirection: "column", width: "25%" }}>
            <Text style={{ textAlign: "center", color: "green" }}>
              {"نام محصول"}
            </Text>
            <Text style={{ textAlign: "center", color: "orange" }}>
              {"نام عمده فروش"}
            </Text>
          </View>
        </View>
        <FlatList
          keyExtractor={(item, index) => item + index}
          data={this.state.list}
          extraData={this.state.refresh}
          style={{ width: width }}
          renderItem={({ item, index }) => (
            <TouchableHighlight
              underlayColor="white"
              onPress={() =>
                this.setState({
                  edit_id: item.stationery_id,
                  edit_mount: item.stationery_mount,
                  edit_name: item.stationery_name,
                  edit_price: item.stationery_price,
                  edit_type: item.stationery_type,
                  edit_whole_name: item.whole_sale_name,
                  edit_whole_price: item.whole_sale_price,
                  modalEdit: true
                })
              }
              style={{
                borderRadius: 7,
                marginLeft: 7,
                justifyContent: "center",
                alignItems: "center",
                width: '97%'
              }}
            >
              <View
                style={
                  item.stationery_available !== "0"
                    ? {
                        borderWidth: 2,
                        borderColor: "#00B16A",
                        borderRadius: 7,
                        flexDirection: "row",
                        backgroundColor: "white",
                        margin: 3,
                        alignItems: "center",
                        justifyContent: "center",
                        width: '100%'
                      }
                    : {
                        borderWidth: 2,
                        borderColor: "red",
                        borderRadius: 7,
                        flexDirection: "row",
                        backgroundColor: "white",
                        margin: 3,
                        alignItems: "center",
                        justifyContent: "center",
                        width: '100%'
                      }
                }
              >
                <Text>{" " + "موجودی" + ":" + item.stationery_mount}</Text>
                <View
                  style={{
                    flexDirection: "column",
                    width: "20%",
                    textAlign: "right",
                    marginBottom: 13,
                    marginTop: 13
                  }}
                >
                  <Text
                    style={{
                      textAlign: "right",
                      marginBottom: 3,
                      marginTop: 3,
                      color: "green"
                    }}
                  >
                    {item.stationery_price + " " + "تومان"}
                  </Text>
                  <Text
                    style={{
                      textAlign: "right",
                      marginBottom: 3,
                      marginTop: 3,
                      color: "orange"
                    }}
                  >
                    {item.whole_sale_price + " " + "تومان"}
                  </Text>
                </View>
                <Text style={{ width: "23%", textAlign: "right" }}>
                  {item.stationery_type}
                </Text>
                <View style={{ flexDirection: "column", width: "23%" }}>
                  <Text style={{ textAlign: "right" }}>
                    {item.stationery_name}
                  </Text>
                  <Text style={{ textAlign: "right" }}>
                    {item.whole_sale_name}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
        <View
          style={{
            height: 53,
            width: width,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <TouchableHighlight
            underlayColor="#9a12b3"
            style={{
              backgroundColor: "#9a12b3",
              borderRadius: 7,
              marginLeft: 1,
              marginRight: 1,
              width: "24%",
              marginBottom: 13,
              justifyContent: "center",
              alignItems: "center",
              height: 47
            }}
            onPress={() => {
              this.setState({ modalVisible: true });
            }}
          >
            <Text style={{ color: "white", fontSize: 19, textAlign: "center" }}>
              {" "}
              محصول جدید
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#4183d7"
            style={{
              backgroundColor: "#4183d7",
              borderRadius: 7,
              marginLeft: 1,
              marginRight: 1,
              width: "24%",
              marginBottom: 13,
              justifyContent: "center",
              alignItems: "center",
              height: 47
            }}
            onPress={() => {
              this.props.navigator.push({
                screen: "com.koalasolution.salehi.Customers"
              });
            }}
          >
            <Text style={{ color: "white", fontSize: 19, textAlign: "center" }}>
            
               کاربران
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#03c9a9"
            style={{
              backgroundColor: "#03c9a9",
              borderRadius: 7,
              marginLeft: 1,
              marginRight: 1,
              width: "24%",
              marginBottom: 13,
              justifyContent: "center",
              alignItems: "center",
              height: 47
            }}
            onPress={() => {
              this.setState({ loadModal: true });
              this.getHistory();
            }}
          >
            <Text style={{ color: "white", fontSize: 19, textAlign: "center" }}>
              {" "}
              تازه سازی
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#F9BF3B"
            style={{
              backgroundColor: "#F9BF3B",
              borderRadius: 7,
              marginLeft: 1,
              marginRight: 1,
              width: "24%",
              marginBottom: 13,
              justifyContent: "center",
              alignItems: "center",
              height: 47
            }}
            onPress={() =>
              this.props.navigator.push({
                screen: "com.koalasolution.salehi.Orders"
              })
            }
          >
            <Text style={{ color: "black", fontSize: 17, margin: 13 }}>
              سفارش ها
            </Text>
          </TouchableHighlight>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100%"
            }}
          >
            {this.state.loading ? (
              <View
                style={{
                  backgroundColor: "#E4F1FE",
                  width: "80%",
                  height: "33%",
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <ActivityIndicator color="#7E07A9" />
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: "#9a12b3",
                  width: "80%",
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TextInput
                  style={{
                    marginBottom: 7,
                    marginTop: 13,
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 7,
                    margin: 3,
                    width: '95%',
                    textAlign: "right"
                  }}
                  placeholder="نام محصول"
                  onChangeText={text => this.setState({ name: text })}
                />
                <TextInput
                  style={{
                    marginBottom: 7,
                    marginTop: 7,
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 7,
                    margin: 7,
                      width: '95%',
                    textAlign: "right"
                  }}
                  placeholder="نوع محصول"
                  onChangeText={text => this.setState({ type: text })}
                />
                <TextInput
                  style={{
                    marginBottom: 7,
                    marginTop: 7,
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 7,
                    margin: 7,
                      width: '95%',
                    textAlign: "right"
                  }}
                  keyboardType="numeric"
                  placeholder="تعداد محصول"
                  onChangeText={text => this.setState({ mount: text })}
                />
                <TextInput
                  style={{
                    marginBottom: 7,
                    marginTop: 7,
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 7,
                    margin: 7,
                      width: '95%',
                    textAlign: "right"
                  }}
                  placeholder="قیمت محصول"
                  keyboardType="numeric"
                  onChangeText={text => this.setState({ price: text })}
                />
                <TextInput
                  style={{
                    marginBottom: 7,
                    marginTop: 7,
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 7,
                    margin: 7,
                      width: '95%',
                    textAlign: "right"
                  }}
                  placeholder="قیمت عمده فروش"
                  keyboardType="numeric"
                  onChangeText={text =>
                    this.setState({ whole_sale_price: text })
                  }
                />
                <TextInput
                  style={{
                    marginBottom: 7,
                    marginTop: 13,
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 7,
                    margin: 3,
                      width: '95%',
                    textAlign: "right"
                  }}
                  placeholder="نام عمده فروش"
                  onChangeText={text =>
                    this.setState({ whole_sale_name: text })
                  }
                />
                <View
                  style={{
                    height: 53,
                    width: width,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TouchableHighlight
                    underlayColor="#E4F1FE"
                    style={{
                      backgroundColor: "#F9BF3B",
                      borderRadius: 7,
                      marginLeft: 7,
                      marginRight: 7,
                      width: "43%",
                      marginBottom: 13,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => this.login()}
                  >
                    <Text style={{ color: "black", fontSize: 17, margin: 13 }}>
                      ثبت محصول جدید
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor="#E4F1FE"
                    style={{
                      backgroundColor: "#EF4836",
                      borderRadius: 7,
                      marginLeft: 7,
                      marginRight: 7,
                      marginBottom: 13,
                      width: "43%",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => this.setState({ modalVisible: false })}
                  >
                    <Text style={{ color: "white", fontSize: 17, margin: 13 }}>
                      انصراف
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            )}
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalEdit}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: width,
              height: "100%"
            }}
          >
            {this.state.loading ? (
              <View
                style={{
                  backgroundColor: "#E4F1FE",
                  width: "80%",
                  height: "33%",
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <ActivityIndicator color="#7E07A9" />
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: "#f4d03f",
                  width: "80%",
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TextInput
                  style={{
                    marginBottom: 7,
                    marginTop: 13,
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 7,
                    margin: 3,
                    width: '93%',
                    textAlign: "right"
                  }}
                  placeholder={this.state.edit_name}
                  onChangeText={text => this.setState({ edit_name: text })}
                />
                <TextInput
                  style={{
                    marginBottom: 7,
                    marginTop: 7,
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 7,
                    margin: 7,
                      width: '93%',
                    textAlign: "right"
                  }}
                  placeholder={this.state.edit_type}
                  onChangeText={text => this.setState({ edit_type: text })}
                />
                <TextInput
                  style={{
                    marginBottom: 7,
                    marginTop: 7,
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 7,
                    margin: 7,
                      width: '93%',
                    textAlign: "right"
                  }}
                  keyboardType="numeric"
                  placeholder={this.state.edit_mount}
                  onChangeText={text => this.setState({ edit_mount: text })}
                />
                <TextInput
                  style={{
                    marginBottom: 7,
                    marginTop: 7,
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 7,
                    margin: 7,
                      width: '93%',
                    textAlign: "right"
                  }}
                  placeholder={this.state.edit_price}
                  keyboardType="numeric"
                  onChangeText={text => this.setState({ edit_price: text })}
                />
                <TextInput
                  style={{
                    marginBottom: 7,
                    marginTop: 7,
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 7,
                    margin: 7,
                      width: '93%',
                    textAlign: "right"
                  }}
                  placeholder={this.state.edit_whole_price}
                  keyboardType="numeric"
                  onChangeText={text =>
                    this.setState({ edit_whole_price: text })
                  }
                />
                <TextInput
                  style={{
                    marginBottom: 7,
                    marginTop: 13,
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 7,
                    margin: 3,
                      width: '93%',
                    textAlign: "right"
                  }}
                  placeholder={this.state.edit_whole_name}
                  onChangeText={text =>
                    this.setState({ edit_whole_name: text })
                  }
                />
                <View
                  style={{
                    height: 53,
                    width: '97%',
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TouchableHighlight
                    underlayColor="#E4F1FE"
                    style={{
                      backgroundColor: "#52b3d9",
                      borderRadius: 7,
                      marginLeft: 7,
                      marginRight: 7,
                      width: "43%",
                      marginBottom: 13,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => this.editPro()}
                  >
                    <Text style={{ color: "black", fontSize: 17, margin: 13 }}>
                      اعمال تغییرات{" "}
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor="#E4F1FE"
                    style={{
                      backgroundColor: "#EF4836",
                      borderRadius: 7,
                      marginLeft: 7,
                      marginRight: 7,
                      marginBottom: 13,
                      width: "43%",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => this.setState({ modalEdit: false })}
                  >
                    <Text style={{ color: "white", fontSize: 17, margin: 13 }}>
                      انصراف
                    </Text>
                  </TouchableHighlight>
                </View>
              </View>
            )}
          </View>
        </Modal>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.loadModal}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: width,
              height: "100%"
            }}
          >
            <View
              style={{
                backgroundColor: "#E4F1FE",
                width: 100,
                height: 100,
                borderRadius: 7,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ActivityIndicator color="#7E07A9" />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DADFE1"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
module.export = App;
