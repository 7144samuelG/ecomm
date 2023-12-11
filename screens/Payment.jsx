import { View, Text, TouchableOpacity, Button ,ToastAndroid,} from "react-native";
import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PaymentScreen from "../components/payment2";
import Payment3 from "../components/payment3";
import { RadioButton } from "react-native-paper";
const Payment = () => {
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const nav=()=>{
    setChecked(!checked)
  }
  const state="Pay on Delivery"
  const nav1=()=>{
    setChecked1(!checked1)
    navigation.navigate("Order",{state})
  }
  return (
    <SafeAreaView>
      <View className="mt-[50px]">
        <View>
          <TouchableOpacity
            className="bg-transparent p-2"
            onPress={() => navigation.goBack()}
          >
            <Entypo name="chevron-left" size={27} color="black" />
          </TouchableOpacity>
        </View>
        <View className="mx-2 rounded-[10px] ">
          {/* <PaymentScreen/> */}
          <Text className="text-[30px] text-center mb-2 mt-10">
            select payment method
          </Text>
          <TouchableOpacity className="flex flex-row items-center" onPress={nav}>
            <RadioButton
              value="first"
              status={checked === true ? "checked" : false}
              onPress={nav}
            />
            <Payment3 />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-row items-center" onPress={nav1}>
            <RadioButton
              value="first"
              status={checked1 === true ? "checked" : false}
              onPress={nav1}
            />
            <Text>Pay on delivery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Payment;
