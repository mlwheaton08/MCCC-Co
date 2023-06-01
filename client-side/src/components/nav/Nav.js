import { Search } from "./Search"
import logo from "../../images/MCCC Logo.png"
import { Link, useNavigate } from "react-router-dom"
import { gearIcon, shoppingCartIcon } from "../../icons"

export const Nav = () => {
    const navigate = useNavigate()
    const localUser = localStorage.getItem("user")

    return (
        <div className="fixed top-0 w-full h-nav-height flex justify-around items-center bg-bg-secondary-color text-xl">
            <img
                className="h-3/4 mr-28 hover:cursor-pointer"
                src={logo}
                alt="MCCC logo"
                onClick={() => navigate("/")}
            />
            <Link to="/items">Cymbals</Link>
            <Link to="/distributors">Distributors</Link>
            <Search />
            {
                localUser
                    ? <span>Sign In</span>
                    : <div className="flex gap-8">
                        <Link to="/cart">{shoppingCartIcon()}</Link>
                        <span>{gearIcon()}</span>
                    </div>
            }
        </div>
    )
}