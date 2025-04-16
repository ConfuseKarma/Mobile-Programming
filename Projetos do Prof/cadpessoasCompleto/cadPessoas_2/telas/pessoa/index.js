import {
    Alert, View, ScrollView, ActivityIndicator
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import api from '../../service/api';
import CardPessoa from '../../componentes/CardPessoa';
import Header from '../../componentes/Header';
import * as Utils from '../../utils/utils';


export default function ListaPessoas({ navigation, route }) {

    const [lista, setLista] = useState([]);
    const [load, setLoad] = useState(false);


    /*
        o useEffect abaixo serve para monitorar uma variável que é preenchida na tela de cadastro. 
        Não importa o valor que ela terá, bastando estar preenchida e sempre com um valor diferente para que 
        o userEffect seja disparado e possamos recarregar a lista.
    */
    useEffect(() => {
        if (route.params?.flagReloadList) {
            console.log('Carregando lista devido retorno da tela de cadastro.');
            carregaLista();
        }
    }, [route.params?.flagReloadList]);

    async function carregaLista() {
        try {
            setLoad(true);
            let resposta = (await api.get('/pessoa/filter/getAll'));
            Utils.sleep(3000); // para dar tempo de ver o efeito de loading...
            setLista(resposta.data);
            setLoad(false);

        } catch (e) {
            Alert.alert(e.toString());
        }
    }


    useEffect(
        () => {
            console.log('executando useffect da listagem');
            carregaLista(); //necessário método pois aqui não pode utilizar await...
        }, []);


    function novoRegistro() {
        navigation.navigate('CadastroPessoa', {
            inclusao: true,
        });
    }


    function editaRegistro(pessoa) {
        navigation.navigate('CadastroPessoa', {
            pessoa, inclusao: false
        });
    }


    function removerElemento(id) {
        Alert.alert('Atenção', 'Confirma a remoção do contato?',
            [
                {
                    text: 'Sim',
                    onPress: () => efetivaRemocao(id),
                },
                {
                    text: 'Não',
                    style: 'cancel',
                }
            ]);
    }

    async function efetivaRemocao(id) {
        try {
            await api.delete('/Pessoa/' + id);
            await carregaLista();

        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    return (
        <View style={styles.container}>
            <Header metodoAdd={novoRegistro} exibeIconeNovoRegistro={true} />
            <ScrollView style={styles.areaScroolView}>
                {
                    load
                        ?
                        <ActivityIndicator size="large" color="#00ff00" style={styles.waiting} />
                        :
                        lista.map((pessoa, index) => (
                            <CardPessoa key={index.toString()} pessoa={pessoa} 
                            editar={editaRegistro} remover={removerElemento} />
                        )
                        )
                }
            </ScrollView >
        </View>
    );
}

