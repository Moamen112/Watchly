import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import Loading from 'components/Loading';
import { debounce } from 'lodash';
import { fetchSearchedMovies, image185 } from 'api/moviedb';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  let movieName = 'Ant-man and the Wasp:Quantumania';

  const handleSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      fetchSearchedMovies({
        query: value,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
      }).then((response) => {
        setLoading(false);
        if (response && response.results) setResults(response.results);
      });
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useMemo(
    () =>
      debounce((value) => {
        handleSearch(value);
      }, 400),
    []
  );

  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <View className="mx-4 mb-3 flex-row items-center justify-between rounded-full border border-neutral-500">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder="Search Movie"
          placeholderTextColor={'lightgray'}
          className="flex-1  pl-6 text-base font-semibold tracking-wider  text-white"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="m-1 rounded-full bg-neutral-500 p-3">
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>
      {/* Results */}
      {loading ? (
        <Loading />
      ) : (
        <>
          {results.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              className="gap-3">
              <Text className="mb-3 ml-1 font-semibold text-white">Results ({results.length})</Text>
              <View className="flex-row flex-wrap justify-between">
                {results.map((item, index) => {
                  return (
                    <TouchableWithoutFeedback
                      key={index}
                      onPress={() => navigation.push('Movie', item)}>
                      <View className="mb-4 space-y-2">
                        <Image
                          className="rounded-3xl "
                          // source={require('../assets/images/moviePoster1.png')}
                          source={{uri: image185(item?.poster_path)}}
                          style={{ width: width * 0.44, height: height * 0.3 }}
                        />
                        <Text className="ml-1 text-neutral-300">
                          {item?.title.length > 22 ? item?.title.slice(0, 22) + '...' : item?.title}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            </ScrollView>
          ) : (
            <View className="flex-row justify-center">
              <Image source={require('../assets/images/movietime2.png')} className="h-96 w-96" />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}
