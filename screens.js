import { Navigation } from 'react-native-navigation';

import App from  './App';
import Orders from  './orders';
import Users from  './users';
import UserDetails from  './userDetails';
import Customers from  './customers';
import History from  './history';
import ReturnPro from  './returnPro';





export function registerScreens() {

    Navigation.registerComponent('com.koalasolution.salehi.Orders', () => Orders);
    Navigation.registerComponent('com.koalasolution.salehi.Users', () => Users);
    Navigation.registerComponent('com.koalasolution.salehi.UserDetails', () => UserDetails);
    Navigation.registerComponent('com.koalasolution.salehi.App', () => App);
    Navigation.registerComponent('com.koalasolution.salehi.History', () => History);
    Navigation.registerComponent('com.koalasolution.salehi.Customers', () => Customers);
    Navigation.registerComponent('com.koalasolution.salehi.ReturnPro', () => ReturnPro);





}
