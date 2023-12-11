import { CardField, useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Button } from "react-native";
const PaymentScreen=()=> {
  const { confirmPayment } = useStripe();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const handlePayment = async () => {
    console.log("ht");
    const response = await fetch(`http://10.0.2.2:3000/create-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 3000,
      })
    }).then((response) => response.json()).then((data) => {
      console.log(data);
      setClientSecret(data);
      })
    .catch((error) => {
        console.error("Error fetching client secret:", error);
      });
      console.log(response);
    //setClientSecret(response)
    const { paymentIntent, error } = await confirmPayment(clientSecret);

    if (error) {
      console.error("Payment failed:", error);
    } else if (paymentIntent) {
      console.log("Payment successful:", paymentIntent);
    }
  };
  return (
    <>
       <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          console.log("cardDetails", cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log("focusField", focusedField);
        }}
      /> 
      
    </>
  );
}
export default PaymentScreen
