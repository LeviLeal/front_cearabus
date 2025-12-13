import { MaterialIcons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
type Aluno = {
  id: number;
  nome: string;
  aprovado: boolean;
  cpf: string;
  curso: string;
  instituicao: string;
  turno: string;
  ponto_embarque: string;
  declaracao_matricula: string;
  foto_rosto: string;
  comprovante_residencia: string;
};

export default function AdminStudentsListScreen() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAlunos = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/admin/listar_alunos/`);
      const json = await response.json();

      if (json.status === "OK") {
        setAlunos(json.data);
      }
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {

      fetchAlunos();
    }, [])
  );

  const handleAprovar = async (id: number) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/admin/aprovar/${id}`, {
        method: "PATCH",
      });

      const json = await response.json();
      console.log(json);
      fetchAlunos()

    } catch (error) {
      console.error("Erro ao aprovar aluno:", error);
    }
  };

  const handleReprovar = async (id: number) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/admin/reprovar/${id}`, {
        method: "PATCH",
      });

      const json = await response.json();
      console.log(json);
      fetchAlunos()

    } catch (error) {
      console.error("Erro ao reprovar aluno:", error);
    }
  };


  const handleBaixar = async (path: string) => {
    if (!path || path == "") {
      Alert.alert("Arquivo não encontrado")
    }

    const url = `${process.env.EXPO_PUBLIC_API_URL}/${path}`

    Linking.openURL(url)

  }

  const renderItem = ({ item }: { item: Aluno }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.nome}>{item.nome}</Text>
        <View style={styles.actions}>

          <TouchableOpacity onPress={() => handleAprovar(item.id)}>
            <MaterialIcons name="check" size={30} color={"green"} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleReprovar(item.id)}>
            <MaterialIcons name="close" size={30} color={"red"} />
          </TouchableOpacity>
        </View>
      </View>
      <Text>Status: {item.aprovado ? "Aprovado" : "Pendente"}</Text>
      <Text>CPF: {item.cpf}</Text>

      <View style={styles.downloadCard}>
        <TouchableOpacity style={styles.btnDownload} onPress={() => handleBaixar(item.declaracao_matricula)}>
          <MaterialIcons style={styles.downloadIcon} name="download" size={30} color={"#0079ff"} />
          <Text style={styles.downloadText}>D. Matrícula</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnDownload} onPress={() => handleBaixar(item.comprovante_residencia)}>
          <MaterialIcons style={styles.downloadIcon} name="download" size={30} color={"#0079ff"} />
          <Text style={styles.downloadText}>C. Residência</Text>
        </TouchableOpacity>
      </View>
    </View>

  );

  return (
    <View style={styles.container}>

      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={alunos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 90 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  downloadCard: {
    flexDirection: "row",
    borderRadius: 12,
    marginTop: 10,
    elevation: 2,
    justifyContent: "space-around"
  },
  btnDownload: {
    backgroundColor: "#e4e4e4ff",
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  downloadIcon: {
    textAlign: "center"
  },
  downloadText: {
    fontWeight: "500",
    color: "#333"
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nome: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 12,
    color: "black",
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },

  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 50,
  },

  status: {
    color: "dark",
    fontWeight: "bold",
    fontSize: 15
  }
});
