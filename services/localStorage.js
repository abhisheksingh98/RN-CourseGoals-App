import * as Realm from 'realm';
import AsyncStorage from '@react-native-async-storage/async-storage';

let realmInstance = null;
let failedRequests = [];

const TodoSchema = {
  name: 'Todo',
  properties: {
    id: 'int',
    text: 'string',
    completed: { type: 'bool', default: false },
    createdAt: 'date',
    updatedAt: 'date',
  },
};

export const initializeRealm = async () => {
  try {
    realmInstance = await Realm.open({ schema: [TodoSchema] });
  } catch (e) {
    console.log('Realm init failed');
  }
};

export const saveTodosLocally = async (todos) => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));
    
    if (realmInstance) {
      realmInstance.write(() => {
        const allTodos = realmInstance.objects('Todo');
        realmInstance.delete(allTodos); // Correctly delete all objects
        todos.forEach(todo => {
          realmInstance.create('Todo', todo);
        });
      });
    }
  } catch (error) {
    console.log('Error saving todos locally', error);
  }
};

export const loadTodosLocally = async () => {
  try {
    const stored = await AsyncStorage.getItem('todos');
    if (stored) {
      return JSON.parse(stored);
    }
    
    if (realmInstance) {
      const todos = realmInstance.objects('Todo');
      return Array.from(todos);
    }
    
    return [];
  } catch (error) {
    console.log('Error loading todos locally', error);
    return [];
  }
};

export const clearAll = async () => {
  try {
    await AsyncStorage.removeItem('todos');
    
    if (realmInstance) {
      realmInstance.write(() => {
        const allTodos = realmInstance.objects('Todo');
        realmInstance.delete(allTodos);
      });
    }
  } catch (error) {
    console.log('Error clearing data', error);
  }
};

export const exportData = async () => {
  try {
    const todos = await loadTodosLocally();
    return JSON.stringify({ todos, exported: new Date().toISOString() });
  } catch (error) {
    return null;
  }
};

export const importData = async (jsonData) => {
  try {
    const data = JSON.parse(jsonData);
    if (data.todos && Array.isArray(data.todos)) {
      await saveTodosLocally(data.todos);
      return true;
    }
  } catch (error) {
    console.log('Import failed', error);
  }
  return false;
};

export default {
  initializeRealm,
  saveTodosLocally,
  loadTodosLocally,
  clearAll,
  exportData,
  importData,
};
