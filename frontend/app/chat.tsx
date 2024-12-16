import React from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';

const ChatsScreen = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Chats</Text>

            {/* Example chat items */}
            {Array.from({ length: 10 }, (_, i) => (
                <View key={i} style={styles.chatCard}>
                    <Text style={styles.chatName}>Chat {i + 1}</Text>
                    <Text style={styles.chatDescription}>
                        This is a description of chat {i + 1}. You can add more details here.
                    </Text>
                    <TouchableOpacity style={styles.messageButton}>
                        <Text style={styles.messageButtonText}>View</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#48AABA',
        marginBottom: 20,
        textAlign: 'center',
    },
    chatCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    chatName: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 5,
    },
    chatDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 15,
    },
    messageButton: {
        backgroundColor: '#48AABA',
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
    messageButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default ChatsScreen;
