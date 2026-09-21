import { Link } from 'expo-router';
import { ScrollView, Text } from 'react-native';
import HomeHeader from '../components/HomeHeader';
import { globalStyles } from '../styles/global';

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>@Ease</Text>
      <HomeHeader />
      <Link href='/profile' style={{ fontSize: 18, color: '#007bff' }}>
        Go to Profile
      </Link>
    </ScrollView>
  );
}
