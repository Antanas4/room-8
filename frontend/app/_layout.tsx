import React from 'react';
import {Slot} from 'expo-router';
import {AuthProvider} from "@/components/AuthContext";

export default function _layout() {

    return (
        <AuthProvider>
            <Slot />
        </AuthProvider>
    );
}