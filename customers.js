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
  Picker,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
    Dimensions
} from "react-native";


export default class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pass: "",
      list: [],
      named: "",
      shash: [],
      modalVisible: false,
      newUserModal: false,

    };
    this.props.navigator.setStyle({
        navBarHidden: true, // make the nav bar hidden
    });
    this.getCustomers();
  }

  getCustomers() {
    console.log("hhddsksfjkjfhhhhh");
    fetch("http://koalafruit.ir/api/get_customers.php")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, "lqlqlqlqlqlq");
        this.setState({ list: responseJson, list2: responseJson,loadModal:false });
      })
      .catch(error => {
        console.error(error);
      });
  }
  deleteItIt(idRo){
    let rrr = {id:idRo}
    fetch("http://koalafruit.ir/api/delete_user.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(rrr)
      }).then(response => {
        if (response.status === 200 && response.ok) {
          this.setState({
            loading: false,
            newUserModal: false,
            refresh: !this.state.refresh,

          });
          this.getCustomers();

          alert("کاربر حذف شد!");
        }
      });
  }
  deleteUser(idRo){
    Alert.alert(
        "حذف کاربر",
        "آیا مطمین هستید؟",
        [
          { text: "بله", onPress: () => this.deleteItIt(idRo) },
          {
            text: "خیر",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }
        ],
        { cancelable: false }
      );
   
  }
  registerUser() {
    if (
      this.state.userName === "" ||
      this.state.userPass === "" ||
      this.state.userPhone === ""
    ) {
      alert("ورودی ها کامل نیستند!!!");
    } else {
      this.setState({ loading: true });
      let omo = {
        user: this.state.userName,
        pass: this.state.userPass,
        phone: this.state.userPhone
      };
      console.log(omo, "kdfkljdfkldjkldj");

      fetch("http://koalafruit.ir/api/new_stationery_user.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(omo)
      }).then(response => {
        if (response.status === 200 && response.ok) {
          this.setState({
            loading: false,
            newUserModal: false
          });
          this.getCustomers();

          alert("ثبت کاربر با موفقیت انجام شد!");
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
              style={{width:width,
                      flexDirection: "row",
                      backgroundColor: "white",
                      margin: 3,
                      height:67,
                      alignItems: "center",
                      justifyContent: "center"
                    }}
            >
              <Text style={{ width: "28%", textAlign: "center" }}>
                {'تلفن همراه'}
              </Text>
              <Text style={{ width: "28%", textAlign: "center" }}>
                {' نام کاربر'}
              </Text>
              <Text style={{ width: "28%", textAlign: "center" }}>
                {'رمزعبور کاربر'}
              </Text>
              <Text style={{ width: "15%", textAlign: "center" }}>
                {'حذف کاربر'}
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

                     screen:'com.koalasolution.salehi.ReturnPro',
                     passProps: {phone:item.stationery_user_phone,name:item.stationery_user_name}, // simple serializable object that will pass as props to the modal (optional)

                 })}>
            <View
              style={
                {
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
              <Text style={{ width: "28%", textAlign: "center" }}>
                {item.stationery_user_phone}
              </Text>
              <Text style={{ width: "28%", textAlign: "center" }}>
                {item.stationery_user_name}
              </Text>
              <Text style={{ width: "28%", textAlign: "center" }}>
                {item.stationery_user_pass}
              </Text>
              <TouchableHighlight
              style={{width: "15%",backgroundColor:'red',margin:7,borderRadius:7,justifyContent:'center',alignItems:'center'}}
              onPress={()=>
                this.deleteUser(item.stationery_user_id)}
              >
              <Text style={{margin:13,color:'white'}}>حذف</Text>
                          </TouchableHighlight>

            </View>
         </TouchableHighlight>
          )}
        />
             <TouchableHighlight
            underlayColor="#E4F1FE"
            style={{
              backgroundColor: "#4183d7",
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7,
              width:0.97*width,
              marginBottom: 13,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() =>
              this.setState({newUserModal:true})}>
            <Text style={{ color: "white", fontSize: 17, margin: 13 }}>
              کاربر جدید
            </Text>
          </TouchableHighlight>
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
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.newUserModal}
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
                <ActivityIndicator color="#4183d7" />
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: "#4b77be",
                  width: "80%",
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ color: "white", fontSize: 17, marginTop: 7 }}>
                  کاربر جدید
                </Text>
                <TextInput
                  style={{
                    marginBottom: 7,
                    marginTop: 13,
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 7,
                    margin: 3,
                    width:'93%',
                    textAlign: "right"
                  }}
                  placeholder="نام کاربر"
                  onChangeText={text => this.setState({ userName: text })}
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
                  placeholder="شماره همراه"
                  onChangeText={text => this.setState({ userPhone: text })}
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
                  placeholder="رمز عبور "
                  onChangeText={text => this.setState({ userPass: text })}
                />

                <View
                  style={{
                    height: 53,
                      width: '99%',
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
                    onPress={() => this.registerUser()}
                  >
                    <Text style={{ color: "black", fontSize: 17, margin: 13 }}>
                      ثبت کاربر جدید
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
                    onPress={() => this.setState({ newUserModal: false })}
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
module.export = Customers;
