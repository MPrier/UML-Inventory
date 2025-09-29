import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";


export default function Index() {
  const router = useRouter();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleUsername = (text: string) => {
    setUsername(text);
  };

  const handlePassword = (text: string) => {
    setPassword(text);
  };

  const handleSignIn = () => {
    // Implement sign-in logic here
    console.log('Sign In button pressed');
    router.replace('/home');
  }

  return (
    
    
      <KeyboardAvoidingView behavior="padding" style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={handleUsername}
          value={username}
        />
        <TextInput
          style={styles.input} 
          placeholder="Password"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={handlePassword}
          value={password}
        // value={'Password'}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
    </KeyboardAvoidingView>
    
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    marginBottom: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    width: "50%",
    maxWidth: 300

  },
  button: {
    backgroundColor: '#2e86de',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
    width: "25%",
    maxWidth: 125,
    minWidth: 80
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  link: {
    color: '#2e86de',
    textAlign: 'center',
    marginTop: 10,
  },
});
