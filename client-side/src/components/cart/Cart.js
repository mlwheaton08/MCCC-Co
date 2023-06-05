import { useEffect, useState } from "react"
import { addOrder, fetchOrders, updateOrder } from "../../APIManager"
import { useNavigate } from "react-router-dom"
import { CartItem } from "./CartItem"

export const Cart = ({ getNavCartItemTotal }) => {
    const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

    const navigate = useNavigate()

    const [order, setOrder] = useState()
    const [orderItems, setOrderItems] = useState([])

    const getOrder = async () => {
        const response = await fetchOrders(localUser.firebaseId, false)
        if (response.length > 0) {
            setOrder(response[0])
            setOrderItems(response[0].orderItems)
        }
    }

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

    useEffect(() => {
        getOrder()    
    },[])

    const getCartTotalPrice = () => {
        let total = 0
        for (const orderItem of orderItems) {
            total += (orderItem.itemQuantity * orderItem.item.price)
        }
        return total
    }

    const getConfirmationNumber = () => {
        return "2134kjhl2h34;lkj34;lh2134"
    }

    const handlePurchase = async () => {
        const currentOrder = {
            id: order.id,
            userId: order.userId,
            shippingAddressId: null,
            dateCreated: order.dateCreated,
            dateCompleted: new Date(),
            rewardsUsed: null,
            totalValue: getCartTotalPrice(),
            totalPaid: null,
            confirmationNumber: getConfirmationNumber()
        }

        await updateOrder(order.id, currentOrder)
        
        // create new open order
        const userOpenOrder = await fetchOrders(localUser.firebaseId, false)
        if (!userOpenOrder[0]) {
            const newOpenOrder = {
                userId: localUser.id,
                shippingAddressId: null,
                dateCreated: new Date(),
                dateCompleted: null,
                rewardsUsed: null,
                totalValue: null,
                totalPaid: null,
                confirmationNumber: null
            }
            await addOrder(newOpenOrder)
        }

        window.alert("complete")
        await getNavCartItemTotal(localUser.firebaseId)
        navigate("/")
    }


    return (
        <main className="my-nav-height-plus">
            {
                !orderItems || orderItems.length === 0
                ? <div className="flex flex-col items-center text-text-primary-color">
                    <h3 className="mb-8 font-light text-3xl">There are no items in your cart.</h3>
                    <button
                        className="px-4 py-1 flex items-center gap-2 bg-accent-primary-color-dark text-2xl text-text-secondary-color transition-all duration-300 hover:bg-accent-primary-color hover:text-text-primary-color"
                        onClick={() => navigate("/items/PurchaseCount/false")}
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
                                if (index < (orderItems.length - 1)) {
                                    return <>
                                        <CartItem
                                            key={`cartItem--${orderItem.id}`}
                                            orderItem={orderItem}
                                            getOrder={getOrder}
                                            getNavCartItemTotal={getNavCartItemTotal}
                                            localUser={localUser}
                                        />
                                        <span className="w-11/12 h-px mx-auto bg-bg-tint-color-2"></span>
                                    </>
                                } else {
                                    return (
                                        <CartItem
                                            key={`cartItem--${orderItem.id}`}
                                            orderItem={orderItem}
                                            getOrder={getOrder}
                                            getNavCartItemTotal={getNavCartItemTotal}
                                            localUser={localUser}
                                        />
                                    )
                                }
                            })
                        }
                    </div>
                    <button
                        className="mt-12 px-4 py-1 self-center bg-accent-primary-color-dark text-2xl text-text-secondary-color transition-all duration-300 hover:text-text-primary-color"
                        onClick={handlePurchase}
                    >
                        Complete Order (${getCartTotalPrice()})
                    </button>
                </div>
            }
        </main>
    )
}