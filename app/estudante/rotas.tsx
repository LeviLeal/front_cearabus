import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

type Rota = {
  id: number;
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

  const renderItem = ({ item }: { item: Rota }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.horario}>{item.horario}H - {item.tipo_partida == "saida" ? "Saída" : "Retorno"}</Text>
      </View>
      <View style={styles.listaFaculdade}>
        <Text>{item.instituicoes}</Text>
        <Text>{item.pontos}</Text>
      </View>
    </View>
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
  conteudo: {
    fontSize: 16,
    color: '#333',
    marginTop: 8
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
