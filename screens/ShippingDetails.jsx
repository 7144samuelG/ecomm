import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Button,
  ScrollView,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native";
//import { ScrollView } from "react-native-gesture-handler";

const ShippingDetails = () => {
  const navigation = useNavigation();
  const [fname, setFname] = useState("");
  const [lname, setlname] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [apartmentNo, setApartmentNo] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const handleNav = () => {
    //navigation.navigate("Payment")
    if (
      fname ==="" ||
      lname ==="" ||
      street ==="" ||
      streetNo ==="" ||
      apartmentNo ==="" ||
      city === ""||
      zipcode === ""
    ) {
      ToastAndroid.show("wrong credentials try again", ToastAndroid.SHORT);
      return;
    } else {
      navigation.navigate("Payment");
    }
  };
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-[50px]">
          <View>
            <TouchableOpacity
              className="bg-transparent p-2"
              onPress={() => navigation.goBack()}
            >
              <Entypo name="chevron-left" size={27} color="black" />
            </TouchableOpacity>
          </View>
          <View className="p-2 ">
            <Text className="text-extrabold text-[30px]">Shipping details</Text>
            <View>
              <View className="mt-[40px]">
                <Text className="text-[20px]">Name</Text>
                <View className="mt-4">
                  <TextInput
                    required
                    value={fname}
                      onChangeText={setFname}
                    placeholder="Enter FirstName"
                    className="bg-white py-4 px-2 rounded-[10px] w-full placeholder-black"
                  />
                </View>
              </View>
              <View className="mt-[4px]">
                <Text className="text-[20px]">Last Name</Text>
                <View className="mt-4">
                  <TextInput
                    value={lname}
                     onChangeText={setlname}
                    required
                    placeholder="Enter LastName"
                    className="bg-white py-4 px-2 rounded-[10px] w-full placeholder-black"
                  />
                </View>
              </View>
              <View className="mt-[4px]">
                <Text className="text-[20px]">Street</Text>
                <View className="mt-4">
                  <TextInput
                    required
                    value={street}
                     onChangeText={setStreet}
                    placeholder="Enter street"
                    className="bg-white py-4 px-2 rounded-[10px] w-full placeholder-black"
                  />
                </View>
              </View>
              <View className="mt-[4px] flex flex-row justify-between">
                <View className="w-[45%]">
                  <Text className="text-[20px]">Street no</Text>
                  <View className="mt-4">
                    <TextInput
                      value={streetNo}
                       onChangeText={setStreetNo}
                      required
                      placeholder="Enter street no"
                      className="bg-white py-4 px-2 rounded-[10px] w-full placeholder-black"
                    />
                  </View>
                </View>
                <View className="w-[45%]">
                  <Text className="text-[20px]">Apartment no</Text>
                  <View className="mt-4 ">
                    <TextInput
                      required
                      value={apartmentNo}
                       onChangeText={setApartmentNo}
                      placeholder="Enter apartment no"
                      className="bg-white py-4 px-2 rounded-[10px] w-full placeholder-black"
                    />
                  </View>
                </View>
              </View>
              <View className="mt-[4px]">
                <Text className="text-[20px]">City</Text>
                <View className="mt-4">
                  <TextInput
                    required
                    value={city}
                     onChangeText={setCity}
                    placeholder="Enter your city"
                    className="bg-white py-4 px-2 rounded-[10px] w-full placeholder-black"
                  />
                </View>
              </View>
              <View className="mt-[4px]">
                <Text className="text-[20px]">Zipcode</Text>
                <View className="mt-4">
                  <TextInput
                    required
                    value={zipcode}
                     onChangeText={setZipcode}
                    placeholder="Enter zipcode"
                    className="bg-white py-4 px-2 rounded-[10px] w-full placeholder-black"
                  />
                </View>
              </View>
              <TouchableOpacity
                className="mt-[14px] bg-blue-500 py-4 rounded-[20px] mb-4"
                onPress={handleNav}
              >
                <Text className="text-center text-[20px] text-white">
                  payment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShippingDetails;
