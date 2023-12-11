import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { EvilIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from "react-redux";
//import { addToCart } from "../store/cartSlice";
import useStore from "../cartStore";
//import { addToCart } from "../redux/cartSlice";
import { addToCart } from "../store/cartSlice";
import { initPaymentSheet } from "@stripe/stripe-react-native";
const ProductsDetails = () => {
  const itemss=useSelector(state=>state.cart.items)
  const navigation=useNavigation()
  const item = useRoute();
  const itemDetail = item.params;
  const name = itemDetail.item.name;
  const id=itemDetail.item.id 
  const image = itemDetail.item.image;
  const images = itemDetail.item.images;
  const price=itemDetail.item.price
  const [imageD, setImage] = useState(image);
  const dispatch = useDispatch();
  const product={
    id:id,
    name:name,
    price:price,
    image:image,
    quantity:2
  }
  const updateOrAddToCart=useStore((state) => state.updateOrAddToCart)
  const items = useSelector((state) => state.cart.items);
  const handleAddToCart=()=>{
    //updateOrAddToCart(product)
    //console.log(product)
    dispatch(addToCart({id,name,price,image,quantity:1}))
   navigation.navigate("Cart")
  }

  return (
    <SafeAreaView>
      <View className="mt-[50px] w-full">
        <View className="absolute top-0 left-0 z-[888888] ml-2  rounded-full">
          <TouchableOpacity
            className="bg-transparent p-2"
            onPress={() => navigation.goBack()}
          >
            <Entypo name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
        </View>
         <View className="absolute top-0 right-0 z-[888888] ml-2 ">
         <TouchableOpacity className="bg-transparent p-2 relative" onPress={()=>navigation.navigate("Cart")} >
          <FontAwesome name="opencart" size={24} color="black" />
          <Text className="text-red-500 absolute right-0">{itemss.length}</Text>
        </TouchableOpacity>
        </View>
        <View>
          <Image source={imageD} className="w-full h-[350px]" />
          <Text className="text-center mt-6 text-[20px] opacity-100 tracking-widest">
            {name}
          </Text>
          <Text className="text-center text-[18px] opacity-60 w-[90%] mx-auto mt-3 tracking-wider">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Repellendus, officia. Incidunt tempora, minus eum est praesentium
            error, exercitationem odit neque corporis unde sit qui, dicta
            corrupti doloribus quidem blanditiis delectus?
          </Text>
        </View>
        <View className="flex flex-row justify-center space-x-3 mt-4 mb-5 ">
          {images.map((item) => (
            <View key={item} className="">
              <TouchableOpacity className="mt-4" onPress={() => setImage(item)}>
                <View className="">
                  <Image source={item} className="w-[70px] h-[70px]" />
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View className="mt-6">
          <TouchableOpacity className="flex flex-row justify-center items-center"
           onPress={()=>dispatch(addToCart({id,name,image,price,quantity:1}))}>
            <View className="flex flex-row border items-center p-4 rounded-[30px] space-x-3">
            <EvilIcons name="cart" size={24} color="black" />
            <Text className="text-[25px] opacity-60">${price}.00</Text>
            <Text className="text-[25px] opacity-60">| ADD TO BASKET</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductsDetails;
