import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function AlertsScreen() {
type Aviso = {
  id: number;
  titulo: string;
  mensagem: string;
};

  const [avisos, setAvisos] = useState([]);

  const carregarAvisos = async () => {
    try {
      const response = await fetch('http://10.0.2.2:3000/aviso/listar/');
      const json = await response.json();

      if (json.status === "OK") {
        setAvisos(json.data);
      }
    } catch (error) {
      console.log("Erro ao carregar avisos:", error);
    }
  };

  // Recarrega sempre que a tela fica em foco
  useFocusEffect(
    useCallback(() => {
      carregarAvisos();
    }, [])
  );

  const renderItem = ({item} : { item: Aviso }) => (
    <View style={styles.card}>
      <Text style={styles.tempo}>{item.titulo}</Text>
      <Text style={styles.conteudo}>{item.mensagem}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={avisos}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
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
    borderRadius: 15,
    elevation: 2
  },
  tempo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 6
  },
  conteudo: {
    fontSize: 15,
    color: '#333'
  }
});
