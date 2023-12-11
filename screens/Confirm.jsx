import { useState } from "react";
import ConfettiCannon from "react-native-confetti-cannon";
import {
  Button,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
//import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

const ConfirmOrdre = () => {
  const navigation = useNavigation();
  const[state,setSate]=useState(true)
  return (
    <SafeAreaView>
      {state? <ConfettiCannon
            count={200}
            origin={{x: -10, y: 0}} 
          /> 
          : null}
      <View className="flex items-center justify-center h-full">
        <Text className="text-center text-[30px]">
          order confirmed to be delivered as soon as possible...
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text className="p-4 opacity-70 text-[20px]  mt-4 "> Back To Home screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmOrdre;
