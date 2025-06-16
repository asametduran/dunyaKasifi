import { Tabs } from 'expo-router';
import { Globe, Import as Passport, Moon as Balloon } from 'lucide-react-native';
import { StyleSheet } from 'react-native';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: isDark ? '#795548' : '#303F9F',
        tabBarStyle: {
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
          backgroundColor: isDark ? '#FFF5F5' : '#F0FFFF',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        },
        tabBarLabelStyle: styles.tabBarLabel,
        headerStyle: {
          backgroundColor: isDark ? '#FFE5E5' : '#E5F9FF',
        },
        headerTitleStyle: {
          fontFamily: 'Inter-Bold',
          fontSize: 20,
          color: isDark ? '#5D4037' : '#1A237E',
        },
        headerShadowVisible: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dünya Haritası',
          tabBarIcon: ({ color, size }) => <Globe size={size} color={color} />,
          headerTitle: 'Dünya Gezgini',
        }}
      />
      <Tabs.Screen
        name="balloon"
        options={{
          title: 'Balonlar',
          tabBarIcon: ({ color, size }) => <Balloon size={size} color={color} />,
          headerTitle: 'Uçan Balonlar',
        }}
      />
      <Tabs.Screen
        name="passport"
        options={{
          title: 'Pasaport',
          tabBarIcon: ({ color, size }) => <Passport size={size} color={color} />,
          headerTitle: 'Gezgin Pasaportu',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    marginBottom: 4,
  },
});