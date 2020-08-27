import firebase from 'firebase';
import permission from '../permission.json';

const firebaseApp = firebase.initializeApp(permission);

const database = firebaseApp.firestore();

export default database;