import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD1m-lESv394MiiwYGV0TLGtivyCaJLujM",
  authDomain: "pfbooks-a0c7c.firebaseapp.com",
  projectId: "pfbooks-a0c7c",
  storageBucket: "pfbooks-a0c7c.appspot.com",
  messagingSenderId: "776268899500",
  appId: "1:776268899500:web:983698f19f7e105d632b09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)