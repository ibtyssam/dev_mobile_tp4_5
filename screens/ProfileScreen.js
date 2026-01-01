import { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "./context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  // const theme = { background: "#fff", text: "#000" };
  const { user, logout } = useContext(AuthContext);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, color: "#000" }}>
          Profil utilisateur
        </Text>
        <Text style={{ color: "#000" }}>{user?.email || user?.displayName || 'Utilisateur anonyme'}</Text>
        <TouchableOpacity
          onPress={logout}
          style={{ marginTop: 30, backgroundColor: '#DB4437', padding: 14, borderRadius: 8 }}
        >
          <Text style={{ color: '#fff', textAlign: 'center' }}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
// removed extra closing brace
}
