import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FirebaseError } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { async } from "@firebase/util";
import { useAuth } from "../auth/auth";

const Profile = () => {
  const navigation = useNavigation();
  const {user}=useAuth()
  console.log(user)
  const auth = getAuth();
  const handleLogout = async () => {
    await signOut(auth).then(() => {
      navigation.navigate("Login");
      ToastAndroid.show("successfully logged out", ToastAndroid.SHORT);
    });
  };
  return (
    <SafeAreaView>
      <View className="flex flex-row items-center justify-center h-[100vh]">
        <View className="">
          <View className="flex flex-row justify-center">
            <Ionicons name="person" size={100} color="black" />
          </View>

          <View className="">
            <Text className="text-center text-[20px]">{user?.email}</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text className="text-center text-[40px]">Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
