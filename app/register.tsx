import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import BackButton from '../components/BackButton';
import { router } from "expo-router";

export default function RegisterScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [birthdate, setBirthdate] = useState('');

    const handleLoginRedirect = () => {
        router.push('/login');
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <BackButton />

                    <Text style={styles.title}>ROOM8</Text>

                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="First Name"
                                placeholderTextColor="#A0A3BD"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Last Name"
                                placeholderTextColor="#A0A3BD"
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Phone Number"
                                placeholderTextColor="#A0A3BD"
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#A0A3BD"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Password"
                                placeholderTextColor="#A0A3BD"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Repeat Password"
                                placeholderTextColor="#A0A3BD"
                                secureTextEntry
                                value={repeatPassword}
                                onChangeText={setRepeatPassword}
                            />
                        </View>

                        {/* Birthdate Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Birthdate (MM/DD/YYYY)"
                                placeholderTextColor="#A0A3BD"
                                value={birthdate}
                                onChangeText={setBirthdate}
                                keyboardType="numeric"
                            />
                        </View>

                        <TouchableOpacity style={styles.signUpButton}>
                            <Text style={styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleLoginRedirect}>
                            <Text style={styles.loginLink}>Already have an account? Log in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    form: {
        width: '100%',
        alignItems: 'center',
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
    signUpButton: {
        width: 300,
        height: 46,
        backgroundColor: '#48AABA',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    signUpText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500',
    },
    loginLink: {
        fontSize: 14,
        color: '#488CAA',
        textAlign: 'center',
        marginTop: 20,
    },
});
