import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SendAlertScreen() {
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleEnviar = () => {
    console.log("Enviar aviso:", titulo, mensagem);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enviar Aviso</Text>

      {/* Campo título */}
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título do aviso"
        value={titulo}
        onChangeText={setTitulo}
      />

      {/* Caixa grande de mensagem */}
      <Text style={styles.label}>Mensagem:</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Digite a mensagem..."
        multiline
        value={mensagem}
        onChangeText={setMensagem}
      />

      {/* Botão enviar */}
      <TouchableOpacity style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Enviar Aviso</Text>
      </TouchableOpacity>
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
    marginBottom: 25
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 6
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#f8f8f8',
    marginBottom: 16
  },
  textarea: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#f8f8f8',
    textAlignVertical: 'top',
    marginBottom: 20
  },
  button: {
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
