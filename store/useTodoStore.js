import { create } from "zustand";
import {
  fetchTodosFromFirestore,
  addTodoToFirestore,
  deleteTodoFromFirestore,
  updateTodoToFirestore,
} from "../services/firestore";
export const useTodoStore = create((set, get) => ({
  todos: [],
  loadTodos: async (uid) => {
    // Charger Firestore uniquement
    const remoteTodos = await fetchTodosFromFirestore(uid);
    set({ todos: remoteTodos });
  },
  addTodo: async (uid, title) => {
    await addTodoToFirestore(uid, { title });
    get().loadTodos(uid);
  },
  deleteTodo: async (uid, id) => {
    await deleteTodoFromFirestore(uid, id);
    get().loadTodos(uid);
  },
  updateTodo: async (uid, id, newTitle) => {
    await updateTodoToFirestore(uid, id, newTitle);
    get().loadTodos(uid);
  },
}));
