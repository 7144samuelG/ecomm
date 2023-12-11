import { useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";
import { Alert, Button } from "react-native";
import { Screen } from "react-native-screens";

export default function CheckoutScreen() {
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);
  
    const fetchPaymentSheetParams = async () => {
      const response = await fetch(`http://localhost:3000/payment-sheet`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { paymentIntent, ephemeralKey, customer} = await response.json();
  
      return {
        paymentIntent,
        ephemeralKey,
        customer,
      };
    };
  
    const initializePaymentSheet = async () => {
      const {
        paymentIntent,
        ephemeralKey,
        customer,
        publishableKey,
      } = await fetchPaymentSheetParams();
  
      const { error } = await initPaymentSheet({
        merchantDisplayName: "verse",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
        //methods that complete payment after a delay, like SEPA Debit and Sofort.
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: 'Jane Doe',
        }
      });
      if (!error) {
        setLoading(true);
      }
    };
  
    const openPaymentSheet = async () => {
      const { error } = await presentPaymentSheet();
  
      if (error) {
        Alert.alert(`Error code yuyyyy: ${error.code}`, error.message);
      } else {
        Alert.alert('Success', 'Your order is confirmed!');
      }
    };
  
    useEffect(() => {
      initializePaymentSheet();
    }, []);
  
    return (
      <Screen>
        <Button
          variant="primary"
         
          title="Checkout"
          onPress={openPaymentSheet}
        />
      </Screen>
    );
  }