import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
      <Text style={styles.horario}>Horário: (preencher)</Text>
      <Text style={styles.label}>Faculdades:</Text>
      <View style={styles.listaFaculdades}>
        <Text style={styles.placeholder}>- (preencher)</Text>
        <Text style={styles.placeholder}>- (preencher)</Text>
      </View>

      <Text style={styles.label}>Rota:</Text>
      <Text style={styles.placeholder}>(preencher)</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rotas e Horários</Text>

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
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  horario: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  placeholder: {
    color: '#555',
    fontSize: 15,
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
