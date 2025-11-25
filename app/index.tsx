import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // navigation.navigate('rotas' as never);

    const isAdmin = true

    if (!isAdmin)
      router.push("/estudante/nav")
    else
      router.push("/admin/nav")
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.buttonCadastrar} onPress={() => router.push("/cadastrar")}> Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonCadastrar: {
    color: '#007bff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
  }
});
