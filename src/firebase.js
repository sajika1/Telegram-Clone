import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD_y8mFD4W6JCII9qywkEJcdzJFO20sArk",
    authDomain: "telegram-clone-c2c57.firebaseapp.com",
    projectId: "telegram-clone-c2c57",
    storageBucket: "telegram-clone-c2c57.appspot.com",
    messagingSenderId: "103259737369",
    appId: "1:103259737369:web:bcbab8f3352e17a7af8988"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore()
  const auth = firebase.auth();
  
  // sign in with google account
  const provider = new firebase.auth.GoogleAuthProvider();

  export { auth, provider};
  export default db;  