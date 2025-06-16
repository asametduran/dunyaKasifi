  import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'react-native';
import { MapPin, Award, Flag } from 'lucide-react-native';
import { countries } from '@/constants/countries';

export default function PassportScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const visitedCountries = countries.filter(country => country.visited);
  const completionPercentage = (visitedCountries.length / countries.length) * 100;

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
      <ScrollView>
        <View style={styles.header}>
          <View style={[styles.passportCover, isDark ? styles.darkPassport : styles.lightPassport]}>
            <Text style={styles.passportTitle}>
              GEZGİN PASAPORTU
            </Text>
            <Text style={styles.passportSubtitle}>
              Dünyayı keşfet, anılarını biriktir
            </Text>
          </View>
        </View>

        <View style={[styles.statsContainer, isDark ? styles.darkCard : styles.lightCard]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, isDark ? styles.darkText : styles.lightText]}>
              {visitedCountries.length}
            </Text>
            <Text style={[styles.statLabel, isDark ? styles.darkSubText : styles.lightSubText]}>
              Ziyaret Edilen
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, isDark ? styles.darkText : styles.lightText]}>
              {countries.length - visitedCountries.length}
            </Text>
            <Text style={[styles.statLabel, isDark ? styles.darkSubText : styles.lightSubText]}>
              Keşfedilecek
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, isDark ? styles.darkText : styles.lightText]}>
              {completionPercentage.toFixed(1)}%
            </Text>
            <Text style={[styles.statLabel, isDark ? styles.darkSubText : styles.lightSubText]}>
              Tamamlandı
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark ? styles.darkText : styles.lightText]}>
            Ziyaret Edilen Ülkeler
          </Text>
          {visitedCountries.map(country => (
            <View key={country.id} style={[styles.countryItem, isDark ? styles.darkCard : styles.lightCard]}>
              <Image source={{ uri: country.flagUrl }} style={styles.countryFlag} />
              <View style={styles.countryInfo}>
                <Text style={[styles.countryName, isDark ? styles.darkText : styles.lightText]}>
                  {country.name}
                </Text>
                <Text style={[styles.countryCapital, isDark ? styles.darkSubText : styles.lightSubText]}>
                  {country.capital}
                </Text>
              </View>
              <View style={styles.stampContainer}>
                <Text style={styles.stampText}>ONAYLANDI</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark ? styles.darkText : styles.lightText]}>
            Başarılar
          </Text>
          <View style={[styles.achievementItem, isDark ? styles.darkCard : styles.lightCard]}>
            <Award size={24} color="#FFD700" />
            <Text style={[styles.achievementText, isDark ? styles.darkText : styles.lightText]}>
              Dünya Gezgini Başlangıç
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkContainer: {
    backgroundColor: '#FFE5E5',
  },
  lightContainer: {
    backgroundColor: '#E5F9FF',
  },
  header: {
    padding: 24,
  },
  passportCover: {
    padding: 24,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  darkPassport: {
    backgroundColor: '#FFB74D',
  },
  lightPassport: {
    backgroundColor: '#4FC3F7',
  },
  passportTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  passportSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  statDivider: {
    width: 2,
    backgroundColor: '#FFB6B9',
    opacity: 0.5,
    marginHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  countryFlag: {
    width: 48,
    height: 32,
    borderRadius: 8,
  },
  countryInfo: {
    flex: 1,
    marginLeft: 16,
  },
  countryName: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
  },
  countryCapital: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  stampContainer: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
    transform: [{ rotate: '-15deg' }],
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  stampText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 14,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  achievementText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    marginLeft: 16,
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
  lightCard: {
    backgroundColor: '#F0FFFF',
  },
  darkCard: {
    backgroundColor: '#FFF5F5',
  },
});