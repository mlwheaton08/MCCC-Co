export const fetchUserByFirebaseId = async (firebaseId) => {
    const response = await fetch (`https://localhost:7240/Users/${firebaseId}`)
    const user = await response.json()
    return user
}

export const AddUser = async (userObj) => {

    const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    }

    await fetch(`https://localhost:7240/Users`, options)
}