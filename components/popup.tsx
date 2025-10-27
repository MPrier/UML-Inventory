import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface ItemData {
    id: number;
    itemName: string;
    quantity: number;
    minQuantity: number;
}

interface PopupProps {
    visible: boolean;
    onClose: () => void;
    initialValues?: {
        id: number;
        itemName: string;
        quantity: number | string;
        minQuantity: number | string;
    };
    onSave: (data: ItemData) => void;
}

export default function Popup({ 
    visible, 
    onClose, 
    initialValues = {
        id: -1,
        itemName: '',
        quantity: '',
        minQuantity: ''
    },
    onSave 
}: PopupProps) {
    const [itemName, setItemName] = useState(initialValues.itemName);
    const [quantity, setQuantity] = useState(initialValues.quantity.toString());
    const [minQuantity, setMinQuantity] = useState(initialValues.minQuantity.toString());
    const [id, setId] = useState(initialValues.id);
    const [mode, setMode] = useState('');

    const resetForm = () => {
        setItemName('');
        setQuantity('');
        setMinQuantity('');
    };
    console.log("Popup initialValues:", initialValues);
    // Reset form when modal becomes visible
    useEffect(() => {
        if (visible) {
            if (initialValues.itemName != '') {
                setItemName(initialValues.itemName);
                setQuantity(initialValues.quantity.toString());
                setMinQuantity(initialValues.minQuantity.toString());
                setId(initialValues.id);
                setMode('edit');
            } else {
                resetForm();
                setMode('add');
            }
        }
    }, [visible]);

    const handleClose = () => {
        // resetForm();
        onClose();
    };

    const handleSave = () => {
        const itemData = {
            id,
            itemName,
            quantity: Number(quantity),
            minQuantity: Number(minQuantity)
        };
        onSave(itemData);
        // resetForm();
        onClose();
    };

    return (
        <KeyboardAvoidingView
            behavior="padding" 
            style={{flex: 1, justifyContent: "center", alignItems: "center"}}
        >
            <Modal visible={visible} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.title}>
                            {mode === 'add' ? 'Add Inventory Item' : 'Edit Inventory Item'}
                        </Text>

                        {/* Item Name Input */}
                        <TextInput
                        placeholder="Item Name"
                        style={styles.input}
                        value={itemName}
                        onChangeText={setItemName}
                        />

                        {/* Quantity Input */}
                        <TextInput
                        placeholder="Quantity"
                        style={styles.input}
                        value={quantity}
                        onChangeText={setQuantity}
                        keyboardType="numeric"
                        />

                        {/* Minimum Quantity Input */}
                        <TextInput
                        placeholder="Minimum Quantity (for warning)"
                        style={styles.input}
                        value={minQuantity}
                        onChangeText={setMinQuantity}
                        keyboardType="numeric"
                        />

                        <View style={styles.buttonRow}>
                            <TouchableOpacity onPress={handleClose} style={styles.button}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                onPress={handleSave}
                                style={[styles.button, styles.saveButton]}
                            >
                                <Text style={[styles.buttonText, { color: "#fff" }]}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
            
    );
}

const styles = StyleSheet.create({
input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
    width: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: 320,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  buttonText: {
    fontSize: 16,
    color: "#007AFF",
  },
});

