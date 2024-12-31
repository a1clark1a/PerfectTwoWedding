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
  orderBy,
} from "firebase/firestore";

import { getStorage, ref, getDownloadURL } from "firebase/storage";

// Types
import { Images, User, VerifiedCode } from "../types";

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
  const guestListsRef = await collection(db, "guestLists"); // change to guestLists for prod

  // create query to get document that matches inviteCode
  //const q = query(guestListsRef, where("inviteCode", "==", inviteCode));
  const guestDocRef = await doc(guestListsRef, inviteCode);
  // get snapshot array of docs
  //const querySnapshot = await getDocs(q);
  const docSnap = await getDoc(guestDocRef);

  // set verfiedGuest to readable object
  //  querySnapshot.docs.forEach((docSnapshot) => {
  //   verifiedGuest = docSnapshot.data() as VerifiedCode;
  //   console.log(verifiedGuest);
  //  }

  if (docSnap.exists()) {
    return docSnap.data() as VerifiedCode;
  } else {
    throw new Error(
      "Invite code does not exist or does not match anyone on our invite list."
    );
  }
};

// create document to store in firestore
export const createUserDocumentFromAuth = async (
  userAuth: any,
  inviteCode: string
) => {
  //const userDocRef = await doc(db, "users", userAuth.uid);
  // const userSnapshot = await getDoc(userDocRef);
  // let newUser: User | null = null;
  // if (!userSnapshot.exists()) {
  //   try {
  //     // verify invite code
  //     const verifiedCode = await verifyInviteCode(inviteCode);

  //     // no userSnapshot but if a verifiedUser exists, check if code is already used
  //     if (verifiedCode.some((user: VerifiedCode) => user.alreadyUsed)) {
  //       throw new Error("Invite code already used");
  //     }

  //     // set alreadyUsed to true
  //     verifiedCode.forEach(async (user: VerifiedCode) => {
  //       user.alreadyUsed = true;
  //     });

  //     // update guestList DB to set alreadyUsed to true
  //     await updateGuestListInviteCode(inviteCode);

  //     const { displayName, email } = userAuth;
  //     const createdAt = new Date();

  //     // create new user
  //     newUser = {
  //       id: userAuth.uid,
  //       displayName,
  //       email,
  //       createdAt,
  //       verifiedCode: verifiedCode,
  //     };

  //     // update user collection with new user
  //     await setDoc(userDocRef, newUser);
  //   } catch (error) {
  //     console.error("Error creating the user:", error);
  //     return null;
  //   }
  // }

  return {} as any;
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
  // try {
  //   const verifiedCode = await verifyInviteCode(inviteCode);
  //   if (verifiedCode.length) await signInWithRedirect(auth, googleProvider);
  // } catch (error) {
  //   console.error("Error signing in", error);
  // }
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

// Listen to changes to the Auth state
export const onAuthStateChangedListener = (
  callback: NextOrObserver<FirebaseUser>
) => onAuthStateChanged(auth, callback);

export const submitRSVPToFirebase = async (
  verifiedCode: VerifiedCode | null,
  newConfirmed: string[],
  newDenied: string[]
) => {
  return new Promise<VerifiedCode>(async (resolve, reject) => {
    try {
      if (verifiedCode == null) throw new Error("No Code Detected!");
      const existingCode = await verifyInviteCode(verifiedCode.inviteCode);

      if (!existingCode)
        throw new Error(
          "Invite code does not exist or does not match anyone on our invite list."
        );
      if (existingCode.submit && existingCode.submit.submitted)
        throw new Error(`Looks like someone used your code before you did!`);

      const rsvpDocRef = await doc(db, "rsvp", "rsvp"); //db collection docId
      const rsvpSnapshot = await getDoc(rsvpDocRef);

      let newDoc = {
        confirmed: [] as string[],
        denied: [] as string[],
      };

      // add submite date
      verifiedCode.submit = {
        submittedOn: new Date(),
        submitted: true,
      };

      //  throw new Error("Test error");

      // if no doc
      if (!rsvpSnapshot.exists()) {
        newDoc = {
          confirmed: newConfirmed,
          denied: newDenied,
        };

        await setDoc(rsvpDocRef, {
          ...newDoc,
          code: verifiedCode.inviteCode,
        });

        // change to guestLists
        const guestListsDocRef = doc(db, "guestLists", verifiedCode.inviteCode); //db collection docId

        await setDoc(guestListsDocRef, verifiedCode);
        return resolve(verifiedCode);
      }

      // a snapshot exists
      const rsvpDoc = rsvpSnapshot.data();
      newDoc = {
        confirmed: [...rsvpDoc?.confirmed, ...newConfirmed],
        denied: [...rsvpDoc?.denied, ...newDenied],
      };

      await setDoc(rsvpDocRef, {
        ...newDoc,
        code: verifiedCode.inviteCode,
      });
      // update user verified code

      // change to guestLists
      const guestListsDocRef = await doc(
        db,
        "guestLists",
        verifiedCode.inviteCode
      ); //db collection docId

      await setDoc(guestListsDocRef, verifiedCode);

      resolve(verifiedCode);
    } catch (error) {
      reject(new Error(`Failed to submit RSVP: ${error}`));
    }
  });
};

export const getImagesFromFirebase = (folderName: string) => {
  return new Promise<any[]>(async (resolve, reject) => {
    try {
      const imagesCollectionRef = await collection(
        db,
        "images",
        folderName,
        "images"
      ); //db collection docId

      const q = query(imagesCollectionRef, orderBy("fileName", "asc"));
      const imagesSnapshot = await getDocs(q);

      let imageArray: any[] = [];

      // get img metadata from snapshot
      imagesSnapshot.forEach((doc) => {
        const image = doc.data();
        imageArray.push({
          fileName: image.fileName,
          src: image.url,
          width: image.width,
          height: image.height,
          aspectRatio: image.aspectRatio,
        });
      });

      // coz metadata has no width or height use JS to get it
      // const loadedImages = await Promise.all(
      //   // ensure process continues as long as 1 is successful
      //   imageArray.map(async (image, i) => {
      //     // console.log("running for folder", folderName, i);
      //     try {
      //       const img = new Image();
      //       img.src = image.src;
      //       await new Promise((resolve, reject) => {
      //         img.onload = resolve;
      //         img.onerror = reject;
      //       });
      //       const aspectRatio = img.width / img.height;

      //       const imageMetadata = {
      //         src: image.src,
      //         aspectRatio,
      //         ...image,
      //         width: img.width,
      //         height: img.height,
      //       };

      //       return imageMetadata;
      //     } catch (err) {
      //       console.error("Error loading image:", image, err);
      //       return { src: image.src, aspectRatio: 1 }; // Default aspect ratio for failed images
      //     }
      //   })
      // );

      resolve(imageArray);
    } catch (error: any) {
      reject(new Error(`Failed to fetch images: ${error}`));
    }
  });
};

export const getVideosFromFirebaseStorage = (videoPath: string) => {
  return new Promise<any>(async (resolve, reject) => {
    const firebaseStorage = getStorage();
    const videoRef = ref(firebaseStorage, videoPath);

    try {
      const videUrl = await getDownloadURL(videoRef);
      resolve(videUrl);
    } catch (error: any) {
      reject(new Error(`Failed to fetch video: ${error}`));
    }
  });
};

/**
 * IndexedDB functions currently not used
 */

// const insertIntoIDB = async (image: any, folderName: string) => {
//   const request = indexedDB.open("ImageMetadataDB", 1);
//   console.log("inserting to indexDB", image);
//   // Handle database upgrade (creation) or version change
//   request.onupgradeneeded = function (event: any) {
//     const db = event.target.result;

//     // Create an object store (similar to a table in SQL databases)
//     const objectStore = db.createObjectStore(folderName, {
//       keyPath: "id",
//       autoIncrement: true,
//     });

//     // Define the structure of the data to be stored
//     objectStore.createIndex("name", "name", { unique: false });
//     objectStore.createIndex("url", "url", { unique: true });
//     // Add more indexes as needed

//     console.log("Database setup complete");
//   };

//   // Handle database opening success
//   request.onsuccess = function (event: any) {
//     const db = event.target.result;

//     // Add data to the object store
//     const transaction = db.transaction([folderName], "readwrite");
//     const objectStore = transaction.objectStore(folderName);

//     // Add the metadata to the object store
//     const addRequest = objectStore.add(image);

//     // Handle successful addition
//     addRequest.onsuccess = function (event: any) {
//       console.log("Image metadata added to database");
//     };

//     // Handle addition failure
//     addRequest.onerror = function (event: any) {
//       console.error("Error adding image metadata:", event.target.error);
//     };
//   };

//   // Handle database opening failure
//   request.onerror = function (event: any) {
//     console.error("Database error:", event.target.error);
//   };
// };

// export const getImagesFromIDB = async (
//   folderName: string
// ): Promise<Images[]> => {
//   return new Promise((resolve, reject) => {
//     // Open the database
//     const request: IDBOpenDBRequest = indexedDB.open("ImageMetadataDB", 1);

//     // Handle database opening success

//     request.onsuccess = function (event: Event) {
//       const db = (event.target as IDBOpenDBRequest).result;

//       // Open a transaction to access the object store
//       const transaction = db.transaction([folderName], "readonly");
//       const objectStore = transaction.objectStore(folderName);

//       // Retrieve all image metadata
//       const getAllRequest = objectStore.getAll();

//       // Handle success of retrieving all image metadata
//       getAllRequest.onsuccess = function (event) {
//         const imageData = (event.target as IDBOpenDBRequest).result;
//         console.log("Retrieved image metadata:", imageData);
//         resolve(imageData as unknown as Images[]);
//       };

//       // Handle failure of retrieving image metadata
//       getAllRequest.onerror = function (event) {
//         console.error(
//           "Database error:",
//           (event.target as IDBOpenDBRequest).error
//         );
//       };
//     };

//     // Handle database opening failure
//     request.onerror = function (event) {
//       console.error(
//         "Database error:",
//         (event.target as IDBOpenDBRequest).error
//       );
//       reject(`Database error: ${(event.target as IDBOpenDBRequest).error}`);
//     };
//   });
// };

// export const checkIfImageMetadataDBExists = async (folderName: string) => {
//   return new Promise((resolve, reject) => {
//     // Open or create a database
//     const request: IDBOpenDBRequest = indexedDB.open("ImageMetadataDB", 1);

//     request.onsuccess = function (event: Event) {
//       const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

//       const objectStoreNames = db.objectStoreNames;

//       // check if there are any objectStore
//       if (objectStoreNames.length <= 0) resolve(false);

//       // check if there is an objectStore with the folderName
//       if (objectStoreNames.contains(folderName)) {
//         const transaction = db.transaction(folderName);
//         const countRequest = transaction.objectStore(folderName).count();
//         countRequest.onsuccess = function (event: Event) {
//           const count = (event.target as IDBRequest<number>).result;
//           if (count > 0) resolve(true);

//           resolve(false);
//         };
//       } else {
//         resolve(false);
//       }
//     };
//   });
// };

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};
