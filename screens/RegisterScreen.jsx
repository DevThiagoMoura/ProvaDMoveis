// screens/RegisterScreen.jsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { register } from "../services/api";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    try {
      await register(username, password);
      Alert.alert("Sucesso", "Usuário registrado com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro ao registrar:", error.response?.data?.error || error.message);
      Alert.alert("Erro", "Não foi possível registrar o usuário.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#F5F5F5" },
  title: { fontSize: 28, fontWeight: "bold", color: "#333", textAlign: "center", marginBottom: 30 },
  input: { height: 50, borderColor: "#DDD", borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, backgroundColor: "#FFF" },
  button: { backgroundColor: "#4CAF50", paddingVertical: 15, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  loginButton: { backgroundColor: "#2196F3" },
  buttonText: { color: "#FFF", fontSize: 16, fontWeight: "bold" },
});
