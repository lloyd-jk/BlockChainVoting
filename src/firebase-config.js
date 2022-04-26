import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKj7e90vL76qapJBSF70YnNqFHX0gwOmo",
  authDomain: "blockchain-phone-auth.firebaseapp.com",
  projectId: "blockchain-phone-auth",
  storageBucket: "blockchain-phone-auth.appspot.com",
  messagingSenderId: "781763222935",
  appId: "1:781763222935:web:11aaff53b21408051ff8d2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const authentication = getAuth(app);
