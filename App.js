import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from './store/appStore';
import RootNavigator from './navigation/RootNavigator';
import * as localStorage from './services/localStorage';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        await localStorage.initializeRealm();
        await localStorage.loadTodosLocally();
      } catch (error) {
        console.log('App initialization failed', error);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  if (isLoading) {
    return <View style={styles.container} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <View style={styles.container}>
            <RootNavigator />
          </View>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
