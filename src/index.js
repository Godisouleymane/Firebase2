// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{ addDoc, collection, doc, getDocs, getFirestore, onSnapshot, updateDoc } from "firebase/firestore"
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

addUsersForm.addEventListener('submit', async (e)=>{
    e.preventDefault();

  // recuperer les donnees du formulaire;
  const id = addUsersForm.userId.value;
  const nom = addUsersForm.nom.value;
  const prenom = addUsersForm.prenom.value;
  const age = addUsersForm.age.value;
  const adulte = addUsersForm.age.value >= 18 ? true : false;

  if (id) {
    // Mettre a jour l'utilisateur dans la base de donnees en utilisant l'Id;

    try {
      await updateDoc(doc(users, id), {
                nom: nom,
                prenom: prenom,
                age: age,
                adulte: adulte
      });
      
      addUsersForm.reset();

      addUsersForm.userId.value = '';

      getUsersFromFirebase();
    } catch (error) {
      console.log('Erreur lors de la modification de l\'utilisateur : ', error);
    }

  } else {
    // Ajouter un nouvel utilisateur;
    try {
      await addDoc(users, {
        nom : addUsersForm.nom.value,
        prenom: addUsersForm.prenom.value,
        age: addUsersForm.age.value,
        adulte: addUsersForm.age.value >= 18 ? true : false
      }).then(() => addUsersForm.reset());
      
      getUsersFromFirebase();

    } catch (error) {
      console.log("Erruer lors de l'ajout d'un nouvel utilisateur : ", error);
    }
  }
 
})

async function getUsersFromFirebase() {
  try {
    const usersCollection = collection(database, 'users')

    const usersList = [];

    onSnapshot(usersCollection, (querySnapshot) => {
      // vider la liste 
      tbody.innerHTML = ''
      usersList.length = 0;

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ",  doc.data(),);
        usersList.push({id : doc.id, ...doc.data()})
        const usersData = doc.data();
        tbody.innerHTML += `
    <tr>
          <td>${usersData.nom}</td>
          <td>${usersData.prenom}</td>
          <td>${usersData.age}</td>
          <td>${usersData.adulte}</td>
          <td> <button onclick="updateUsersInfos('${doc.id}', '${usersData.nom}', '${usersData.prenom}', '${usersData.age}', '${usersData.adulte}')">Modifier</button> / <button>Supprimer</button>
          </td>
    </tr>
        `;
      });
    })
   
  } catch (error) {
    console.log(error);
  }
}

getUsersFromFirebase()

function updateUsersInfos(id, nom, prenom, age, adulte) {
  // Remplir les champs du formulaire avec les donnees d'utilisateur;

  addUsersForm.userId.value = id;
  addUsersForm.nom.value = nom;
  addUsersForm.prenom.value = prenom;
  addUsersForm.age.value = age;
  addUsersForm.age.value = adulte

  // Mettre a jour le texte du boutton de soumission
  addUsersForm.querySelector('button').textContent = "Mettre a jour"
}