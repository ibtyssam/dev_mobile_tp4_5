import { FlatList, Text, ActivityIndicator, Button } from "react-native";
import { useEffect, useState } from "react";
import { fetchTodosFetch } from "../services/api";

export default function TodoListFetchScreen() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodosFetch()
      .then(setTodos)
      .catch(() => setError("Impossible de charger les tâches"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <>
      {error && <Text>{error}</Text>}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={{ padding: 10 }}>{item.title}</Text>
        )}
      />
    </>
  );
}
