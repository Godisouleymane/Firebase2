// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{ addDoc, collection, getDocs, getFirestore } from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyDreKIlxuFFWmzp8vX1mGCt1BnKlMj653E",
  authDomain: "fir-testm-f5dc1.firebaseapp.com",
  projectId: "fir-testm-f5dc1",
  storageBucket: "fir-testm-f5dc1.appspot.com",
  messagingSenderId: "897653381336",
  appId: "1:897653381336:web:570409c1b47776df5d5fad"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// initialisation des services
const database = getFirestore(app);

const utilisateurs = collection(database, 'utilisateurs');
const users = collection(database, 'users');

const tbody = document.getElementById('tbody')

const addUsersForm = document.querySelector('.ajouter');

addUsersForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    // ajouter un nouveau user ave un id generer
    addDoc(users, {
        nom : addUsersForm.nom.value,
        prenom: addUsersForm.prenom.value,
        age: addUsersForm.age.value,
        adulte: addUsersForm.adulte.value === 'true' ? true : false, 
    }).then(()=> addUsersForm.reset());
})

async function getUsersFromFirebase() {
  try {
    const usersCollection = collection(database, 'users')

    // Recuperer tout les users de la collection
    const querySnapshot = await getDocs(usersCollection);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ",  doc.data(),);
      const usersData = doc.data();

      tbody.innerHTML += `
        <tr>
        <td>${doc.id}</td>
        <td>${usersData.nom}</td>
        <td>${usersData.prenom}</td>
        <td>${usersData.age}</td>
        <td>${usersData.adulte}</td>
  </tr>
      `;
    });
  } catch (error) {
    console.log(error);
  }
}

getUsersFromFirebase()