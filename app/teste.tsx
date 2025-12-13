import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export default function RegisterScreen() {
  const [declaracaoMatricula, setDeclaracaoMatricula] = useState<any>(null);
  const [comprovanteResidencia, setComprovanteResidencia] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const selecionarDeclaracao = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (!res.canceled) {
      setDeclaracaoMatricula(res.assets[0]);
    }
  };

  const selecionarComprovante = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (!res.canceled) {
      setComprovanteResidencia(res.assets[0]);
    }
  };

  // 🔥 FUNÇÃO CRÍTICA
  const buildFile = (file: any) => ({
    uri:
      Platform.OS === "ios"
        ? file.uri.replace("file://", "")
        : file.uri,
    name: file.name || "arquivo.pdf",
    type: "application/pdf",
  });

  const handleRegister = async () => {
    if (!declaracaoMatricula || !comprovanteResidencia) {
      Alert.alert("Erro", "Selecione os dois PDFs");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("nome", "Teste");
      formData.append("cpf", "12345678900");

      // PDFs (AGORA CORRETOS)
      // PDFs
      (formData as any).append(
        "declaracaoMatricula",
        buildFile(declaracaoMatricula)
      );

      (formData as any).append(
        "comprovanteResidencia",
        buildFile(comprovanteResidencia)
      );


      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/autenticar/cadastrar_aluno/`,
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await response.text();
      console.log("Resposta bruta:", text);

      const data = JSON.parse(text);

      if (!response.ok) {
        Alert.alert("Erro", "Falha no cadastro");
        return;
      }

      Alert.alert("Sucesso", "Arquivos enviados com sucesso!");
    } catch (err) {
      console.log("ERRO:", err);
      Alert.alert("Erro", "Erro ao enviar dados");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Upload de PDFs</Text>

      <TouchableOpacity style={styles.button} onPress={selecionarDeclaracao}>
        <Text style={styles.buttonText}>
          {declaracaoMatricula
            ? declaracaoMatricula.name
            : "Selecionar Declaração de Matrícula"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={selecionarComprovante}>
        <Text style={styles.buttonText}>
          {comprovanteResidencia
            ? comprovanteResidencia.name
            : "Selecionar Comprovante de Residência"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.submitButton, loading && { opacity: 0.6 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.submitText}>
          {loading ? "Enviando..." : "Enviar"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    borderWidth: 1,
    borderColor: "#444",
    padding: 15,
    borderRadius: 6,
    marginBottom: 15,
  },
  buttonText: {
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#222",
    padding: 15,
    borderRadius: 6,
    marginTop: 20,
  },
  submitText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
