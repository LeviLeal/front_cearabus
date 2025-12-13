import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Rota = {
  id: number;
  nome: string;
  horario: string;
  pontos: string;
  instituicoes: string;
  tipo_partida: string;
};

export default function AlertsScreen() {
  const [rotas, setRotas] = useState<Rota[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchRota = async () => {
        try {
          const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/rota/listar/`);
          const json = await response.json();

          if (json.status === "OK") {
            setRotas(json.data);
          }
        } catch (error) {
          console.error("Erro ao carregar rotas:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchRota();
    }, [])
  );


  const handleExcluir = async (id: number) => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/rota/remover/${id}`, {
        method: "DELETE",
      });

      const json = await response.json();
      console.log(json);

      if (json.status === "OK") {
        // remove da lista local
        setRotas((prev) => prev.filter((rota) => rota.id !== id));
      }
    } catch (error) {
      console.error("Erro ao excluir rota:", error);
    }
  };

  const renderItem = ({ item }: { item: Rota }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.horario}>{item.nome} | {item.tipo_partida == "saida" ? "Saída" : "Retorno"} {item.horario}H</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => handleExcluir(item.id)}>
            <MaterialIcons name="close" size={24} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.listaFaculdade}>
        <Text>{item.instituicoes}</Text>
        <Text>{item.pontos}</Text>
      </View>

    </View>
  );

  const renderFooter = () => (
    <TouchableOpacity style={styles.addButton} onPress={() => { router.push("/admin/adicionarRota") }}>
      <Text style={styles.addButtonText}>+ Adicionar nova rota</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        <FlatList
          data={rotas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
          ListFooterComponent={renderFooter}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  header: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 2
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  tempo: {
    fontSize: 14,
    color: '#777',
    fontWeight: '500'
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  conteudo: {
    fontSize: 16,
    color: '#333',
    marginTop: 8
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 17,
  },
  removeButton: {
    flex: 1,
    backgroundColor: "rgba(254, 73, 91, 1)",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 6,
  },
  removeText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  horario: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: "#444"
  },
  listaFaculdade: {

  }
});
