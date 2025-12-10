import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Dados apenas para estrutura

type Reclamacao = {
  id: number;
  mensagem: string;
  telefone: string;
}

export default function AdminComplaintsScreen() {

  const [reclamacoes, setReclamacoes] = useState<Reclamacao[]>([]);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchReclamacoes = async () => {
      try {
        const response = await fetch("http://10.0.2.2:3000/reclamacao/listar/")
        const json = await response.json()

        if (json.status === "OK")
          setReclamacoes(json.data)

      } catch (error) {
        console.log(`Erro ao retornar dados: ${error}`)
      } finally {
        setLoading(false)
      }
    }
    fetchReclamacoes()
  }, [])

  const handleExcluir = async (id: number) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/reclamacao/remover/${id}`, {
        method: "DELETE",
      });

      const json = await response.json();
      console.log(json);

      if (json.status === "OK") {
        setReclamacoes((prev) => prev.filter((reclamacao) => reclamacao.id !== id));
      }
    } catch (error) {
      console.error("Erro ao excluir reclamação:", error);
    }
  };

  const renderItem = ({ item }: { item: Reclamacao }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.mensagem}>{item.mensagem}</Text>
        <View style={styles.actions}>

          <TouchableOpacity onPress={() => handleExcluir(item.id)}>
            <MaterialIcons name="close" size={24} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.dataHora}>{item.telefone}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Carregando</Text>
      ) : <FlatList
        data={reclamacoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />}
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
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
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

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  dataHora: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },

  mensagem: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
});
