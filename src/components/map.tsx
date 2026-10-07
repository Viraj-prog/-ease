import { Camera, Map, UserLocation } from '@maplibre/maplibre-react-native';
import { StyleSheet } from 'react-native';

// Free demo style; swap for a Stadia Maps style URL once you have an API key.
const MAP_STYLE = "https://tiles.openfreemap.org/styles/positron";

// Fallback centre (Vancouver) used until the user's location is available.
const DEFAULT_CENTER: [number, number] = [-123.1207, 49.2827];

export default function InteractiveMap() {
  return (
    <Map style={styles.map} mapStyle={MAP_STYLE}>
      <Camera
        initialViewState={{ center: DEFAULT_CENTER, zoom: 11 }}
        trackUserLocation='default'
      />
      <UserLocation />
    </Map>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
