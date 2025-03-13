import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const colors = ['#0D1B2A', '#1B263B', '#415A77', '#778DA9', '#E0E1DD'];
  const [backgroundColorIndex, setBackgroundColorIndex] = useState(0);

  const [valor1, setValor1] = useState('');
  const [valor2, setValor2] = useState('');
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const calcular = (operacao) => {
    const num1 = parseFloat(valor1) || 0;
    const num2 = parseFloat(valor2) || 0;
    let res = 0;

    switch (operacao) {
      case 'soma':
        res = num1 + num2;
        break;
      case 'subtracao':
        res = num1 - num2;
        break;
      case 'multiplicacao':
        res = num1 * num2;
        break;
      case 'divisao':
        if (num2 === 0) {
          Alert.alert('Erro', 'Divisão por zero não é permitida.');
          return;
        }
        res = num1 / num2;
        break;
      case 'exponenciacao':
        res = Math.pow(num1, num2);
        break;
      default:
        res = 'Operação inválida';
    }
    setResultado(res);
  };

  const limparCampos = () => {
    setValor1('');
    setValor2('');
    setResultado(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors[backgroundColorIndex] }]}>      
      <View style={styles.uiContainer}>
        <Text style={styles.titulo}>Calculadora Suprema</Text>

        <Text style={styles.label}>Primeiro Número</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={valor1}
          onChangeText={setValor1}
          placeholder="Digite aqui"
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Segundo Número</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={valor2}
          onChangeText={setValor2}
          placeholder="Digite aqui"
          placeholderTextColor="#aaa"
        />

        <View style={styles.botoesContainer}>
          <TouchableOpacity onPress={() => calcular('soma')} style={styles.botao}><Text style={styles.textoBotao}>➕ Soma</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => calcular('subtracao')} style={styles.botao}><Text style={styles.textoBotao}>➖ Subtração</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => calcular('multiplicacao')} style={styles.botao}><Text style={styles.textoBotao}>✖️ Multiplicação</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => calcular('divisao')} style={styles.botao}><Text style={styles.textoBotao}>➗ Divisão</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => calcular('exponenciacao')} style={styles.botao}><Text style={styles.textoBotao}>⚡ Exponencial</Text></TouchableOpacity>
        </View>

        {resultado !== null && <Text style={styles.resultado}>Resultado: {resultado}</Text>}

        <TouchableOpacity onPress={limparCampos} style={[styles.botao, styles.botaoLimpar]}>
          <Text style={styles.textoBotao}>🗑️ LIMPAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uiContainer: {
    alignItems: 'center',
    width: '85%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 30,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E0E1DD',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E0E1DD',
    marginTop: 15,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1B263B',
    color: '#E0E1DD',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginTop: 5,
    borderColor: '#415A77',
    borderWidth: 2,
  },
  botoesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  botao: {
    backgroundColor: '#415A77',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    margin: 5,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#E0E1DD',
  },
  botaoLimpar: {
    backgroundColor: '#ff4d4d',
    marginTop: 20,
  },
  textoBotao: {
    color: '#E0E1DD',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultado: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E0E1DD',
    marginTop: 30,
    textAlign: 'center',
  },
});
