import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGameStore } from '@/store/gameStore';

export default function ProfileScreen() {
  const { playerName, score, resetProgress } = useGameStore();

  // DiceBear avatar URL'sini state olarak tutuyoruz
  const [avatarUrl, setAvatarUrl] = useState(
    `https://api.dicebear.com/7.x/thumbs/png?seed=${playerName}`
  );

  // Avatar'ı değiştirme fonksiyonu
  const handleChangeAvatar = () => {
    const randomSeed = playerName + Math.floor(Math.random() * 10000);
    const newUrl = `https://api.dicebear.com/7.x/thumbs/png?seed=${randomSeed}`;
    setAvatarUrl(newUrl);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* Avatar görüntüsü */}
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <Text style={styles.name}>{playerName}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{score}</Text>
          <Text style={styles.statLabel}>Toplam Puan</Text>
        </View>
      </View>

      <View style={styles.settingsContainer}>
        <Pressable style={styles.settingButton} onPress={handleChangeAvatar}>
          <Text style={styles.settingButtonText}>Avatarı Değiştir</Text>
        </Pressable>

        <Pressable
          style={[styles.settingButton, styles.dangerButton]}
          onPress={resetProgress}
        >
          <Text style={[styles.settingButtonText, styles.dangerButtonText]}>
            İlerlemeyi Sıfırla
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#333',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    marginTop: 16,
  },
  statCard: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 120,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#FFFFFF',
  },
  settingsContainer: {
    padding: 16,
    marginTop: 16,
  },
  settingButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  settingButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#333',
  },
  dangerButton: {
    backgroundColor: '#ffebee',
  },
  dangerButtonText: {
    color: '#d32f2f',
  },
});
