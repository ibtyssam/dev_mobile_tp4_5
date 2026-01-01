import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput } from "react-native";
const defaultBackgroundColor = "#ffffff";
const defaultTextColor = "#000000";
const defaultPrimaryColor = "#2196F3";
const defaultCardColor = "#f5f5f5";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodoStore } from "../store/useTodoStore";
import { AuthContext } from "./context/AuthContext";
export default function HomeScreen() {
	const { user, logout } = useContext(AuthContext);
	const { todos, loadTodos, addTodo, deleteTodo, updateTodo } = useTodoStore();
	const [modalVisible, setModalVisible] = useState(false);
	const [newTodo, setNewTodo] = useState("");
	const [addedMsg, setAddedMsg] = useState("");
	const [addError, setAddError] = useState("");
	const [editingId, setEditingId] = useState(null);
	const [editValue, setEditValue] = useState("");
	const [editError, setEditError] = useState("");

	useEffect(() => {
		if (user) {
			loadTodos(user.uid);
		}
	}, [user]);

	const handleAddTodo = async () => {
		setAddError("");
		if (!newTodo.trim()) return;
		if (!user || !user.uid) {
			setAddError("Vous devez être connecté pour ajouter une tâche.");
			return;
		}
		try {
			console.log('Ajout tâche pour', user.uid, newTodo);
			await addTodo(user.uid, newTodo);
			setNewTodo("");
			setModalVisible(false);
			setAddedMsg("Tâche ajoutée !");
			setTimeout(() => setAddedMsg("") , 1500);
		} catch (e) {
			setAddError("Erreur lors de l'ajout : " + (e.message || e.toString()));
			console.error(e);
		}
	};

	const handleDeleteTodo = async (id) => {
		if (!user || !user.uid) return;
		await deleteTodo(user.uid, id);
		setAddedMsg("Tâche supprimée !");
		setTimeout(() => setAddedMsg("") , 1500);
	};

	const handleEditTodo = (item) => {
		setEditingId(item.id);
		setEditValue(item.title);
		setEditError("");
	};

	const handleSaveEdit = async () => {
		if (!editValue.trim()) {
			setEditError("Le titre ne peut pas être vide.");
			return;
		}
		try {
			await updateTodo(user.uid, editingId, editValue);
			setEditingId(null);
			setEditValue("");
			setEditError("");
			setAddedMsg("Tâche modifiée !");
			setTimeout(() => setAddedMsg("") , 1500);
		} catch (e) {
			setEditError("Erreur lors de la modification : " + (e.message || e.toString()));
		}
	};

	const handleCancelEdit = () => {
		setEditingId(null);
		setEditValue("");
		setEditError("");
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: defaultBackgroundColor }}>
			<View style={{ padding: 16 }}>
				<Text style={{ color: defaultTextColor, fontSize: 26, fontWeight: "bold" }}>
					Mes tâches
				</Text>
				<TouchableOpacity onPress={logout}>
					<Text style={{ color: "red" }}>Déconnexion</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						marginVertical: 15,
						backgroundColor: defaultPrimaryColor,
						padding: 12,
						borderRadius: 8,
					}}
					onPress={() => setModalVisible(true)}
				>
					<Text style={{ color: "#fff", textAlign: "center" }}>
						+ Ajouter une tâche
					</Text>
				</TouchableOpacity>
				{addedMsg ? (
					<Text style={{ color: 'green', marginBottom: 10, textAlign: 'center' }}>{addedMsg}</Text>
				) : null}
				{addError ? (
					<Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>{addError}</Text>
				) : null}
				<FlatList
					data={todos}
					keyExtractor={item => item.id?.toString() || item.title}
					renderItem={({ item }) => (
						<View
							style={{
								backgroundColor: defaultCardColor,
								borderRadius: 8,
								marginBottom: 10,
								flexDirection: 'row',
								alignItems: 'center',
								justifyContent: 'space-between',
								paddingHorizontal: 10,
								paddingVertical: 8,
							}}
						>
							{editingId === item.id ? (
								<>
									<TextInput
										value={editValue}
										onChangeText={setEditValue}
										style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 6, color: defaultTextColor }}
									/>
									<TouchableOpacity onPress={handleSaveEdit} style={{ marginLeft: 8 }}>
										<Text style={{ color: 'green' }}>💾</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={handleCancelEdit} style={{ marginLeft: 4 }}>
										<Text style={{ color: 'red' }}>✖️</Text>
									</TouchableOpacity>
								</>
							) : (
								<>
									<Text style={{ color: defaultTextColor, flex: 1 }}>{item.title}</Text>
									<TouchableOpacity onPress={() => handleEditTodo(item)} style={{ marginLeft: 8 }}>
										<Text style={{ color: defaultPrimaryColor }}>✏️</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => handleDeleteTodo(item.id)} style={{ marginLeft: 4 }}>
										<Text style={{ color: 'red' }}>🗑️</Text>
									</TouchableOpacity>
								</>
							)}
						</View>
					)}
				/>
				{editError ? (
					<Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>{editError}</Text>
				) : null}
			</View>
			{/* MODAL FORM */}
			<Modal visible={modalVisible} animationType="slide" transparent>
				<View
					style={{
						flex: 1,
						backgroundColor: "rgba(0,0,0,0.5)",
						justifyContent: "center",
						padding: 20,
					}}
				>
					<View
						style={{
							backgroundColor: defaultBackgroundColor,
							padding: 20,
						}}
					>
						<Text style={{ color: defaultTextColor, fontSize: 18 }}>
							Nouvelle tâche
						</Text>
						<TextInput
							placeholder="Titre de la tâche"
							value={newTodo}
							onChangeText={setNewTodo}
							style={{
								borderWidth: 1,
								borderColor: "#ccc",
								marginVertical: 10,
								padding: 10,
								borderRadius: 6,
								color: defaultTextColor,
							}}
						/>
						<TouchableOpacity
							onPress={handleAddTodo}
							style={{
								backgroundColor: defaultPrimaryColor,
								padding: 10,
								borderRadius: 6,
							}}
						>
							<Text style={{ color: "#fff", textAlign: "center" }}>
								Ajouter
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => setModalVisible(false)}>
							<Text style={{ textAlign: "center", marginTop: 10 }}>
								Annuler
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>
		</SafeAreaView>
	);
}
