import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Branch1 from "../components/branch1";
import Branch2 from "../components/branch2";
import headphones from "../components/headphone";
import { useSelector } from "react-redux";
const Home = () => {
  const navigation = useNavigation();
  const [result1, setResults] = useState([]);
  const [searchKey1, setSearchKey] = useState("");
  const items=useSelector(state=>state.cart.items)
  const handleSerach = async () => {
    // const searchProducts = headphones.filter((val) => {
    //   return val.name2.toUpperCase().includes(searchKey1.toUpperCase());
    // });
    // setResults(searchProducts);
    navigation.navigate("Search")
  };
  
  return (
    <SafeAreaView className="px-2">
      <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex flex-row justify-between mt-[50px] ">
        <TouchableOpacity
          className="bg-transparent p-2"
          onPress={() => navigation.goBack()}
        >
          <Entypo name="chevron-left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-transparent p-2 relative" onPress={()=>navigation.navigate("Cart")} >
          <FontAwesome name="opencart" size={24} color="black" />
          <Text className="text-red-500 absolute right-0">{items.length}</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text className="font-bold text-[40px] mt-[10px] text-gray-600">
          HI-FI Shop & Service
        </Text>
        <Text className="text-[24px]">Welcome to Verse audio shop</Text>
        <Text className="text-[20px]">
          This shop offers both products and services
        </Text>
      </View>
      <View className="flex flex-row space-x-2 items-center bg-transparent">
        <TouchableOpacity onPress={()=>navigation.navigate("Search")} className="flex-1">
        <View className=" p-3 mt-3 flex-1 rounded-md " >
          <TextInput
          value={searchKey1}
          onChangeText={setSearchKey}
          placeholder="search product" 
          className="w-full bg-white p-3 rounded-md"
          onPress={()=>navigation.navigate("Search")}
          
          />
        </View>
        </TouchableOpacity>
        <TouchableOpacity  onPress={handleSerach}>
         
            <FontAwesome5
              name="search"
              size={24}
              color="black"
            />
          </TouchableOpacity>
      </View>
      <View className="pb-[73px]">
        <Branch1/>
        <Branch2/>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
