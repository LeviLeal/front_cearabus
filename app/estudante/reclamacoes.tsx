import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ComplaintsScreen() {
  const [mensagem, setReclamacao] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleEnviar = async () => {
    if (mensagem == "" || telefone == "") {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const resposta = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/reclamacao/criar/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          mensagem,
          telefone,
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.mensagem || "Erro ao enviar reclamação.");
        return;
      }

      alert("Reclamação enviada com sucesso!");

      // Redirecionar para login
      router.push("/");

    } catch (erro) {
      console.log("Erro:", erro);
      alert("Falha ao conectar com o servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textAreaContainer}>
        <Text style={styles.label}>Descreva sua reclamação:</Text>

        <TextInput
          style={styles.textarea}
          placeholder="Digite aqui..."
          value={mensagem}
          onChangeText={setReclamacao}
          multiline
        />
      </View>

      <View style={styles.bottomArea}>
        <Text style={styles.label}>Seu número:</Text>
        <TextInput
          style={styles.input}
          placeholder="Preencha seu número"
          keyboardType="numeric"
          value={telefone}
          onChangeText={setTelefone}
        />

        <TouchableOpacity style={styles.button} onPress={handleEnviar}>
          <Text style={styles.buttonText}>Enviar reclamação</Text>
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
    borderRadius: 15,
    padding: 12,
    fontSize: 15,
    textAlignVertical: 'top',
    backgroundColor: '#f8f8f8'
  },

  bottomArea: {
    marginTop: 15,
  },

  input: {
    borderRadius: 15,
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
