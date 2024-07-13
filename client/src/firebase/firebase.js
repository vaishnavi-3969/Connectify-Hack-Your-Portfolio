import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAFQab7LytnQNqCs61M-OTkRuSiBgo_A74",
  authDomain: "jsontofirebase-6ddbd.firebaseapp.com",
  databaseURL: "https://jsontofirebase-6ddbd-default-rtdb.firebaseio.com",
  projectId: "jsontofirebase-6ddbd",
  storageBucket: "jsontofirebase-6ddbd.appspot.com",
  messagingSenderId: "231116578149",
  appId: "1:231116578149:web:172e4b8b4197ff5464558c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
export { app, auth, db };
