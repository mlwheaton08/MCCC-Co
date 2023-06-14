import { useNavigate } from "react-router-dom"

export const OrderItem = ({ orderItem }) => {
    const navigate = useNavigate()


    return <>
        <main className="flex justify-start">
            {/* Image */}
            <img
                src={orderItem.item.image}
                alt={`Cymbal - ${orderItem.item.width} ${orderItem.item.series.name} ${orderItem.item.type.name}`}
                className="w-1/6"
            />
            {/* Details */}
            <div className="flex flex-col justify-center">
                <h4
                    className="text-xl hover:underline hover:cursor-pointer"
                    onClick={() => navigate(`/cymbal/${orderItem.itemId}`)}
                >
                    {orderItem.item.width}" {orderItem.item.series.name} {orderItem.item.type.name}
                </h4>
                <span className="">Quantity: {orderItem.itemQuantity}</span>
            </div>
        </main>
    </>
}