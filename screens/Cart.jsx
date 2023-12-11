import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  Button,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import {
  decreaseQuantity,
  increaseQuantity,
  selectBasketTotal,
} from "../store/cartSlice";
import { useAuth } from "../auth/auth";

const Cart = () => {
  const {user}=useAuth()
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.totalCost);
  const basketTotal = useSelector(selectBasketTotal);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <SafeAreaView className=" bg-white overflow-y-scroll">
        <View className="h-full">
          <View className="flex flex-row justify-between mt-[50px] ">
            <TouchableOpacity
              className="bg-transparent p-2"
              onPress={() => navigation.goBack()}
            >
              <Entypo name="chevron-left" size={27} color="black" />
            </TouchableOpacity>
            <View>
              <Text className="opacity-60 p-2 text-[27px] text-bold">
                Cart Details
              </Text>
            </View>
            <TouchableOpacity className="bg-transparent p-2">
              <Text className="text-[30px] uppercase border italic border-blue-700 rounded-full px-1 text-red-600 text-center">{user ? `${user?.email?.substring(0, 2)}` : ""}</Text>
            </TouchableOpacity>
          </View>
          <View className="overflow-y-scroll">
            {basketTotal > 0 ? (
              <ScrollView className="h-[100vh] oveflow-y-auto">
              <View className="relative overfow-y-auto">
                {items.map((item) => (
                  <View key={item.id} className="p-2">
                    <View className="flex flex-row items-center space-x-4">
                      <View className="p-3">
                        <Image
                          source={item.image}
                          className="w-[150px] h-[150px] rounded-md"
                        />
                      </View>
                      <View className="">
                        <Text className="text-[20px] w-[200px]">
                          {item.name}
                        </Text>
                        <Text className="text-[20px] opacity-60 my-5">
                          ${item.price}.00
                        </Text>
                        <View className=" flex flex-row itesm-center space-x-2">
                          <TouchableOpacity
                            disabled={item.quantity < 1}
                            className={`bg-gray-200 p-2 ${
                              item.quantity < 1 ? "opacity-10" : ""
                            } `}
                            onPress={() => dispatch(decreaseQuantity(item))}
                          >
                            <AntDesign name="minus" size={24} color="black" />
                          </TouchableOpacity>
                          <View className=" p-2">
                            <Text>{item.quantity}</Text>
                          </View>
                          <TouchableOpacity
                            className="bg-gray-200 p-2"
                            onPress={() => dispatch(increaseQuantity(item))}
                          >
                            <AntDesign name="plus" size={24} color="black" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
                <View>
                  <View className="px-2 flex flex-row items-center space-x-10 mt-5">
                    <Text className=" text-semibold text-[20px]">Total</Text>
                    <Text className=" text-semibold">${basketTotal}.00</Text>
                  </View>
                </View>
                <View className="p-3 mt-10">
                  <Button
                    variant="primary"
                    title="checkout"
                    disabled={items.length < 1}
                    onPress={() => navigation.navigate("Shipping")}
                  />
                </View>
              </View>
              </ScrollView>
            ) : (
              <ScrollView>
              <View className=" h-[100vh] flex flex-row items-cent mt-10 justify-center">
                <View classsName="">
                  <Image
                    source={require("../assets/download1.jpg")}
                    className="w-[400px] h-[400px]"
                  />
                  <Text className="text-[40px] opacity-60 text-center ">
                    cart is empty
                  </Text>
                </View>
              </View>
              </ScrollView>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Cart;
