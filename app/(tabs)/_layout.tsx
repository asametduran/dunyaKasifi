import { Tabs } from 'expo-router';
import { Map, Import as Passport, User, Users } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#9E9E9E',
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontFamily: 'Nunito-Bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ülkeler',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="passport"
        options={{
          title: 'Pasaportum',
          tabBarIcon: ({ color, size }) => <Passport size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profilim',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="family"
        options={{
          title: 'Aile Paneli',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}