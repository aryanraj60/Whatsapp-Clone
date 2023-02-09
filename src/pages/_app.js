import "@/styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import Login from "./login";
import { Loading } from "@/components";
import { useEffect } from "react";
import firebase from "firebase/compat/app";

export default function App({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
          name: user.displayName,
        },
        { merge: true }
      );
    }
  }, [user]);

  console.log("App Rendered!");
  if (loading) return <Loading />;
  if (!user) return <Login />;

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
