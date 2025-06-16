import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Country } from '@/types';
import { useColorScheme } from 'react-native';
import CountryMarker from './CountryMarker';

interface MapViewProps {
  countries: Country[];
  selectedCountry: Country | null;
  onSelectCountry: (country: Country) => void;
}

// Only import react-native-maps when not on web platform
let MapView: any;
let Marker: any;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}

export default function MapViewComponent({ countries, selectedCountry, onSelectCountry }: MapViewProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // For web, show a grid-based map visualization
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
        <View style={styles.webMap}>
          {countries.map((country) => (
            <CountryMarker
              key={country.id}
              country={country}
              isSelected={selectedCountry?.id === country.id}
              onPress={() => onSelectCountry(country)}
              mapWidth={800}
              mapHeight={400}
            />
          ))}
          <View style={styles.gridOverlay}>
            {Array.from({ length: 10 }).map((_, i) => (
              <View key={`v-${i}`} style={[
                styles.gridLineVertical,
                { left: `${(i + 1) * 10}%` }
              ]} />
            ))}
            {Array.from({ length: 5 }).map((_, i) => (
              <View key={`h-${i}`} style={[
                styles.gridLineHorizontal,
                { top: `${(i + 1) * 20}%` }
              ]} />
            ))}
          </View>
        </View>
      </View>
    );
  }

  // For native platforms, use react-native-maps
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 20,
          longitude: 0,
          latitudeDelta: 100,
          longitudeDelta: 100,
        }}
      >
        {countries.map((country) => (
          <Marker
            key={country.id}
            coordinate={{
              latitude: country.mapPosition.y * 180 - 90,
              longitude: country.mapPosition.x * 360 - 180,
            }}
            onPress={() => onSelectCountry(country)}
          >
            <CountryMarker
              country={country}
              isSelected={selectedCountry?.id === country.id}
              onPress={() => onSelectCountry(country)}
              mapWidth={30}
              mapHeight={20}
            />
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  darkContainer: {
    backgroundColor: '#1C1C1E',
  },
  lightContainer: {
    backgroundColor: '#F2F2F7',
  },
  map: {
    flex: 1,
  },
  webMap: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E8F4F8',
    position: 'relative',
    borderRadius: 12,
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  gridLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  gridLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});