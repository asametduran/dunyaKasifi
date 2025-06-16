import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import React, { useState } from 'react';
import MapView from '@/components/MapView';
import SearchBar from '@/components/SearchBar';
import CountryList from '@/components/CountryList';
import { countries } from '@/constants/countries';
import { Country } from '@/types';
import { useColorScheme } from 'react-native';

export default function WorldMapScreen() {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.capital.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Ülke veya başkent ara..."
      />
      <View style={styles.mapContainer}>
        <MapView
          countries={countries}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
        />
      </View>
      <View style={styles.listContainer}>
        <Text style={[styles.sectionTitle, isDark ? styles.darkText : styles.lightText]}>
          {searchQuery ? 'Arama Sonuçları' : 'Tüm Ülkeler'}
        </Text>
        <CountryList
          countries={filteredCountries}
          selectedCountry={selectedCountry}
          onSelectCountry={setSelectedCountry}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
  },
  lightContainer: {
    backgroundColor: '#E5F9FF',
  },
  darkContainer: {
    backgroundColor: '#FFE5E5',
  },
  mapContainer: {
    height: 280,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 12,
  },
  lightText: {
    color: '#1A237E',
  },
  darkText: {
    color: '#5D4037',
  },
});