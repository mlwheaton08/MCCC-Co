export const fetchUserByFirebaseId = async (firebaseId) => {
    const response = await fetch(`https://localhost:7240/Users/${firebaseId}`)
    const user = await response.json()
    return user
}

export const addUser = async (userObj) => {

    const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    }

    await fetch('https://localhost:7240/Users', options)
}

export const fetchItems = async (sortBy, isAsc) => {
    const response = await fetch(`https://localhost:7240/Items?sortBy=${sortBy}&asc=${isAsc}`)
    const itemsArray = await response.json()
    return itemsArray
}

export const fetchItem = async (id) => {
    const response = await fetch(`https://localhost:7240/Items/${id}`)
    const item = await response.json()
    return item
}

export const fetchOrders = async (userFirebaseId, isComplete) => {
    const response = await fetch(`https://localhost:7240/Orders?userFirebaseId=${userFirebaseId}&isComplete=${isComplete}`)
    const ordersArray = await response.json()
    return ordersArray
}

export const addOrder = async (orderObj) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderObj)
    }

    await fetch('https://localhost:7240/Orders', options)
}

export const addOrderItem = async (orderItemObj) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderItemObj)
    }

    await fetch('https://localhost:7240/OrderItems', options)
}