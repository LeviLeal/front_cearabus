import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
};

export default function AdminStudentsListScreen() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchAlunos = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/admin/listar_alunos/");
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
      <Text style={styles.status}>Status: {item.aprovado ? "Aprovada" : "Pendente"}</Text>
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

      <TouchableOpacity style={styles.relatorioBtn} onPress={() => router.push("/admin/relatorio")}>
        <Text style={styles.relatorioText}>Gerar Relatório</Text>
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
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
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

  btnAceitar: {
    backgroundColor: "#4CAF50",
  },

  btnRecusar: {
    backgroundColor: "#E53935",
  },

  btnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  relatorioBtn: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#0066CC",
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 3,
  },

  relatorioText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  status: {
    color: "dark",
    fontWeight: "bold",
    fontSize: 15
  }
});
