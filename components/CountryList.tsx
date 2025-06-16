import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Country } from '@/types';
import { ChevronRight } from 'lucide-react-native';
import { useColorScheme } from 'react-native';

interface CountryListProps {
  countries: Country[];
  selectedCountry: Country | null;
  onSelectCountry: (country: Country) => void;
}

export default function CountryList({ countries, selectedCountry, onSelectCountry }: CountryListProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const sortedCountries = [...countries].sort((a, b) => {
    if (a.visited === b.visited) return 0;
    return a.visited ? 1 : -1;
  });

  const handleCountryPress = (country: Country) => {
    onSelectCountry(country);
    router.push(`/country/${country.id}`);
  };

  return (
    <FlatList
      data={sortedCountries}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[
            styles.countryItem,
            selectedCountry?.id === item.id && styles.selectedItem,
            isDark ? styles.darkItem : styles.lightItem,
            item.visited && styles.visitedItem,
          ]}
          onPress={() => handleCountryPress(item)}
        >
          <Image source={{ uri: item.flagUrl }} style={styles.flag} />
          <View style={styles.countryInfo}>
            <Text style={[styles.countryName, isDark ? styles.darkText : styles.lightText]}>
              {item.name}
            </Text>
            <Text style={[styles.capitalName, isDark ? styles.darkSubText : styles.lightSubText]}>
              {item.capital}
            </Text>
          </View>
          {item.visited && (
            <View style={styles.visitedBadge}>
              <Text style={styles.visitedText}>Ziyaret Edildi</Text>
            </View>
          )}
          <ChevronRight size={20} color={isDark ? '#795548' : '#303F9F'} />
        </TouchableOpacity>
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 16,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  selectedItem: {
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  visitedItem: {
    opacity: 0.9,
  },
  lightItem: {
    backgroundColor: '#F0FFFF',
  },
  darkItem: {
    backgroundColor: '#FFF5F5',
  },
  flag: {
    width: 48,
    height: 32,
    borderRadius: 8,
    marginRight: 16,
  },
  countryInfo: {
    flex: 1,
  },
  countryName: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    marginBottom: 4,
  },
  capitalName: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  visitedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  visitedText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  lightText: {
    color: '#1A237E',
  },
  darkText: {
    color: '#5D4037',
  },
  lightSubText: {
    color: '#303F9F',
  },
  darkSubText: {
    color: '#795548',
  },
});