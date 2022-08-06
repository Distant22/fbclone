

import { getStorage, ref } from "firebase/storage";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCTpwVEgRXoxEHFGlogHbH5nZilmLrzEdM",
    authDomain: "facebookreact0804.firebaseapp.com",
    projectId: "facebookreact0804",
    storageBucket: "facebookreact0804.appspot.com",
    messagingSenderId: "1063572934975",
    appId: "1:1063572934975:web:a4967ed90201ef32fa438a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

export { db, storage }