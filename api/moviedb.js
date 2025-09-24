import axios from 'axios';
import { apiKey } from '../constants/index';

//endpoints

const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day`;
const upcomingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming`;
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated`;

//dynamic endpoints

const movieDetailsEndpoint = (id) => `${apiBaseUrl}/movie/${id}`;
const movieCreditsEndpoint = (id) => `${apiBaseUrl}/movie/${id}/credits`;
const movieSimilarEndpoint = (id) => `${apiBaseUrl}/movie/${id}/similar`;

//cast endpoints
const castDetailsEndpoint = (id) => `${apiBaseUrl}/person/${id}`;
const castMoviesEndpoint = (id) => `${apiBaseUrl}/person/${id}/movie_credits`;

//search endpoints
const searchedMoviesEndpoints = `${apiBaseUrl}/search/movie`;

export const image500 = (path) => (path ? `https://image.tmdb.org/t/p/w500${path}` : null);
export const image342 = (path) => (path ? `https://image.tmdb.org/t/p/w342${path}` : null);
export const image185 = (path) => (path ? `https://image.tmdb.org/t/p/w185${path}` : null);

const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    console.log('error: ', err);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndPoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndPoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndPoint);
};
export const fetchMovieDetailsEndpoint = (id) => {
  return apiCall(movieDetailsEndpoint(id));
};
export const fetchMovieCreditsEndpoint = (id) => {
  return apiCall(movieCreditsEndpoint(id));
};
export const fetchMovieSimilarEndpoint = (id) => {
  return apiCall(movieSimilarEndpoint(id));
};
export const fetchCastDetailsEndpoint = (id) => {
  return apiCall(castDetailsEndpoint(id));
};
export const fetchCastMoviesEndpoint = (id) => {
  return apiCall(castMoviesEndpoint(id));
};
export const fetchSearchedMovies = (params) => {
  return apiCall(searchedMoviesEndpoints, params);
};
