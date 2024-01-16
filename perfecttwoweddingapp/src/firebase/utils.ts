// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
  NextOrObserver,
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  where,
} from "firebase/firestore";

// Types
import { User, VerifiedCode } from "../types";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// create an instance of provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// google analytics
export const analytics = getAnalytics(app);

// firebase auth
export const auth = getAuth(app);

// firestore db
export const db = getFirestore();

// update guestList to set alreadyUsed to true
const updateGuestListInviteCode = async (inviteCode: string) => {
  const guestListsRef = await collection(db, "guestLists");
  const q = query(guestListsRef, where("inviteCode", "==", inviteCode));
  const querySnapshot = await getDocs(q);
  const batch = writeBatch(db);

  querySnapshot.docs.forEach((docSnapshot) => {
    const userData = docSnapshot.data();

    // if the inviteCode matches the doc update guestList alreadyUsed to true in DB
    if (userData.inviteCode === inviteCode) {
      const guestRef = doc(db, "guestLists", docSnapshot.id);
      batch.update(guestRef, { alreadyUsed: true });
    }
  });

  await batch.commit();
};

// verify that invite code exists in db and matches any user
export const verifyInviteCode = async (inviteCode: string) => {
  // get collection ref
  const guestListsRef = await collection(db, "guestLists");

  // create query to get document that matches inviteCode
  const q = query(guestListsRef, where("inviteCode", "==", inviteCode));

  // get snapshot array of docs
  const querySnapshot = await getDocs(q);

  let verifiedGuests: VerifiedCode[] = [];

  // set verfiedGuest to readable object
  querySnapshot.docs.forEach((docSnapshot) => {
    const userData: VerifiedCode = docSnapshot.data() as VerifiedCode;
    console.log(userData);
    if (userData.inviteCode === inviteCode) {
      verifiedGuests.push(userData);
    }
  });

  if (verifiedGuests.length > 0) {
    return verifiedGuests;
  } else {
    throw new Error("Invite code not found");
  }
};

// create document to store in firestore
export const createUserDocumentFromAuth = async (
  userAuth: any,
  inviteCode: string
) => {
  const userDocRef = await doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  let newUser: User | null = null;
  if (!userSnapshot.exists()) {
    try {
      // verify invite code
      const verifiedCode = await verifyInviteCode(inviteCode);

      // no userSnapshot but if a verifiedUser exists, check if code is already used
      if (verifiedCode.some((user: VerifiedCode) => user.alreadyUsed)) {
        throw new Error("Invite code already used");
      }

      // set alreadyUsed to true
      verifiedCode.forEach(async (user: VerifiedCode) => {
        user.alreadyUsed = true;
      });

      // update guestList DB to set alreadyUsed to true
      await updateGuestListInviteCode(inviteCode);

      const { displayName, email } = userAuth;
      const createdAt = new Date();

      // create new user
      newUser = {
        displayName,
        email,
        createdAt,
        verifiedCode: verifiedCode,
      };

      // update user collection with new user
      await setDoc(userDocRef, newUser);
    } catch (error) {
      console.error("Error creating the user:", error);
      return null;
    }
  }

  return userDocRef;
};

// create user with email and password
export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return null;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// sign in with email and password
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return null;

  return await signInWithEmailAndPassword(auth, email, password);
};

// google auth redirect with verification
export const signInWithGoogleRedirect = async (inviteCode: string) => {
  try {
    const verifiedCode = await verifyInviteCode(inviteCode);
    if (verifiedCode.length) await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("Error signing in", error);
  }
};

// get user data
export const getUser = async (id: string) => {
  const usersRef = await collection(db, "users");
  const userRef = await doc(usersRef, id);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    return docSnap.data() as User;
  } else {
    throw new Error("User not found");
  }
};

// signout
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (
  callback: NextOrObserver<FirebaseUser>
) => onAuthStateChanged(auth, callback);
