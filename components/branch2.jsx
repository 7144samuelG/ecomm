import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import headphones from './headphones2'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Branch2 = () => {
    const [data,setData]=useState(headphones)
    const navigation=useNavigation();
  return (
    <FlatList
      horizontal={true}
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ marginVertical: 10 }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={()=>navigation.navigate("Details",{item})}
        >
          <View className=" flex-row flex-wrap pr-3 justify-between ">
            <View className="bg-white p-3 rounded-[20px]">
              <Image
                source={item.image}
                className="w-[170px] h-[200px] rounded-md"
              />
              <View className="my-2">
              <Text className="text-bold text-[10px] w-[100px] text-gray-800">{item.name}</Text>
              </View>
              <View className="flex-row justify-between">
                
                <Text className="text-bold text-[18px] text-gray-400">
                  ${item.price}.00
                </Text>
                <AntDesign name="pluscircleo" size={24} color="black" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default Branch2