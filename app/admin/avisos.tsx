import { router } from 'expo-router';
import React from 'react';

import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const avisos = [
    { id: '1', tempo: '', conteudo: '' },
    { id: '2', tempo: '', conteudo: '' },
    { id: '3', tempo: '', conteudo: '' }
];

export default function AlertsScreen() {
    const handleEditar = (id: string) => {
        console.log("Editar aviso:", id);
    };

    const handleExcluir = (id: string) => {
        console.log("Excluir aviso:", id);
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.card}>

            {/* Cabeçalho com tempo + botões */}
            <View style={styles.cardHeader}>
                <Text style={styles.tempo}>(preencher tempo)</Text>

                <View style={styles.actions}>


                    <TouchableOpacity onPress={() => handleEditar(item.id)}>
                        <Text style={styles.editText}>I</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => handleExcluir(item.id)}>
                        <Text style={styles.deleteText}>X</Text>
                    </TouchableOpacity>

                </View>
            </View>

            {/* Conteúdo do aviso */}
            <Text style={styles.conteudo}>(preencher conteúdo)</Text>

        </View>
    );

    const renderFooter = () => (
        <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText} onPress={() => router.push("/admin/enviarAviso")}>+ Adicionar novo aviso</Text>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Avisos</Text>

            <FlatList
                data={avisos}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 30 }}
                ListFooterComponent={renderFooter}
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
        borderRadius: 12,
        elevation: 2
    },

    /* topo do card */
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

    icon: {
        width: 20,
        height: 20,
        tintColor: 'black' // opcional
    },

    editText: {
        fontSize: 20,
        color: 'green',
        fontWeight: '700'
    },
    deleteText: {
        fontSize: 20,
        color: 'red',
        fontWeight: '700'
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
    },
    addButtonText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 17,
    },
});
