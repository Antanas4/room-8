import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileCard from '../components/ProfileCard';
import SearchBar from '../components/SearchBar';

export default function HomeScreen() {
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleFilter = () => {
        setIsFilterVisible(!isFilterVisible);
    };

    const filterOptions = [
        'City',
        'Gender',
    ];

    const handleSearchClick = () => {
        console.log('Searching for:', searchText);
    };

    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>ROOM8</Text>
            </View>

            <SearchBar
                searchText={searchText}
                setSearchText={setSearchText}
                handleSearchClick={handleSearchClick}
                toggleFilter={toggleFilter}
            />

            {isFilterVisible && (
                <View style={styles.filterOptionsContainer}>
                    <FlatList
                        data={filterOptions}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.filterOption}>
                                <Text style={styles.filterText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            )}

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <ProfileCard
                    name="Gustas Antanas"
                    title="Ieškau kambarioko Vilniuje"
                    description="Aš esu 3 kurso studentas, norėčiau susirasti kambarioką Vilniuje."
                    onMessageClick={toggleModal}
                />
                <ProfileCard
                    name="Angelina Jolie"
                    title="Ieškau kambarioko Vilniuje"
                    description="Aš esu 3 kurso studentas, norėčiau susirasti kambarioką Vilniuje."
                    onMessageClick={toggleModal}
                />
                <ProfileCard
                    name="Tyrion Lannister"
                    title="Ieškau kambarioko Vilniuje"
                    description="Aš esu 3 kurso studentas, norėčiau susirasti kambarioką Vilniuje."
                    onMessageClick={toggleModal}
                />
            </ScrollView>

            {isModalVisible && (
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            For just €0.99, you can unlock this user’s details. Want to continue?
                        </Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={toggleModal}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.unlockButton}
                                onPress={toggleModal}
                            >
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
    filterOptionsContainer: {
        backgroundColor: '#f9f9f9',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    filterOption: {
        paddingVertical: 10,
    },
    filterText: {
        fontSize: 16,
        color: '#333',
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
});
