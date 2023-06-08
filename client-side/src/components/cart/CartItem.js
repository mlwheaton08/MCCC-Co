import { useNavigate } from "react-router-dom"
import { exitIcon } from "../../icons"
import { useState } from "react"
import { deleteOrderItem, updateOrderItem } from "../../APIManager"

export const CartItem = ({ orderItem, getOrder, getNavCartItemTotal, localUser, isLastItem }) => {
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
                    <select
                        name="quantity"
                        value={orderItem.itemQuantity}
                        className="bg-bg-secondary-color"
                        onChange={async (evt) => {
                            const copy = {...orderItemState}
                            copy.itemQuantity = evt.target.value
                            setOrderItemState(copy)
                            await updateOrderItem(orderItem.id, copy)
                            await getOrder()
                            await getNavCartItemTotal(localUser.firebaseId)
                        }}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                        <option value={9}>9</option>
                        <option value={10}>10</option>
                    </select>
                </div>
                <span className="tx-lg font-thin">Individual Price: ${orderItem.item.price}</span>
            </div>
            {/* Details right */}
            <div className="mr-6 my-4 flex flex-col justify-between items-end">
                <button
                    onClick={async () => {
                        await deleteOrderItem(orderItem.id)
                        await getOrder()
                        await getNavCartItemTotal(localUser.firebaseId)
                    }}
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