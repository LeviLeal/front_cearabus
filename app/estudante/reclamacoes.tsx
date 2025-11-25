import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ComplaintsScreen() {
  const [reclamacao, setReclamacao] = useState('');
  const [numero, setNumero] = useState('');

  const handleEnviar = () => {
    console.log(reclamacao, numero);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reclamações</Text>
      <View style={styles.textAreaContainer}>
        <Text style={styles.label}>Descreva sua reclamação:</Text>

        <TextInput
          style={styles.textarea}
          placeholder="Digite aqui..."
          value={reclamacao}
          onChangeText={setReclamacao}
          multiline
        />
      </View>

      <View style={styles.bottomArea}>
        <Text style={styles.label}>Seu número:</Text>
        <TextInput
          style={styles.input}
          placeholder="(preencher)"
          keyboardType="numeric"
          value={numero}
          onChangeText={setNumero}
        />

        <TouchableOpacity style={styles.button} onPress={handleEnviar}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
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

  textAreaContainer: {
    flex: 1,
  },

  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '500'
  },

  textarea: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    textAlignVertical: 'top',
    backgroundColor: '#f8f8f8'
  },

  bottomArea: {
    marginTop: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#f8f8f8'
  },

  button: {
    marginTop: 18,
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600'
  }
});
