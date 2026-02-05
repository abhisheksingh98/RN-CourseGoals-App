import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function TodoDetailScreen({ route }) {
  const todo = route?.params?.todo || { id: 1, text: 'Sample Todo', completed: false };
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Todo Details</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>Title</Text>
          {isEditing ? (
            <TextInput
              style={styles.input}
              value={editText}
              onChangeText={setEditText}
            />
          ) : (
            <Text style={styles.value}>{editText}</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.value}>
            {todo.completed ? 'Completed ✓' : 'Active'}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Created</Text>
          <Text style={styles.value}>
            {new Date(todo.createdAt || Date.now()).toLocaleDateString()}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.button, isEditing && styles.buttonActive]}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Text style={styles.buttonText}>
            {isEditing ? 'Save' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>
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
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonActive: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
