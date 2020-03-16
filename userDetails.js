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
    ActivityIndicator,Dimensions,
    Alert, PermissionsAndroid
} from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class UserDetails extends Component {

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
      boughtDialog: false,
      saledDialog: false
    };
    this.props.navigator.setStyle({
        navBarHidden: true, // make the nav bar hidden
    });
    this.requestCameraPermission();
    this.getUserDetails();
  }
    async  requestCameraPermission() {
        try {
            const allow = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE)
                if(!allow) {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                        {
                            'title': 'Cool Photo App Camera Permission',
                            'message': 'Cool Photo App needs access to your camera ' +
                                'so you can take awesome pictures.'
                        }
                        )
                    ;
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log("You can use the camera")
                    } else {
                        console.log("Camera permission denied")
                    }
                }

        } catch (err) {
            console.warn(err)
        }
    }
  async goozoo() {
 

    console.log("dnfkldfkl", this.state.preFactor);
    let row = "ردیف";
    let name = "نام";
    let mount = "تعداد";
    let once = "فی به تومان";
    let sum = "مجموع به تومان";
    let phone = this.props.phone;
    let user = this.state.preFactor[0].exAddress;
    let date = this.state.preFactor[0].delivery_time;
    let order_number = this.state.preFactor[0].order_number;
    let total = "1234";
      let type = 'برند';

    let a = "IRR" + " " + 12344;
    let b = 2;
    let c = 3;
    let d = 4;
    let e = 5;
    let f = `
   <tr>

</tr>
`;

    let yt = this.state.preFactor;
      console.log(yt, "kskjskks");

      let totalPrice = 0;
    for (let i = 0; i < yt.length; i++) {
      totalPrice = parseInt(totalPrice) + parseInt(yt[i].total);
      let aan =
        `<tr>
      <td align="left" style="width:20%">` + yt[i].total +
        `</td>
      <td align="center" style="width:10%">` + yt[i]["SUM(saled_mount)"] +
        `</td>
      <td align="center" style="width:20%">` + yt[i].order_price +

        `</td>
      <td align="right" style="width:25%">` + yt[i].order_name +
        `</td>
      <td align="center"style="width:5%">` +
        i + `</td>
      </tr>`;
      f = f + aan;
    }
    console.log(f, "kskjskks2");
    let rr =
      ` <center><img src="http://koalafruit.ir/api/iran.png" position="center" style="width:21%;height:65px;margin-bottom: 7px" alt="Italian Trulli;"></center>
    <table style="width:100%" border="1">
    <tr>
        <th style="width:25%">` +
      phone +
      `</th>
        <th style="width:25%">` +
      user +
      `</th>
        <th style="width:25%">` +
      date +
      `</th>
         <th style="width:25%">` +
      order_number+':'+'شماره سفارش' +
      `</th>
    </tr>
            </table>
<table style="width:100%" border="1">
<tr>
<th style="width:20%">` +
        sum +
        `</th>
<th style="width:10%">` +
        mount +
        `</th>
<th style="width:20%">` +
        once +
        `</th>
<th style="width:20%">` +
        name +
        `</th>
<th style="width:5%">` +
        row +
        `</th>
` +
        f +
        `


</tr>



</table>
<table style="width:100%" border="1">
<tr>
    <th style="width:50%">` +
      totalPrice +
      `</th>
    <th style="width:50%"> مجموع کل به تومان</th>
</tr>
        </table>`;
    let jish = new Date().toISOString();
    let options = {
      html: rr,
      fileName: yt[0].exAddress + "," + jish,
      directory: "docs"
    };
    console.log(jish, "lqaqaqaqqaq");
    // let file =  RNHTMLtoPDF.convert(options)
    let file = await RNHTMLtoPDF.convert(options);
    let oro = {phone : this.props.phone}
    fetch("http://koalafruit.ir/api/set_final_deliver.php", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(oro)
      }).then(response => {
        if (response.status === 200 && response.ok) {

            this.props.navigator.push({

                screen:'com.koalasolution.salehi.App',
            })
        }


      })
    console.log(file.filePath);
    alert(file.filePath);
  }
    async jishoo() {


        console.log("dnfkldfkl", this.state.preFactor);
        let row = "ردیف";
        let name = "نام";
        let mount = "تعداد";
        let type = 'برند';
        let once = "فی به تومان";
        let sum = "مجموع به تومان";
        let phone = this.props.phone;
        let user = this.state.preFactor[0].exAddress;
        let date = this.state.preFactor[0].delivery_time;
        let total = "1234";

        let a = "IRR" + " " + 12344;
        let b = 2;
        let c = 3;
        let d = 4;
        let e = 5;
        let f = `
   <tr>

</tr>
`;

        let yt = this.state.preFactor;
        console.log(yt, "kskjskks");

        let totalPrice = 0;
        for (let i = 0; i < yt.length; i++) {
            totalPrice = parseInt(totalPrice) + parseInt(yt[i].total);
            let aan =
                `<tr>
      <td align="left" style="width:20%">` + yt[i].total +
                `</td>
      <td align="center" style="width:10%">` + yt[i]["SUM(saled_mount)"] +
                `</td>
      <td align="center" style="width:20%">` + yt[i].order_price +

                `</td>
      <td align="right" style="width:25%">` + yt[i].order_name +
                `</td>
      <td align="center"style="width:5%">` +
                i + `</td>
      </tr>`;
            f = f + aan;
        }
        console.log(f, "kskjskks2");
        let rr =
            ` <center><img src="http://koalafruit.ir/api/iran.png" position="center" style="width:21%;height:65px;margin-bottom: 7px" alt="Italian Trulli;"></center>
    <table style="width:100%" border="1">
    <tr>
        <th style="width:35%">` +
            phone +
            `</th>
        <th style="width:35%">` +
            user +
            `</th>
        <th style="width:30%">` +
            date +
            `</th>
    </tr>
            </table>
<table style="width:100%" border="1">
<tr>
<th style="width:20%">` +
            sum +
            `</th>
<th style="width:10%">` +
            mount +
            `</th>
<th style="width:20%">` +
            once +
            `</th>
<th style="width:20%">` +
            name +
            `</th>
<th style="width:5%">` +
            row +
            `</th>
` +
            f +
            `


</tr>


</table>
<table style="width:100%" border="1">
<tr>
    <th style="width:50%">` +
            totalPrice +
            `</th>
    <th style="width:50%"> مجموع کل به تومان</th>
</tr>
        </table>`;
        let jish = new Date().toISOString();
        let options = {
            html: rr,
            fileName: yt[0].exAddress + "," + jish,
            directory: "docs"
        };
        console.log(jish, "lqaqaqaqqaq");
        // let file =  RNHTMLtoPDF.convert(options)
        let file = await RNHTMLtoPDF.convert(options);
        let oro = {phone : this.props.phone}
        fetch("http://koalafruit.ir/api/set_deliver_stationery.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(oro)
        }).then(response => {
            if (response.status === 200 && response.ok) {

                this.props.navigator.push({

                    screen:'com.koalasolution.salehi.App',
                })
            }


        })
        console.log(file.filePath);
        alert(file.filePath);
    }

    koon(){
        fetch("http://koalafruit.ir/api/get_stationery_main.php", {
        })
            .then(response => response.json())
            .then(responseJson => {
                console.log(responseJson.length,'lckdklldld');
                let drf = [];
                for (let i=0;i<responseJson.length;i++) {
                    let foo = responseJson[i];
                    let ghoo = responseJson.filter(x => x.stationery_id===foo.goh_khori);
                    if(ghoo.length !==0) {
                        console.log(ghoo[0], 'lckdklldld');
                        drf.push({st_name: foo.stationery_name + ' ' + ghoo[0].whole_sale_name,whole_sale_name:ghoo[0].whole_sale_name,type:
                            ghoo[0].stationery_id,mount:ghoo[0].stationery_mount,price:ghoo[0].stationery_price,goh:foo.goh_khori,id:ghoo[0].stationery_id})
                    }
                }
                console.log(drf,'kdjfkdjfkdk');
                fetch("http://koalafruit.ir/api/oriori_stationery_new.php", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(drf)
                })
                    .then(response =>  {
                        console.log(response,'sdsldsdksd')
                    })

            })
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
  getUserDetails() {
    console.log("skfdfd", this.props);
    let omo = { name: this.props.name, phone: this.props.phone };
    fetch("http://koalafruit.ir/api/user_details_order.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(omo)
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson, "s,csn,mscscs");

        this.setState({
          list: responseJson,
          list2: responseJson,
          loadModal: false,
          refresh: !this.state.refresh
        });
        let kooni = { phone: this.props.phone };
        fetch("http://koalafruit.ir/api/preFactor.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(kooni)
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson, "lazlazlazawwww");
            this.setState({ preFactor: responseJson });
              // this.koon();

          });
      })
      .catch(error => {
        console.error(error);
      });

    // this.setState({ goh: ui });
  }
  getPicker() {
    let ui = [];
    for (let i = 0; i <= 10; i++) {
      ui.push("a");
    }
    console.log(ui, "fdfdfefefef");
    ui.map((s, i) => {
      return <Picker.Item key={i} value={s} label={s} />;
    });
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
  setPrice() {
    this.setState({
      loadModal: true
    });
    let ytr = {
      price: this.state.set_price,
      name: this.props.name,
      phone: this.props.phone,
      proName: this.state.proName
    };
    console.log(ytr, "dwlkfkdklfdkl");
    fetch("http://koalafruit.ir/api/set_price.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ytr)
    }).then(response => {
      if (response.status === 200 && response.ok) {
        this.setState({ boughtDialog: false });
        this.getUserDetails();
      }
    });
  }
  setMount() {
    this.setState({
      loadModal: true
    });
    let ytr = {
      mount: parseInt(this.state.set_mount),
      name: this.props.name,
      phone: this.props.phone,
           proName: this.state.proName,
        proId: this.state.proId
    };
    console.log(ytr, "dwlkfkdklfdkl");
    console.log(this.state.proId,';sldfkdklfdf');

    fetch("http://koalafruit.ir/api/set_mount.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ytr)
    }).then(response => {
      console.log(response, ytr, "dwlkfkdklfdkl");

      if (response.status === 200 && response.ok) {
        this.setState({ saledDialog: false });
        this.getUserDetails();
      }
    });
  }
    zeroIt(proNameT,proIdT,mountT) {
        this.setState({
            loadModal: true
        });
        let ytr = {
            mount: parseInt(mountT),
            name: this.props.name,
            phone: this.props.phone,
            proName: proNameT,
            proId: proIdT
        };
        console.log(ytr, "dwlkfkdklfdkl");
        console.log(this.state.proId,';sldfkdklfdf');

        fetch("http://koalafruit.ir/api/set_mount.php", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ytr)
        }).then(response => {
            console.log(response, ytr, "dwlkfkdklfdkl");

            if (response.status === 200 && response.ok) {
                this.setState({ saledDialog: false });
                this.getUserDetails();
            }
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
          style={{
            flexDirection: "row",
            backgroundColor: "white",
            height: 47,
            width: width,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              width: "16%",
              color: "black",
              textAlign: "left"
            }}
          >
            {"قیمت فاکتور شده"}
          </Text>
          <Text
            style={{
              width: "16%",
              color: "black",
              textAlign: "center"
            }}
          >
            {"قیمت واحد"}
          </Text>
          <Text
            style={{
              width: "16%",
              color: "black",
              textAlign: "center"
            }}
          >
            {"تعداد فاکتور شده"}
          </Text>
          <Text
            style={{
              width: "16%",
              color: "black",
              textAlign: "center"
            }}
          >
            {"تعداد درخواستی"}
          </Text>
          <Text
            style={{
              width: "30%",
              color: "black",
              textAlign: "right"
            }}
          >
            {"نام محصول"}
          </Text>
        </View>
        <FlatList
          keyExtractor={(item, index) => item + index}
          data={this.state.list}
          extraData={this.state.refresh}
          style={{ width: 0.98*width }}
          renderItem={({ item, index }) => (
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
                      justifyContent: "center"
                    }
                  : {
                      borderRadius: 7,
                      flexDirection: "row",
                      backgroundColor: "white",
                      margin: 3,
                      alignItems: "center",
                      justifyContent: "center"
                    }
              }
            >
              <TouchableHighlight
                  underlayColor="#1e8bc3"

                  onPress={() => {
                      this.setState({
                          proName: item.order_name,
                          proId: item.order_id,
                          setMount: '0'
                      });
                      this.zeroIt(item.order_name,item.order_id,'0');
                  }

                }
                style={{
                  width: "16%",
                  backgroundColor: "#1e8bc3",
                  borderRadius: 7,
                  marginLeft: 7
                }}
              >
                <Text
                  style={{ margin: 7, color: "white", textAlign: "center" }}
                >
                  {'صفرکن'}
                </Text>
              </TouchableHighlight>
              <Text
                style={{
                  width: "16%",
                  textAlign: "center",
                  marginBottom: 13,
                  marginTop: 13
                }}
              >
                {item.order_price + " " + "تومان"}
              </Text>

              <TouchableHighlight
                  underlayColor="#663399"

                  onPress={() =>
                  this.setState({ saledDialog: true,proId:item.order_id, proName: item.order_name })
                }
                style={{
                  width: "16%",
                  backgroundColor: "#663399",
                  borderRadius: 7,
                  marginLeft: 7
                }}
              >
                <Text
                  style={{ margin: 7, color: "white", textAlign: "center" }}
                >
                  {item.saled_mount}
                </Text>
              </TouchableHighlight>

              <Text
                style={{
                  width: "8%",
                  textAlign: "center"
                }}
              >
                {item.order_mount}
              </Text>
                <Text
                    style={{
                        width: "8%",
                        textAlign: "center",
                        color:'red'
                    }}
                >
                    {item.stationery_mount}
                </Text>
              <Text style={{ width: "30%", textAlign: "right" }}>
                {item.order_name}
              </Text>
            </View>
          )}
        />
        <View
          style={{
            height: 53,
            width: width,
            flexDirection: "row",
            alignItems: "center",
              justifyContent:'center'
          }}
        >
          <TouchableHighlight
            underlayColor="#F9BF3B"
            style={{
              backgroundColor: "#F9BF3B",
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7,
              width:0.43*width,
              marginBottom: 13,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              Alert.alert(
                "ثبت سفارش...",
                "آیا مطمین هستید؟",
                [
                  { text: "بله", onPress: () => this.goozoo() },
                  {
                    text: "خیر",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  }
                ],
                { cancelable: false }
              );
            }}
          >
            <Text style={{ color: "black", fontSize: 17, margin: 13 }}>
              چاپ فاکتور و ثبت نهایی
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor="#26a65b"
            style={{
              backgroundColor: "#26a65b",
              borderRadius: 7,
              marginLeft: 7,
              marginRight: 7,
              width:0.43*width,
              marginBottom: 13,
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              Alert.alert(
                "ثبت سفارش...",
                "آیا مطمین هستید؟",
                [
                  { text: "بله", onPress: () => this.jishoo() },
                  {
                    text: "خیر",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  }
                ],
                { cancelable: false }
              );
            }}
          >
            <Text style={{ color: "black", fontSize: 17, margin: 13 }}>
              چاپ فاکتور
            </Text>
          </TouchableHighlight>

        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.saledDialog}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
                width: 0.90*width,
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
                  backgroundColor: "#663399",
                  width: "80%",
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TextInput
                  style={{
                    marginBottom: 7,
                    marginTop: 7,
                    height: 40,
                    backgroundColor: "white",
                    borderRadius: 7,
                    margin: 7,
                    width: '75%',
                    textAlign: "right"
                  }}
                  placeholder="تعداد فاکتور شده"
                  keyboardType="numeric"
                  onChangeText={text => this.setState({ set_mount: text })}
                />
                <View
                  style={{
                    height: 53,
                    width: '100%',
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <TouchableHighlight
                    underlayColor="#F9BF3B"
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
                    onPress={() => this.setMount()}
                  >
                    <Text style={{ color: "black", fontSize: 17, margin: 13 }}>
                      {"ثبت تعداد"}
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor="#EF4836"
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
                    onPress={() => this.setState({ saledDialog: false })}
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
          visible={this.state.boughtDialog}
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
                  backgroundColor: "#1e8bc3",
                  width: "90%",
                  borderRadius: 7,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
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
                  placeholder="قیمت قیمت فاکتور شده"
                  keyboardType="numeric"
                  onChangeText={text => this.setState({ set_price: text })}
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
                    underlayColor="#f5ab35"
                    style={{
                      backgroundColor: "#f5ab35",
                      borderRadius: 7,
                      marginLeft: 7,
                      marginRight: 7,
                      width: "43%",
                      marginBottom: 13,
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                    onPress={() => this.setPrice()}
                  >
                    <Text
                      style={{
                        color: "black",
                        fontSize: 17,
                        margin: 13,
                        textAlign: "center"
                      }}
                    >
                      {"ثبت قیمت"}
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    underlayColor="#EF4836"
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
                    onPress={() => this.setState({ boughtDialog: false })}
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
module.export = UserDetails;
