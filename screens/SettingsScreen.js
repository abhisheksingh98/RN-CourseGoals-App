import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import * as storageService from '../services/localStorage';
import * as appStore from '../store/appStore';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [theme, setTheme] = useState('light');

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure? This cannot be undone.',
      [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'Clear',
          onPress: () => {
            storageService.clearAll();
            appStore.reset();
            Alert.alert('Success', 'All data cleared');
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#ccc', true: '#81c784' }}
              thumbColor={notifications ? '#2196F3' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Auto-save</Text>
            <Switch
              value={autoSave}
              onValueChange={setAutoSave}
              trackColor={{ false: '#ccc', true: '#81c784' }}
              thumbColor={autoSave ? '#2196F3' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Theme</Text>
            <TouchableOpacity onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              <Text style={styles.themeValue}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          
          <TouchableOpacity style={styles.dangerButton} onPress={handleClearData}>
            <Text style={styles.dangerButtonText}>Clear All Data</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  settingItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  themeValue: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
  },
  dangerButton: {
    backgroundColor: '#ff6b6b',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
