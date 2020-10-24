import firebase from "firebase"

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAlK76_uDj-UvIsi-C0grzDbbtK7LvC178",
    authDomain: "eecs448-dc54c.firebaseapp.com",
    databaseURL: "https://eecs448-dc54c.firebaseio.com",
    projectId: "eecs448-dc54c",
    storageBucket: "eecs448-dc54c.appspot.com",
    messagingSenderId: "514116559751",
    appId: "1:514116559751:web:e4aa8d434aaa67d8ac2922",
    measurementId: "G-EHQTV56BWE"
  };
  // Initialize Firebase
  var fire = firebase.initializeApp(firebaseConfig);

  export default fire 
  