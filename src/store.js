import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// Reducers
// @todo

const firebaseConfig = {
  apiKey: "AIzaSyAd-x-91bszZDS6-Yme830eeOCLnM0gWJI",
    authDomain: "reactclientpanel-cc526.firebaseapp.com",
    databaseURL: "https://reactclientpanel-cc526.firebaseio.com",
    projectId: "reactclientpanel-cc526",
    storageBucket: "reactclientpanel-cc526.appspot.com",
    messagingSenderId: "874711795277"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Init firebase instance
firebase.initializeApp(firebaseConfig);

// Init firestore
const firestore = firebase.firestore();
const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer 
})

//  create iniitial state
const initialState = {};

// create store
const store = createStoreWithFirebase(rootReducer, initialState, compose(reactReduxFirebase(firebase),
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;