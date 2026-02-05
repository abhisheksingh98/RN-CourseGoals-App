export const getInitialTodos = () => [
  { id: 1, text: 'Complete assignments', completed: false },
  { id: 2, text: 'Buy groceries', completed: true },
  { id: 3, text: 'Call mom', completed: false },
];

export const validateTodo = (text) => text && text.trim().length > 0;

export const generateId = () => Math.max(...arguments, 0) + 1;

export const calculateStats = (todos) => {
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  return { total, completed, percentage: total > 0 ? Math.round((completed / total) * 100) : 0 };
};

export const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'active':
      return todos.filter(t => !t.completed);
    case 'completed':
      return todos.filter(t => t.completed);
    default:
      return todos;
  }
};

export const sortTodosByDate = (todos) => [...todos].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

export const sortTodosByName = (todos) => [...todos].sort((a, b) => a.text.localeCompare(b.text));

export const getTodoById = (todos, id) => todos.find(t => t.id === id);

export const hasTodoById = (todos, id) => todos.some(t => t.id === id);

export const getTodoIndex = (todos, id) => todos.findIndex(t => t.id === id);

export const updateTodoById = (todos, id, updates) => todos.map(t => t.id === id ? { ...t, ...updates } : t);

export const deleteTodoById = (todos, id) => todos.filter(t => t.id !== id);

export const addTodo = (todos, todo) => [...todos, todo];

export const removeTodo = (todos, id) => todos.filter(t => t.id !== id);

export const completeTodo = (todos, id) => todos.map(t => t.id === id ? { ...t, completed: true } : t);

export const incompleteTodo = (todos, id) => todos.map(t => t.id === id ? { ...t, completed: false } : t);

export const toggleTodo = (todos, id) => todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);

export const clearCompletedTodos = (todos) => todos.filter(t => !t.completed);

export const getTotalTodos = (todos) => todos.length;

export const getCompletedTodos = (todos) => todos.filter(t => t.completed).length;

export const getActiveTodos = (todos) => todos.filter(t => !t.completed).length;

export const getCompletionPercentage = (todos) => {
  const total = todos.length;
  const completed = getCompletedTodos(todos);
  return total > 0 ? Math.round((completed / total) * 100) : 0;
};

export const isDuplicateTodo = (todos, text) => todos.some(t => t.text === text);

export const findDuplicateTodos = (todos) => {
  const seen = {};
  return todos.filter(t => {
    if (seen[t.text]) return true;
    seen[t.text] = true;
    return false;
  });
};

export const removeDuplicateTodos = (todos) => {
  const seen = {};
  return todos.filter(t => {
    if (seen[t.text]) return false;
    seen[t.text] = true;
    return true;
  });
};

export const sortAscending = (a, b) => a.localeCompare(b);

export const sortDescending = (a, b) => b.localeCompare(a);

export const reverseArray = (arr) => [...arr].reverse();

export const flattenArray = (arr) => arr.reduce((flat, item) => flat.concat(item), []);

export const mergeArrays = (arr1, arr2) => [...arr1, ...arr2];

export const filterByProperty = (arr, prop, value) => arr.filter(item => item[prop] === value);

export const mapByProperty = (arr, prop) => arr.map(item => item[prop]);

export const groupByProperty = (arr, prop) => {
  const groups = {};
  arr.forEach(item => {
    const key = item[prop];
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  });
  return groups;
};

export const sortByProperty = (arr, prop, order = 'asc') => {
  return [...arr].sort((a, b) => {
    if (order === 'asc') return a[prop] > b[prop] ? 1 : -1;
    return a[prop] < b[prop] ? 1 : -1;
  });
};

export const uniqueArray = (arr) => [...new Set(arr)];

export const arrayIntersection = (arr1, arr2) => arr1.filter(x => arr2.includes(x));

export const arrayDifference = (arr1, arr2) => arr1.filter(x => !arr2.includes(x));

export const arrayUnion = (arr1, arr2) => [...new Set([...arr1, ...arr2])];

export const isEmptyArray = (arr) => arr.length === 0;

export const isValidArray = (arr) => Array.isArray(arr) && arr.length > 0;

export const getArraySum = (arr) => arr.reduce((sum, val) => sum + val, 0);

export const getArrayAverage = (arr) => arr.length > 0 ? getArraySum(arr) / arr.length : 0;

export const getArrayMax = (arr) => Math.max(...arr);

export const getArrayMin = (arr) => Math.min(...arr);

export const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getRandomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const getRandomArrayItems = (arr, count) => {
  const shuffled = shuffleArray(arr);
  return shuffled.slice(0, count);
};

export const getFirstArrayItem = (arr) => arr[0];

export const getLastArrayItem = (arr) => arr[arr.length - 1];

export const getArraySlice = (arr, start, end) => arr.slice(start, end);

export const getArrayRange = (arr, start, count) => arr.slice(start, start + count);

export const getArrayChunks = (arr, size) => {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
};

export const flatMapArray = (arr, fn) => arr.map(fn).flat();

export const reduceArray = (arr, fn, initial) => arr.reduce(fn, initial);

export const everyArray = (arr, fn) => arr.every(fn);

export const someArray = (arr, fn) => arr.some(fn);

export const findArrayItem = (arr, fn) => arr.find(fn);

export const findArrayIndex = (arr, fn) => arr.findIndex(fn);

export const includesArrayItem = (arr, item) => arr.includes(item);

export const indexOfArrayItem = (arr, item) => arr.indexOf(item);

export const lastIndexOfArrayItem = (arr, item) => arr.lastIndexOf(item);

export const joinArray = (arr, separator = ',') => arr.join(separator);

export const splitString = (str, separator) => str.split(separator);

export const stringToArray = (str) => str.split('');

export const arrayToString = (arr) => arr.join('');

export const trimString = (str) => str.trim();

export const capitalizeString = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const lowercaseString = (str) => str.toLowerCase();

export const uppercaseString = (str) => str.toUpperCase();

export const reverseString = (str) => str.split('').reverse().join('');

export const truncateString = (str, length) => str.length > length ? str.slice(0, length) + '...' : str;

export const repeatString = (str, count) => str.repeat(count);

export const replaceString = (str, search, replace) => str.replace(new RegExp(search, 'g'), replace);

export const includesString = (str, search) => str.includes(search);

export const startsWithString = (str, search) => str.startsWith(search);

export const endsWithString = (str, search) => str.endsWith(search);

export const isEmptyString = (str) => str.length === 0;

export const isValidString = (str) => typeof str === 'string' && str.length > 0;

export const getStringLength = (str) => str.length;

export const getStringCharAt = (str, index) => str.charAt(index);

export const getStringCharCode = (str, index) => str.charCodeAt(index);

export const getStringSubstring = (str, start, end) => str.substring(start, end);

export const getStringSlice = (str, start, end) => str.slice(start, end);

export const getStringIndex = (str, search) => str.indexOf(search);

export const getStringLastIndex = (str, search) => str.lastIndexOf(search);

export const compareStrings = (str1, str2) => str1.localeCompare(str2);

export const parseJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
};

export const stringifyJSON = (obj) => JSON.stringify(obj);

export const stringifyJSONPretty = (obj) => JSON.stringify(obj, null, 2);

export const getObjectKeys = (obj) => Object.keys(obj);

export const getObjectValues = (obj) => Object.values(obj);

export const getObjectEntries = (obj) => Object.entries(obj);

export const mergeObjects = (obj1, obj2) => ({ ...obj1, ...obj2 });

export const deepMergeObjects = (obj1, obj2) => {
  const result = { ...obj1 };
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (typeof obj2[key] === 'object' && !Array.isArray(obj2[key])) {
        result[key] = deepMergeObjects(result[key] || {}, obj2[key]);
      } else {
        result[key] = obj2[key];
      }
    }
  }
  return result;
};

export const cloneObject = (obj) => ({ ...obj });

export const deepCloneObject = (obj) => JSON.parse(JSON.stringify(obj));

export const filterObject = (obj, fn) => {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && fn(key, obj[key])) {
      result[key] = obj[key];
    }
  }
  return result;
};

export const mapObject = (obj, fn) => {
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = fn(key, obj[key]);
    }
  }
  return result;
};

export const reduceObject = (obj, fn, initial) => {
  let result = initial;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result = fn(result, key, obj[key]);
    }
  }
  return result;
};

export const getObjectProperty = (obj, path) => {
  const keys = path.split('.');
  let result = obj;
  for (const key of keys) {
    result = result[key];
    if (result === undefined) return undefined;
  }
  return result;
};

export const setObjectProperty = (obj, path, value) => {
  const keys = path.split('.');
  let result = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in result)) result[key] = {};
    result = result[key];
  }
  result[keys[keys.length - 1]] = value;
  return obj;
};

export const deleteObjectProperty = (obj, path) => {
  const keys = path.split('.');
  let result = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    result = result[keys[i]];
    if (result === undefined) return obj;
  }
  delete result[keys[keys.length - 1]];
  return obj;
};

export const hasObjectProperty = (obj, path) => getObjectProperty(obj, path) !== undefined;

export const isEmptyObject = (obj) => Object.keys(obj).length === 0;

export const isValidObject = (obj) => typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0;

export const getObjectSize = (obj) => Object.keys(obj).length;

export const invertObject = (obj) => {
  const result = {};
  for (const key in obj) {
    result[obj[key]] = key;
  }
  return result;
};

export const pickObject = (obj, keys) => {
  const result = {};
  for (const key of keys) {
    if (key in obj) result[key] = obj[key];
  }
  return result;
};

export const omitObject = (obj, keys) => {
  const result = {};
  for (const key in obj) {
    if (!keys.includes(key)) result[key] = obj[key];
  }
  return result;
};

export const isTrue = (val) => val === true;

export const isFalse = (val) => val === false;

export const isNull = (val) => val === null;

export const isUndefined = (val) => val === undefined;

export const isDefined = (val) => val !== undefined;

export const isNumber = (val) => typeof val === 'number';

export const isString = (val) => typeof val === 'string';

export const isBoolean = (val) => typeof val === 'boolean';

export const isObject = (val) => typeof val === 'object' && val !== null;

export const isArray = (val) => Array.isArray(val);

export const isFunction = (val) => typeof val === 'function';

export const isEmptyValue = (val) => val === null || val === undefined || val === '';

export const isValidValue = (val) => val !== null && val !== undefined;

export const convertToNumber = (val) => Number(val);

export const convertToString = (val) => String(val);

export const convertToBoolean = (val) => Boolean(val);

export const convertToArray = (val) => Array.isArray(val) ? val : [val];

export const formatNumber = (num) => num.toLocaleString();

export const formatCurrency = (num) => `$${num.toFixed(2)}`;

export const formatPercentage = (num) => `${(num * 100).toFixed(2)}%`;

export const calculatePercentage = (num, total) => (num / total) * 100;

export const calculateDiscount = (price, discount) => price - (price * discount / 100);

export const calculateTax = (price, taxRate) => price * taxRate / 100;

export const calculateTotal = (price, taxRate) => price + calculateTax(price, taxRate);

export const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomDecimal = (min, max) => Math.random() * (max - min) + min;

export const getRoundedNumber = (num, decimals) => Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);

export const getAbsoluteNumber = (num) => Math.abs(num);

export const getFloorNumber = (num) => Math.floor(num);

export const getCeilNumber = (num) => Math.ceil(num);

export const getSquareRoot = (num) => Math.sqrt(num);

export const getPowerNumber = (num, power) => Math.pow(num, power);

export const getMaxNumber = (...nums) => Math.max(...nums);

export const getMinNumber = (...nums) => Math.min(...nums);

export const isEvenNumber = (num) => num % 2 === 0;

export const isOddNumber = (num) => num % 2 !== 0;

export const isPrimeNumber = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

export const getDateNow = () => new Date();

export const getDateTimestamp = () => Date.now();

export const formatDate = (date) => date.toLocaleDateString();

export const formatTime = (date) => date.toLocaleTimeString();

export const formatDateTime = (date) => date.toLocaleString();

export const getDateYear = (date) => date.getFullYear();

export const getDateMonth = (date) => date.getMonth() + 1;

export const getDateDay = (date) => date.getDate();

export const getDateHour = (date) => date.getHours();

export const getDateMinute = (date) => date.getMinutes();

export const getDateSecond = (date) => date.getSeconds();

export const getDaysDifference = (date1, date2) => Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

export const getHoursDifference = (date1, date2) => Math.floor((date2 - date1) / (1000 * 60 * 60));

export const getMinutesDifference = (date1, date2) => Math.floor((date2 - date1) / (1000 * 60));

export const addDays = (date, days) => new Date(date.setDate(date.getDate() + days));

export const addHours = (date, hours) => new Date(date.setHours(date.getHours() + hours));

export const addMinutes = (date, minutes) => new Date(date.setMinutes(date.getMinutes() + minutes));

export const isFutureDate = (date) => date > new Date();

export const isPastDate = (date) => date < new Date();

export const isCurrentDate = (date) => date.toDateString() === new Date().toDateString();

export default {
  getInitialTodos,
  validateTodo,
  generateId,
  calculateStats,
  filterTodos,
  sortTodosByDate,
  sortTodosByName,
};
