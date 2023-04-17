import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Currency from "react-currency-formatter";
import {
  MinusCircleIcon,
  MinusSmallIcon,
  PlusCircleIcon,
} from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from "../features/basketSlice";

const Dishes = ({ id, name, price, desc, img }) => {
  const [isPressed, setIsPressed] = useState(false);
  const disPatch= useDispatch();
  //allow to get the item
  const items = useSelector((state)=> selectBasketItemsWithId(state, id));
  const addItemToBasket = ()=>{
    disPatch(addToBasket({id, name, price, desc, img}));
  }

  const removeItemsFromBasket=()=>{
    if(!items.length > 0) return;
    disPatch(removeFromBasket({id}));
  }
  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg font-bold ">{name}</Text>
            <Text className=" text-gray-400">{desc}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="VND" />
            </Text>
          </View>
          <View>
            <Image
              style={{ borderWidth: 1, borderColor: "#F3F3F4" }}
              source={{ uri: img }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="bg-white px-4 pt-1">
          <View className="flex-row  items-center space-x-2  pb-3">
            <TouchableOpacity disabled={!items.length} onPress={removeItemsFromBasket}>
              <MinusCircleIcon size={40} color={!items.length ? "gray" : "#00CCBB"} />
            </TouchableOpacity >
            <Text>{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon size={40} color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default Dishes;
