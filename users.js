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
    Dimensions,
  View,
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

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      list: [],
      named: "",
      shash: [],
      modalVisible: false
    };
    this.props.navigator.setStyle({
        navBarHidden: true, // make the nav bar hidden
    });
    this.getUsers();
  }

  getUsers() {
    console.log("hhddsksfjkjfhhhhh");
    fetch("http://koalafruit.ir/api/get_users.php")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, "lqlqlqlqlqlq");
        this.setState({ list: responseJson, list2: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
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
              style={{width:width,
                      flexDirection: "row",
                      backgroundColor: "white",
                      margin: 3,
                      height:67,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
            >
              <Text style={{ width: "31%", textAlign: "left" }}>
                {'تلفن همراه'}
              </Text>
              <Text style={{ width: "31%", textAlign: "center" }}>
                {'زمان سفارش'}
              </Text>
              <Text style={{ width: "31%", textAlign: "right" }}>
                {'نام کاربر'}
              </Text>
            </View>
        <FlatList
          keyExtractor={(item, index) => item + index}
          data={this.state.list}
          extraData={this.state.refresh}
          style={{ width: width }}
          renderItem={({ item, index }) => (
              <TouchableHighlight
                  underlayColor="white"

                  onPress={()=>
                this.props.navigator.push({

                  screen:'com.koalasolution.salehi.UserDetails',
                  passProps: {phone:item.orderer_phone,name:item.exAddress}, // simple serializable object that will pass as props to the modal (optional)

              })}
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
                      height:67,
                      alignItems: "center",
                      justifyContent: "center"
                    }
                  : {
                      borderRadius: 7,
                      flexDirection: "row",
                      backgroundColor: "white",
                      margin: 3,
                      height:67,
                      alignItems: "center",
                      justifyContent: "center"
                    }
              }
            >
              <Text style={{ width: "31%", textAlign: "left" }}>
                {item.orderer_phone}
              </Text>
              <Text style={{ width: "31%", textAlign: "center" }}>
                {item.delivery_time}
              </Text>
              <Text style={{ width: "31%", textAlign: "right" }}>
                {item.exAddress}
              </Text>
            </View>
            </TouchableHighlight>
          )}
        />
     
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
module.export = Users;
