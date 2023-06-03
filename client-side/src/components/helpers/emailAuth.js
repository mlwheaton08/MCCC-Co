import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AddUser, fetchUserByFirebaseId } from "../../APIManager.js"


export const emailAuth = {
  // Register
  register: function(userObj, navigate) {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
      .then(async (userCredential) => {
        const auth = getAuth()
        updateProfile(auth.currentUser, {
          displayName: userObj.fullName,
        }).then(
          async function() {
            // add to db
            const dbUserToAdd = {
              firebaseId: userCredential.user.uid,
              isAdmin: false,
              name: userObj.name,
              email: userCredential.user.email,
              rewardsPoints: 0
            }
            await AddUser(dbUserToAdd)
            // add to local storage
            const dbUser = await fetchUserByFirebaseId(userCredential.user.uid)
            const userAuth = {
              id: dbUser.id,
              firebaseId: userCredential.user.uid,
              isAdmin: dbUser.isAdmin,
              name: dbUser.name,
              email: userCredential.user.email,
              rewardsPoints: dbUser.rewardsPoints,
              type: "email",
            }
            localStorage.setItem("user", JSON.stringify(userAuth))
            navigate(sessionStorage.getItem("prevLocation"))
          },
          function(error) {
            console.log("Email Register Name Error")
            console.log("error code", error.code)
            console.log("error message", error.message)
            window.alert('REGISTER ERROR', `code: ${error.code}`, `message: ${error.message}`)
          }
        )
      })
      .catch((error) => {
        console.log("Email Register Error")
        console.log("error code", error.code)
        console.log("error message", error.message)
        window.alert('REGISTER ERROR', `code: ${error.code}`, `message: ${error.message}`)
      })
  },
  // Sign in
  signIn: function(userObj, navigate) {
    return new Promise((res) => {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, userObj.email, userObj.password)
        .then(async (userCredential) => {
          const dbUser = await fetchUserByFirebaseId(userCredential.user.uid)
          const userAuth = {
            id: dbUser.id,
            firebaseId: userCredential.user.uid,
            isAdmin: dbUser.isAdmin,
            name: dbUser.name,
            email: userCredential.user.email,
            rewardsPoints: dbUser.rewardsPoints,
            type: "email",
          }
          console.log(dbUser)
          localStorage.setItem("user", JSON.stringify(userAuth));
          navigate(sessionStorage.getItem("prevLocation"))
        })
        .catch((error) => {
          console.log("Email SignIn Error")
          console.log("error code", error.code)
          console.log("error message", error.message)
          window.alert('SIGN IN ERROR', `code: ${error.code}`, `message: ${error.message}`)
        })
    })
  },
  // Sign out
  signOut: function(setUserState) {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user")
        setUserState(null)
        window.alert("Sign out successful")
      })
      .catch((error) => {
        console.log("signOut Error")
        console.log("error code", error.code)
        console.log("error message", error.message)
        window.alert('SIGN OUT ERROR', `code: ${error.code}`, `message: ${error.message}`)
      })
  },
}