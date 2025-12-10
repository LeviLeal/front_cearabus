import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from 'expo-linear-gradient';

import { router } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { height } = Dimensions.get('window');
const TOP_HEIGHT = height / 3;

export default function LoginScreen() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const resposta = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/autenticar/logar/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf: login, senha })
      });

      const dados = await resposta.json();
      if (!resposta.ok) {
        alert(dados.mensagem || "Erro ao fazer login");
        return;
      }

      const tipo = dados.tipo_user;

      if (tipo === "estudante") {
        router.push("/estudante/nav");
        await AsyncStorage.setItem("usuario", JSON.stringify(dados.user_data));
      } else if (tipo === "admin") {
        router.push("/admin/nav");
        console.log(dados.user_data)
        await AsyncStorage.setItem("admin", JSON.stringify(dados.user_data));
      }

    } catch (erro) {
      alert("Erro ao logar, verifique os dados.");
    }
  };

  return (
    <View style={styles.container}>

      {/* 🔹 BACKGROUND NO PRIMEIRO TERÇO */}

      <LinearGradient
        colors={['#307345', '#515cd7']}
        style={{ width: '100%', height: TOP_HEIGHT }}
      >

        <View style={styles.logo}>
          <MaterialIcons name="directions-bus" size={100} color={"white"} />
          <Text style={styles.cearaBus}>CearaBus</Text>
        </View>

      </LinearGradient>

      {/* 🔹 CONTEÚDO DO LOGIN */}
      <View style={styles.content}>
        <Text style={styles.title}>Entrar</Text>

        <TextInput
          style={styles.input}
          placeholder="Seu CPF"
          value={login}
          onChangeText={setLogin}
        />

        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/cadastrar")}>
          <Text style={styles.buttonCadastrar}>
            Não tem uma conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  title : {
    color: "black",
    textAlign: "center",
    fontSize: 30,
    fontWeight: 600,
    marginBottom: 20
  },

  container: {
    flex: 1,
    backgroundColor: '#ffffffff',

  },

  logo : {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  topImage: {
    width: '100%',
    backgroundColor: '#8c1010ff',
    height: TOP_HEIGHT,
  },

  content: {
    justifyContent: 'center',
    padding: 20,
  },

  cearaBus: {
    color: "white",
    fontSize: 40,
    marginBottom: 25,
    fontWeight: 'bold',
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
