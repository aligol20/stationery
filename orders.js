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
    Dimensions,
  Modal,
  Picker,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert
} from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});
import { Navigation } from "react-native-navigation";

export default class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      list: [],
      named: "",
      shash: [],
      modalVisible: false,
      loadModal: false
    };
    this.props.navigator.setStyle({
        navBarHidden: true, // make the nav bar hidden
    });
    this.getTotalOrders();
  }

  okIt(nn) {
    this.setState({ loadModal: true });
    let gooz = { name: nn };
    console.log(nn, "ddkfjkdfk");
    fetch("http://koalafruit.ir/api/ok_product.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gooz)
    }).then(response => {
      if (response.status === 200 && response.ok) {
        this.getTotalOrders();
      }
    });
  }

  getTotalOrders() {
    console.log("hhhhhhh");
    fetch("http://koalafruit.ir/api/totalFactor.php")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, "lqlqlqlqlcdskdldkslqlq");
        for (let i = 0; i < responseJson.length; i++) {
          if (!responseJson[i].stationery_mount) {
            responseJson[i].stationery_mount = 0;
          }
          responseJson[i].stationery_mount = parseInt(
            responseJson[i].stationery_mount
          );
        }
        console.log(responseJson, "lqlqlqlqlqlq2");

        this.setState({
          list: responseJson,
          list2: responseJson,
          refresh: !this.state.refresh,
          loadModal: false
        });
      })
      .catch(error => {
        console.error(error);
      });

    // this.setState({ goh: ui });
  }

  render() {
      let width= Dimensions.get('window').width;

      let ui = [];
    for (let i = 0; i <= 100; i++) {
      ui.push(i.toString());
    }
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => item + index}
          data={this.state.list}
          extraData={this.state.refresh}
          style={{ width: width }}
          renderItem={({ item, index }) => (
            <View
              style={
                item.stationery_mount > item.order_mount
                  ? {
                      borderWidth: 2,
                      borderColor: "#f39c12",
                      borderRadius: 7,
                      flexDirection: "row",
                      backgroundColor: "white",
                      margin: 3,
                      alignItems: "center",
                      justifyContent: "center"
                    }
                  : {
                      borderColor: "#cf000f",
                      borderWidth: 2,

                      borderRadius: 7,
                      flexDirection: "row",
                      backgroundColor: "white",
                      margin: 3,
                      alignItems: "center",
                      justifyContent: "center"
                    }
              }
            >
              <Text style={{ width: "20%" }}>
                {" " + "موجودی" + ":" + item.stationery_mount}
              </Text>

              <Text
                style={{
                  width: "20%",
                  textAlign: "right",
                  marginBottom: 13,
                  marginTop: 13
                }}
              >
                {item.order_price + " " + "تومان"}
              </Text>
              <Text style={{ width: "23%", textAlign: "right" }}>
                {item.order_mount}
              </Text>
              <Text style={{ width: "23%", textAlign: "right" }}>
                {item.order_name}
              </Text>

              <TouchableHighlight
                onPress={() => {
                  item.stationery_mount > item.order_mount
                    ? this.okIt(item.order_name)
                    : alert("موجودی انبار کم تر از درخواستی است");
                }}
                underlayColor="#DADFE1"
                style={
                  item.stationery_mount > item.order_mount
                    ? {
                        width: "10%",
                        backgroundColor: "#3498db",
                        borderRadius: 7,
                        marginLeft: 7,
                          alignItems: "center",
                          justifyContent:'center'



                      }
                    : {
                        width: "10%",
                        backgroundColor: "#6c7a89",
                        borderRadius: 7,
                        marginLeft: 7,
                          alignItems: "center",
                      justifyContent:'center'


                      }
                }
              >
                <Text style={{ margin: 7, color: "white" }}>تایید</Text>
              </TouchableHighlight>
            </View>
          )}
        />
        <View
          style={{
            height: 53,
            width: width,
            flexDirection: "row",
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
              width: 0.97*width,
              marginBottom: 13,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() =>
              this.props.navigator.push({
                screen: "com.koalasolution.salehi.Users",
                title: "سفارش کاربران"
              })}>
            <Text style={{ color: "black", fontSize: 17, margin: 13 }}>
              سفارش ها بر اساس کاربران
            </Text>
          </TouchableHighlight>

        </View>
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
module.export = Orders;
