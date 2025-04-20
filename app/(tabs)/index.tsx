import { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { countries } from '@/data/countries';
import { useGameStore } from '@/store/gameStore';

export default function WorldMapScreen() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const visitedCountries = useGameStore((state) => state.visitedCountries);

  const handleCountryPress = (country) => {
    setSelectedCountry(country);
    router.push(`/country/${country.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Keşfedilecek Ülkeler</Text>
        <View style={styles.grid}>
          {countries.map((country) => (
            <Pressable
              key={country.id}
              style={[
                styles.countryCard,
                visitedCountries.includes(country.id) && styles.visitedCountry,
              ]}
              onPress={() => handleCountryPress(country)}
            >
              <Image
                source={{ uri: country.flagUrl }}
                style={styles.flag}
                resizeMode="cover"
              />
              <Text style={styles.countryName}>{country.name}</Text>
              {visitedCountries.includes(country.id) && (
                <View style={styles.visitedBadge}>
                  <Text style={styles.visitedText}>Ziyaret Edildi</Text>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  countryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  visitedCountry: {
    backgroundColor: '#E8F5E9',
  },
  flag: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  countryName: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#333',
    textAlign: 'center',
  },
  visitedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  visitedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
  },
});