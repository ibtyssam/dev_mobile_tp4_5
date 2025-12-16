import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Bienvenue 👋</Text>
			<Text style={styles.subtitle}>Ceci est votre écran d'accueil.</Text>

			<Button
				title="Aller aux détails"
				onPress={() => navigation.navigate("Details", { id: 42 })}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
	},
	subtitle: {
		fontSize: 16,
		color: "#555",
		marginBottom: 16,
		textAlign: "center",
	},
});
