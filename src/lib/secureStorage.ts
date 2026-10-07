import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// SecureStore can reject values over ~2KB on some devices and a Supabase
// session is larger, so values are split across several keys.
const CHUNK_SIZE = 1500;

const countKey = (key: string) => `${key}.count`;
const chunkKey = (key: string, i: number) => `${key}.${i}`;

async function getItem(key: string): Promise<string | null> {
  try {
    const count = Number(await SecureStore.getItemAsync(countKey(key)));
    if (!count) return null;

    const parts: string[] = [];
    for (let i = 0; i < count; i++) {
      const part = await SecureStore.getItemAsync(chunkKey(key, i));
      if (part === null) return null; // incomplete data, treat as signed out
      parts.push(part);
    }
    return parts.join('');
  } catch (err) {
    console.warn('SecureStore read failed', err);
    return null;
  }
}

async function removeItem(key: string): Promise<void> {
  try {
    const count = Number(await SecureStore.getItemAsync(countKey(key))) || 0;
    for (let i = 0; i < count; i++) {
      await SecureStore.deleteItemAsync(chunkKey(key, i));
    }
    await SecureStore.deleteItemAsync(countKey(key));
  } catch (err) {
    console.warn('SecureStore delete failed', err);
  }
}

async function setItem(key: string, value: string): Promise<void> {
  try {
    await removeItem(key); // clear stale chunks from a previously longer value
    const count = Math.ceil(value.length / CHUNK_SIZE);
    for (let i = 0; i < count; i++) {
      await SecureStore.setItemAsync(
        chunkKey(key, i),
        value.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE)
      );
    }
    await SecureStore.setItemAsync(countKey(key), String(count));
  } catch (err) {
    console.warn('SecureStore write failed', err);
  }
}

// SecureStore has no web support, so fall back to localStorage there.
const webStorage = {
  getItem: async (key: string) => localStorage.getItem(key),
  setItem: async (key: string, value: string) => localStorage.setItem(key, value),
  removeItem: async (key: string) => localStorage.removeItem(key),
};

export const secureStorage =
  Platform.OS === 'web' ? webStorage : { getItem, setItem, removeItem };
