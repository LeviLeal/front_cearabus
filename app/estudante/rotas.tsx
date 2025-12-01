import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type Rota = {
  id: string;
  horario: string;
  faculdades: string[];
  rota: string;
};

// Dados vazios apenas pra estruturar
const rotas: Rota[] = [
  { id: '1', horario: '', faculdades: [], rota: '' },
  { id: '2', horario: '', faculdades: [], rota: '' },
  { id: '3', horario: '', faculdades: [], rota: '' },
];

export default function Rotass() {
  const renderItem = () => (
    <View style={styles.card}>
      <Text style={styles.horario}>14h - 17h</Text>
      <View style={styles.listaFaculdades}>
        <Text style={styles.faculdades}>UFC - IFCE</Text>
      </View>

      <Text style={styles.rota}>Pinheiro - Dext</Text>

    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rotas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  horario: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 8,
    color: '#191919ff'
  },
  faculdades: {
    fontSize: 20,
    color: '#2a2a2aff',
    fontWeight: '500'
  },
  rota: {
    fontSize: 16,
    color: '#333',
    marginTop: 8
  },
  listaFaculdades: {
    marginLeft: 10,
  },
  button: {
    marginTop: 14,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
