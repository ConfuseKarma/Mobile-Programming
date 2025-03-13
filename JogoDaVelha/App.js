import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const tabuleiroInicial = Array(9).fill(null);

export default function App() {
  const [tabuleiro, setTabuleiro] = useState(tabuleiroInicial);
  const [jogadorAtual, setJogadorAtual] = useState("X");
  const [vencedor, setVencedor] = useState(null);

  const handlePress = (indice) => {
    if (tabuleiro[indice] || vencedor) return;
    const novoTabuleiro = [...tabuleiro];
    novoTabuleiro[indice] = jogadorAtual;
    setTabuleiro(novoTabuleiro);
    verificarVencedor(novoTabuleiro);
    setJogadorAtual(jogadorAtual === "X" ? "O" : "X");
  };

  const verificarVencedor = (tabuleiro) => {
    const combinacoesVencedoras = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    for (let combinacao of combinacoesVencedoras) {
      const [a, b, c] = combinacao;
      if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
        setVencedor(tabuleiro[a]);
        return;
      }
    }
    if (!tabuleiro.includes(null)) {
      setVencedor("Empate");
    }
  };

  const reiniciarJogo = () => {
    setTabuleiro(tabuleiroInicial);
    setJogadorAtual("X");
    setVencedor(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textoTurno}>{vencedor ? (vencedor === "Empate" ? "Empate!" : `Vencedor: ${vencedor}`) : `Turno: ${jogadorAtual}`}</Text>
      <View style={styles.tabuleiro}>
        {tabuleiro.map((celula, indice) => (
          <TouchableOpacity key={indice} style={styles.celula} onPress={() => handlePress(indice)}>
            <Text style={styles.textoCelula}>{celula}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {vencedor && <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciarJogo}>
        <Text style={styles.textoReiniciar}>Novo Jogo</Text>
      </TouchableOpacity>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  textoTurno: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  tabuleiro: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
  },
  celula: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#000",
  },
  textoCelula: {
    fontSize: 36,
    fontWeight: "bold",
  },
  botaoReiniciar: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  textoReiniciar: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
