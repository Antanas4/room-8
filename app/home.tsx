import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProfileCard from '../components/ProfileCard';

export default function HomeScreen() {
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>ROOM8</Text>
                </View>
            </View>

            {/* Profile Cards */}
            <ProfileCard
                name="Gustas Antanas"
                title="Ieškau kambarioko Vilniuje"
                description="Aš esu 3 kurso studentas, norėčiau susirasti kambarioką Vilniuje."
            />
            <ProfileCard
                name="Angelina Jolie"
                title="Ieškau kambarioko Vilniuje"
                description="Aš esu 3 kurso studentas, norėčiau susirasti kambarioką Vilniuje."
            />
            <ProfileCard
                name="Tyrion Lannister"
                title="Ieškau kambarioko Vilniuje"
                description="Aš esu 3 kurso studentas, norėčiau susirasti kambarioką Vilniuje."
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#48AABA',
    },
});
