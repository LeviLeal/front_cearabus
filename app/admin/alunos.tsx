import { router } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Exemplo de dados
const alunos = [
  { id: '1', nome: 'Aluno 1' },
  { id: '2', nome: 'Aluno 2' },
  { id: '3', nome: 'Aluno 3' },
];

export default function AdminStudentsListScreen() {
  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.btn, styles.btnAceitar]}>
          <Text style={styles.btnText}>Aceitar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btn, styles.btnRecusar]} onPress={() => {router.push("/admin/recusarAluno")}}>
          <Text style={styles.btnText}>Recusar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Alunos</Text>

      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 90 }}
      />

      <TouchableOpacity style={styles.relatorioBtn}>
        <Text style={styles.relatorioText} onPress={() => router.push("/admin/relatorio")}>Gerar Relatório</Text>
      </TouchableOpacity>

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
    textAlign: "center",
    fontWeight: "600",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },

  nome: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 12,
  },

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,
  },

  btnAceitar: {
    backgroundColor: "#4CAF50",
  },

  btnRecusar: {
    backgroundColor: "#E53935",
  },

  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  relatorioBtn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#0066CC",
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 3,
  },

  relatorioText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});
