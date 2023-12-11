import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Bottomtabs, ConfirmOrdre, Login, Payment, ProductsDetails, Register, ShippingDetails,Order } from "./screens";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import {  store } from "./store";
import { StripeProvider } from '@stripe/stripe-react-native';
const Stack = createNativeStackNavigator();
const API="pk_test_51OC9xvBg0l9JYrMc0nGpzMOyhohCAnKEWJxC1QRDhFwK4JyhY3mI08oOtNTwfTRglP2k2AZGc6i8eqatNqQGIbZt00rIlNxn9t"
export default function App() {
  return (
    <StripeProvider
      publishableKey={API}>
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Tabs"
            component={Bottomtabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Details"
            component={ProductsDetails}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Shipping"
            component={ShippingDetails}
            options={{
              headerShown: false,
            }}
          />
          
          <Stack.Screen
            name="Confirm"
            component={ConfirmOrdre}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Order"
            component={Order}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
    </StripeProvider>
  );
}
