// PlayerScreen.js
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';
import { StatusBar } from 'expo-status-bar';

export default function PlayerScreen() {
  const { params: movie } = useRoute();
  const [loading, setLoading] = useState(true);

  // Construct the VidSrc embed URL using the movie ID
  const vidSrcUrl = `https://vidsrc.xyz/embed/movie/${movie?.id}`;

  // Lock orientation to landscape when component mounts
  useEffect(() => {
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      } catch (error) {
        console.log('Orientation lock failed:', error);
      }
    };

    lockOrientation();

    // Reset orientation when component unmounts
    return () => {
      ScreenOrientation.unlockAsync();
    };
  }, []);

  if (!movie?.id) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No movie ID provided</Text>
        </View>
      </View>
    );
  }

  // CSS to hide the header and other elements
  const hideHeaderCSS = `
    document.addEventListener('DOMContentLoaded', function() {
      // Hide the header/title section
      const header = document.querySelector('h3');
      if (header) header.style.display = 'none';
      
      // Hide the server selection buttons (CloudStream Pro, 2Embed, Superembed)
      const buttons = document.querySelectorAll('button');
      buttons.forEach(button => button.style.display = 'none');
      
      // Hide any navigation or header elements
      const headers = document.querySelectorAll('header, .header, nav, .nav');
      headers.forEach(el => el.style.display = 'none');
      
      // Make the video container full screen
      const videoContainer = document.querySelector('.video-container') || document.querySelector('video')?.parentElement;
      if (videoContainer) {
        videoContainer.style.position = 'fixed';
        videoContainer.style.top = '0';
        videoContainer.style.left = '0';
        videoContainer.style.width = '100%';
        videoContainer.style.height = '100%';
        videoContainer.style.zIndex = '9999';
      }
    });
  `;

  return (
    <View style={styles.container}>
      {/* Hide the status bar */}
      <StatusBar hidden />

      {/* WebView for VidSrc Player with hidden header */}
      <WebView
        source={{ uri: vidSrcUrl }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoad={() => setLoading(false)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error:', nativeEvent);
          setLoading(false);
        }}
        onLoadEnd={() => setLoading(false)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        startInLoadingState={true}
        injectedJavaScript={hideHeaderCSS}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading player...</Text>
          </View>
        )}
      />

      {/* Loading Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading player...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  webview: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

