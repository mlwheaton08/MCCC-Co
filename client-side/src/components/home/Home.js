import { useNavigate } from "react-router-dom"
import homeCoverImg from "../../images/home splash.jpg"
import { arrowRightIcon } from "../../icons"

export const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="mt-nav-height">
            <img className="w-full" src={homeCoverImg} />
            <div className="absolute top-56 left-28 flex flex-col items-end gap-4">
                <h2 className="text-6xl font-light">Play cheaper. Play better.</h2>
                <button
                    className="flex items-center gap-2 px-3 py-1 bg-red-700 text-xl rounded transition-property:gap duration-300 hover:gap-3"
                    onClick={() => navigate("/items")}
                >
                    <span>Shop Cymbals</span>
                    <span>{arrowRightIcon()}</span>
                </button>
            </div>
        </div>
    )
}