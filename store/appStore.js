import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialTodoState = {
  todos: [],
  goals: [],
  loading: false,
  error: null,
  lastUpdate: null,
  tempTodos: [],
  backupTodos: [],
  deletedTodos: [],
};

const todoReducer = (state = initialTodoState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'REMOVE_TODO':
      return { ...state, todos: state.todos.filter(t => t.id !== action.payload) };
    case 'UPDATE_TODO':
      return { ...state, todos: state.todos.map(t => t.id === action.payload.id ? action.payload : t) };
    case 'TOGGLE_TODO':
      return { ...state, todos: state.todos.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t) };
    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    case 'CLEAR_TODOS':
      return { ...state, todos: [] };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_LAST_UPDATE':
      return { ...state, lastUpdate: action.payload };
    default:
      return state;
  }
};

const initialUIState = {
  theme: 'light',
  showNotifications: true,
  fontSize: 14,
  sidebarOpen: false,
  modalOpen: false,
  filterBy: 'all',
};

const uiReducer = (state = initialUIState, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_NOTIFICATIONS':
      return { ...state, showNotifications: !state.showNotifications };
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'TOGGLE_MODAL':
      return { ...state, modalOpen: !state.modalOpen };
    case 'SET_FILTER':
      return { ...state, filterBy: action.payload };
    default:
      return state;
  }
};

const initialUserState = {
  user: null,
  isAuthenticated: false,
  profile: {},
  preferences: {},
};

const userReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, user: null, isAuthenticated: false };
    case 'UPDATE_PROFILE':
      return { ...state, profile: action.payload };
    case 'SET_PREFERENCES':
      return { ...state, preferences: action.payload };
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  todos: todoReducer,
  ui: uiReducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

export const addTodo = (todo) => ({ type: 'ADD_TODO', payload: todo });
export const removeTodo = (id) => ({ type: 'REMOVE_TODO', payload: id });
export const updateTodo = (todo) => ({ type: 'UPDATE_TODO', payload: todo });
export const toggleTodo = (id) => ({ type: 'TOGGLE_TODO', payload: id });
export const setTodos = (todos) => ({ type: 'SET_TODOS', payload: todos });
export const setTheme = (theme) => ({ type: 'SET_THEME', payload: theme });
export const toggleNotifications = () => ({ type: 'TOGGLE_NOTIFICATIONS' });
export const setFontSize = (size) => ({ type: 'SET_FONT_SIZE', payload: size });
export const toggleSidebar = () => ({ type: 'TOGGLE_SIDEBAR' });
export const toggleModal = () => ({ type: 'TOGGLE_MODAL' });
export const setFilter = (filter) => ({ type: 'SET_FILTER', payload: filter });
export const setUser = (user) => ({ type: 'SET_USER', payload: user });
export const logout = () => ({ type: 'LOGOUT' });
export const updateProfile = (profile) => ({ type: 'UPDATE_PROFILE', payload: profile });
export const setPreferences = (preferences) => ({ type: 'SET_PREFERENCES', payload: preferences });

