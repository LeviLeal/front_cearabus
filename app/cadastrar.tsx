import * as DocumentPicker from 'expo-document-picker';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function RegisterScreen() {

  type Curso = {
    id: number;
    nome: string;
  };

  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [numeroMatricula, setNumeroMatricula] = useState("");
  const [pontoEmbarque, setPontoEmbarque] = useState("");
  const [senha, setSenha] = useState("");
  const [repetirSenha, setRepetirSenha] = useState("");

  const [universidade, setUniversidade] = useState("Selecionar");
  const [showUniversidade, setShowUniversidade] = useState(false);

  const [turno, setTurno] = useState("Selecionar");

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
  const [mostrarTurno, setMostrarTurno] = useState(false)

  const [declaracaoMatricula, setDeclaracaoMatricula] = useState<any>(null);
  const [comprovanteResidencia, setComprovanteResidencia] = useState<any>(null);

  useEffect(() => {
    const carregarCursos = async () => {
      try {
        const resposta = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/curso/listar/`)
        const dados = await resposta.json()
        setListaCursos(dados.data)
      } catch (erro) {
        console.log("Error: " + erro)
      }
    }
    carregarCursos()
  }, [])


  // File picker declaracao de matricula
  const selecionarDeclaracao = async () => {
    const arquivo = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*"],
      copyToCacheDirectory: true,
    });
    
    if (!arquivo.canceled) {
      setDeclaracaoMatricula(arquivo.assets[0]);
    }
  };
  // File picker comprovante de residencia
  const selecionarComprovante = async () => {
    const arquivo = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf", "image/*"],
      copyToCacheDirectory: true,
    });

    if (!arquivo.canceled) {
      setComprovanteResidencia(arquivo.assets[0]);
    }
  };

  // Ao clicar em cadastrar
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

      console.log(comprovanteResidencia)

      const formData = new FormData();

      formData.append("nome", nome);
      formData.append("cpf", cpf);
      formData.append("telefone", telefone);
      formData.append("curso", curso);
      formData.append("universidade", universidade);
      formData.append("numeroMatricula", numeroMatricula);
      formData.append("senha", senha);
      formData.append("turno", turno);
      formData.append("pontoEmbarque", pontoEmbarque);

      if (declaracaoMatricula) {
        formData.append("declaracaoMatricula", {
          uri: declaracaoMatricula.uri,
          name: declaracaoMatricula.name,
          type: declaracaoMatricula.mimeType || "application/pdf"
        } as any);
      }

      if (comprovanteResidencia) {
        formData.append("comprovanteResidencia", {
          uri: comprovanteResidencia.uri,
          name: comprovanteResidencia.name,
          type: comprovanteResidencia.mimeType || "application/pdf"
        } as any);
      }

      const resposta = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/autenticar/cadastrar_aluno/`, {
        method: "POST",
        body: formData,
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.mensagem || "Erro ao cadastrar.");
        return;
      }

      alert("Cadastro realizado com sucesso!");


      // router.push("/");

    } catch (erro) {
      console.log("Erro:", erro);
      alert("Falha ao conectar com o servidor.");
    }
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.label}>Declaração de Matrícula</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={selecionarDeclaracao}>
        <Text style={styles.uploadText}>
          {declaracaoMatricula ? declaracaoMatricula.name : "Selecionar arquivo"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.label}>Comprovante de Residência</Text>
      <TouchableOpacity style={styles.uploadButton} onPress={selecionarComprovante}>
        <Text style={styles.uploadText}>
          {comprovanteResidencia ? comprovanteResidencia.name : "Selecionar arquivo"}
        </Text>
      </TouchableOpacity>

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

      <Text style={styles.label}>Telefone</Text>
      <TextInput
        style={styles.input}
        placeholder="(00) 00000000000"
        placeholderTextColor="#777"
        value={telefone}
        onChangeText={(texto) => {
          const apenasNumeros = texto.replace(/[^0-9]/g, "");
          const telefoneLimitado = apenasNumeros.slice(0, 11);
          setTelefone(telefoneLimitado);
        }}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Número matricula</Text>
      <TextInput
        style={styles.input}
        placeholder="Número da sua matrícula"
        placeholderTextColor="#777"
        value={numeroMatricula}
        onChangeText={(texto) => {
          const apenasNumeros = texto.replace(/[^0-9]/g, "");
          const numeroMatriculaLimitado = apenasNumeros.slice(0, 11);
          setNumeroMatricula(numeroMatriculaLimitado);
        }}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Ponto de embarque</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu ponto de embarque"
        placeholderTextColor="#777"
        value={pontoEmbarque}
        onChangeText={setPontoEmbarque}
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
        onPress={() => setMostrarTurno(!mostrarTurno)}
      >
        <Text style={styles.dropdownText}>{turno}</Text>
      </TouchableOpacity>

      {mostrarTurno && (
        <View style={styles.dropdownMenu}>
          {turnos.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => {
                setTurno(item);
                setMostrarTurno(false);
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

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
    marginBottom: 150
  },

  registerText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
