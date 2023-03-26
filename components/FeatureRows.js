import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ArrowDownRightIcon,
  ArrowRightIcon,
} from "react-native-heroicons/outline";
import RestaurantCards from "./RestaurantCards";
import sanityClient, { urlFor } from "../sanity";

const FeatureRows = ({ id, title, description }) => {
  const [restaurantCards, setRestaurantCards] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured" && _id==$id]{
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type->{
            ...,
          }
        },
        }[0]`,
        { id }
      )
      .then((data) => {
        setRestaurantCards(data?.restaurants);
      });
  }, []);
  return (
    <View>
      <View className="flex-row items-center mt-4 px-4 ">
        <Text className="font-bold text-lg flex-1">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="ml-4 text-xs">{description}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {/*Restaurant cards. . .*/}
        {restaurantCards?.map((restaurantCard) => (
          <RestaurantCards
            key={restaurantCard._id}
            id={restaurantCard._id}
            imgUrl={urlFor(restaurantCard.image).url()}
            title={restaurantCard.name}
            rating={restaurantCard.rating}
            genre={restaurantCard.genre}
            address={restaurantCard.address}
            short_description={restaurantCard.short_description}
            dishes={restaurantCard.dishes}
            long={restaurantCard.long}
            lat={restaurantCard.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeatureRows;
