import { useNavigate } from "react-router-dom"

export const PackCard = ({ pack }) => {

    const navigate = useNavigate()


    return (
        <div 
            className="w-2/5 flex flex-col rounded bg-bg-tint-color hover:bg-bg-tint-color-2 hover:text-accent-primary-color-light hover:cursor-pointer"
            onClick={() => navigate(`/pack/${pack.id}`)}
        >
            <span className="px-3 py-1 text-3xl font-thin">{pack.name}</span>
            <img
                src={pack.image}
                alt={`${pack.name} cymbal pack`}
            />
        </div>
    )
}