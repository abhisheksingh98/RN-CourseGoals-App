import Realm from 'realm';
import AsyncStorage from '@react-native-async-storage/async-storage';

let realmInstance = null;

const TodoSchema = {
  name: 'Todo',
  properties: {
    id: 'int',
    text: 'string',
    completed: { type: 'bool', default: false },
    createdAt: 'date',
  },
  primaryKey: 'id',
};

export const initializeRealm = async () => {
  try {
    realmInstance = await Realm.open({
      schema: [TodoSchema],
      schemaVersion: 1,
    });
  } catch (e) {
    console.error('Realm init failed:', e);
  }
};

export const saveTodosLocally = async (todos) => {
  try {
    await AsyncStorage.setItem('todos', JSON.stringify(todos));

    if (realmInstance) {
      realmInstance.write(() => {
        todos.forEach(todo => {
          realmInstance.create('Todo', {
            ...todo,
            createdAt: new Date(todo.createdAt)
          }, Realm.UpdateMode.All);
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
        realmInstance.deleteAll();
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

