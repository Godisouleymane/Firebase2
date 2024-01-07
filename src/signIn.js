import { initializeApp } from "firebase/app";

import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithRedirect } from "firebase/auth"

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDreKIlxuFFWmzp8vX1mGCt1BnKlMj653E",
    authDomain: "fir-testm-f5dc1.firebaseapp.com",
    projectId: "fir-testm-f5dc1",
    storageBucket: "fir-testm-f5dc1.appspot.com",
    messagingSenderId: "897653381336",
    appId: "1:897653381336:web:570409c1b47776df5d5fad"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// Se connecter avec Google
const signInGoogleBtn = document.querySelector('.signInGoogle');

signInGoogleBtn.addEventListener('click', ()=> {
    signInWithRedirect(auth, new GoogleAuthProvider());         
})

// Recuperer l'etat de connexion de l'utilisateur 

// onAuthStateChanged(auth, (user)=> {
//     console.log("Changement du status de l'utilisateur:", user);
// })


// Inscription de l'utilisateur

const signUpForm = document.querySelector('.signup');

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signUpForm.email.value;
    const password = signUpForm.password.value;

    createUserWithEmailAndPassword(auth, email, password).then((cred)=> {
        console.log("L'utilisateur inscrit:", cred.user);
        signUpForm.reset();
    }).catch((err)=> {
        console.log(err.message);
    });
})