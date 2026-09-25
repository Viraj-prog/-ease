import { Camera, Map, UserLocation } from '@maplibre/maplibre-react-native';
import { useEffect } from 'react';
import { PermissionsAndroid, Platform, StatusBar, StyleSheet, View } from 'react-native';


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
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <Map 
        style={styles.map}
        mapStyle="https://tiles.openfreemap.org/styles/positron" // Prop changed from styleURL to mapStyle
      >
        <Camera 
          trackUserLocation="default" //If you are using emulator for testing, set location in emulator settings.
          zoom={15} 
          bearing={0}

        />
        <UserLocation accuracy={true} />
      </Map>
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
