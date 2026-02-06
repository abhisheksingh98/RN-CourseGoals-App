import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TodoListScreen from '../screens/TodoListScreen';
import TodoDetailScreen from '../screens/TodoDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TodoStack() {
  return (
    <Stack.Navigator
      initialRouteName="TodoList"
      screenOptions={{
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="TodoList"
        component={TodoListScreen}
        options={{ title: 'Goals' }}
      />
      <Stack.Screen
        name="TodoDetail"
        component={TodoDetailScreen}
        options={{ title: 'Goal Details' }}
      />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

function AnalyticsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#007AFF' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen name="Analytics" component={AnalyticsScreen} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#666',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={TodoStack}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="AnalyticsTab"
        component={AnalyticsStack}
        options={{ tabBarLabel: 'Analytics' }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsStack}
        options={{ tabBarLabel: 'Settings' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStack}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      screenOptions={{
        drawerActiveTintColor: '#007AFF',
      }}
    >
      <Drawer.Screen
        name="Main"
        component={TabNavigator}
        options={{ title: 'Home', headerShown: false }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
    </Drawer.Navigator>
  );
}

