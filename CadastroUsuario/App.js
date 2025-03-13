import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Kauê de Souza Silva RA: 081220003
// Marcos Felipe Correa Soares RA: 081220020 (Notebook do Marcos estava com problema então fizemos juntos)

export default function App() {
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const validarCampos = () => {
    const erros = [];

    if (parseInt(codigo) <= 0 || isNaN(parseInt(codigo))) {
      erros.push("Código deve ser maior que 0");
    }

    if (!nome.trim()) {
      erros.push("Nome é obrigatório");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      erros.push("Email inválido");
    }

    if (senha.length < 5) {
      erros.push("Senha deve ter pelo menos 5 caracteres");
    }
    
    if (!/[A-Z]/.test(senha)) {
      erros.push("Senha deve conter pelo menos uma letra maiúscula");
    }

    if (!/\d/.test(senha)) {
      erros.push("Senha deve conter pelo menos um número");
    }

    if (senha !== confirmarSenha) {
      erros.push("Senha e Confirmação não coincidem");
    }

    return erros;
  };

  const limpar = () => {
    setCodigo("");
    setNome("");
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
  };

  const salvar = async () => {
    const erros = validarCampos();
    
    if (erros.length > 0) {
      Alert.alert("Erros de validação", erros.join("\n"));
      return;
    }

    const usuario = {
      codigo: parseInt(codigo),
      nome,
      email,
      senha,
    };

    try {
      await AsyncStorage.setItem("@usuario", JSON.stringify(usuario));
      Alert.alert("Sucesso", "Usuário salvo com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar usuário");
    }
  };

  const carregar = async () => {
    try {
      const usuarioJson = await AsyncStorage.getItem("@usuario");
      
      if (usuarioJson) {
        const usuario = JSON.parse(usuarioJson);
        setCodigo(usuario.codigo.toString());
        setNome(usuario.nome);
        setEmail(usuario.email);
        setSenha(usuario.senha);
        setConfirmarSenha(usuario.senha);
      } else {
        Alert.alert("Aviso", "Nenhum usuário cadastrado");
      }
    } catch (error) {
      Alert.alert("Erro", "Falha ao carregar usuário");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Usuário</Text>

      <View style={styles.formulario}>
        <TextInput
          style={styles.input}
          placeholder="Código"
          keyboardType="numeric"
          value={codigo}
          onChangeText={setCodigo}
        />

        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar Senha"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
      </View>

      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botaoSalvar} onPress={salvar}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoLimpar} onPress={limpar}>
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCarregar} onPress={carregar}>
          <Text style={styles.textoBotao}>Carregar</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  formulario: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  botoes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botaoSalvar: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 5,
  },
  botaoLimpar: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 5,
  },
  botaoCarregar: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    margin: 5,
  },
  textoBotao: {
    color: "white",
    textAlign: "center",
  },
});