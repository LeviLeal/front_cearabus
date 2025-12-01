import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Aviso = {
    id: number;
    titulo: string;
    mensagem: string;
};

export default function AlertsScreen() {
    const [avisos, setAvisos] = useState<Aviso[]>([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            const fetchAvisos = async () => {
                try {
                    const response = await fetch("http://10.0.2.2:3000/aviso/listar/");
                    const json = await response.json();

                    if (json.status === "OK") {
                        setAvisos(json.data);
                    }
                } catch (error) {
                    console.error("Erro ao carregar avisos:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchAvisos();
        }, [])
    );


    const handleExcluir = async (id: number) => {
        try {
            const response = await fetch(`http://10.0.2.2:3000/aviso/remover/${id}`, {
                method: "DELETE",
            });

            const json = await response.json();
            console.log(json);

            if (json.status === "OK") {
                // remove da lista local
                setAvisos((prev) => prev.filter((aviso) => aviso.id !== id));
            }
        } catch (error) {
            console.error("Erro ao excluir aviso:", error);
        }
    };


    const renderItem = ({ item }: { item: Aviso }) => (
        <View style={styles.card}>

            {/* Header com tempo + botões */}
            <View style={styles.cardHeader}>
                {/* Como a API não envia tempo, você pode adaptar */}
                <Text style={styles.tempo}>{item.titulo}</Text>

                <View style={styles.actions}>

                    <TouchableOpacity onPress={() => handleExcluir(item.id)}>
                        <MaterialIcons name="close" size={24} />
                    </TouchableOpacity>


                </View>
            </View>

            <Text style={styles.conteudo}>{item.mensagem}</Text>

        </View>
    );

    const renderFooter = () => (
        <TouchableOpacity style={styles.addButton} onPress={() => router.push("/admin/avisoEnviar")}>
            <Text style={styles.addButtonText}>+ Adicionar novo aviso</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>

            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                <FlatList
                    data={avisos}
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
});
