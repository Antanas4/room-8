import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ROOM8</Text>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
                <Text style={styles.buttonText}>Go to Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/register')}>
                <Text style={styles.buttonText}>Go to Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 48,
        fontWeight: '600',
        color: '#48AABA',
        marginBottom: 40,
    },
    button: {
        width: 300,
        height: 46,
        backgroundColor: '#48AABA',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
});
