import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import * as appStore from '../store/appStore';
import * as helpers from '../utils/helpers';

export default function AnalyticsScreen() {
  const [todos, setTodos] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, percentage: 0 });

  useEffect(() => {
    const state = appStore.getState();
    setTodos(state.todos);
    const calculated = helpers.calculateStats(state.todos);
    setStats(calculated);

    const unsubscribe = appStore.subscribe((state) => {
      setTodos(state.todos);
      const calculated = helpers.calculateStats(state.todos);
      setStats(calculated);
    });

    return () => unsubscribe();
  }, []);

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Total Todos</Text>
          <Text style={styles.statValue}>{stats.total}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Completed</Text>
          <Text style={styles.statValue}>{stats.completed}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Active</Text>
          <Text style={styles.statValue}>{activeCount}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Completion Rate</Text>
          <Text style={styles.statValue}>{stats.percentage}%</Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${stats.percentage}%` },
              ]}
            />
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <Text style={styles.summaryText}>
            You have completed {stats.completed} out of {stats.total} todos.
          </Text>
          {stats.percentage === 100 && stats.total > 0 && (
            <Text style={styles.celebrationText}>🎉 All done!</Text>
          )}
        </View>
      </ScrollView>
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
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  summaryCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  celebrationText: {
    fontSize: 24,
    marginTop: 15,
    textAlign: 'center',
  },
});
