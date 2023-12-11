import { View, Text, TouchableOpacity, Alert, ToastAndroid } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, selectBasketTotal } from "../store/cartSlice";
//import { v4 as uuidv4 } from "uuid";
import { Entypo } from "@expo/vector-icons";
import {  ALERT_TYPE,Dialog } from "react-native-alert-notification";
const Order = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  //const num = uuidv4();
const totalCost1=useSelector(selectBasketTotal)
  const state = useRoute();
  //console.log(state);
  const confirm = () => {
    dispatch(emptyCart());
    navigation.navigate("Home");
    ToastAndroid.show("order has been confirmed successfully !", ToastAndroid.SHORT);
    //Alert.alert(`order confirmed`);
  };
  return (
    <View className="mt-[50px]">
      <View className="flex flex-row items-center space-x-5">
        <TouchableOpacity
          className="bg-transparent p-2"
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={27} color="black" />
        </TouchableOpacity>
        <Text className="text-[30px]">Confirm Order</Text>
      </View>
      <View className="mx-2 bg-gray-300 rounded-sm py-3 px-4 mt-10">
        <Text className="text-[30px]">order details</Text>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-[20px]">Order number:</Text>
          <Text className="text-[20px]">{state.key}</Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-[20px]">Subtotal:</Text>
          <Text className="text-[20px]">${totalCost1}.00</Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-[20px]">Shipping fee:</Text>
          <Text className="text-[20px]">$1.00</Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-[20px]">Tax:</Text>
          <Text className="text-[20px]">$3.00</Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-[20px]">Total:</Text>
          <Text className="text-[20px]">${3+1+totalCost1}.00</Text>
        </View>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-[20px]">Status:</Text>
          <Text className="text-[20px]">{state.params.state}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={confirm} className=" mt-4 bg-blue-400 w-1/2 mx-auto rounded-[20px]">
        <Text className="text-center py-5 text-white text-[20px]">Confirm order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Order;
