import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  StarIcon,
  MapPinIcon,
  ChevronRightIcon,
} from "react-native-heroicons/solid";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import Dishes from "../components/Dishes";
import { urlFor } from "../sanity";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  // Pull arguments those are passed along
  const {
    params: {
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
    },
  } = useRoute();
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      horizontal={false}
    >
      <View className="relative">
        <Image source={{ uri: imgUrl }} className="h-60 w-90 " />
        <TouchableOpacity
          onPress={navigation.goBack}
          className="absolute top-10 left-4 p-2 rounded-full bg-gray-50"
        >
          <ArrowLeftIcon size={20} color="#00CCBB" />
        </TouchableOpacity>
      </View>
      <View className="p-5 bg-white">
        <Text className="font-bold text-3xl">{title}</Text>
        <View className="flex-row my-1">
          <StarIcon size={20} color="green" />
          <Text className="text-xs pr-3">
            <Text className="text-green-800 ">{rating}</Text> - {genre}
          </Text>
          <MapPinIcon size={20} color="gray" />
          <Text className="text-xs text-gray-600">
            Nearby - <Text>{address}</Text>
          </Text>
        </View>
        <Text className="mt-2 text-xs text-gray-600">{short_description}</Text>
      </View>

      <TouchableOpacity className="bg-white p-4 items-center space-x-2 flex-row border-t border-gray-300">
        <QuestionMarkCircleIcon size={20} color="gray" />
        <Text className="flex-1 font-bold">Have a food allegry?</Text>
        <ChevronRightIcon size={20} color="green" />
      </TouchableOpacity>
      <View>
        <Text className="font-bold text-2xl mx-5 mt-5 mb-2">Menu</Text>
        {dishes?.map((dish) => (
          <Dishes
            key={dish._id}
            name={dish.name}
            desc={dish.short_description}
            price={dish.price}
            img={urlFor(dish.image).url()}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default RestaurantScreen;
