import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const handleLogin = async () => {
    //
    //navigation.navigate("Tabs")
    setLoading(true);
    if (email === "" || password === "") {
      ToastAndroid.show("check your credentials again !", ToastAndroid.SHORT);
      setLoading(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (details) => {
          if (details) {
           
            setLoading(false)
          }
          navigation.navigate("Tabs")

          ToastAndroid.show(
            "successfully login.welcome back !",
            ToastAndroid.SHORT
          );
        }
      );
    } catch (err) {
      if (err) {
        setLoading(false);
        ToastAndroid.show(
          "check your credentials and try again !",
          ToastAndroid.SHORT
        );
        return;
      }
    }
  };
  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="w-full h-full">
          <Image
            source={require("../assets/hg.jpg")}
            className="w-[250px] flex justify-center mx-auto h-[100px] mt-[150px]"
          />
          <Text className="text-center text-[40px] text-extrabold">
            Welcome to Back
          </Text>
          <Text className="text-center mx-3 text-[20px]">
            Sign in to verce account to continue shopping for favourite
            headphones.Please enter your login details
          </Text>
          <View>
            <View className="mx-6 mt-[40px]">
              <Text className="text-[20px]">Email Address</Text>
              <View className="mt-4 flex flex-row items-center justify-between relative  border border-gray-300 rounded-[10px] ">
                <MaterialIcons
                  name="email"
                  size={24}
                  color="black"
                  className="pl-2"
                />
                <TextInput
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                  required
                  className="bg-transparent py-6 rounded-[10px] flex-1 w-full h-full"
                />
              </View>
            </View>
            <View className="mx-6 mt-[40px]">
              <Text className="text-[20px]">Password</Text>
              <View
                className="mt-4 flex flex-row items-center justify-between relative
            border border-gray-300 rounded-[10px]"
              >
                <Feather name="key" size={22} className="pl-2" />
                <TextInput
                  value={password}
                  secureTextEntry={isPasswordShown}
                  required
                  onChangeText={(text) => setPassword(text)}
                  className="bg-transparent flex-1 py-6 rounded-[10px] active:border-none w-full"
                />
                <TouchableOpacity onPress={()=>setIsPasswordShown(!isPasswordShown)}>
                  <Feather
                    name={isPasswordShown ? "eye-off" : "eye"}
                    size={22}
                    className="mr-2"
                  />
                </TouchableOpacity>
              </View>
              <View className="mt-4">
                <TouchableOpacity onPress={handleLogin}>
                  {loading ? (
                    <ActivityIndicator size="small" color="#0000ff" />
                  ) : (
                    <Text className="w-full bg-black text-white text-center py-5 rounded-md text-[20px]">
                      Login
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View className="flex  flex-row space-x-1 justify-center  text-[20px] mt-3 mb-[30px]">
                <Text className="text-[20px] text-semibold">
                  Don&#39;t have an Account?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                  disabled={loading}
                >
                  <Text className="text-[20px]">Create Account</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
