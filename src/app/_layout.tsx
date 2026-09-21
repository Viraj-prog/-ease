import { colors } from '@/styles/global';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.header },
        headerTintColor: '#070505',
      }}
    >
      <Stack.Screen options={{ headerShown: false , title: 'Home' }} name="index" />
      <Stack.Screen options={{ title: '' }} name="profile" />
      <Stack.Screen options={{ title: '' }} name="settings" />
    </Stack>
  );
}