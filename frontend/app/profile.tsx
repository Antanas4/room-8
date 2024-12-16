import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TextInput,
    TouchableOpacity,
    Switch,
    ScrollView,
    Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
    const [isPersonalModalVisible, setPersonalModalVisible] = useState(false);
    const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
    const [isNotificationsModalVisible, setNotificationsModalVisible] = useState(false);

    const [personalInfo, setPersonalInfo] = useState({ email: '', phone: '', password: '' });
    const [paymentInfo, setPaymentInfo] = useState({ cardType: '', cardNumber: '', expiryDate: '', cvv: '' });
    const [notifications, setNotifications] = useState({ email: false, push: false });

    // Handle modal toggling
    const handleEdit = (section, value) => {
        if (section === 'personal') setPersonalInfo(value);
        else if (section === 'payment') setPaymentInfo(value);
        else if (section === 'notifications') setNotifications(value);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Profile Title */}
                <Text style={styles.profileTitle}>Profile</Text>

                {/* Profile Header with Picture */}
                <View style={styles.profileHeader}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/150' }} // Placeholder image
                        style={styles.profilePicture}
                    />
                    <Text style={styles.profileName}>Gustas Antanas</Text>
                </View>

                {/* Buttons for Each Section */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setPersonalModalVisible(true)}
                >
                    <Text style={styles.buttonText}>Personal Information</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setPaymentModalVisible(true)}
                >
                    <Text style={styles.buttonText}>Payment Information</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setNotificationsModalVisible(true)}
                >
                    <Text style={styles.buttonText}>Notifications</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Personal Information Modal */}
            <Modal
                visible={isPersonalModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setPersonalModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Personal Information</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Email"
                            value={personalInfo.email}
                            onChangeText={(text) => setPersonalInfo({ ...personalInfo, email: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Phone"
                            value={personalInfo.phone}
                            onChangeText={(text) => setPersonalInfo({ ...personalInfo, phone: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="New Password"
                            secureTextEntry
                            value={personalInfo.password}
                            onChangeText={(text) => setPersonalInfo({ ...personalInfo, password: text })}
                        />
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => {
                                setPersonalModalVisible(false);
                                handleEdit('personal', personalInfo);
                            }}
                        >
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Payment Information Modal */}
            <Modal
                visible={isPaymentModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setPaymentModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Payment Information</Text>
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Card Type (Visa/Mastercard)"
                            value={paymentInfo.cardType}
                            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cardType: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Card Number"
                            keyboardType="numeric"
                            value={paymentInfo.cardNumber}
                            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cardNumber: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="Expiry Date (MM/YY)"
                            value={paymentInfo.expiryDate}
                            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, expiryDate: text })}
                        />
                        <TextInput
                            style={styles.modalInput}
                            placeholder="CVV"
                            secureTextEntry
                            value={paymentInfo.cvv}
                            onChangeText={(text) => setPaymentInfo({ ...paymentInfo, cvv: text })}
                        />
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => {
                                setPaymentModalVisible(false);
                                handleEdit('payment', paymentInfo);
                            }}
                        >
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Notifications Modal */}
            <Modal
                visible={isNotificationsModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setNotificationsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Edit Notifications</Text>
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Email Notifications</Text>
                            <Switch
                                value={notifications.email}
                                onValueChange={(value) => setNotifications({ ...notifications, email: value })}
                            />
                        </View>
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Push Notifications</Text>
                            <Switch
                                value={notifications.push}
                                onValueChange={(value) => setNotifications({ ...notifications, push: value })}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={() => {
                                setNotificationsModalVisible(false);
                                handleEdit('notifications', notifications);
                            }}
                        >
                            <Text style={styles.saveText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    scrollContainer: {
        paddingVertical: 20,
    },
    profileTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#48AABA',
        marginBottom: 20,
        textAlign: 'center',
    },
    profileHeader: {
        alignItems: 'center',
        marginBottom: 30,
    },
    profilePicture: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    button: {
        backgroundColor: '#48AABA',
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#48AABA',
        marginBottom: 20,
    },
    modalInput: {
        width: '100%',
        height: 40,
        borderColor: '#D9DBE9',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        paddingLeft: 10,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    switchLabel: {
        fontSize: 16,
    },
    saveButton: {
        backgroundColor: '#48AABA',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    saveText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ProfileScreen;
