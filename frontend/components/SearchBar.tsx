import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ searchText, setSearchText, handleSearchClick }) => {
    return (
        <View style={styles.searchBarContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                placeholderTextColor="#A0A3BD"
                value={searchText}
                onChangeText={setSearchText}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearchClick}>
                <Ionicons name="search" size={24} color="#A0A3BD" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
    },
    searchInput: {
        height: 40,
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#D9DBE9',
        borderRadius: 8,
        paddingLeft: 10,
        fontSize: 14,
        color: '#000',
    },
    searchButton: {
        padding: 8,
    },
});

export default SearchBar;
