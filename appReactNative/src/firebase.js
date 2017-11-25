import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyB6uPna2K99PM7aiYdlDiFzTzj1LDnulpI",
  authDomain: "reactexample-4a692.firebaseapp.com",
  databaseURL: "https://reactexample-4a692.firebaseio.com",
  projectId: "reactexample-4a692",
  storageBucket: "reactexample-4a692.appspot.com",
  messagingSenderId: "943468013217"
};
firebase.initializeApp(config); 

export const firebaseAuth = firebase.auth();
export const firebaseDatabase = firebase.database();


export default firebase