import { colors } from '@/styles/global';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { supabase } from '@/lib/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  function validate() {
    if (!email.trim() || !password) {
      Alert.alert('Missing info', 'Enter your email and password.');
      return false;
    }
    return true;
  }

  async function run(action: 'signIn' | 'signUp') {
    if (!validate()) return;
    setBusy(true);
    try {
      const credentials = { email: email.trim(), password };
      if (action === 'signIn') {
        const { error } = await supabase.auth.signInWithPassword(credentials);
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp(credentials);
        if (error) throw error;
        if (!data.session) Alert.alert('Almost there', 'Check your inbox to confirm your email.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Try again.';
      Alert.alert(action === 'signIn' ? 'Login failed' : 'Sign up failed', message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.title}>Welcome</Text>
      <TextInput
        placeholder='Email'
        placeholderTextColor={colors.textSecondary}
        autoCapitalize='none'
        autoComplete='email'
        keyboardType='email-address'
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder='Password'
        placeholderTextColor={colors.textSecondary}
        secureTextEntry
        autoComplete='password'
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      {busy ? (
        <ActivityIndicator color={colors.primary} />
      ) : (
        <>
          <Pressable style={styles.primary} onPress={() => run('signIn')}>
            <Text style={styles.primaryText}>Sign in</Text>
          </Pressable>
          <Pressable onPress={() => run('signUp')}>
            <Text style={styles.link}>Create account</Text>
          </Pressable>
        </>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    gap: 12,
    backgroundColor: colors.background,
  },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.text, marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: colors.textSecondary,
    borderRadius: 8,
    padding: 12,
    color: colors.text,
  },
  primary: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  primaryText: { color: colors.text, fontWeight: '600' },
  link: { color: colors.primary, textAlign: 'center', marginTop: 4 },
});
