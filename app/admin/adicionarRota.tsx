import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

export default function AdicionarRota() {
  const [destinos, setDestinos] = useState('');
  const [horario, setHorario] = useState('');
  const [instituicoes, setInstituicoes] = useState('');
  const [tipoPartida, setTipoPartida] = useState('');

  const listaTipoPartida = [
    { label: "Saída", value: "saida" },
    { label: "Retorno", value: "retorno" },
  ];

const handleEnviar = async () => {
    if (destinos == "" || horario == "") {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      console.log(destinos + horario + instituicoes + tipoPartida)
      const resposta = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/rota/criar/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          horario,
          destinos,
          instituicoes,
          tipoPartida

        })

      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.mensagem || "Erro ao adicionar srota.");
        return;
      }

      alert("Rota adicionada com sucesso!");


    } catch (erro) {
      console.log("Erro:", erro);
      alert("Falha ao conectar com o servidor.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Nova Rota</Text>


      <Text style={styles.label}>Destinos:</Text>
      <TextInput
          style={[styles.input]}
          placeholder="Digite os destinos."
          value={destinos}
          onChangeText={setDestinos}
        />

      {/* Campos adicionais */}
      <Text style={styles.label}>Horário de saída/retorno:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 06:30"
        value={horario}
        onChangeText={setHorario}
      />

      <Text style={styles.label}>Tipo de partida:</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={listaTipoPartida}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder="Selecione..."
        value={tipoPartida}
        onChange={(item) => {
          setTipoPartida(item.value);
        }}
      />

      <Text style={styles.label}>Instituições atendidas:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: UnB, IFB, UCB..."
        value={instituicoes}
        onChangeText={setInstituicoes}
      />

      {/* Botão final */}
      <TouchableOpacity style={styles.finalizarButton} onPress={handleEnviar}>
        <Text style={styles.finalizarText}>Adicionar rota</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },

  label: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: '600',
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  input: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginTop: 8,
  },

  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginLeft: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
  },

  placeholder: {
    marginTop: 10,
    color: '#777',
    fontStyle: 'italic',
    textAlign: 'center',
  },

  destinoItem: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  destinoText: {
    fontSize: 16,
  },
  removeDestino: {
    color: '#dc3545',
    fontWeight: '600',
  },

  finalizarButton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 30,
  },
  finalizarText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
  },
  dropdown: {
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f2f2f2",
    
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#888",
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
