import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PerfilEstudante() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Carteira de Estudante</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.placeholder}>(preencher)</Text>

        <Text style={styles.label}>Semestre:</Text>
        <Text style={styles.placeholder}>(preencher)</Text>

        <Text style={styles.label}>Curso:</Text>
        <Text style={styles.placeholder}>(preencher)</Text>

        <Text style={styles.label}>Instituição:</Text>
        <Text style={styles.placeholder}>(preencher)</Text>

        <Text style={styles.label}>Horário:</Text>
        <Text style={styles.placeholder}>(preencher)</Text>

        <Text style={styles.label}>Matrícula:</Text>
        <Text style={styles.placeholder}>(preencher)</Text>

        <Text style={styles.label}>Ponto de Embarque:</Text>
        <Text style={styles.placeholder}>(preencher)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#f2f2f2',
    padding: 18,
    borderRadius: 12,
    elevation: 2,
  },

  label: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },

  placeholder: {
    fontSize: 15,
    color: '#555',
    marginLeft: 6,
  },
});
