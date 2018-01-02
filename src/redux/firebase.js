import * as firebase from 'firebase'
const config = {
	apiKey: "AIzaSyAun4Z4y8VW7bNkVK1KvxF1okNFYzJx8p4",
    authDomain: "splitbill-847bf.firebaseapp.com",
    databaseURL: "https://splitbill-847bf.firebaseio.com",
    projectId: "splitbill-847bf",
    storageBucket: "splitbill-847bf.appspot.com",
    messagingSenderId: "945609419687"
};
firebase.initializeApp(config);

export const database = firebase.database().ref('bill')