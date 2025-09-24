import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles } from 'theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from 'components/MovieList';
import Loading from 'components/Loading';
import { fetchCastDetailsEndpoint, fetchCastMoviesEndpoint, image185, image342 } from 'api/moviedb';

const { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : ' my-3';

export default function PersonScreen() {
  const { params: item } = useRoute();
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState({});
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    getCastDetails(item.id);
    getPersonMoviesDetails(item.id);
  }, [item]);

  const getCastDetails = async (id) => {
    const data = await fetchCastDetailsEndpoint(id);
    if (data) setCast(data);
    setLoading(false);
  };
  const getPersonMoviesDetails = async (id) => {
    const data = await fetchCastMoviesEndpoint(id);
    if (data && data.cast) setPersonMovies(data.cast);
    setLoading(false);
  };

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
      <SafeAreaView
        className={
          'absolute z-20 w-full flex-row items-center justify-between px-4 ' + verticalMargin
        }>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1">
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <HeartIcon size="35" color={isFavorite ? 'red' : 'white'} />
        </TouchableOpacity>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <>
          <SafeAreaView
            className={'flex-row justify-center ' + (ios ? '' : ' mt-20')}
            style={{
              shadowColor: 'gray',
              shadowRadius: 40,
              shadowOffset: { width: 0, height: 5 },
              shadowOpacity: 1,
              elevation: 5,
              backgroundColor: 'transparent',
            }}>
            <View className="h-90 w-90 items-center overflow-hidden rounded-full border-2 border-neutral-500">
              <Image
                // source={require('../assets/images/moviePoster1.png')}
                source={{ uri: image342(cast?.profile_path) }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </SafeAreaView>
          <View className="mt-6">
            <Text className="text-center text-3xl font-bold text-white">{cast?.name}</Text>
            <Text className="text-center text-base  text-neutral-500">{cast?.place_of_birth}</Text>
          </View>
          <View className="mx-3 mt-6 flex-row items-center justify-between rounded-full bg-neutral-700 p-4">
            <View className="items-center border-r-2 border-r-neutral-400 px-3 ">
              <Text className="font-semibold text-white">Gender</Text>
              <Text className="font-sm text-neutral-300">
                {cast?.gender === 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View className="items-center border-r-2 border-r-neutral-400 px-3 ">
              <Text className="font-semibold text-white">Birthday</Text>
              <Text className="font-sm text-neutral-300">{cast?.birthday}</Text>
            </View>
            <View className="items-center border-r-2 border-r-neutral-400 px-3 ">
              <Text className="font-semibold text-white">Known for</Text>
              <Text className="font-sm text-neutral-300">{cast?.known_for_department}</Text>
            </View>
            <View className="items-center  px-3 ">
              <Text className="font-semibold text-white">Popularity</Text>
              <Text className="font-sm text-neutral-300">{cast?.popularity}</Text>
            </View>
          </View>
          <View className="mx-4 my-6 gap-y-2">
            <Text className="text-lg text-white">Biography</Text>
            <Text className="tracking-wide text-neutral-400">{cast?.biography}</Text>
          </View>
          {/* Movie List */}
          <MovieList data={personMovies} hideSeeAll={true} title="Cast Movies" />
        </>
      )}
      {/* Person Details */}
    </ScrollView>
  );
}
