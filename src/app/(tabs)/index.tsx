import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import HomeHeader from '../../components/HomeHeader';
import { colors, globalStyles } from '../../styles/global';

export default function HomeScreen() {
  const [startingAddress, setStartingAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState('');
  

  const handleStartJourney = () => {
    console.log({ startingAddress, destinationAddress});
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>@Ease</Text>
      <HomeHeader />
      <TextInput
        style={styles.input}
        placeholder='Starting Address'
        placeholderTextColor={colors.textSecondary}
        value={startingAddress}
        onChangeText={setStartingAddress}
      />

      <TextInput
        style={styles.input}
        placeholder='Destination Address'
        placeholderTextColor={colors.textSecondary}
        value={destinationAddress}
        onChangeText={setDestinationAddress}
      />

      <TouchableOpacity style={styles.button} onPress={handleStartJourney}>
        <Text style={styles.buttonText}>Start Journey</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f0f0f0',
    color: colors.text,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
    
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
});