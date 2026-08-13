import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Without these, Firebase's own SDK throws a low-level, unhelpful error at
// init time that (combined with no error boundary) used to just white-screen
// the whole app with nothing in the UI to explain why. Fail loud instead: a
// missing key here means the deploy's environment variables were never set.
const missingKeys = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key)

if (missingKeys.length > 0) {
    throw new Error(
        `Missing Firebase config: ${missingKeys.join(', ')}. ` +
        'Set the matching VITE_FIREBASE_* environment variables for this deployment and redeploy.'
    )
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
