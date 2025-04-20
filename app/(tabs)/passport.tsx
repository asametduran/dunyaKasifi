import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGameStore } from '@/store/gameStore';
import { countries } from '@/data/countries';

export default function PassportScreen() {
  const visitedCountries = useGameStore((state) => state.visitedCountries);
  const score = useGameStore((state) => state.score);

  const visitedCountryDetails = countries.filter((country) =>
    visitedCountries.includes(country.id)
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.passportHeader}>
          <Text style={styles.title}>Gezgin Pasaportu</Text>
          <Text style={styles.score}>Toplam Puan: {score}</Text>
        </View>

        <View style={styles.stampsContainer}>
          {visitedCountryDetails.map((country) => (
            <View key={country.id} style={styles.stampCard}>
              <Image
                source={{ uri: country.flagUrl }}
                style={styles.stamp}
                resizeMode="contain"
              />
              <View style={styles.stampInfo}>
                <Text style={styles.countryName}>{country.name}</Text>
                <Text style={styles.visitDate}>
                  {new Date().toLocaleDateString('tr-TR')}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {visitedCountryDetails.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Henüz hiç ülke ziyaret etmedin. Haritaya dön ve keşfetmeye başla!
            </Text>
          </View>
        )}
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
  passportHeader: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  score: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
  },
  stampsContainer: {
    gap: 16,
  },
  stampCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  stamp: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  stampInfo: {
    flex: 1,
  },
  countryName: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginBottom: 4,
  },
  visitDate: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#666',
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#666',
    textAlign: 'center',
  },
});