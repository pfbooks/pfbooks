import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7WJZaK2J0rw6v9LBa4HNthYcyCwjswRc",
  authDomain: "serendipia-98a5c.firebaseapp.com",
  projectId: "serendipia-98a5c",
  storageBucket: "serendipia-98a5c.appspot.com",
  messagingSenderId: "997858097362",
  appId: "1:997858097362:web:23c3fb70546682d710550b"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
// Inicializar Storage
const storage = getStorage(app);

export async function profilePicture(file) {
  try {
    const imagesRef = ref(storage, "images/" + file.name);
    const resUpload = await uploadBytes(imagesRef, file);
    return resUpload;
  } catch (error) {
    console.log(error);
  }
}

export async function getProfilePhotoUrl(path) {
  try {
    const imageRef = ref(storage, path);
    const imageURL = await getDownloadURL(imageRef);
    return imageURL;
  } catch (error) {
    console.log(error);
  }
}


