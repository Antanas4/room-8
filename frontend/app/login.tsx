import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import BackButton from '../components/BackButton';
import {useAuth} from "@/components/AuthContext";

export default function LoginScreen() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        setError(null); // Clear previous errors
        try {
            await login(username, password);
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <View style={styles.container}>
            <BackButton />

            <Text style={styles.title}>ROOM8</Text>

            {error && <Text style={styles.error}>{error}</Text>}

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor="#A0A3BD"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor="#A0A3BD"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 48,
        fontWeight: '600',
        color: '#48AABA',
        marginBottom: 40,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    inputContainer: {
        width: 300,
        height: 40,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D9DBE9',
        borderRadius: 8,
        paddingLeft: 15,
        fontSize: 14,
        color: '#000',
    },
    loginButton: {
        width: 300,
        height: 46,
        backgroundColor: '#48AABA',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    loginText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
});
