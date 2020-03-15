import firebase from 'firebase';

const config = {
   apiKey: "AIzaSyC5a-3TYQNvanR107M_sJ9Pm8pSq1QOMyo",
   authDomain: "chat-c6792.firebaseapp.com",
   databaseURL: "https://chat-c6792.firebaseio.com",
   projectId: "chat-c6792",
   storageBucket: "chat-c6792.appspot.com",
   messagingSenderId: "192943616160",
   appId: "1:192943616160:web:62a06f0d79fbcd162c19c5"
};

const fire = firebase.initializeApp(config);

export default fire;

