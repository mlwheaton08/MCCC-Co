import { useEffect, useState } from "react"
import { addOrder, fetchOrders, updateOrder } from "../../APIManager"
import { useNavigate } from "react-router-dom"
import { CartItem } from "./CartItem"

export const Cart = ({ getNavCartItemTotal, setIsItemFilterActive }) => {
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
        let result = ''
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (let i = 20; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)]
        }
        return result;
    }

    const handlePurchase = async () => {
        const newConfirmationNumber = getConfirmationNumber()
        const cartPrice = getCartTotalPrice()

        const currentOrder = {
            id: order.id,
            userId: order.userId,
            dateCreated: order.dateCreated,
            dateCompleted: new Date(),
            rewardsUsed: null,
            totalValue: cartPrice,
            totalPaid: cartPrice,
            confirmationNumber: newConfirmationNumber,
            shipCompanyName: null,
            shipLineOne: null,
            shipLineTwo: null,
            shipCity: null,
            shipState: null,
            shipZIPCode: null,
            shipCountry: null
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
                confirmationNumber: null,
                shipCompanyName: null,
                shipLineOne: null,
                shipLineTwo: null,
                shipCity: null,
                shipState: null,
                shipZIPCode: null,
                shipCountry: null
            }
            await addOrder(newOpenOrder)
        }

        window.alert(`ORDER COMPLETE\nCONFIRMATION NUMBER: ${newConfirmationNumber}`)
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
                                    />
                                )
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