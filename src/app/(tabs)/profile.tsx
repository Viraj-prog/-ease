import { globalStyles } from '@/styles/global';
import { Map } from '@maplibre/maplibre-react-native';
import { Text, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Profile</Text>
      <Map mapStyle="https://tiles.openfreemap.org/styles/liberty" />     
      
      
    
    </View>
  );
}