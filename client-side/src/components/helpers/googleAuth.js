import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { addOrder, addUser, fetchOrders, fetchUserByFirebaseId, fetchUserByFirebaseIdWithAddresses } from "../../APIManager";


export const googleAuth = {
  // Sign in/Register
  signInRegister: function(getNavCartItemTotal, navigate) {
    return new Promise((res) => {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then(async (userCredential) => {
          let dbUser = await fetchUserByFirebaseIdWithAddresses(userCredential.user.uid)
          // if user not in DB, add them
          if (dbUser.title === "Not Found") {
            dbUser = {
              firebaseId: userCredential.user.uid,
              isAdmin: false,
              name: userCredential.user.displayName,
              email: userCredential.user.email,
              rewardsPoints: 0
            }
            await addUser(dbUser)
            const NewlyAddedDbUser = await fetchUserByFirebaseId(userCredential.user.uid)
            dbUser.id = NewlyAddedDbUser.id
          }
          // check for user open order. if none, create one
          const userOpenOrder = await fetchOrders(userCredential.user.uid, false)
          if (!userOpenOrder[0]) {
            let newOpenOrder = {
              userId: dbUser.id,
              dateCreated: new Date(),
              dateCompleted: null,
              rewardsUsed: null,
              totalValue: null,
              totalPaid: null,
              confirmationNumber: null,
              shipCompanyName: null,
              shipLineOne: null,
              shipLineTwo: null,
              shipCity: null,
              shipState: null,
              shipZIPCode: null,
              shipCountry: null
            }
            const defaultAddress = dbUser.addresses.find((a) => a.isDefault)
            if (defaultAddress) {
              newOpenOrder.shipCompanyName = defaultAddress.companyName
              newOpenOrder.shipLineOne = defaultAddress.lineOne
              newOpenOrder.shipLineTwo = defaultAddress.lineTwo
              newOpenOrder.shipCity = defaultAddress.city
              newOpenOrder.shipState = defaultAddress.state
              newOpenOrder.shipZIPCode = defaultAddress.zipCode
              newOpenOrder.shipCountry = defaultAddress.country
            }
            await addOrder(newOpenOrder)
          }
          // add user to local storage
          const userAuth = {
            id: dbUser.id,
            firebaseId: userCredential.user.uid,
            isAdmin: dbUser.isAdmin,
            name: dbUser.name,
            email: userCredential.user.email,
            type: "google",
          }
          localStorage.setItem("user", JSON.stringify(userAuth))
          await getNavCartItemTotal(userCredential.user.uid)
          navigate(sessionStorage.getItem("prevLocation"))
        })
        .catch((error) => {
          console.log("Google Sign In Error");
          console.log("error code", error.code);
          console.log("error message", error.message);
          console.log("error email", error.email);
          window.alert(`GOOGLE SIGN IN ERROR\ncode: ${error.code}\nmessage: ${error.message}`)
        })
    })
  },
  // Sign out
  signOut: function(setUserState, navigate) {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user")
        setUserState(null)
        window.alert("Sign out successful")
        navigate("/")
      })
      .catch((error) => {
        console.log("Google SignOut Error")
        console.log("error code", error.code)
        console.log("error message", error.message)
        window.alert(`GOOGLE SIGN OUT ERROR\ncode: ${error.code}\nmessage: ${error.message}`)
      })
  },
}
