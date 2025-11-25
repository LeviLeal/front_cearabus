import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AdicionarRota() {
  const [destinos, setDestinos] = useState<string[]>([]);
  const [novoDestino, setNovoDestino] = useState('');

  const [horario, setHorario] = useState('');
  const [instituicoes, setInstituicoes] = useState('');
  const [motorista, setMotorista] = useState('');

  const adicionarDestino = () => {
    if (novoDestino.trim() === '') return;
    setDestinos([...destinos, novoDestino]);
    setNovoDestino('');
  };

  const removerDestino = (index: number) => {
    const lista = [...destinos];
    lista.splice(index, 1);
    setDestinos(lista);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Nova Rota</Text>

      {/* Destinos */}
      <Text style={styles.label}>Destinos:</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Digite um destino"
          value={novoDestino}
          onChangeText={setNovoDestino}
        />

        <TouchableOpacity style={styles.addButton} onPress={adicionarDestino}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de destinos */}
      <FlatList
        data={destinos}
        keyExtractor={(item, index) => index.toString()}
        style={{ marginTop: 10 }}
        ListEmptyComponent={
          <Text style={styles.placeholder}>Nenhum destino adicionado ainda</Text>
        }
        renderItem={({ item, index }) => (
          <View style={styles.destinoItem}>
            <Text style={styles.destinoText}>• {item}</Text>

            <TouchableOpacity onPress={() => removerDestino(index)}>
              <Text style={styles.removeDestino}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Campos adicionais */}
      <Text style={styles.label}>Horário de início:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 06:30"
        value={horario}
        onChangeText={setHorario}
      />

      <Text style={styles.label}>Instituições atendidas:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: UnB, IFB, UCB..."
        value={instituicoes}
        onChangeText={setInstituicoes}
      />

      <Text style={styles.label}>Motorista:</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do motorista"
        value={motorista}
        onChangeText={setMotorista}
      />

      {/* Botão final */}
      <TouchableOpacity style={styles.finalizarButton}>
        <Text style={styles.finalizarText}>Salvar Rota</Text>
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
});
