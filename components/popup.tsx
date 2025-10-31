import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
  onDelete: (id: number) => void;
}

export default function Popup({
  visible,
  onClose,
  initialValues = {
    id: -1,
    itemName: "",
    quantity: "",
    minQuantity: "",
  },
  onSave,
  onDelete,
}: PopupProps) {
  const [itemName, setItemName] = useState(initialValues.itemName);
  const [quantity, setQuantity] = useState(initialValues.quantity.toString());
  const [minQuantity, setMinQuantity] = useState(initialValues.minQuantity.toString());
  const [id, setId] = useState(initialValues.id);
  const [mode, setMode] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  console.log(id);
  useEffect(() => {
    setShowDeleteConfirmation(false);
    if (visible) {
      if (initialValues.itemName !== "") {
        setItemName(initialValues.itemName);
        setQuantity(initialValues.quantity.toString());
        setMinQuantity(initialValues.minQuantity.toString());
        setId(initialValues.id);
        setMode("edit");
      } else {
        setItemName("");
        setQuantity("");
        setMinQuantity("");
        setId(-1);
        setMode("add");
      }
    }
  }, [visible]);

  const handleClose = () => onClose();

  const handleSave = () => {
    const itemData = {
      id,
      itemName,
      quantity: Number(quantity),
      minQuantity: Number(minQuantity),
    };

    if (itemName.trim() === "" || quantity.trim() === "" || isNaN(itemData.minQuantity)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    onSave(itemData);
    onClose();
  };

  const handleDelete = () => {
    // setShowDeleteConfirmation(false);
    // visible === false;
    onClose();
    onDelete(id);
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.centered}>
      {visible ? (<Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            {showDeleteConfirmation ? (
              // 🔴 Delete Confirmation View
              <View style={styles.confirmBox}>
                <Text style={styles.confirmText}>Are you sure?</Text>
                <View style={styles.confirmButtons}>
                  <TouchableOpacity
                    onPress={() => setShowDeleteConfirmation(false)}
                    style={[styles.button, styles.cancelConfirmButton]}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleDelete}
                    style={[styles.button, styles.confirmDeleteButton]}
                  >
                    <Text style={[styles.buttonText, { color: "#fff" }]}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // ✏️ Main Edit/Add View
              <>
                <Text style={styles.title}>
                  {mode === "add" ? "Add Inventory Item" : "Edit Inventory Item"}
                </Text>

                <TextInput
                  placeholder="Item Name"
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={itemName}
                  onChangeText={setItemName}
                />

                <TextInput
                  placeholder="Quantity"
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="numeric"
                />

                <TextInput
                  placeholder="Minimum Quantity (for warning)"
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={minQuantity}
                  onChangeText={setMinQuantity}
                  keyboardType="numeric"
                />

                <View style={styles.buttonRow}>
                  <View style={styles.leftButtons}>
                    {id !== -1 && (
                      <TouchableOpacity
                        onPress={() => setShowDeleteConfirmation(true)}
                        style={[styles.deleteButton]}
                      >
                        <Text style={styles.deleteButtonText}>Delete</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <View style={styles.rightButtons}>
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
              </>
            )}
          </View>
        </View>
      </Modal>) : null}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    textAlign: "center",
  },
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  leftButtons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flex: 1,
  },
  rightButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    fontSize: 16,
    color: "#007AFF",
  },
  deleteButton: {
    borderColor: "#ff3b30",
    
  },
  deleteButtonText: {
    fontSize: 16,
    color: "#ff3b30",
  },
  confirmBox: {
    alignItems: "center",
  },
  confirmText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 20,
    textAlign: "center",
  },
  confirmButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  confirmDeleteButton: {
    backgroundColor: "#ff3b30",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  cancelConfirmButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});
