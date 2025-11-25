import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// Dados apenas para estrutura
const reclamacoes = [
  { id: '1', data: '', hora: '', mensagem: '' },
  { id: '2', data: '', hora: '', mensagem: '' },
  { id: '3', data: '', hora: '', mensagem: '' },
];

export default function AdminComplaintsScreen() {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>

      {/* Linha com a data e hora */}
      <View style={styles.headerRow}>
        <Text style={styles.dataHora}>(data preencher)</Text>
        <Text style={styles.dataHora}>(hora preencher)</Text>
      </View>

      {/* Mensagem */}
      <Text style={styles.mensagem}>(mensagem preencher)</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reclamações</Text>

      <FlatList
        data={reclamacoes}
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
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  dataHora: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },

  mensagem: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
});
