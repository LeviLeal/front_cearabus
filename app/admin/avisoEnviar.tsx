import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function SendAlertScreen() {
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEnviar = async () => {
    if (!titulo.trim() || !mensagem.trim()) {
      Alert.alert("Aviso", "Preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://10.0.2.2:3000/aviso/criar/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          mensagem
        })
      });

      const json = await response.json();

      if (json.status === "OK") {
        Alert.alert("Sucesso", "Aviso enviado com sucesso!");

        setTitulo("");
        setMensagem("");

        router.back(); // volta para lista de avisos
      } else {
        Alert.alert("Erro", "Não foi possível enviar o aviso.");
      }

    } catch (error) {
      console.error("Erro ao enviar aviso:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enviar Aviso</Text>

      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título do aviso"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Mensagem:</Text>
      <TextInput
        style={styles.textarea}
        placeholder="Digite a mensagem..."
        multiline
        value={mensagem}
        onChangeText={setMensagem}
      />

      <TouchableOpacity style={styles.button} onPress={handleEnviar} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? "Enviando..." : "Enviar Aviso"}
        </Text>
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
    height: 160,
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
