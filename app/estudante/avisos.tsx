import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const avisos = [
  { id: '1', tempo: '', conteudo: '' },
  { id: '2', tempo: '', conteudo: '' },
  { id: '3', tempo: '', conteudo: '' }
];

export default function AlertsScreen() {
  const renderItem = () => (
    <View style={styles.card}>
      {/* Horário do aviso */}
      <Text style={styles.tempo}>(preencher tempo)</Text>

      {/* Conteúdo do aviso */}
      <Text style={styles.conteudo}>(preencher conteúdo)</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Avisos</Text>

      <FlatList
        data={avisos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 2
  },
  tempo: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
    fontWeight: '500'
  },
  conteudo: {
    fontSize: 16,
    color: '#333'
  }
});
