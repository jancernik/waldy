import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import g from './app/global';

const firebaseConfig = {
  apiKey: 'AIzaSyDI1hvWgguSoNQkxybXrSNAg3BfQEUmkqQ',
  authDomain: 'waldy-361d1.firebaseapp.com',
  projectId: 'waldy-361d1',
  storageBucket: 'waldy-361d1.appspot.com',
  messagingSenderId: '66979775880',
  appId: '1:66979775880:web:7861a56ca0b43e5b20663d',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function getAnswers() {
  const answers = await getDocs(collection(db, 'correct-answers'));
  const answersList = answers.docs.map((doc) => doc.data());
  g.answers = answersList;
}
