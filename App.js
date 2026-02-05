import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store/appStore';
import Navigation from './navigation/RootNavigator';
import * as Realm from 'realm';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as localStorage from './services/localStorage';

const localStorageKey = 'appState_v1';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      todos: [],
      goals: [],
      users: [],
      globalState: {},
      realmData: null,
    };
    this.realmInstance = null;
  }

  componentDidMount() {
    this.initializeApp();
    this.setupDatabase();
  }

  initializeApp = async () => {
    try {
      const todos = await localStorage.loadTodosLocally();
      this.setState({ todos, isLoading: false });
    } catch (error) {
      this.setState({ isLoading: false });
    }
  };

  setupDatabase = () => {
    try {
      localStorage.initializeRealm();
    } catch (error) {
      console.log('Database setup failed');
    }
  };

  componentWillUnmount() {
    // Cleanup if needed
  }

  render() {
    if (this.state.isLoading) {
      return <View style={styles.container} />;
    }

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Navigation />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
