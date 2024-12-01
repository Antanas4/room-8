import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function BackButton() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <TouchableOpacity style={styles.backContainer} onPress={handleBack}>
            <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backContainer: {
        position: 'absolute',
        top: -20,
        left: 10,
        padding: 10,
    },
    backIcon: {
        fontSize: 50,
        color: '#48AABA',
        fontWeight: '600',
    },
});
