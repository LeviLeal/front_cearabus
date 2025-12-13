import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PerfilEstudante() {

  type Admin = {
    id: number;
    nome: string;
    cpf: string;
  };

  const [admin, setAdmin] = useState<Admin | null>(null)

  useEffect(() => {
    async function carregar() {
      const data = await AsyncStorage.getItem("admin")
      if (data) {
        setAdmin(JSON.parse(data))
        console.log(data)
      }

    }
    carregar()
  }, [])
  console.log(admin)
  return (
    <View style={styles.container}>

      <ScrollView >

        <View style={styles.card}>
          <MaterialIcons name="admin-panel-settings" size={200} color={"gray"} />
          <Text><b>Você é um administrador do sistema</b></Text>
          <Text style={styles.label}>Nome </Text>
          <Text style={styles.placeholder}>{admin?.nome}</Text>

          <Text style={styles.label}>CPF</Text>
          <Text style={styles.placeholder}>{admin?.cpf}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.logoutButton} onPress={async () => { 
        await AsyncStorage.removeItem("admin")
        router.replace("/") 
      }}>
        <Text style={styles.logoutButtonText}>Sair do sistema</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  no_access_container: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  card: {
    padding: 18,
    borderRadius: 15,
    backgroundColor: "#f8f8f8",
    margin: 10,
    elevation: 2,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  label: {
    marginTop: 12,
    fontSize: 17,
    fontWeight: '600',
    color: "#444"
  },

  placeholder: {
    fontSize: 16,
    color: '#333',
    marginLeft: 6,
  },
  logoutButton: {
    backgroundColor: 'gray',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  logoutButtonText: {
    color: '#ffffffff',
    fontWeight: '700',
    fontSize: 17,
  },
});
