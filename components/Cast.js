import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { image185 } from 'api/moviedb';

export default function Cast({ cast, navigation }) {
  let personName = 'Keanu Reevs';
  let characterName = 'John Wick';
  return (
    <View className="my-6">
      <Text className="mx-4 mb-5 text-lg text-white">Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity onPress={() => navigation.navigate("Person", person)} key={index} className="mr-4 items-center">
                <View className="h-20 w-20 items-center overflow-hidden rounded-full border border-neutral-500">
                  <Image
                    // source={require('../assets/images/moviePoster1.png')}
                    source={{uri: image185(person.profile_path)}}
                    className="h-24 w-20 rounded-2xl"
                  />
                </View>
                <Text className="mt-1 text-xs text-white">
                  {person?.character.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character}
                </Text>
                <Text className="mt-1 text-xs text-neutral-400">
                  {person?.original_name.length > 10 ? person?.original_name.slice(0, 10) + '...' : person?.original_name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
