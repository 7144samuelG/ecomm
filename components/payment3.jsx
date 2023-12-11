import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Alert,
  ToastAndroid,
  TouchableOpacityBase,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectBasketTotal } from "../store/cartSlice";

const Payment3 = () => {
  const [permission, setPermission] = useState(false);
  const [loading, setLoading] = useState(false);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);
  const state = "paid";
  const handleUrl = async () => {
    // await fetch("https://stripe-sever-five.vercel.app/payment-sheet", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body:JSON.stringify({
    //     amount:basketTotal*100
    //   })
    // })
    //   .then(async (data) => {
    //     const data2=await data.json()
    //     console.log(data2);
    //    setResponse(data2)
    //   })
    //   .catch((err) => {
    //     console.log("err", err);
    //   });
    //   const { paymentIntent, ephemeralKey, customer } = await response;
    //   return {
    //     paymentIntent,
    //     ephemeralKey,
    //     customer,
    //   };
    const response = await fetch(
      "https://stripe-sever-five.vercel.app/payment-sheet",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: basketTotal * 100,
        }),
      }
    );
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } = await handleUrl();
    const { error } = await initPaymentSheet({
      merchantDisplayName: "verse",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      defaultBillingDetails: {
        name: "sam g",
      },
    });
    if (!error) {
      setLoading(false);
      
    }
  };
  const openPaymentSheet = async () => {
    // see below
    const { error } = await presentPaymentSheet();
    if (error) {
      setLoading(false);
      Alert.alert(
        "An error occured during payment",
        "processing please try again !"
      );
      return;
    } else {
      setLoading(true);
      setPermission(true)
      navigation.navigate("Order", { state });
      
    }
    ToastAndroid.show("successfully paid !", ToastAndroid.SHORT);
     
  };
  if(permission){
    navigation.navigate("Order", { state });
  }
  useEffect(() => {
    initializePaymentSheet();
  }, [initPaymentSheet, presentPaymentSheet, openPaymentSheet]);
  return (
    <View>
      <TouchableOpacity title="pay" onPress={openPaymentSheet}>
        <Text className="">stripe checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment3;
