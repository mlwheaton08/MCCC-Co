import { Search } from "./Search"
import logo from "../../images/MCCC Logo.png"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { chevronDownIcon, gearIcon, shoppingCartIcon } from "../../icons"
import { useEffect, useState } from "react"
import { logout } from "../helpers/logout"

export const Nav = () => {
    const navigate = useNavigate()
    const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

    let location = useLocation()

    const [user, setUser] = useState({
        id: 0,
        firebaseId: "",
        isAdmin: false,
        name: "",
        email: "",
        rewardsPoints: 0
    })
    const [showCymbalsNavDropdown, setShowCymbalsNavDropdown] = useState(false)

    useEffect(() => {
        setUser(localUser)
        console.log(localUser)
    },[location])

    const toLogin = () => {
        if (location.pathname !== "/register") {
            sessionStorage.setItem("prevLocation", location.pathname)
        }
        navigate("/login")
    }


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
                !user
                    ? <span
                        to="/login"
                        className="transition-property:text duration-300 hover:text-accent-primary-color-light hover:cursor-pointer"
                        onClick={toLogin}
                    >
                        Sign In
                    </span>
                    : <div className="flex gap-8">
                        <Link to="/cart">{shoppingCartIcon()}</Link>
                        <span>{gearIcon()}</span>
                        <button onClick={() => logout.logout(setUser)}>{user.name} Logout</button>
                    </div>
            }
        </main>
    )
}