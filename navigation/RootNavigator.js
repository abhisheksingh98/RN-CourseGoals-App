import React from 'react';
import { createDrawerNavigator, createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'native-base';
import TodoListScreen from '../screens/TodoListScreen';
import TodoDetailScreen from '../screens/TodoDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';

const TodoStack = createStackNavigator(
  {
    TodoList: {
      screen: TodoListScreen,
      navigationOptions: {
        headerTitle: 'Goals',
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
      },
    },
    TodoDetail: {
      screen: TodoDetailScreen,
      navigationOptions: {
        headerTitle: 'Goal Details',
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
      },
    },
  },
  {
    initialRouteName: 'TodoList',
  }
);

const SettingsStack = createStackNavigator(
  {
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        headerTitle: 'Settings',
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
      },
    },
  },
  {
    initialRouteName: 'Settings',
  }
);

const ProfileStack = createStackNavigator(
  {
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        headerTitle: 'Profile',
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
      },
    },
  }
);

const AnalyticsStack = createStackNavigator(
  {
    Analytics: {
      screen: AnalyticsScreen,
      navigationOptions: {
        headerTitle: 'Analytics',
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
      },
    },
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: TodoStack,
      navigationOptions: {
        tabBarLabel: 'Home',
      },
    },
    Analytics: {
      screen: AnalyticsStack,
      navigationOptions: {
        tabBarLabel: 'Analytics',
      },
    },
    Settings: {
      screen: SettingsStack,
      navigationOptions: {
        tabBarLabel: 'Settings',
      },
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarLabel: 'Profile',
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#007AFF',
      inactiveTintColor: '#666',
      style: {
        backgroundColor: '#f5f5f5',
        borderTopColor: '#ddd',
      },
    },
  }
);

const DrawerNavigator = createDrawerNavigator(
  {
    Main: {
      screen: TabNavigator,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    initialRouteName: 'Main',
    contentOptions: {
      activeTintColor: '#007AFF',
    },
  }
);

export default Navigation = createAppContainer(DrawerNavigator);
