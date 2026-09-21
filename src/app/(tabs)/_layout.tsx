import { colors } from '@/styles/global';
//import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.surface,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          
        }}
      />
    </Tabs>
  );
}
