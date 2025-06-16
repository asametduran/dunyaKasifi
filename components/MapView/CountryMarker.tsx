import React from 'react';
import { StyleSheet, View, Text, Platform, Pressable } from 'react-native';
import { Country } from '@/types';

interface CountryMarkerProps {
  country: Country;
  isSelected: boolean;
  onPress: () => void;
  mapWidth: number;
  mapHeight: number;
}

export default function CountryMarker({ country, isSelected, onPress, mapWidth, mapHeight }: CountryMarkerProps) {
  // Calculate position based on map dimensions and country coordinates
  const left = `${country.mapPosition.x * 100}%`;
  const top = `${country.mapPosition.y * 100}%`;

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.marker,
        {
          left,
          top,
          transform: [
            { translateX: -10 }, // Center the marker horizontally
            { translateY: -10 }, // Center the marker vertically
          ],
        },
      ]}
    >
      <View style={[styles.dot, isSelected && styles.selectedDot]}>
        <Text style={styles.countryCode}>{country.code}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  marker: {
    position: 'absolute',
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  selectedDot: {
    backgroundColor: '#FF4081',
    transform: [{ scale: 1.2 }],
  },
  countryCode: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});