/**
 * Jogo da Forca - React Native
 * 
 * Autores:
 * Kauê de Souza Silva, RA: 081220003
 * Marcos Felipe Correa Soares, RA: 081220020
 */

/**
 * Lógica do Código:
 * 
 * O jogo utiliza estados React para gerenciar o progresso. Uma palavra e dica são sorteadas
 * de um vetor garantindo não repetições. Letras tentadas são armazenadas em um array, enquanto
 * os erros controlam o desenho da forca. Dois useEffect verificam vitória (todas letras únicas
 * acertadas) e derrota (6 erros). O teclado é gerado dinamicamente e a palavra é exibida com
 * underscores. Ao final, o jogador pode reiniciar com nova palavra.
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Vetor de palavras e dicas
const wordsList = [
  { word: 'BANANA', hint: 'Fruta amarela e alongada' },
  { word: 'ELEFANTE', hint: 'Animal de grande porte com tromba' },
  { word: 'COMPUTADOR', hint: 'Máquina usada para processar dados' },
  { word: 'CRIPTOGRAFIA', hint: 'Técnica de segurança digital' },
  { word: 'FOTOSSINTESE', hint: 'Processo biológico em plantas' },
  { word: 'PARALELEPIPEDO', hint: 'Forma geométrica tridimensional' },
  { word: 'NEUROCIENCIA', hint: 'Estudo do sistema nervoso' },
  { word: 'CACHORRO', hint: 'Animal de estimação que late' },
  { word: 'BICICLETA', hint: 'Veículo de duas rodas movido a pedal' },
  { word: 'CHOCOLATE', hint: 'Doce feito de cacau' },
  { word: 'JANELA', hint: 'Abertura em paredes para entrada de luz' },
  { word: 'PRAIA', hint: 'Área de areia junto ao mar' },
  { word: 'MERCADO', hint: 'Estabelecimento de compras' },
  { word: 'ANTARTIDA', hint: 'Continente gelado no extremo sul' },
  { word: 'RENASCIMENTO', hint: 'Período histórico e cultural' },
  { word: 'MINOTAURO', hint: 'Criatura mitológica grega' },
  { word: 'BIODIVERSIDADE', hint: 'Variedade de vida no planeta' },
  { word: 'ONOMATOPEIA', hint: 'Recurso linguístico de imitação sonora' },
  { word: 'CROMOSSOMO', hint: 'Estrutura que carrega genes' },
  { word: 'FENOMENO', hint: 'Ocorrência observável' },
  { word: 'ESTRATOSFERA', hint: 'Camada da atmosfera terrestre' },
  { word: 'ARQUEOLOGIA', hint: 'Ciência que estuda civilizações antigas' },
  { word: 'PALEOLITICO', hint: 'Período pré-histórico' },
  { word: 'ANTROPOCENTRISMO', hint: 'Conceito filosófico sobre humanidade' },
  { word: 'BOLACHA', hint: 'Alimento crocante e seco' },
  { word: 'GUITARRA', hint: 'Instrumento musical de cordas' }
];

export default function App() {
  // Estados do jogo
  const [currentWord, setCurrentWord] = useState(''); // Palavra atual
  const [hint, setHint] = useState(''); // Dica correspondente
  const [guessedLetters, setGuessedLetters] = useState([]); // Letras tentadas
  const [errors, setErrors] = useState(0); // Contador de erros
  const [gameStatus, setGameStatus] = useState('playing'); // Estado: playing/won/lost
  const [lastWordIndex, setLastWordIndex] = useState(-1); // Índice da última palavra

  // Sorteia nova palavra sem repetição
  const getNewWord = () => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * wordsList.length);
    } while (newIndex === lastWordIndex);
    
    setCurrentWord(wordsList[newIndex].word.toUpperCase());
    setHint(wordsList[newIndex].hint);
    setLastWordIndex(newIndex);
  };

  // Inicializa o jogo
  useEffect(() => {
    getNewWord();
  }, []);

  // Verifica condições de vitória/derrota
  useEffect(() => {
  // Só verifica se há uma palavra válida
  if (currentWord) {
    const uniqueLetters = [...new Set(currentWord.split(''))];
    if (uniqueLetters.every(letter => guessedLetters.includes(letter))) {
      setGameStatus('won');
    }
    if (errors >= 6) {
      setGameStatus('lost');
    }
  }
}, [guessedLetters, errors, currentWord]);

  // Processa tentativa de letra
  const handleGuess = (letter) => {
    if (gameStatus !== 'playing') return;
    
    setGuessedLetters([...guessedLetters, letter]);
    
    if (!currentWord.includes(letter)) {
      setErrors(e => e + 1);
    }
  };

  // Reinicia todos os estados do jogo
  const restartGame = () => {
    getNewWord();
    setGuessedLetters([]);
    setErrors(0);
    setGameStatus('playing');
  };

  // Componente da forca com partes progressivas
  const Hangman = ({ errors }) => (
    <View style={styles.hangman}>
      {/* Estrutura fixa da forca */}
      <View style={styles.base} />
      <View style={styles.vertical} />
      <View style={styles.horizontal} />
      <View style={styles.rope} />

      {/* Partes do corpo por erro */}
      {errors >= 1 && <View style={styles.head} />}
      {errors >= 2 && <View style={styles.body} />}
      {errors >= 3 && <View style={styles.leftArm} />}
      {errors >= 4 && <View style={styles.rightArm} />}
      {errors >= 5 && <View style={styles.leftLeg} />}
      {errors >= 6 && <View style={styles.rightLeg} />}
    </View>
  );

  // Componente de exibição da palavra
  const WordDisplay = ({ word, guessedLetters }) => (
    <View style={styles.wordContainer}>
      {word.split('').map((letter, index) => (
        <Text key={index} style={styles.letter}>
          {guessedLetters.includes(letter) ? letter : '_'}
        </Text>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jogo da Forca</Text>
      
      <Text style={styles.hint}>Dica: {hint}</Text>
      
      <Hangman errors={errors} />
      
      <WordDisplay 
        word={currentWord} 
        guessedLetters={guessedLetters} 
      />
      
      <View style={styles.keyboard}>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((letter) => (
          <TouchableOpacity
            key={letter}
            style={[
              styles.key,
              guessedLetters.includes(letter) && styles.guessedKey
            ]}
            onPress={() => handleGuess(letter)}
            disabled={guessedLetters.includes(letter)}
          >
            <Text style={styles.keyText}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {gameStatus !== 'playing' && (
        <View style={styles.result}>
          <Text style={styles.resultText}>
            {gameStatus === 'won' ? 'Vitória!' : 'Game Over!'}
          </Text>
          <Text>Palavra: {currentWord}</Text>
          <TouchableOpacity 
            style={styles.restartButton} 
            onPress={restartGame}
          >
            <Text style={styles.buttonText}>Novo Jogo</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// Estilização dos componentes
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333'
  },
  hint: {
    fontSize: 16,
    marginBottom: 15,
    color: '#666',
    fontStyle: 'italic'
  },
  hangman: {
    width: 200,
    height: 250,
    marginBottom: 25,
    position: 'relative'
  },
  base: {
    position: 'absolute',
    bottom: 0,
    left: 50,
    width: 100,
    height: 4,
    backgroundColor: '#444'
  },
  vertical: {
    position: 'absolute',
    left: 75,
    width: 4,
    height: 200,
    backgroundColor: '#444'
  },
  horizontal: {
    position: 'absolute',
    top: 0,
    left: 75,
    width: 80,
    height: 4,
    backgroundColor: '#444'
  },
  rope: {
    position: 'absolute',
    top: 40,
    left: 150,
    width: 3,
    height: 30,
    backgroundColor: '#444'
  },
  head: {
    position: 'absolute',
    top: 70,
    left: 135,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#222'
  },
  body: {
    position: 'absolute',
    top: 100,
    left: 150,
    width: 4,
    height: 60,
    backgroundColor: '#222'
  },
  leftArm: {
    position: 'absolute',
    top: 110,
    left: 130,
    width: 4,
    height: 35,
    backgroundColor: '#222',
    transform: [{ rotate: '-45deg' }]
  },
  rightArm: {
    position: 'absolute',
    top: 110,
    left: 170,
    width: 4,
    height: 35,
    backgroundColor: '#222',
    transform: [{ rotate: '45deg' }]
  },
  leftLeg: {
    position: 'absolute',
    top: 155,
    left: 140,
    width: 4,
    height: 45,
    backgroundColor: '#222',
    transform: [{ rotate: '60deg' }]
  },
  rightLeg: {
    position: 'absolute',
    top: 155,
    left: 160,
    width: 4,
    height: 45,
    backgroundColor: '#222',
    transform: [{ rotate: '-60deg' }]
  },
  wordContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  letter: {
    fontSize: 28,
    margin: 4,
    fontWeight: '600',
    color: '#444',
    minWidth: 20,
    textAlign: 'center'
  },
  keyboard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    paddingHorizontal: 10
  },
  key: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 3,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    elevation: 2
  },
  guessedKey: {
    backgroundColor: '#a0a0a0',
    opacity: 0.6
  },
  keyText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#444'
  },
  result: {
    alignItems: 'center',
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 10,
    elevation: 3
  },
  resultText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50'
  },
  restartButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#27ae60',
    borderRadius: 25,
    elevation: 3
  },
  buttonText: {
    color: 'white',
    fontWeight: '600'
  }
});
