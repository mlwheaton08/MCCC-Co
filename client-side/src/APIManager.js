export const fetchUserByFirebaseId = async (firebaseId) => {
    const response = await fetch(`https://localhost:7240/Users/${firebaseId}`)
    const user = await response.json()
    return user
}

export const fetchUserByFirebaseIdWithAddresses = async (firebaseId) => {
    const response = await fetch(`https://localhost:7240/Users/${firebaseId}/expandAddresses`)
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

export const updateUser = async (id, userObj) => {
    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userObj)
    }
    await fetch(`https://localhost:7240/Users/${id}`, options)
}

export const addUserShippingAddress = async (addressObj) => {

    const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(addressObj)
    }

    await fetch('https://localhost:7240/UserShippingAddresses', options)
}

export const updateUserShippingAddress = async (id, addressObj) => {
    const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(addressObj)
    }
    await fetch(`https://localhost:7240/UserShippingAddresses/${id}`, options)
}

export const deleteUserShippingAddress = async (id) => {
    await fetch(`https://localhost:7240/UserShippingAddresses/${id}`, {
        method: "DELETE"
    })
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

export const searchItems = async (criterion, getTop) => {
    let url = `https://localhost:7240/Items/search?q=${criterion}`
    if (getTop) {
        url += `&getTop=${getTop}`
    }
    const response = await fetch(url)
    const itemsArray = await response.json()
    return itemsArray
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

export const fetchDistributors = async () => {
    const response = await fetch('https://localhost:7240/Distributors')
    const distributorsArray = await response.json()
    return distributorsArray
}

export const fetchPacks = async () => {
    const response = await fetch('https://localhost:7240/Packs')
    const packsArray = await response.json()
    return packsArray
}

export const fetchPack = async (id) => {
    const response = await fetch(`https://localhost:7240/Packs/${id}`)
    const pack = await response.json()
    return pack
}