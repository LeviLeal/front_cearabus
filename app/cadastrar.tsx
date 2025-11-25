import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function RegisterScreen() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [curso, setCurso] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");

  // Dropdown universidade
  const [universidade, setUniversidade] = useState("Selecionar");
  const [showUniversidade, setShowUniversidade] = useState(false);

  const universidades = [
    "(preencher)",
    "(preencher)",
    "(preencher)"
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      {/* Upload Comprovante de Residência */}
      <Text style={styles.label}>Comprovante de Residência</Text>
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadText}>Enviar arquivo</Text>
      </TouchableOpacity>

      {/* Upload Comprovante de Matrícula */}
      <Text style={styles.label}>Comprovante de Matrícula</Text>
      <TouchableOpacity style={styles.uploadButton}>
        <Text style={styles.uploadText}>Enviar arquivo</Text>
      </TouchableOpacity>

      {/* Nome Completo */}
      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#777"
        value={nome}
        onChangeText={setNome}
      />

      {/* Curso */}
      <Text style={styles.label}>Curso</Text>
      <TextInput
        style={styles.input}
        placeholder="Seu curso"
        placeholderTextColor="#777"
        value={curso}
        onChangeText={setCurso}
      />

      {/* CPF */}
      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        placeholder="000.000.000-00"
        placeholderTextColor="#777"
        value={cpf}
        onChangeText={setCpf}
      />

      {/* Universidade (Dropdown) */}
      <Text style={styles.label}>Universidade</Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowUniversidade(!showUniversidade)}
      >
        <Text style={styles.dropdownText}>{universidade}</Text>
      </TouchableOpacity>

      {showUniversidade && (
        <View style={styles.dropdownMenu}>
          {universidades.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.option}
              onPress={() => {
                setUniversidade(item);
                setShowUniversidade(false);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Senha */}
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#777"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* Repetir Senha */}
      <Text style={styles.label}>Repetir Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Repita a senha"
        placeholderTextColor="#777"
        secureTextEntry
        value={repetirSenha}
        onChangeText={setRepetirSenha}
      />

      {/* Botão cadastrar */}
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerText}>Cadastrar</Text>
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
    marginBottom: 22,
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 12,
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },

  uploadButton: {
    backgroundColor: "#e6e6e6",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },

  uploadText: {
    fontSize: 15,
    color: "#333",
  },

  dropdown: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  dropdownText: {
    fontSize: 16,
    color: "#333",
  },

  dropdownMenu: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
  },

  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  registerButton: {
    marginTop: 25,
    backgroundColor: "#007bff",
    paddingVertical: 15,
    borderRadius: 10,
  },

  registerText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
