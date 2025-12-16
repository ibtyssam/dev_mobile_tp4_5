import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import AppBar from "./components/AppBar";

export default function TodoListScreen({ navigation }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTodos([
        { id: 1, title: "Faire les courses" },
        { id: 2, title: "Sortir le chien" },
        { id: 3, title: "Coder une app RN" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AppBar title="Mes tâches" />

      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, marginBottom: 10 }}>Mes tâches</Text>

        <FlatList
          data={todos}
          keyExtractor={(i) => i.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Détails", {
                  id: item.id,
                  title: item.title,
                })
              }
            >
              <Text style={{ padding: 10, fontSize: 18 }}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}
