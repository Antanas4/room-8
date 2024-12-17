import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import ProfileCard from '../components/ProfileCard';
import SearchBar from '../components/SearchBar';

export default function HomeScreen() {
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false); // Track loading state

    useEffect(() => {
        // Fetch all listings initially when the component mounts
        fetchListings();
    }, []);

    const fetchListings = async (searchQuery = '') => {
        try {
            setLoading(true);
            const url = searchQuery
                ? `http://localhost:8080/api/listing/${searchQuery}`  // Fetch search results
                : 'http://localhost:8080/api/listing/all';            // Fetch all listings
            const response = await axios.get(url, { withCredentials: true });
            setListings(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching listings:', error);
            setLoading(false);
        }
    };

    const handleSearchClick = () => {
        console.log('Searching for:', searchText);
        fetchListings(searchText);  // Fetch filtered listings based on search text
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <Text style={styles.title}>ROOM8</Text>
            </View>

            {/* Search Bar */}
            <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
                handleSearchClick={handleSearchClick}
            />

            {/* Listings */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : listings.length > 0 ? (
                    listings.map((item, index) => (
                        <ProfileCard
                            key={index}
                            name={item.username}
                            title={item.title}
                            description={item.text}
                            onMessageClick={toggleModal}
                        />
                    ))
                ) : (
                    <Text style={styles.noListingsText}>No listings available</Text>
                )}
            </ScrollView>

            {/* Modal */}
            {isModalVisible && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            For just €0.99, you can unlock this user’s details. Want to continue?
                        </Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.unlockButton} onPress={toggleModal}>
                                <Text style={styles.buttonText}>Unlock</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        paddingBottom: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#48AABA',
    },
    scrollContainer: {
        flexGrow: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: 300,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        backgroundColor: '#ccc',
        paddingVertical: 10,
        borderRadius: 5,
        width: 120,
        alignItems: 'center',
    },
    unlockButton: {
        backgroundColor: '#48AABA',
        paddingVertical: 10,
        borderRadius: 5,
        width: 120,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    noListingsText: {
        textAlign: 'center',
        marginTop: 20,
    },
});
