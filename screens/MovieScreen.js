import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { styles, theme } from 'theme';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from 'components/Cast';
import MovieList from 'components/MovieList';
import Loading from 'components/Loading';
import {
  fetchMovieCreditsEndpoint,
  fetchMovieDetailsEndpoint,
  fetchMovieSimilarEndpoint,
  image500,
} from 'api/moviedb';
import Button from 'components/UI/Button';

let { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const topMargin = ios ? '' : 'mt-3';

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);
  let movieName = 'Ant-man and the Wasp: Quantumania';

  useEffect(() => {
    // call the movie details api
    // console.log('itemId: ', item.id);
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetailsEndpoint(id);
    if (data) setMovie(data);

    setLoading(false);
  };
  const getMovieCredits = async (id) => {
    const data = await fetchMovieCreditsEndpoint(id);
    if (data && data.cast) setCast(data.cast);

    setLoading(false);
  };
  const getSimilarMovies = async (id) => {
    const data = await fetchMovieSimilarEndpoint(id);
    if (data && data.results) setSimilarMovies(data.results);

    setLoading(false);
  };

  const playButtonHandler = (item) => {
    navigation.push('Player', item);
  };

  return (
    <ScrollView style={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
      <View className="w-full">
        <SafeAreaView
          className={
            'absolute z-20 w-full flex-row items-center justify-between px-4 ' + topMargin
          }>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.background}
            className="rounded-xl p-1">
            <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <HeartIcon size="35" color={isFavorite ? theme.background : 'white'} />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <>
            <View>
              <Image
                // source={require('../assets/images/moviePoster1.png')}
                source={{ uri: image500(movie.poster_path) }}
                style={{ width, height: height * 0.7 }}
              />
              <LinearGradient
                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                style={{ width, height: height * 0.6 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>
            <View style={{ marginTop: -(height * 0.15) }} className="gap-3">
              <Button onPress={playButtonHandler.bind(this, movie)}>Play</Button>
              <Text className="text-center text-3xl font-bold tracking-wider text-white">
                {movie?.title}
              </Text>
              {/* stats, release, runtime */}
              {movie?.id ? (
                <Text className="text-center text-base font-semibold text-neutral-400">
                  {movie?.status}・{movie?.release_date?.split('-')[0]}・{movie?.runtime} min
                </Text>
              ) : null}

              {/* Genres */}
              <View className="mx-4 flex-row justify-center gap-x-2">
                {movie?.genres?.map((genre, index) => {
                  let showDot = index + 1 !== movie.genres.length;
                  return (
                    <Text
                      key={index}
                      className="text-center text-base font-semibold text-neutral-400">
                      {genre?.name} {showDot && '・'}
                    </Text>
                  );
                })}
              </View>
              {/* Description */}
              <Text className="mx-6 leading-6 tracking-wide text-neutral-400">
                {movie?.overview}
              </Text>
            </View>
            {/* Cast */}
            <Cast cast={cast} navigation={navigation} />
            {/* Similar Movies */}
            <MovieList title="Similar Movies" hideSeeAll={true} data={similarMovies} />
          </>
        )}
      </View>
    </ScrollView>
  );
}
