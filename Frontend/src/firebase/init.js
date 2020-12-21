var firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDve4X_mTJ_A1Wc3s8mhbtDtZ49gflYenI",
  authDomain: "hybrid-app-4569a.firebaseapp.com",
  databaseURL: "https://hybrid-app-4569a.firebaseio.com",
  projectId: "hybrid-app-4569a",
  storageBucket: "hybrid-app-4569a.appspot.com",
  //messagingSenderId: "1005035579166",
 // appId: "1:1005035579166:web:cfd666a934c01b1c"
};

firebase.initializeApp(firebaseConfig)
// Get a Firestore instance
module.exports.db = firebase.firestore()