import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchAlunos = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/admin/listar_alunos/'); // ou IP do seu PC
        const json = await response.json();

        if (json.status === 'OK') {
          setAlunos(json.data);
        }
      } catch (error) {
        console.error('Erro ao buscar alunos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlunos();
  }, []);

  const renderItem = ({ item }: { item: Aluno }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.nome}>{item.nome}</Text>
        <View style={styles.actions}>
          <TouchableOpacity>
            <MaterialIcons name="check" size={30} />
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialIcons name="close" size={30} />
          </TouchableOpacity>
        </View>
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
    fontSize: 24,
    fontWeight: "500",
    marginBottom: 12,
    color: "#272727ff",
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
});
