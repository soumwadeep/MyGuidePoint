import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD6cnrjdqO5rEMLdIeYuWYctQKJO3H7Mnk",
  authDomain: "myguidepoint-c8d43.firebaseapp.com",
  projectId: "myguidepoint-c8d43",
  storageBucket: "myguidepoint-c8d43.appspot.com",
  messagingSenderId: "89303052018",
  appId: "1:89303052018:web:fc2e6e08b527240126ea6b",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const dbName = "MyGuidePointDb";
