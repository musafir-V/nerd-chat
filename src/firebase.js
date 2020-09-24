import firebase from 'firebase/app';
import "firebase/auth"
import "firebase/database"
import "firebase/storage"

var firebaseConfig = {
    apiKey: "AIzaSyDm0ivj5TqTQ8j87LgNxf0gYdNJbcO9Dy4",
    authDomain: "slack-clone-188bc.firebaseapp.com",
    databaseURL: "https://slack-clone-188bc.firebaseio.com",
    projectId: "slack-clone-188bc",
    storageBucket: "slack-clone-188bc.appspot.com",
    messagingSenderId: "808662212536",
    appId: "1:808662212536:web:79a4c351a882f7b219b94d",
    measurementId: "G-592NGDLKS4"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;