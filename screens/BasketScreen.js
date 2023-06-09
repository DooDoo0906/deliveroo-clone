import { View, Text, TouchableOpacity, SafeAreaView, Image, ScrollView } from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { removeFromBasket, selectBasketItems } from "../features/basketSlice";
import { XCircleIcon, XMarkIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanity";
import Currency from "react-currency-formatter";
const BasketScreen = () => {
  const navigation = useNavigation();
  const disPatch = useDispatch();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupItems, setGroupItems] = useState([]);
  useMemo(() => {
    setGroupItems(
      items.reduce((result, item) => {
        (result[item.id] = result[item.id] || []).push(item);
        return result;
      }, {})
    );
  }, [items]);
  console.log(groupItems)
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View  className="flex-1 bg-gray-100">
        <View className="border-b border-[#00CCBB] bg-white shadow-sm p-5">
          <View >
            <Text className="font-bold text-center text-lg">Basket</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>
          <TouchableOpacity onPress={navigation.goBack} className="rounded-full absolute bg-gray-100 top-3 right-5">
            <XCircleIcon color="#00CCBB" height={50} width={50}/>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 p-4 bg-white my-5">
          <Image source={{uri: "https://links.papareact.com/wru"}} className="h-7 w-7 bg-gray-300 p-4 rounded-full"/>
          <Text className="flex-1"> Deliver in 50-75 mins</Text>
          <TouchableOpacity>
            <Text className='text-[#00CCBB]'>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupItems).map(([key,items])=>(
            <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
              <Text className="text-[#00CCBB]">{items.length} x</Text>
              <Image
                source={{uri: urlFor(items[0]?.img).url()}}
                className="h-12 w-12 rounded-full"
              />
              <Text className='flex-1'>{items[0]?.name}</Text>
              <Text className='textgray600'>
                <Currency quantity={items[0]?.price} currency="VND"/>
              </Text>

              <TouchableOpacity>
                <Text className="text-[#00CCBB] text-xs" onPress={()=>disPatch(removeFromBasket({id:key}))}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
