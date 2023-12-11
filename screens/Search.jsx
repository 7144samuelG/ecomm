import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import headphones from "../components/headphone";
import { useNavigation, useRoute } from "@react-navigation/native";

const Search = () => {
  const [results, setResults] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const handleSerach = async () => {
    const searchProducts = headphones.filter((val) => {
      return val.name2.toUpperCase().includes(searchKey.toUpperCase());
    });
    setResults(searchProducts);
  };
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View className="mt-[50px]">
        <View className="flex flex-row space-x-2 items-center bg-transparent">
          <View className=" p-3 mt-3 flex-1 rounded-md ">
            <TextInput
              placeholder="search product"
              value={searchKey}
              onChangeText={setSearchKey}
              className="w-full bg-white p-3 rounded-md"
            />
          </View>
          <TouchableOpacity className="" onPress={handleSerach}>
            <FontAwesome5 name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      {results.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="pb-[350px]">
            <Text className="text-[20px] text-bold">searched Products</Text>
            {results.map((item) => (
              <View key={item.id} className="py-2">
                <TouchableOpacity
                  onPress={() => navigation.navigate("Details", { item })}
                >
                  <View className="flex flex-row items-center space-x-4">
                    <View className="p-3">
                      <Image
                        source={item.image}
                        className="w-[150px] h-[150px] rounded-md"
                      />
                    </View>
                    <View className="">
                      <Text className="text-[20px] w-[200px]">{item.name}</Text>
                      <Text className="text-[20px] opacity-60 my-5">
                        ${item.price}.00
                      </Text>
                      <Text className="text-[16px]">view details</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <View className=" h-[100vh] bg-white flex flex-row items-cent mt-10 justify-center">
          <View classsName="">
            <Image
              source={require("../assets/search.png")}
              className="w-[400px] h-[400px]"
            />
            <Text className="text-[40px] opacity-60 text-center ">
              no product found
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Search;
