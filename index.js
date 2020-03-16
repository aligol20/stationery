import { Navigation } from "react-native-navigation";
import { registerScreens } from "./screens";
import { I18nManager, Linking } from "react-native";
I18nManager.allowRTL(false);
registerScreens(); // this is where you register all of your app's screens

Navigation.startSingleScreenApp({
  screen: {
    screen: "com.koalasolution.salehi.App", // unique ID registered with Navigation.registerScreen
    navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
    navigatorButtons: {},
    navBarHidden:true,
    title:'ایران نوشت',
    // override the navigator style for the screen, see "Styling the navigator" below (optional)
    
    animationType: "slide-down" // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
  }
});
