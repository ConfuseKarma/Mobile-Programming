import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useEffect } from 'react';


export default function Home({ navigation }) {

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Home</Text>
            <Text></Text>
            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Grafico1')}>
                <Text style={styles.texto}>Gráfico 1</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Grafico2')}>
                <Text style={styles.texto}>Gráfico 2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Grafico3')}>
                <Text style={styles.texto}>Gráfico 3</Text>
            </TouchableOpacity>

            <StatusBar style="auto" />
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    texto: {
        fontSize: 30,
    },
    botao: {
        width: "90%",
        height: 55,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 7,
    }
});