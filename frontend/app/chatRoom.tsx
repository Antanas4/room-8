import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import {useLocalSearchParams} from 'expo-router';

interface Message {
    id: string;
    receiverId:number;
    senderId: number;
    body: string;
}

const ChatRoomScreen: React.FC = () => {
    const { id, recipientId } = useLocalSearchParams() as { id?: string, recipientId?: string };
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/api/chat/${id}/messages`, {
                withCredentials: true,
            })
                .then((response) => {
                    setMessages(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("There was an error fetching the messages!", error);
                    setLoading(false);
                });
        }
    }, [id]);

    const sendMessage = async () => {
        if (newMessage.trim()) {
            const messageRequestDto = {
                receiverId: Number (recipientId),
                body: newMessage,
                chatRoomId: Number(id),
            };
            try{
                await axios.post(`http://localhost:8080/api/message/sendMessage`, messageRequestDto, { withCredentials: true })
                const newMessageData = await axios.get(`http://localhost:8080/api/chat/${id}/messages`, {
                    withCredentials: true,
                })
                setMessages(newMessageData.data);
            } catch (error){
                console.error(error);
            }

            // const response = axios.post(`http://localhost:8080/api/message/sendMessage`, messageRequestDto, { withCredentials: true })
            //     .then((response) => {
            //         setMessages([...messages, response.data]);
            //         setNewMessage('');
            //     })
            //     .catch((error) => {
            //         console.log("Data: ", messageRequestDto);
            //         console.error("There was an error sending the message:", error.message);
            //         if (error.response) {
            //             console.error("Server responded with:", error.response);
            //         } else if (error.request) {
            //             console.error("Request was made but no response received:", error.request);
            //         } else {
            //             console.error("Error message:", error.message);
            //         }
            //     });
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading messages...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chat with {recipientId}</Text>

            <ScrollView contentContainerStyle={styles.messagesContainer}>
                {messages.length === 0 ? (
                    <Text style={styles.noMessages}>No messages yet.</Text>
                ) : (
                    messages.map((message) => (
                        <View key={message.id} style={styles.messageCard}>
                            <Text style={styles.messageSender}>Sender {message.senderId}:</Text>
                            <Text style={styles.messageSender}>Receiver {message.receiverId}:</Text>
                            <Text style={styles.messageContent}>{message.body}</Text>
                        </View>
                    ))
                )}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message"
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#48AABA',
        marginBottom: 20,
        textAlign: 'center',
    },
    messagesContainer: {
        flexGrow: 1,
        marginBottom: 20,
    },
    messageCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    messageSender: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 5,
    },
    messageContent: {
        fontSize: 16,
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#48AABA',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
    },
    sendButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noMessages: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});

export default ChatRoomScreen;
