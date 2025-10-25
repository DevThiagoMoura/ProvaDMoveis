// screens/LoginScreen.jsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { login } from "../services/api";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {
      const data = await login(username, password);
      Alert.alert("Login bem-sucedido!");
      navigation.navigate("Home", { token: data.token });
    } catch (error) {
      console.error("Erro ao fazer login:", error.response?.data?.error || error.message);
      Alert.alert("Erro", "Credenciais inválidas ou problema de conexão.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.registerButton]}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#F5F5F5" },
  title: { fontSize: 28, fontWeight: "bold", color: "#333", textAlign: "center", marginBottom: 30 },
  input: { height: 50, borderColor: "#DDD", borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: "#FFF" },
  button: { backgroundColor: "#6200EE", paddingVertical: 15, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  registerButton: { backgroundColor: "#03DAC6" },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
