import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ChatItemProps {
    chatText: string;
}

const ChatItem: React.FC<ChatItemProps> = ({ chatText }) => {
    return (
        <View style={styles.chatContainer}>
            <Text style={styles.chatText}>{chatText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
    },
    chatText: {
        fontSize: 16,
        color: '#333',
    },
});

export default ChatItem;
