import { Search } from "./Search"
import logo from "../../images/MCCC Logo.png"
import { Link, useNavigate } from "react-router-dom"
import { chevronDownIcon, gearIcon, shoppingCartIcon } from "../../icons"
import { useState } from "react"

export const Nav = () => {
    const navigate = useNavigate()
    const localUser = localStorage.getItem("user")

    const [showCymbalsNavDropdown, setShowCymbalsNavDropdown] = useState(false)


    return (
        <main className="fixed top-0 w-full h-nav-height flex justify-around items-center bg-bg-secondary-color text-xl">
            <img
                className="h-3/4 hover:cursor-pointer"
                src={logo}
                alt="MCCC logo"
                onClick={() => navigate("/")}
            />
            <Link
                to="/items"
                className="flex items-center gap-2"
                onMouseOver={() => setShowCymbalsNavDropdown(true)}
                onMouseOut={() => setShowCymbalsNavDropdown(false)}
            >
                <span>Cymbals</span>
                <span>{chevronDownIcon()}</span>
            </Link>
            <Link to="/distributors">Distributors</Link>
            <Search />
            {
                !localUser
                    ? <Link
                        to="/login"
                        className="transition-property:text duration-300 hover:text-accent-primary-color-light"
                    >
                        Sign In
                    </Link>
                    : <div className="flex gap-8">
                        <Link to="/cart">{shoppingCartIcon()}</Link>
                        <span>{gearIcon()}</span>
                    </div>
            }
        </main>
    )
}