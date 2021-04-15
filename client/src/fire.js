import firebase from 'firebase';
var firebaseConfig = {
  apiKey: "AIzaSyDO7N1Pi767py4FqSWIkYJtQzTpr6KYPdY",
  authDomain: "login-ebcbb.firebaseapp.com",
  projectId: "login-ebcbb",
  storageBucket: "login-ebcbb.appspot.com",
  messagingSenderId: "571202133996",
  appId: "1:571202133996:web:7af7e1057ef82274a1eac9"
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;