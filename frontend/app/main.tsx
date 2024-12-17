import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './home';
import NotificationsScreen from './notification';
import ChatsScreen from './chat';
import ProfileScreen from './profile';
import { useAuth } from '../components/AuthContext';

const Tab = createBottomTabNavigator();

export default function MainScreen() {
    const { logout } = useAuth();

    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'home';
                        } else if (route.name === 'Notifications') {
                            iconName = 'notifications';
                        } else if (route.name === 'Chats') {
                            iconName = 'chatbubbles';
                        } else if (route.name === 'Profile') {
                            iconName = 'person';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Notifications" component={NotificationsScreen} />
                <Tab.Screen name="Chats" component={ChatsScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    logoutButton: {
        backgroundColor: '#FF3B30',
        padding: 10, // Reduced padding
        borderRadius: 8,
        alignItems: 'center',
        margin: 10, // Reduced margin
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 14, // Reduced font size
    },
});