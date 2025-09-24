
# MovieApp

A sleek and modern mobile application for browsing movies, built with React Native and Expo. Discover trending, upcoming, and top-rated movies, search for your favorites, and explore detailed information about movies and cast members.

## Features

- **Discover Movies:** Browse through lists of trending, upcoming, and top-rated movies.
- **Movie Details:** View detailed information for each movie, including synopsis, release date, rating, and poster.
- **Cast Information:** See the cast for each movie and explore the filmography of individual actors.
- **Similar Movies:** Get recommendations for movies similar to the one you're viewing.
- **Search:** Quickly find any movie by title.
- **Responsive Design:** A clean and intuitive user interface that works seamlessly on both iOS and Android devices.

## Screenshots

*(Here you can add screenshots of your application. You can replace the placeholder links with your actual images.)*

| Home Screen | Movie Details | Search Screen |
| :---: |:---: |:---: |
| ![Home Screen](https://via.placeholder.com/300x600.png?text=Home+Screen) | ![Movie Details](https://via.placeholder.com/300x600.png?text=Movie+Details) | ![Search Screen](https://via.placeholder.com/300x600.png?text=Search+Screen) |

## Tech Stack

- **Framework:** React Native (Expo)
- **Language:** JavaScript/TypeScript
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Navigation:** React Navigation
- **HTTP Client:** Axios
- **UI Libraries:**
  - `react-native-heroicons`
  - `react-native-progress`
  - `react-native-snap-carousel`
  - `expo-linear-gradient`
- **Linting & Formatting:** ESLint & Prettier

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Expo Go app on your iOS or Android device, or an emulator/simulator.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/movie-app.git
   cd movie-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your API Key:**
   This project uses The Movie Database (TMDb) API. You will need to get your own API key from their website.

   - Create a file named `constants/index.js` if it doesn't exist.
   - Add the following code to it, replacing `YOUR_API_KEY` with your actual key:
     ```javascript
     export const apiKey = 'YOUR_API_KEY';
     ```

### Running the Application

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Run on your device or simulator:**
   - Scan the QR code with the Expo Go app on your phone.
   - Or, press `i` to run on an iOS simulator or `a` to run on an Android emulator.

## API Reference

This project uses the [The Movie Database (TMDb) API](https://developer.themoviedb.org/docs) for all movie and cast data.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

