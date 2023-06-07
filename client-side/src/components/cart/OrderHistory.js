import { Accordion } from "flowbite-react"
import { useEffect, useState } from "react"
import { fetchOrders } from "../../APIManager"
import { OrderCard } from "./OrderCard"

export const OrderHistory = () => {
    const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        const ordersArray = await fetchOrders(localUser.firebaseId, true)
        setOrders(ordersArray)
    }

    useEffect(() => {
        getOrders()
    },[])


    return (
        <main className="w-1/2 mx-auto my-nav-height-plus flex flex-col">
            <h2 className="mb-8 text-3xl font-thin">
                Order History
            </h2>
            <div className="flex flex-col gap-8">
                {
                    orders.map((order) => {
                        return (
                            <OrderCard
                                key={order.id}
                                order={order}
                            />
                        )
                    })
                }
            </div>
        </main>
    )
}