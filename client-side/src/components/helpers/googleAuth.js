import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { AddUser, fetchUserByFirebaseId } from "../../APIManager";


export const googleAuth = {
  // Sign in/Register
  signInRegister: function(navigate) {
    return new Promise((res) => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then(async (userCredential) => {
          let dbUser = await fetchUserByFirebaseId(userCredential.user.uid)
          if (dbUser.title === "Not Found") {
            dbUser = {
              firebaseId: userCredential.user.uid,
              isAdmin: false,
              name: userCredential.user.displayName,
              email: userCredential.user.email,
              rewardsPoints: 0
            }
            await AddUser(dbUser)
            const NewlyAddedDbUser = await fetchUserByFirebaseId(userCredential.user.uid)
            dbUser.id = NewlyAddedDbUser.id
          }
          const userAuth = {
            id: dbUser.id,
            firebaseId: userCredential.user.uid,
            isAdmin: dbUser.isAdmin,
            name: dbUser.name,
            email: userCredential.user.email,
            rewardsPoints: dbUser.rewardsPoints,
            type: "google",
          }
          localStorage.setItem("user", JSON.stringify(userAuth))
          navigate(sessionStorage.getItem("prevLocation"))
        })
        .catch((error) => {
          console.log("Google Sign In Error");
          console.log("error code", error.code);
          console.log("error message", error.message);
          console.log("error email", error.email);
          window.alert('GOOGLE SIGN IN ERROR', `code: ${error.code}`, `message: ${error.message}`, `email: ${error.email}`)
        })
    })
  },
  // Sign out
  signOut: function(setUserState) {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user")
        setUserState(null)
        window.alert("Sign out successful")
      })
      .catch((error) => {
        console.log("Google SignOut Error")
        console.log("error code", error.code)
        console.log("error message", error.message)
        window.alert('GOOGLE SIGN OUT ERROR', `code: ${error.code}`, `message: ${error.message}`)
      })
  },
}
