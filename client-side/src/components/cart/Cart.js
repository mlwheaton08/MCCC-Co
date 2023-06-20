import { useEffect, useState } from "react"
import { fetchOrders } from "../../APIManager"
import { useNavigate } from "react-router-dom"
import { CartItem } from "./CartItem"

export const Cart = ({ getNavCartItemTotal, setIsItemFilterActive }) => {
    
    const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

    const navigate = useNavigate()

    const [order, setOrder] = useState()
    const [orderItems, setOrderItems] = useState([])
    const [alert, setAlert] = useState("")

    const getOrder = async () => {
        const response = await fetchOrders(localUser.firebaseId, false)
        if (response.length > 0) {
            setOrder(response[0])
            setOrderItems(response[0].orderItems)
        }
    }

    useEffect(() => {
        getOrder()    
    },[])

    const orderItemCountMessage = () => {
        let count = 0
        for (const orderItem of orderItems) {
            count += orderItem.itemQuantity
        }

        if (count === 1) {
            return "1 item"
        } else {
            return `${count} items`
        }
    }

    const getCartTotalPrice = () => {
        let total = 0
        for (const orderItem of orderItems) {
            total += (orderItem.itemQuantity * orderItem.item.price)
        }
        return total
    }


    return (
        <main className="my-nav-height-plus">

            {alert}
            
            {
                !orderItems || orderItems.length === 0
                ? <div className="flex flex-col items-center text-text-primary-color">
                    <h3 className="mb-8 font-light text-3xl">There are no items in your cart.</h3>
                    <button
                        className="px-4 py-1 flex items-center gap-2 bg-accent-primary-color-dark text-2xl text-text-secondary-color transition-all duration-300 hover:bg-accent-primary-color hover:text-text-primary-color"
                        onClick={() => {
                            setIsItemFilterActive(false)
                            navigate("/cymbals")
                        }}
                    >
                        Start Shopping!
                    </button>
                </div>
                : <div className="w-1/2 mx-auto flex flex-col">
                    <h2 className="mb-2 text-3xl font-thin">
                        My Cart ({orderItemCountMessage()})
                    </h2>
                    <div className="flex flex-col rounded border border-text-secondary-color">
                        {
                            orderItems.map((orderItem, index) => {
                                return (
                                    <CartItem
                                        key={orderItem.id}
                                        orderItem={orderItem}
                                        getOrder={getOrder}
                                        getNavCartItemTotal={getNavCartItemTotal}
                                        localUser={localUser}
                                        isLastItem={index === (orderItems.length - 1)}
                                        setAlert={setAlert}
                                    />
                                )
                            })
                        }
                    </div>
                    <button
                        className="mt-12 px-4 py-1 self-center bg-accent-primary-color-dark text-2xl text-text-secondary-color transition-all duration-300 hover:text-text-primary-color"
                        onClick={() => navigate("/checkout")}
                    >
                        Proceed to checkout (${getCartTotalPrice()})
                    </button>
                </div>
            }
        </main>
    )
}