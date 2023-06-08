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

export const fetchItems = async () => {
    const response = await fetch('https://localhost:7240/Items?sortBy=PurchaseCount&asc=false')
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

export const updateOrder = async (id, orderObj) => {
    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderObj)
    }
    await fetch(`https://localhost:7240/Orders/${id}`, options)
}

export const fetchOpenOrderItemTotal = async (firebaseId) => {
    const response = await fetch(`https://localhost:7240/openOrderItemTotal/${firebaseId}`)
    const total = await response.json()
    return total
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

export const updateOrderItem = async (id, orderItemObj) => {
    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(orderItemObj)
    }
    await fetch(`https://localhost:7240/OrderItems/${id}`, options)
}

export const deleteOrderItem = async (id) => {
    await fetch(`https://localhost:7240/OrderItems/${id}`, {
        method: "DELETE"
    })
}

export const fetchTypes = async () => {
    const response = await fetch('https://localhost:7240/Types')
    const typesArray = await response.json()
    return typesArray
}

export const fetchSeries = async () => {
    const response = await fetch('https://localhost:7240/Series')
    const seriesArray = await response.json()
    return seriesArray
}