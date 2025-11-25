import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AdminReportScreen() {
  const [instituicao, setInstituicao] = useState("Selecionar");
  const [curso, setCurso] = useState("Selecionar");
  const [turno, setTurno] = useState("Selecionar");

  const [showInstituicao, setShowInstituicao] = useState(false);
  const [showCurso, setShowCurso] = useState(false);
  const [showTurno, setShowTurno] = useState(false);

  const instituicoes = ["IFCE", "UFCE", "UECE", "ESTACIO", "CATOLICA"];
  const cursos = [""];

  const turnos = ["Manhã", "Tarde", "Noite"];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerar Relatório</Text>

      <Text style={styles.label}>Instituição</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowInstituicao(!showInstituicao)}
      >
        <Text style={styles.dropdownText}>{instituicao}</Text>
      </TouchableOpacity>

      {showInstituicao && (
        <View style={styles.dropdownMenu}>
          {instituicoes.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.option}
              onPress={() => {
                setInstituicao(item);
                setShowInstituicao(false);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.label}>Curso</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowCurso(!showCurso)}
      >
        <Text style={styles.dropdownText}>{curso}</Text>
      </TouchableOpacity>

      {showCurso && (
        <View style={styles.dropdownMenu}>
          {cursos.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.option}
              onPress={() => {
                setCurso(item);
                setShowCurso(false);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <Text style={styles.label}>Turno</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowTurno(!showTurno)}
      >
        <Text style={styles.dropdownText}>{turno}</Text>
      </TouchableOpacity>

      {showTurno && (
        <View style={styles.dropdownMenu}>
          {turnos.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.option}
              onPress={() => {
                setTurno(item);
                setShowTurno(false);
              }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Botão */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Baixar Relatório</Text>
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
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },

  dropdown: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  dropdownText: {
    fontSize: 16,
    color: "#333",
  },

  dropdownMenu: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 18,
    overflow: "hidden",
  },

  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  button: {
    marginTop: 20,
    backgroundColor: "#0066CC",
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 3,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
});
