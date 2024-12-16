import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface ProfileCardProps {
    name: string;
    title: string;
    description: string;
    onMessageClick: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, title, description, onMessageClick }) => {
    return (
        <View style={styles.profileCard}>
            <View style={styles.profilePicture} />
            <Text style={styles.profileName}>{name}</Text>
            <Text style={styles.profileTitle}>{title}</Text>
            <Text style={styles.profileDescription}>{description}</Text>
            <TouchableOpacity style={styles.messageButton} onPress={onMessageClick}>
                <Text style={styles.messageButtonText}>Message</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    profileCard: {
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
    profilePicture: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#d8d8d8',
        alignSelf: 'center',
        marginBottom: 10,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 5,
    },
    profileTitle: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: 10,
        color: '#555',
    },
    profileDescription: {
        fontSize: 14,
        textAlign: 'center',
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

export default ProfileCard;
