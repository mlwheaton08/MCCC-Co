import { useNavigate } from "react-router-dom"

export const CheckoutItem = ({ orderItem, isLastItem }) => {

    const navigate = useNavigate()

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
                className="w-2/5"
            />
            {/* Details left */}
            <div className="mr-auto my-4 flex flex-col justify-between text-lg font-thin">
                <h4
                    className="text-2xl font-normal hover:underline hover:cursor-pointer"
                    onClick={() => navigate(`/cymbal/${orderItem.itemId}`)}
                >
                    {orderItem.item.width}" {orderItem.item.series.name} {orderItem.item.type.name}
                </h4>
                <p className="mt-auto">Quantity: {orderItem.itemQuantity}</p>
                <p>Individual Price: ${orderItem.item.price}</p>
                <p>
                    Total: ${orderItem.item.price * orderItem.itemQuantity}
                </p>
            </div>
            {/* Details right */}
            <div className="mr-6 my-4 flex flex-col justify-between items-end">
                
            </div>
        </main>

        {showDividerLine()}
    </>
}