import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from "@expo/vector-icons"; // make sure expo/vector-icons is installed
import { useRouter, Stack } from "expo-router";
import Popup from "../components/popup"; // adjust the path depending on your folder structure


export default function DataScreen() { 
    const router = useRouter();
    const [showModal, setShowModal] = useState(false);
    const [item, setItem] = useState(null);
    const [inventory, setInventory] = useState([
        { id: 1, name: "1.5 White Adhesive (32 ct.)", quantity: 12 },
        { id: 2, name: "1\" White Adhesive (48 ct.)", quantity: 8 },
        { id: 3, name: "2\" White Adhesive (24 ct.)", quantity: 15 },
        { id: 4, name: "3\" White Adhesive (12 ct.)", quantity: 5 },
        { id: 5, name: "1.5 Black Adhesive (32 ct.)", quantity: 10 },
        { id: 6, name: "1\" Black Adhesive (48 ct.)", quantity: 7 },
        { id: 7, name: "2\" Black Adhesive (24 ct.)", quantity: 14 }, 
        { id: 8, name: "3\" Black Adhesive (12 ct.)", quantity: 6 },
        { id: 9, name: "1.5 Clear Adhesive (32 ct.)", quantity: 1100 },  
    ]);

    const increment = (id) => {
        setInventory(prev =>
            prev.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrement = (id) => {
        setInventory(prev =>
            prev.map(item =>
            item.id === id && item.quantity > 0
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
        );
    };

    const handleEditItem = (item) => {
        setItem(item);
        setShowModal(true);
       
    }
    const handleAddItem = () => {
        const newItem = {
            id: inventory.length + 1,
            name: "New Hardcoded Item",
            quantity: 0,
        };
        setInventory(prev => [...prev, newItem]);
    };

    const handleSearch = () => {
        console.log("Search button pressed");
    };

    const handleRefresh = () => {
        console.log("Refresh button pressed");
    };

    const handlePopUpClose = () => {
        setShowModal(false);
        setItem(null);
    }

    const handleSaveItem = (itemData) => {
        // adding new item
        if (itemData.id == -1) {
            setInventory(prev => [...prev, {
                id: prev.length + 1,
                name: itemData.itemName,
                quantity: itemData.quantity
            }]);
        }
        // editing existing item
        else {
            setInventory(prev =>
                prev.map(item =>
                    item.id === itemData.id
                        ? { ...item, name: itemData.itemName, quantity: itemData.quantity }
                        : item
                )
            );
        }
    }

    return (
        <View style={styles.container}>
            {/* Top Row */}
            <Stack.Screen options={{headerShown: false}} />
            <View style={styles.topRow}>    
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <View style={styles.titleContainer}>
                    <Text style={styles.categoryName}>Tape</Text>
                </View>
                
                <View style={styles.topRowButtons}>
                    <TouchableOpacity onPress={handleSearch} style={styles.iconButton}>
                        <Ionicons name="search" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRefresh} style={styles.iconButton}>
                        <Ionicons name="refresh" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            <Popup visible={showModal} onClose={handlePopUpClose} onSave={handleSaveItem}
            initialValues={ item ? {
                id: item.id,
                itemName: item.name,
                quantity: item.quantity,
                minQuantity: 0 // You can adjust this as needed
            } : undefined }
            >
                
                
            </Popup>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {inventory.map((item, index) => (
                    <View key={index} style={styles.dataRowContainer}>
                        <TouchableOpacity onPress={() => handleEditItem(item)}>
                            <Text style={styles.itemName}>{item.name}</Text>
                        </TouchableOpacity>
                        

                        <View style={styles.counterGroup}>
                            <TouchableOpacity onPress={() => decrement(item.id)} style={styles.counterButton}>
                                <Text style={styles.counterText}>-</Text>
                            </TouchableOpacity>     
                            <Text style={styles.counterValue}>{item.quantity}</Text>
                            <TouchableOpacity onPress={() => increment(item.id)} style={styles.counterButton}>
                                <Text style={styles.counterText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
                <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: 70,
        
        width: '100%',
        maxWidth: 600,
        minWidth: 300,
        alignSelf: 'center',
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        position: 'relative'
    },
    titleContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        alignItems: "center",
        pointerEvents: "none", // Allows clicks to pass through
    },
    categoryName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2e86de",
    },
    topRowButtons: {
        flexDirection: "row",
    },
    iconButton: {
        marginLeft: 15,
    },
    backButton: {
        // padding: 5,
    },
    dataRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    itemName: {
        flex: 1,
        fontSize: 16,
    },
    counterGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 120,
        justifyContent: 'space-between',
    },
    counterButton: {
        paddingHorizontal: 10,
    },
    counterText: {
        fontSize: 25,
        fontWeight: "bold",
    },
    counterValue: {
        fontSize: 20,
        // marginHorizontal: 10,
        minWidth: 40,
        textAlign: "center"
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    fab: {
        position: "absolute",
        bottom: 20,
        alignSelf: "center",
        backgroundColor: "#2e86de",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5, // shadow for Android
        shadowColor: "#000", // shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
});
