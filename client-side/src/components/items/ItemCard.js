import { useNavigate } from "react-router-dom"

export const ItemCard = ({ item, showPrice }) => {
    const navigate = useNavigate()


    return (
        <div
            className="w-96 flex flex-col justify-between items-center rounded text-xl hover:bg-bg-tint-color-2 hover:cursor-pointer"
            onClick={() => navigate(`/cymbal/${item.id}`)}
        >
            {/* Image */}
            <img
                src={item.image}
                alt={`Cymbal - ${item.width} ${item.series.name} ${item.type.name}`}
            />
            {/* Dividing line */}
            <span className="w-4/5 h-px bg-border-color-1"></span>
            {/* Description */}
            <div className="py-3 flex flex-col items-center">
                <div>
                    <span>{item.width}" </span>
                    <span>{item.series.name} </span>
                    <span>{item.type.name} </span>
                </div>
                {
                    !showPrice
                        ? ""
                        : <span>${item.price}</span>
                }
            </div>
        </div>
    )
}