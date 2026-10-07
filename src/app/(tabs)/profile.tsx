import InteractiveMap from '@/components/map';
import { useEffect } from 'react';
import { PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';


export default function ProfileScreen() {
  
   useEffect(() => {
    const requestLocationPermission = async () => {

      // Permissions are handled automatically by iOS via Info.plist, 
      // but Android requires explicit code execution.
      if (Platform.OS === 'android') {
        try {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location to center the map.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            }
          );
        } catch (err) {
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  }, []);



  return (
    <View style={styles.container}>
      <InteractiveMap />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Fills 100% of the screen height and width
  },
  map: {
    flex: 1, // Fills 100% of the container view
  },
});
