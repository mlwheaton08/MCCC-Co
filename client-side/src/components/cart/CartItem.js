import { useNavigate } from "react-router-dom"
import { exitIcon } from "../../icons"
import { useState } from "react"
import { deleteOrderItem, updateOrderItem } from "../../APIManager"
import { alertTopYellow } from "../alerts/AlertTop"

export const CartItem = ({ orderItem, getOrder, getNavCartItemTotal, localUser, isLastItem, setAlert }) => {

    const navigate = useNavigate()

    const [orderItemState, setOrderItemState] = useState({
        id: orderItem.id,
        orderId: orderItem.orderId,
        itemId: orderItem.itemId,
        itemQuantity: orderItem.itemQuantity
    })

    const showDividerLine = () => {
        if (!isLastItem) {
            return <span className="w-11/12 h-px mx-auto bg-bg-tint-color-2"></span>
        }
    }

    const hideAlert = () => {
        setAlert("")
    }

    const handleOrderItemQuantityUpdate = async (newQuantity) => {
        const copy = {...orderItemState}
        copy.itemQuantity = newQuantity
        setOrderItemState(copy)
        await updateOrderItem(orderItem.id, copy)
        await getOrder()
        await getNavCartItemTotal(localUser.firebaseId)
        setAlert(alertTopYellow("Cart item updated."))
        setTimeout(hideAlert, 1000)
    }

    const handleOrderItemDelete = async () => {
        await deleteOrderItem(orderItem.id)
        await getOrder()
        await getNavCartItemTotal(localUser.firebaseId)
        setAlert(alertTopYellow("Cart item deleted."))
        setTimeout(hideAlert, 2000)
    }


    return <>
        <main className="flex justify-between">
            {/* Image */}
            <img
                src={orderItem.item.image}
                alt={`Cymbal - ${orderItem.item.width} ${orderItem.item.series.name} ${orderItem.item.type.name}`}
                className="w-1/4"
            />
            {/* Details left */}
            <div className="mr-auto my-4 flex flex-col justify-between">
                <h4
                    className="text-2xl hover:underline hover:cursor-pointer"
                    onClick={() => navigate(`/cymbal/${orderItem.itemId}`)}
                >
                    {orderItem.item.width}" {orderItem.item.series.name} {orderItem.item.type.name}
                </h4>
                <div className="mt-auto font-thin">
                    <span className="text-lg">Quantity: </span>
                    <input
                        name="quantity"
                        type="number"
                        min={1}
                        max={20}
                        value={orderItem.itemQuantity}
                        className="bg-bg-secondary-color"
                        onChange={(evt) => handleOrderItemQuantityUpdate(evt.target.value)}
                    />
                </div>
                <span className="tx-lg font-thin">Individual Price: ${orderItem.item.price}</span>
            </div>
            {/* Details right */}
            <div className="mr-6 my-4 flex flex-col justify-between items-end">
                <button
                    onClick={handleOrderItemDelete}
                >
                    {exitIcon()}
                </button>
                <span className="text-xl font-semibold">
                    Total: ${orderItem.item.price * orderItem.itemQuantity}
                </span>
            </div>
        </main>

        {showDividerLine()}
    </>
}