import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useColorScheme } from 'react-native';
import { Settings, MapPin, Flag, Heart, ChevronRight, User } from 'lucide-react-native';

const CHARACTERS = [
  {
    id: 'char1',
    name: 'Gezgin Ali',
    emoji: '👨',
    description: 'Macera dolu bir gezgin',
    height: 175,
    weight: 70,
    hairColor: 'Siyah',
    eyeColor: 'Kahverengi',
    style: 'Sportif'
  },
  {
    id: 'char2',
    name: 'Kaşif Ayşe',
    emoji: '👩',
    description: 'Keşfetmeyi seven bir gezgin',
    height: 165,
    weight: 55,
    hairColor: 'Kahverengi',
    eyeColor: 'Yeşil',
    style: 'Casual'
  },
  {
    id: 'char3',
    name: 'Serüvenci Mehmet',
    emoji: '👨‍🦰',
    description: 'Doğa tutkunı bir gezgin',
    height: 180,
    weight: 75,
    hairColor: 'Kızıl',
    eyeColor: 'Mavi',
    style: 'Doğacı'
  },
  {
    id: 'char4',
    name: 'Gezgin Zeynep',
    emoji: '👩‍🦱',
    description: 'Kültür meraklısı bir gezgin',
    height: 170,
    weight: 60,
    hairColor: 'Siyah',
    eyeColor: 'Kahverengi',
    style: 'Şık'
  }
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(CHARACTERS[0]);

  return (
    <SafeAreaView style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
      <ScrollView>
        <View style={styles.profileHeader}>
          <TouchableOpacity 
            style={styles.avatarContainer} 
            onPress={() => setShowCustomization(true)}
          >
            <View style={[styles.avatarPlaceholder, isDark ? styles.darkCard : styles.lightCard]}>
              <Text style={styles.avatarEmoji}>{selectedCharacter.emoji}</Text>
              <View style={styles.characterInfo}>
                <Text style={[styles.characterName, isDark ? styles.darkText : styles.lightText]}>
                  {selectedCharacter.name}
                </Text>
                <Text style={[styles.characterStyle, isDark ? styles.darkSubText : styles.lightSubText]}>
                  {selectedCharacter.style}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={[styles.statsContainer, isDark ? styles.darkCard : styles.lightCard]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, isDark ? styles.darkText : styles.lightText]}>0</Text>
            <Text style={[styles.statLabel, isDark ? styles.darkSubText : styles.lightSubText]}>
              Ziyaret Edilen
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, isDark ? styles.darkText : styles.lightText]}>0</Text>
            <Text style={[styles.statLabel, isDark ? styles.darkSubText : styles.lightSubText]}>
              İstek Listesi
            </Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={[styles.statValue, isDark ? styles.darkText : styles.lightText]}>0%</Text>
            <Text style={[styles.statLabel, isDark ? styles.darkSubText : styles.lightSubText]}>
              Dünya Keşfi
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark ? styles.darkText : styles.lightText]}>
            Aktiviteler
          </Text>
          <TouchableOpacity style={[styles.menuItem, isDark ? styles.darkCard : styles.lightCard]}>
            <View style={[styles.iconContainer, { backgroundColor: '#4FC3F7' }]}>
              <MapPin size={20} color="#FFFFFF" />
            </View>
            <Text style={[styles.menuItemText, isDark ? styles.darkText : styles.lightText]}>
              Ziyaret Edilen Ülkeler
            </Text>
            <ChevronRight size={20} color={isDark ? '#795548' : '#303F9F'} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, isDark ? styles.darkCard : styles.lightCard]}>
            <View style={[styles.iconContainer, { backgroundColor: '#FFB74D' }]}>
              <Flag size={20} color="#FFFFFF" />
            </View>
            <Text style={[styles.menuItemText, isDark ? styles.darkText : styles.lightText]}>
              Seyahat Başarıları
            </Text>
            <ChevronRight size={20} color={isDark ? '#795548' : '#303F9F'} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, isDark ? styles.darkCard : styles.lightCard]}>
            <View style={[styles.iconContainer, { backgroundColor: '#EF5350' }]}>
              <Heart size={20} color="#FFFFFF" />
            </View>
            <Text style={[styles.menuItemText, isDark ? styles.darkText : styles.lightText]}>
              Favori Ülkeler
            </Text>
            <ChevronRight size={20} color={isDark ? '#795548' : '#303F9F'} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDark ? styles.darkText : styles.lightText]}>
            Ayarlar
          </Text>
          <TouchableOpacity style={[styles.menuItem, isDark ? styles.darkCard : styles.lightCard]}>
            <View style={[styles.iconContainer, { backgroundColor: '#7986CB' }]}>
              <Settings size={20} color="#FFFFFF" />
            </View>
            <Text style={[styles.menuItemText, isDark ? styles.darkText : styles.lightText]}>
              Uygulama Tercihleri
            </Text>
            <ChevronRight size={20} color={isDark ? '#795548' : '#303F9F'} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={showCustomization}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCustomization(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, isDark ? styles.darkCard : styles.lightCard]}>
            <Text style={[styles.modalTitle, isDark ? styles.darkText : styles.lightText]}>
              Karakterini Seç
            </Text>
            <ScrollView style={styles.characterList}>
              {CHARACTERS.map((character) => (
                <TouchableOpacity
                  key={character.id}
                  style={[
                    styles.characterCard,
                    isDark ? styles.darkCard : styles.lightCard,
                    selectedCharacter.id === character.id && styles.selectedCharacter
                  ]}
                  onPress={() => setSelectedCharacter(character)}
                >
                  <Text style={styles.characterEmoji}>{character.emoji}</Text>
                  <View style={styles.characterDetails}>
                    <Text style={[styles.characterCardName, isDark ? styles.darkText : styles.lightText]}>
                      {character.name}
                    </Text>
                    <Text style={[styles.characterDescription, isDark ? styles.darkSubText : styles.lightSubText]}>
                      {character.description}
                    </Text>
                    <View style={styles.characterStats}>
                      <Text style={[styles.characterStat, isDark ? styles.darkSubText : styles.lightSubText]}>
                        Boy: {character.height}cm
                      </Text>
                      <Text style={[styles.characterStat, isDark ? styles.darkSubText : styles.lightSubText]}>
                        Kilo: {character.weight}kg
                      </Text>
                    </View>
                    <View style={styles.characterFeatures}>
                      <View style={[styles.featureTag, { backgroundColor: '#4FC3F7' }]}>
                        <Text style={styles.featureText}>{character.hairColor}</Text>
                      </View>
                      <View style={[styles.featureTag, { backgroundColor: '#FFB74D' }]}>
                        <Text style={styles.featureText}>{character.eyeColor}</Text>
                      </View>
                      <View style={[styles.featureTag, { backgroundColor: '#4CAF50' }]}>
                        <Text style={styles.featureText}>{character.style}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setShowCustomization(false)}
            >
              <Text style={styles.saveButtonText}>Karakteri Seç</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#E5F9FF',
  },
  darkContainer: {
    backgroundColor: '#FFE5E5',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
  },
  avatarContainer: {
    width: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    padding: 24,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  avatarEmoji: {
    fontSize: 72,
    marginBottom: 12,
  },
  characterInfo: {
    alignItems: 'center',
  },
  characterName: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 4,
  },
  characterStyle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  modalContent: {
    width: '100%',
    maxHeight: '90%',
    borderRadius: 25,
    padding: 24,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    marginBottom: 24,
    textAlign: 'center',
  },
  characterList: {
    marginBottom: 16,
  },
  characterCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  selectedCharacter: {
    borderWidth: 3,
    borderColor: '#4CAF50',
  },
  characterEmoji: {
    fontSize: 48,
    marginRight: 20,
  },
  characterDetails: {
    flex: 1,
  },
  characterCardName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    marginBottom: 4,
  },
  characterDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 12,
  },
  characterStats: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 16,
  },
  characterStat: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  characterFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featureTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    fontSize: 18,
  },
  statsContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 25,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
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
    fontSize: 28,
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    flex: 1,
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