import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import BackButton from '../components/BackButton';

export default function LoginScreen() {
    const [phone_number, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        router.push('/main');
    };

    return (
        <View style={styles.container}>
            {}
            <BackButton />

            <Text style={styles.title}>ROOM8</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#A0A3BD"
                    value={phone_number}
                    onChangeText={setPhoneNumber}
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
