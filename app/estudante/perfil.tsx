import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PerfilEstudante() {

  type Usuario = {
    id: number;
    nome: string;
    cpf: string;
    aprovado: boolean;
    curso: string;
    declaracao_matricula: string;
    foto_rosto: string,
    instituicao: string,
    ponto_embarque: string;
    senha: string;
    turno: string;
    // coloque outros campos que vêm da API
  };


  const [usuario, setUsuario] = useState<Usuario | null>(null)

  useEffect(() => {
    async function carregar() {
      const data = await AsyncStorage.getItem("usuario")
      if (data) {
        setUsuario(JSON.parse(data))
        console.log(data)
      }

    }
    carregar()
  }, [])
  console.log(usuario)
  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.card}>
        <MaterialIcons name="person-pin" size={200} />

        <Text style={styles.label}>Nome </Text>
        <Text style={styles.placeholder}>{usuario?.nome}</Text>

        <Text style={styles.label}>Curso</Text>
        <Text style={styles.placeholder}>{usuario?.curso}</Text>

        <Text style={styles.label}>Instituição</Text>
        <Text style={styles.placeholder}>{usuario?.instituicao}</Text>

        <Text style={styles.label}>Turno</Text>
        <Text style={styles.placeholder}>{usuario?.turno}</Text>

        <Text style={styles.label}>Ponto de Embarque</Text>
        <Text style={styles.placeholder}>{usuario?.ponto_embarque}</Text>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#f2f2f2',
    padding: 18,
    borderRadius: 12,
    elevation: 2,
  },

  label: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
  },

  placeholder: {
    fontSize: 15,
    color: '#555',
    marginLeft: 6,
  },
});
