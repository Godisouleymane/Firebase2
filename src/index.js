// Import des fonctions dont vous avez besoin à partir des SDKs
import { initializeApp } from "firebase/app";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, onSnapshot, updateDoc } from "firebase/firestore";

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

// Initialisation des services
const database = getFirestore(app);
const users = collection(database, 'users');
const tbody = document.getElementById('tbody');
const addUsersForm = document.querySelector('.ajouter');

// Gestionnaire d'événement pour le formulaire
addUsersForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Récupérer les données du formulaire
    const id = addUsersForm.userId.value;
    const nom = addUsersForm.nom.value;
    const prenom = addUsersForm.prenom.value;
    const age = addUsersForm.age.value;
    const adulte = age >= 18 ? true : false;
    if (id) {
        // Mettre à jour l'utilisateur dans la base de données en utilisant l'Id;
        try {
            await updateDoc(doc(users, id), {
                nom: nom,
                prenom: prenom,
                age: age,
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
                nom: nom,
                prenom: prenom,
                age: age,
                adulte: adulte
            }).then(() => addUsersForm.reset());

            getUsersFromFirebase();
        } catch (error) {
            console.log("Erreur lors de l'ajout d'un nouvel utilisateur : ", error);
        }
    }
});

// Fonction pour récupérer les utilisateurs depuis Firebase
async function getUsersFromFirebase() {
    try {
        const usersCollection = collection(database, 'users');
        const usersList = [];

        onSnapshot(usersCollection, (querySnapshot) => {
            // Vider la liste
            tbody.innerHTML = '';
            usersList.length = 0;

            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ",  doc.data());
                usersList.push({ id: doc.id, ...doc.data() });
                const usersData = doc.data();
                tbody.innerHTML += `
                    <tr>
                        <td>${usersData.nom}</td>
                        <td>${usersData.prenom}</td>
                        <td>${usersData.age}</td>
                        <td>${usersData.adulte}</td>
                        <td>
                            <button class="editButton" onclick="updateUsersInfos('${doc.id}', '${usersData.nom}', '${usersData.prenom}', '${usersData.age}')">Modifier</button> / <button id="${doc
                            .id}" class="deleteButton">Supprimer</button>
                        </td>
                    </tr>
                `;
            });

            const deleteButton = document.querySelectorAll('.deleteButton');
            deleteButton.forEach(button => {
              button.addEventListener('click', (e)=> {
                const users_Id = e.target.id;
                const confirmation = confirm("Voulez-vous vraiment supprimer cet utilisateur ? ");
                if (confirmation) {
                  try {
                    deleteDoc(doc(users, users_Id));
                    alert("Utilisateur supprimer avec success")
                    console.log("Utilisateur supprimer avec success");
                  } catch (error) {
                    alert("Erreur lors de la suppression de l'utilisateur")
                    console.log("Erreur lors de la suppression de l'utilisateur", error);
                  }
                } else {
                  alert('Annuler')
                }
              })
            });
        });
    } catch (error) {
        console.log(error);
    }
}

// Fonction pour remplir le formulaire avec les données de l'utilisateur sélectionné

window.updateUsersInfos = function updateUsersInfos(id, nom, prenom, age) {
  // Remplir les champs du formulaire avec les données d'utilisateur;
  addUsersForm.userId.value = id;
  addUsersForm.nom.value = nom;
  addUsersForm.prenom.value = prenom;
  addUsersForm.age.value = age.toString();

  // Mettre à jour le texte du bouton de soumission
  addUsersForm.querySelector('button').textContent = "Mettre à jour";
};

getUsersFromFirebase();
