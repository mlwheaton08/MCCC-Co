import { Accordion } from "flowbite-react"
import { useEffect, useState } from "react"
import { fetchOrders } from "../../APIManager"
import { OrderCard } from "./OrderCard"

export const OrderHistory = () => {
    const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

    const [orders, setOrders] = useState([])
    const [sort, setSort] = useState("Date - New")
    const [sortedOrders, setSortedOrders] = useState([])

    const getOrders = async () => {
        const ordersArray = await fetchOrders(localUser.firebaseId, true)
        setOrders(ordersArray)
    }

    const compareDate = ( a, b ) => {
        if ( a.dateCompleted < b.dateCompleted ){
            return -1;
        }
        if ( a.dateCompleted > b.dateCompleted ){
            return 1;
        }
        return 0;
    }

    const comparePrice = ( a, b ) => {
        if ( a.totalValue < b.totalValue ){
            return -1;
        }
        if ( a.totalValue > b.totalValue ){
            return 1;
        }
        return 0;
    }

    const getSortedOrders = () => {
        const copy = [...orders]
        switch(sort) {
            case "Date - New":
                copy.sort(compareDate).reverse()
                break;
            case "Date - Old":
                copy.sort(compareDate)
                break;
            case "Price - High":
                copy.sort(comparePrice).reverse()
                break;
            case "Price - Low":
                copy.sort(comparePrice)
                break;
            default:
                break;
        }
        setSortedOrders(copy)
    }

    useEffect(() => {
        getOrders()
    },[])

    useEffect(() => {
        getSortedOrders()
    },[sort,orders])


    return (
        <main className="w-1/2 mx-auto my-nav-height-plus flex flex-col">
            <h2 className="text-3xl font-thin">
                Order History
            </h2>

            {/* Sort */}
            <div className="mb-8 text-right pr-8">
                <span className="text-xl">Sort by </span>
                <select
                    className="rounded border border-text-secondary-color bg-bg-primary-color text-lg font-thin"
                    onChange={(evt) => setSort(evt.target.value)}
                >
                    <option value="Date - New">Date - New</option>
                    <option value="Date - Old">Date - Old</option>
                    <option value="Price - High">Price - High</option>
                    <option value="Price - Low">Price - Low</option>
                </select>
            </div>

            {
                orders.length === 0
                    ? <p className="text-lg font-thin">You have not placed any orders with us.</p>
                    : <div className="flex flex-col gap-8">
                        {
                            sortedOrders.map((order) => {
                                return (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                    />
                                )
                            })
                        }
                    </div>
            }
        </main>
    )
}