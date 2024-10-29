/* import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite'
import {
  getDatabase,
  ref,
  set,
  onValue,
  goOffline,
  goOnline,
} from 'firebase/database'
import { FirebaseApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyAns7ZOl0c0fql4smiXZYpIR8MwVWSGJzo',
  authDomain: 'partition-7f87a.firebaseapp.com',
  projectId: 'partition-7f87a',
  storageBucket: 'partition-7f87a.appspot.com',
  messagingSenderId: '425989076355',
  appId: '1:425989076355:web:9f012a3d24c3f351eb32b6',
}

export const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)

// Get a list of cities from your database

const dbRef = ref(db, 'partition')

export function getPartitionData() {
  let arr = []

  onValue(dbRef, (snapshot) => {
    if (snapshot.exists()) {
      snapshot.forEach((child) => arr.push(child.val()))
    }
  })

  return arr
} */
