import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGameStore } from '@/store/gameStore';
import { countries } from '@/data/countries';

export default function FamilyPanel() {
  const { playerName, visitedCountries, quizResults, score } = useGameStore();

  const learningProgress = countries
    .filter((country) => visitedCountries.includes(country.id))
    .map((country) => {
      const countryQuizzes = quizResults.filter((q) => q.countryId === country.id);
      const successRate = countryQuizzes.length > 0
        ? (countryQuizzes.filter((q) => q.correct).length / countryQuizzes.length) * 100
        : 0;

      return {
        country,
        attempts: countryQuizzes.length,
        successRate,
      };
    });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Aile Paneli</Text>
          <Text style={styles.subtitle}>{playerName}'in Öğrenim Raporu</Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Genel İstatistikler</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Toplam Puan:</Text>
            <Text style={styles.statValue}>{score}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Ziyaret Edilen Ülkeler:</Text>
            <Text style={styles.statValue}>{visitedCountries.length}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Tamamlanan Testler:</Text>
            <Text style={styles.statValue}>{quizResults.length}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Ülkelere Göre İlerleme</Text>
        {learningProgress.map(({ country, attempts, successRate }) => (
          <View key={country.id} style={styles.countryCard}>
            <View style={styles.countryHeader}>
              <Text style={styles.countryName}>{country.name}</Text>
              <Text style={styles.successRate}>{successRate.toFixed(0)}% Başarı</Text>
            </View>
            <View style={styles.countryStats}>
              <Text style={styles.countryDetail}>Test Sayısı: {attempts}</Text>
              <Text style={styles.countryDetail}>
                Öğrenilen Bilgiler: {country.facts.length} gerçek
              </Text>
            </View>
          </View>
        ))}

        {learningProgress.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Henüz hiçbir ülke ziyaret edilmemiş. İlerleme kaydedildikçe burada görüntülenecek.
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
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Regular',
    color: '#666',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#666',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#333',
    marginBottom: 16,
  },
  countryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  countryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  countryName: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#333',
  },
  successRate: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#4CAF50',
  },
  countryStats: {
    gap: 4,
  },
  countryDetail: {
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