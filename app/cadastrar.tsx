import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RegisterScreen() {

  type Curso = {
    id: number;
    nome: string;
  };

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");

  const [universidade, setUniversidade] = useState("Selecionar");
  const [showUniversidade, setShowUniversidade] = useState(false);
  
  const [turno, setTurno] = useState("Selecionar");
  const [showTurno, setShowTurno] = useState(false);

  const universidades = [
    "IFCE",
    "UFC",
    "ESTACIO",
    "CATOLICA",
    "UECE",
  ];

  const turnos = [
    "Manhã",
    "Tarde",
    "Noite"
  ]

  const [listaCursos, setListaCursos] = useState<Curso[]>([])
  const [curso, setCurso] = useState("Selecionar")
  const [mostrarCurso, setMostrarCurso] = useState(false)

  useEffect(() => {
    const carregarCursos = async () => {
      try {
        const resposta = await fetch("http://10.0.2.2:3000/curso/listar/")
        const dados = await resposta.json()
        setListaCursos(dados.data)
      } catch (erro) {
        console.log("Error: " + erro)
      }
    }
    carregarCursos()
  }, [])

  const handleRegister = async () => {
    if (!nome || !cpf || !curso || !universidade || universidade === "Selecionar") {
      alert("Preencha todos os campos.");
      return;
    }

    if (senha !== repetirSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      const resposta = await fetch("http://10.0.2.2:3000/aluno/cadastrar_aluno/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome,
          cpf,
          curso,
          universidade,
          senha,
        })
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.mensagem || "Erro ao cadastrar.");
        return;
      }

      alert("Cadastro realizado com sucesso!");

      // Redirecionar para login
      router.push("/");

    } catch (erro) {
      console.log("Erro:", erro);
      alert("Falha ao conectar com o servidor.");
    }
  };

  return (
    <View style={styles.container}>

      {/* <Text style={styles.label}>Comprovante de Residência</Text> */}
      {/* <TouchableOpacity style={styles.uploadButton}> */}
      {/* <Text style={styles.uploadText}>Enviar arquivo</Text> */}
      {/* </TouchableOpacity> */}
      {/*  */}
      {/* <Text style={styles.label}>Comprovante de Matrícula</Text> */}
      {/* <TouchableOpacity style={styles.uploadButton}> */}
      {/* <Text style={styles.uploadText}>Enviar arquivo</Text> */}
      {/* </TouchableOpacity> */}

      <Text style={styles.label}>Nome Completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        placeholderTextColor="#777"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>CPF</Text>
      <TextInput
        style={styles.input}
        placeholder="00000000000"
        placeholderTextColor="#777"
        value={cpf}
        onChangeText={(texto) => {
          const apenasNumeros = texto.replace(/[^0-9]/g, "");
          const cpfLimitado = apenasNumeros.slice(0, 11);
          setCpf(cpfLimitado);
        }}
        keyboardType="numeric"
      />


      <Text style={styles.label}>Universidade</Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowUniversidade(!showUniversidade)}
      >
        <Text style={styles.dropdownText}>{universidade}</Text>
      </TouchableOpacity>

      {showUniversidade && (
        <View style={styles.dropdownMenu}>
          {universidades.map((item, index) => (
            <TouchableOpacity
              key={index}
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

      <Text style={styles.label}>Curso</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setMostrarCurso(!mostrarCurso)}
      >
        <Text style={styles.dropdownText}>{curso}</Text>
      </TouchableOpacity>

      {mostrarCurso && (
        <View style={styles.dropdownMenu}>
          {listaCursos.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => {
                setCurso(item.nome);
                setMostrarCurso(false);
              }}
            >
              <Text>{item.nome}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

        <Text style={styles.label}>Turno</Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowTurno(!showTurno)}
      >
        <Text style={styles.dropdownText}>{universidade}</Text>
      </TouchableOpacity>

      {showTurno && (
        <View style={styles.dropdownMenu}>
          {turnos.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => {
                setTurno(item);
                setShowTurno(false);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#777"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={styles.label}>Repetir Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Repita a senha"
        placeholderTextColor="#777"
        secureTextEntry
        value={repetirSenha}
        onChangeText={setRepetirSenha}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
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
