import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Modal, SafeAreaView, FlatList } from 'react-native';
import * as appStore from '../store/appStore';
import * as storageService from '../services/localStorage';
import * as helpers from '../utils/helpers';

export default function TodoListScreen() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTodo, setEditingTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editText, setEditText] = useState('');

  React.useEffect(() => {
    const loaded = storageService.loadTodosLocally();
    setTodos(loaded);

    const unsubscribe = appStore.subscribe((state) => {
      setTodos(state.todos);
    });

    return () => unsubscribe();
  }, []);

  const filteredTodos = useMemo(() => {
    return helpers.filterTodos(todos, filter);
  }, [todos, filter]);

  const stats = useMemo(() => {
    return helpers.calculateStats(todos);
  }, [todos]);

  const handleAddTodo = useCallback(() => {
    if (!helpers.validateTodo(input)) return;

    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;
    const newTodo = {
      id: maxId + 1,
      text: input,
      completed: false,
      createdAt: Date.now(),
    };

    const updated = [...todos, newTodo];
    setTodos(updated);
    appStore.setTodos(updated);
    storageService.saveTodosLocally(updated);
    setInput('');
  }, [input, todos]);

  const handleDeleteTodo = useCallback((id) => {
    const updated = todos.filter(t => t.id !== id);
    setTodos(updated);
    appStore.setTodos(updated);
    storageService.saveTodosLocally(updated);
  }, [todos]);

  const handleToggleTodo = useCallback((id) => {
    const updated = todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTodos(updated);
    appStore.setTodos(updated);
    storageService.saveTodosLocally(updated);
  }, [todos]);

  const handleEditStart = useCallback((todo) => {
    setEditingTodo(todo);
    setEditText(todo.text);
    setShowModal(true);
  }, []);

  const handleEditSave = useCallback(() => {
    if (!helpers.validateTodo(editText)) return;

    const updated = todos.map(t =>
      t.id === editingTodo.id ? { ...t, text: editText } : t
    );
    setTodos(updated);
    appStore.setTodos(updated);
    storageService.saveTodosLocally(updated);
    setShowModal(false);
    setEditingTodo(null);
    setEditText('');
  }, [todos, editingTodo, editText]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Todos</Text>
        <Text style={styles.stats}>
          {stats.completed} of {stats.total} completed
        </Text>
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleAddTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterRow}>
        {['all', 'active', 'completed'].map(f => (
          <TouchableOpacity
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
          >
            <Text style={[styles.filterTxt, filter === f && styles.filterTxtActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => handleToggleTodo(item.id)}
            >
              <Text style={styles.checkmark}>{item.completed ? '✓' : ''}</Text>
            </TouchableOpacity>

            <Text
              style={[
                styles.todoText,
                item.completed && styles.todoCompleted,
              ]}
            >
              {item.text}
            </Text>

            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => handleEditStart(item)}
            >
              <Text style={styles.icon}>✎</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => handleDeleteTodo(item.id)}
            >
              <Text style={styles.icon}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No todos yet</Text>
          </View>
        }
      />

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Todo</Text>
            <TextInput
              style={styles.input}
              value={editText}
              onChangeText={setEditText}
              placeholder="Todo text"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancelBtn]}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.saveBtn]}
                onPress={handleEditSave}
              >
                <Text style={styles.modalBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  stats: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  inputSection: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 8,
    backgroundColor: '#fff',
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterBtnActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  filterTxt: {
    fontSize: 13,
    color: '#666',
  },
  filterTxtActive: {
    color: '#fff',
    fontWeight: '600',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 15,
    marginTop: 8,
    borderRadius: 8,
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkmark: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  todoText: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  todoCompleted: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  iconBtn: {
    padding: 8,
  },
  icon: {
    fontSize: 16,
    color: '#999',
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#e0e0e0',
  },
  saveBtn: {
    backgroundColor: '#2196F3',
  },
  modalBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
