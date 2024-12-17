import React, { useEffect, useState } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

interface Chat {
    id: string;
    recipientId: number;
}

const ChatsScreen = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8080/api/chat/getUsersChats', {
            withCredentials:true
        })
            .then((response) => {
                setChats(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("There was an error fetching the chats!", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading chats...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Chats</Text>

            {chats.length === 0 ? (
                <Text style={styles.noChats}>No chats available.</Text>
            ) : (
                chats.map((chat) => (
                    <View key={chat.id} style={styles.chatCard}>
                        <Text style={styles.chatName}>
                            Chat with {chat.recipientId}
                        </Text>
                        <TouchableOpacity style={styles.messageButton}>
                            <Text style={styles.messageButtonText}>View</Text>
                        </TouchableOpacity>
                    </View>
                ))
            )}
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noChats: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});

export default ChatsScreen;
