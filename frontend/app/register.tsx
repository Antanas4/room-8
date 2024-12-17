import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import BackButton from '../components/BackButton';
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import {Picker} from "@react-native-picker/picker";
import {useAuth} from "@/components/AuthContext";

export default function RegisterScreen() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const { signup } = useAuth();
    const [error, setError] = useState<string | null>(null);

    const handleLoginRedirect = () => {
        router.push('/login');
    };

    const handleSignUp = async () => {
        setError(null);
        try {
            console.log('Sending data:', { firstName, lastName, phoneNumber, username, password, dateOfBirth, gender });
            await signup(firstName, lastName, phoneNumber, username,
                password, dateOfBirth, gender);
        } catch (e) {
            setError('Something went wrong');
        }

    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <BackButton />

                    <Text style={styles.title}>ROOM8</Text>

                    {error && <Text style={styles.error}>{error}</Text>}

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
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType="phone-pad"
                            />
                        </View>

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
                                placeholderTextColor="#A0A3BD"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        {/* Birthdate Input */}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Birthdate (MM/DD/YYYY)"
                                placeholderTextColor="#A0A3BD"
                                value={dateOfBirth}
                                onChangeText={setDateOfBirth}
                                keyboardType="numeric"
                            />
                        </View>

                        {/* Gender Picker */}
                        <View style={styles.inputContainer}>
                            <Picker
                                selectedValue={gender}
                                onValueChange={(itemValue) => setGender(itemValue)}
                                style={styles.input}
                            >
                                <Picker.Item label="Select Gender" value="" />
                                <Picker.Item label="Male" value="MALE" />
                                <Picker.Item label="Female" value="FEMALE" />
                            </Picker>
                        </View>

                        <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
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
    error: {
        color: 'red',
        marginBottom: 10,
    },
    loginLink: {
        fontSize: 14,
        color: '#488CAA',
        textAlign: 'center',
        marginTop: 20,
    }
});
