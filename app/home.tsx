import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter, Stack } from "expo-router";
import { Dropdown } from 'react-native-element-dropdown';

export default function HomeScreen() {
    const router = useRouter();
    const [expanded, setExpanded] = useState({ type: null, category: null });
    const [activeTab, setActiveTab] = useState("Training Room"); // default tab
    const [selectedBuilding, setSelectedBuilding] = useState(null);
    const lowItems = {
        Tape: ["White Tape", "Elastic Tape"],
        Hydration: ["Water Bottles", "Electrolyte Mix", "Ice Bags", "Cups"],
    }

    const lastUpdated = {
        Tape: "4:32pm 6/12/24",
        Hydration: "9:10am 5/22/24",
    };

    const trainingRoomCategories = [
    {
      name: "Tape",
      lowItems: ["White Tape", "Elastic Tape"],
      lastUpdated: "2024-06-12T16:32:00", // ISO date string
    },
    {
      name: "Compression",
      lowItems: [],
      lastUpdated: "2024-05-22T13:15:00",
    },
    {
      name: "Medication",
      lowItems: [],
      lastUpdated: "2024-05-22T13:25:00",
    },
    {
      name: "Hydration",
      lowItems: ["Water Bottles", "Electrolyte Mix", "Ice Bags", "Cups"],
      lastUpdated: "2024-05-22T09:10:00",
    },
    {
      name: "Blood / Wound Care",
      lowItems: [],
      lastUpdated: "2024-05-29T12:15:00",
    },
    {
      name: "Extra Tape",
      lowItems: ['Sticky stuff', 'More sticky stuff'],
      lastUpdated: "2024-08-04T15:08:00",
    },
    {
      name: "Other",
      lowItems: ['Poop', 'More poop', 'Even more poop'],
      lastUpdated: "2024-08-04T15:08:00",
    },
    {
      name: "Tests",
      lowItems: ['test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10'],
      lastUpdated: "2024-08-04T15:08:00",
    },
    
  ];

    const storageRoomCategories = [
        {
        name: "Boxes O' Tape",
        lowItems: ["White Tape", "Elastic Tape", "Red Tape", "Blue Tape", "Green Tape", "Yellow Tape"],
        lastUpdated: "2024-06-12T16:32:00", // ISO date string
        },
        {
        name: "Compression",
        lowItems: [],
        lastUpdated: "2024-05-22T13:15:00",
        },
        {
        name: "Braces etc",
        lowItems: [],
        lastUpdated: "2024-05-22T13:25:00",
        },
        {
        name: "Felt/Foam Padding",
        lowItems: ['Heel Lifts', 'Cushioning Pads'],
        lastUpdated: "2024-05-22T09:10:00",
        },
    ];

    const dropDownData = [
        { label: 'Kennedy', value: '1' },
        { label: 'Mahoney', value: '2' },
        { label: 'LeLacheur', value: '3' },
        { label: 'Tsongas', value: '4' },
    ];
    
    const categories = activeTab === "Training Room" ? trainingRoomCategories : storageRoomCategories;

    const toggleExpand = (type, category) => {
        setExpanded((prev) =>
            prev.type === type && prev.category === category
                ? { type: null, category: null }
                : { type, category }
        );
    };

    const formatUpdatedShort = (dateString: string | number | Date) => {
        const d = new Date(dateString);
        return `${d.getMonth() + 1}/${d.getDate()}`; // MM/DD (no year)
    };

    const formatUpdatedFull = (dateString) => {
        const d = new Date(dateString);
        const time = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        const date = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear().toString().slice(-2)}`;
        return `${time} ${date}`;
    };

    const handleButtonPress = () => {
        router.push({
            pathname: '/data',
            // params: { category: name }
        });
    }
	return (
        <View style={styles.fullScreen}>
            <Stack.Screen options={{headerShown: false}} />
            
            {/* Tabs */}
            
            {selectedBuilding === '1' ? (<View style={styles.tabRow}>
                
                    {["Training Room", "Storage Room"].map((tab) => (
                        <TouchableOpacity 
                            key={tab} 
                            style={[styles.tab, activeTab === tab && styles.activeTab]} 
                            onPress={() => {
                                setActiveTab(tab);
                                setExpanded({type: null, category: null})
                                // setOpenWarningIndex(null);
                                // setOpenUpdatedIndex(null);
                            }}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            ) : null}       
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
            
                {expanded.type && (
                    <TouchableWithoutFeedback onPress={() => setExpanded({type: null, category: null})}>
                        <View style={styles.backdrop} />
                    </TouchableWithoutFeedback>
                )}
                {categories.map((cat, index) => (
                    <View key={index} style={styles.buttonWrapper}>
                        <View style={styles.warningRow}>
                            <TouchableOpacity disabled={cat.lowItems.length === 0} onPress={() => toggleExpand('warning',cat.name)}>
                                <Text style={styles.warningText}>{cat.lowItems.length > 0 ? '⚠ ' + cat.lowItems.length + ' items low' : ""}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => toggleExpand('updated', cat.name)}>
                                <Text style={styles.updatedText}>ⓘ updated {formatUpdatedShort(cat.lastUpdated)}</Text>
                            </TouchableOpacity>
                    </View>

                    {/* Dropdown list */}
                    {expanded.type === 'warning' && expanded.category === cat.name && (
                        <View style={styles.dropdown}>
                            {cat.lowItems.map((item, index) => (
                                <Text key={index} style={styles.dropdownItem}>- {item}</Text>
                            ))}
                        </View>
                    )}

                    {/* UpdatedText dropdown */}
                    {expanded.type === "updated" && expanded.category === cat.name && (
                    <View style={styles.dropdownOverlayRight}>
                        <Text style={styles.dropdownItem}>{formatUpdatedFull(cat.lastUpdated)}</Text>
                    </View>
                    )}
                    
                    <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                        <Text style={styles.buttonText}>{cat.name}</Text>
                    </TouchableOpacity>
                </View>
                ))}
        </View>
        </ScrollView>
        <View style={styles.dropdownContainer}>
                <Dropdown
                    style={styles.dropdownSelect}
                    data={dropDownData}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Building"
                    value={selectedBuilding}
                    onChange={item => {
                        setSelectedBuilding(item.value);
                    }}
                />
            </View>
	</View>
	);
}

const styles = StyleSheet.create({
    fullScreen: {
        paddingTop: 40, // for status bar space
        flex: 1,
        backgroundColor: '#fff',
    },
    tabRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 10,
    },
    tab: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
    },
    activeTab: {
        borderBottomColor: "#2e86de",
    },
    tabText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#888",
    },
    activeTabText: {
        color: "#2e86de",
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 40,
    },
    buttonWrapper: {
        
        alignSelf: "center", // centers the button and warning text horizontally
        width: '100%',
        maxWidth: 500,
              // space between this group and other elements
    },
    warningRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: '100%',
        maxWidth: 500
    },
    warningText: {
        
        textAlign: "left", // centers the text within its own container
        color: "red",
        fontWeight: "bold",
        marginBottom: 0,
        fontSize: 16,
        minHeight: 30, // Ensures space is reserved even when there's no warning
    },
    updatedText: {
        textAlign: "right", // centers the text within its own container
        color: "black",
        fontWeight: "700",
        marginBottom: 0,
        fontSize: 16,
        minHeight: 25
    },
	container: {
		display: 'flex',
		alignItems: 'center',
		// justifyContent: 'center',
        
		backgroundColor: '#fff',
		padding: 30,
        height: '100%',
	},
	button: {
        alignSelf: "center", // left-aligns both warning and button
        backgroundColor: '#2e86de',
        padding: 20,
        borderRadius: 8,
        // marginTop: 10,
        marginBottom: 15,
        width: "100%",
        maxWidth: 500,
        minWidth: 80
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    dropdown: {
        position: "absolute",
        top: 25,          // push it below the warning text row
        left: 0,
        right: 0,
        backgroundColor: "#f8d7da",
        padding: 10,
        borderRadius: 5,
        zIndex: 10,       // make sure it appears above other elements
        elevation: 5,     // adds shadow on Android
        width: '40%',
        // backgroundColor: "#f8d7da",
        // padding: 10,
        // borderRadius: 5,
        // marginBottom: 5,
    },
    dropdownOverlayRight: {
        position: "absolute",
        top: 30,
        right: 0,
        backgroundColor: "#d1ecf1",
        padding: 10,
        borderRadius: 5, 
        zIndex: 10,
        elevation: 5,
    },
    dropdownItem: {
        fontSize: 14,
        color: "#721c24",
        marginBottom: 2,
    },
    backdrop: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "transparent", // invisible but catches touches
        zIndex: 5,
  },
  dropdownContainer: {
    position: "absolute",
  bottom: 50,               // distance from bottom of screen
  left: 0,
  right: 0,
  
  alignItems: "center",     // centers the dropdown horizontally
},

dropdownSelect: {
  width: "80%",             // same rounded look as your buttons
  maxWidth: 400,
  height: 50,
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 10,
  backgroundColor: "#fff",
  paddingHorizontal: 12,
  paddingVertical: 8,
  elevation: 4,             // adds a soft shadow on Android
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  fontSize: 30,
  fontWeight: 'bold'
},

});
