import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'
import Currency from "react-currency-formatter";
const BasketIcon = () => {
    const items = useSelector(selectBasketItems);
    const navigation = useNavigation();
    const basketTotal = useSelector(selectBasketTotal);
  return (
    <View className=" absolute bottom-10 w-full z-50">
      <TouchableOpacity onPress={()=>navigation.navigate("Basket")} className="rounded-lg flex-row p-4 items-center  mx-5 bg-[#00CCBB]">
        <Text className="py-1 px-2 bg-[#01A296] text-white font-extrabold">{items.length}</Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">View Basket</Text>
        <Text className="text-lg text-white font-extrabold">
            <Currency quantity={basketTotal} currency ="VND"/>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon