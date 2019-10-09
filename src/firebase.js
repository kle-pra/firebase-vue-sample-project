import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBrUibkSL2eIB5W_NeCqHI_xURmY5yA6YY",
    authDomain: "newagent-98013.firebaseapp.com",
    databaseURL: "https://newagent-98013.firebaseio.com",
    projectId: "newagent-98013",
    storageBucket: "newagent-98013.appspot.com",
    messagingSenderId: "24936125044",
    appId: "1:24936125044:web:026f8ea82d735d97b3f721"
};

firebase.initializeApp(firebaseConfig);
export const firebaseApp = firebase;