import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDZEcqp9moc6LDbHZtGKChkj5FHaL8thk",
  authDomain: "bg3-piercings.firebaseapp.com",
  projectId: "bg3-piercings",
  storageBucket: "bg3-piercings.appspot.com",
  messagingSenderId: "252573744782",
  appId: "1:252573744782:web:f9ea642552288c721253df",
  measurementId: "G-BZN3NQQBBR",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

console.log(collection(db, "piercings"));

export default db;
