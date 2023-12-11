import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";

const payment = () => {
  const [showGateway, setShowGateway] = useState(false);
  const fetchPaymentIntentClientSecret = async ({ amount, gateway }) => {
    const res =  await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        amount: (amount * 100).toString(),
        currency: 'EUR',
        gateway: gateway,
      }),
    }).then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
     console.log(error)
    });
    return res?.client_secret;
  };
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity
          
          onPress={() => setShowGateway(true)}
        >
          <Text >Pay Using PayPal</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default payment;
