import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { signInWithCredential, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { AuthContext } from "./context/AuthContext";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    responseType: "id_token",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "AccueilTab" }],
          })
        )
        .catch(() => setError("Erreur Google Sign-In"));
    }
  }, [response]);
  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Veuillez entrer un email et un mot de passe");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.reset({
        index: 0,
        routes: [{ name: "AccueilTab" }],
      });
    } catch (e) {
      setError("Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };
  const register = async () => {
    setError("");
    if (!email || !password) {
      setError("Veuillez entrer un email et un mot de passe");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.reset({
        index: 0,
        routes: [{ name: "AccueilTab" }],
      });
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        setError("Cet email est déjà utilisé.");
      } else if (e.code === "auth/invalid-email") {
        setError("Email invalide.");
      } else if (e.code === "auth/weak-password") {
        setError("Le mot de passe est trop faible.");
      } else {
        setError("Erreur lors de la création du compte.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#000",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        Connexion
      </Text>
      {error !== "" && (
        <Text style={{ color: "red", marginBottom: 10, textAlign: "center" }}>
          {error}
        </Text>
      )}
      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          marginBottom: 12,
          color: "#000"
        }}
      />
      <TextInput
        placeholder="Mot de passe"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 8,
          padding: 12,
          marginBottom: 20,
          color: "#000"
        }}
      />
      {!loading && (
        <>
          <TouchableOpacity
            onPress={handleLogin}
            style={{ backgroundColor: "#2196F3", padding: 14, borderRadius: 8, marginBottom: 10 }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>Se connecter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={register}
            style={{ borderWidth: 1, borderColor: "#2196F3", padding: 14, borderRadius: 8, marginBottom: 20 }}
          >
            <Text style={{ color: "#2196F3", textAlign: "center" }}>Créer un compte</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={!request}
            onPress={() => promptAsync()}
            style={{ backgroundColor: "#DB4437", padding: 14, borderRadius: 8 }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>Continuer avec Google</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
