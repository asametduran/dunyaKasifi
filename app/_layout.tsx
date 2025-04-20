import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded] = useFonts({
    'Nunito-Regular': Nunito_400Regular,
    'Nunito-SemiBold': Nunito_600SemiBold,
    'Nunito-Bold': Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="country/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Ülke Detayları',
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontFamily: 'Nunito-Bold',
            },
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}