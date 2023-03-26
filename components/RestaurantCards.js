import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { ArrowLeftIcon, StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";

const RestaurantCards = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) => {
  const navigation =useNavigation();
  return (
    
    <TouchableOpacity
    onPress={()=>{
      navigation.navigate("Restaurants", {id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,})
    }}
    className="mr-2 mt-2 bg-white shadow-sm">
      <Image source={{ uri: imgUrl}} className="h-40 w-full " />
      <View className=" pl-2 pt-3">
        <Text className=" font-bold text-2xl px-1">{title}</Text>
        <View className="flex-row space-x-1 items-center mt-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-600">{rating}</Text> - {genre}
          </Text>
        </View>
        <View className="flex-row mt-1 mb-4 space-x-1">
          <MapPinIcon size={22} color="gray"/>
          <Text className="text-xs text-gray-500">Nearby - {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCards;
