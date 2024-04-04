import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { app } from './firebase';

// Initialize Firebase Auth
const auth = getAuth(app);

// Google authentication provider
const provider = new GoogleAuthProvider();

// Sign in with Google popup
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider).then(data => data.user);
    return result;
  } catch (error) {
    console.error('Error signing in with Google:', error);
  }
};

// Sign out
export const signOutFirebase = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Listen for auth state changes (optional)
export const onAuthStateChanged = (callback: (user: any) => void) => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    callback(user);
  });
  return unsubscribe;
};
