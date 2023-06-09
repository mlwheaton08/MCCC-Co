import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { addOrder, addUser, fetchOrders, fetchUserByFirebaseIdWithAddresses } from "../../APIManager.js"


export const emailAuth = {
  // Register
  register: function(userObj, getNavCartItemTotal, setNavUserName, navigate) {
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
            await addUser(dbUserToAdd)
            // check for user open order. if none, create one
            const dbUser = await fetchUserByFirebaseIdWithAddresses(userCredential.user.uid)
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
            // add to local storage and set nav username
            const userAuth = {
              id: dbUser.id,
              firebaseId: userCredential.user.uid,
              isAdmin: dbUser.isAdmin,
              name: dbUser.name,
              email: userCredential.user.email,
              type: "email",
            }
            localStorage.setItem("user", JSON.stringify(userAuth))
            await getNavCartItemTotal(userCredential.user.uid)
            setNavUserName(userAuth.name)
            navigate(sessionStorage.getItem("prevLocation"))
          },
          function(error) {
            console.log("Email Register Name Error")
            console.log("error code", error.code)
            console.log("error message", error.message)
            window.alert(`REGISTER ERROR\ncode: ${error.code}\nmessage: ${error.message}`)
          }
        )
      })
      .catch((error) => {
        console.log("Email Register Error")
        console.log("error code", error.code)
        console.log("error message", error.message)
        window.alert(`REGISTER ERROR\ncode: ${error.code}\nmessage: ${error.message}`)
      })
  },
  // Sign in
  signIn: function(userObj, getNavCartItemTotal, setNavUserName, navigate) {
    return new Promise((res) => {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, userObj.email, userObj.password)
        .then(async (userCredential) => {
          // check for user open order. if none, create one
          const dbUser = await fetchUserByFirebaseIdWithAddresses(userCredential.user.uid)
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
          const userAuth = {
            id: dbUser.id,
            firebaseId: userCredential.user.uid,
            isAdmin: dbUser.isAdmin,
            name: dbUser.name,
            email: userCredential.user.email,
            type: "email",
          }
          localStorage.setItem("user", JSON.stringify(userAuth))
          await getNavCartItemTotal(userCredential.user.uid)
          setNavUserName(userAuth.name)
          navigate(sessionStorage.getItem("prevLocation"))
        })
        .catch((error) => {
          console.log("Email SignIn Error")
          console.log("error code", error.code)
          console.log("error message", error.message)
          window.alert(`SIGN IN ERROR\ncode: ${error.code}\nmessage: ${error.message}`)
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
        navigate("/")
      })
      .catch((error) => {
        console.log("signOut Error")
        console.log("error code", error.code)
        console.log("error message", error.message)
        window.alert(`SIGN OUT ERROR\ncode: ${error.code}\nmessage: ${error.message}`)
      })
  },
}