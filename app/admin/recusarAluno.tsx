import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AdminRecusarAluno() {
  const nomeAluno = "(Nome do aluno)"; // depois você substitui por route.params.nome

  const [motivo, setMotivo] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recusar Aluno</Text>

      {/* Nome */}
      <Text style={styles.label}>Aluno</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{nomeAluno}</Text>
      </View>

      {/* Motivo */}
      <Text style={styles.label}>Motivo da recusa</Text>
      <TextInput
        style={styles.textArea}
        multiline
        placeholder="Escreva o motivo..."
        placeholderTextColor="#777"
        value={motivo}
        onChangeText={setMotivo}
      />

      {/* Botão */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
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
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },

  infoBox: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 18,
  },

  infoText: {
    fontSize: 16,
    color: "#333",
  },

  textArea: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    height: 140,
    textAlignVertical: "top",
    fontSize: 16,
    marginBottom: 25,
  },

  button: {
    backgroundColor: "#cc0000",
    paddingVertical: 15,
    borderRadius: 10,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});
