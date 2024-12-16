import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NotificationItemProps {
    notificationText: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notificationText }) => {
    return (
        <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>{notificationText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    notificationContainer: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
    },
    notificationText: {
        fontSize: 16,
        color: '#333',
    },
});

export default NotificationItem;
