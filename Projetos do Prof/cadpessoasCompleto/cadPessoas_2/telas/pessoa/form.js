import {
  Alert, Text, TextInput, TouchableOpacity, View, ScrollView,
  ActivityIndicator
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import Header from '../../componentes/Header';
import DateTimeInput from '../../componentes/DateTimeInput';
import api from '../../service/api';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker'
import * as Utils from '../../utils/utils';

export default function CadastroPessoa({ route, navigation }) {

  let inclusao = route.params.inclusao;
  let pessoa = route.params.pessoa;

  const [id, setId] = useState(pessoa && pessoa.id.toString());
  const [nome, setNome] = useState(pessoa && pessoa.nome);
  const [sexo, setSexo] = useState((pessoa && pessoa.sexo) || '');
  const [cidadeId, setCidadeId] = useState(pessoa && pessoa.CidadeId);
  const [DataNascimento, setDataNascimento] = useState((pessoa && new Date(pessoa.DataNascimento)) || new Date());  // useState(new Date())
  const [cidades, setCidades] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(
    () => {
      console.log('processando useEffect');
      carregamentosUseEffect();
    }, []
  );

  async function carregamentosUseEffect() {
    setLoad(true);
    if (inclusao)
      await carregaProximoId();
    await carregaCidades();
    setLoad(false);
  }


  async function carregaCidades() {
    try {
      if (cidades.length == 0) {
        let resposta = await api.get('/cidade/filter/getAll');
        setCidades(resposta.data);
        console.log(`Carregado ${resposta.data.length} cidade(s)...`);
      }
    }
    catch (e) {
      Alert.alert(e.toString());
    }
  }


  async function carregaProximoId() {
    try {
      let resposta = await api.get('/pessoa/filter/getNextId');
      console.log(resposta.data);
      Utils.sleep(1000);  // só para ver o efeito do loading
      setId(resposta.data.toString());
    }
    catch (e) {
      Alert.alert(e.toString());
    }
  }



  async function salva() {
    /* as validações estão sendo feitas do lado do servidor. */

    try {
      let dataHora = format(DataNascimento, 'yyyy-MM-dd') + 'T00:00';

      let objPessoa = {
        id,
        nome,
        DataNascimento: dataHora,
        sexo,
        CidadeId: cidadeId,
      };

      console.log('Salvando objeto', objPessoa);

      if (inclusao) {
        await api.post('/Pessoa', objPessoa);
        navigation.navigate({ name: 'ListaPessoas', params: { flagReloadList: Utils.random() } });
      }
      else {
        await api.put('/Pessoa/' + id, objPessoa);
        navigation.navigate({ name: 'ListaPessoas', params: { flagReloadList: Utils.random() } });
      }
    } catch (erro) {
      trataErroAPI(erro);
    }
  }


  function trataErroAPI(error) {
    if (error.response && error.response.data && error.response.data.erro) {
      Alert.alert(error.response.data.erro);
    }
    else {
      Alert.alert(error.toString());
    }
  }



  return (
    <View style={styles.container}>
      <Header exibeIconeNovoRegistro={false} />
      {
        load
          ?
          <ActivityIndicator size="large" color="#00ff00" style={styles.waiting} />
          :
          <ScrollView style={styles.areaScroolViewForm}>
            <Text style={styles.labelCampoEdicao}>Id</Text>
            <TextInput style={styles.caixaTexto}
              keyboardType={'number-pad'}
              onChangeText={(texto) => setId(texto)}
              value={id}
              editable={inclusao}
            />

            <Text style={styles.labelCampoEdicao}>Nome  </Text>
            <TextInput style={styles.caixaTexto}
              onChangeText={(texto) => setNome(texto)}
              value={nome} />

            <Text style={styles.labelCampoEdicao}>Sexo</Text>

            {
              //https://emojipedia.org/
            }
            <Picker
              selectedValue={sexo}
              onValueChange={(itemValue, itemIndex) => setSexo(itemValue)}
              dropdownIconColor={'#038a27'}
              prompt='Selecione o sexo...'

            >
              <Picker.Item label="" value="" enabled={false} />
              <Picker.Item label="👨 Masculino" value="M" style={styles.masculino} />
              <Picker.Item label="👩 Feminino" value="F" style={styles.feminino} />
            </Picker>


            <Text style={styles.labelCampoEdicao}>Cidade</Text>

            <Picker
              selectedValue={cidadeId}
              onValueChange={(itemValue, itemIndex) => setCidadeId(itemValue)}
              dropdownIconColor={'#038a27'}
              prompt='Selecione a cidade...'
            >
              {
                cidades.map((cidade, index) => (
                  <Picker.Item key={index.toString()} label={cidade.nome}
                    value={cidade.id} style={styles.cidade} />
                ))
              }

            </Picker>




            <Text style={styles.labelCampoEdicao}>Data de nascimento</Text>
            <DateTimeInput type={'date'} onSave={setDataNascimento} theDate={DataNascimento} />


            <View style={styles.areaBotoes}>

              <TouchableOpacity style={styles.botaoCancela} onPress={() => navigation.navigate('ListaPessoas')}>
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botao} onPress={() => salva()}>
                <Text style={styles.textoBotao}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
      }

    </View >
  );
}

