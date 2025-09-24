import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import React from 'react';
import { styles } from 'theme';
import { useNavigation } from '@react-navigation/native';
import { image185 } from 'api/moviedb';

let { width, height } = Dimensions.get('window');

export default function MovieList({ title, data, hideSeeAll }) {
  let movieName = 'Ant-man and the Wasp:Quantumania';
  const navigation = useNavigation();
  return (
    <View className="mb-8 gap-4">
      <View className="mx-4 flex-row items-center justify-between">
        <Text className="text-xl text-white">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.text} className="text-lg">
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.push('Movie', item)}>
              <View className="mr-4 gap-1">
                <Image
                  // source={require('../assets/images/moviePoster1.png')}
                  source={{uri: image185(item.poster_path)}}
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
                <Text className="ml-1 text-neutral-300">
                  {item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
