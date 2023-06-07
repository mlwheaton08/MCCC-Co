import { Search } from "./Search"
import logo from "../../images/MCCC Logo.png"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { chevronDownIcon, gearIcon, shoppingCartIcon, signOutIcon } from "../../icons"
import { useEffect, useState } from "react"
import { logout } from "../helpers/logout"

export const Nav = ({ cartItemCount }) => {
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
        rewardsPoints: 0,
        openOrderItemTotal: 0
    })
    const [showCymbalsNavDropdown, setShowCymbalsNavDropdown] = useState(false)
    const [showProfileNavDropdown, setShowProfileNavDropdown] = useState(false)
    const [topDropdownHover, setTopDropdownHover] = useState("bg-black")
    const [signOutHover, setSignOutHover] = useState("")

    useEffect(() => {
        setUser(localUser)
    },[location])

    const toLogin = () => {
        if (location.pathname !== "/register" && location.pathname !== "/login") {
            sessionStorage.setItem("prevLocation", location.pathname)
        }
        navigate("/login")
    }


    return (
        <main className="fixed top-0 w-full h-nav-height flex justify-between items-center bg-bg-secondary-color text-xl">
            <img
                className="h-full hover:cursor-pointer"
                src={logo}
                alt="MCCC logo"
                onClick={() => navigate("/")}
            />

            {/* Cymbals */}
            <Link
                to="/items/PurchaseCount/false"
                className="h-full px-3 flex items-center gap-2 hover:bg-bg-tint-color-2"
                onMouseOver={() => setShowCymbalsNavDropdown(true)}
                onMouseOut={() => setShowCymbalsNavDropdown(false)}
            >
                <span>Cymbals</span>
                <span>{chevronDownIcon()}</span>
            </Link>
            
            {/* Distributors */}
            <Link to="/distributors">Distributors</Link>
            <Search />
            
            {/* User and Cart */}
            {
                !user
                    ? <span
                        to="/login"
                        className="h-full px-5 flex items-center text-accent-secondary-color-light hover:bg-bg-tint-color-2 hover:cursor-pointer"
                        onClick={toLogin}
                    >
                        <span>
                            Sign In
                        </span>
                    </span>
                    : <div className="h-full flex items-center gap-8 mr-6">

                        {/* User Dropdown */}
                        <div
                            className="h-full relative"
                            onMouseOver={() => setShowProfileNavDropdown(true)}
                            onMouseOut={() => setShowProfileNavDropdown(false)}
                        >
                            <Link
                                to={`/account/${user.firebaseId}`}
                                className="h-full px-5 flex items-center gap-2 hover:bg-bg-tint-color-2"
                            >
                                {
                                    !user.name
                                        ? <span>User</span>
                                        : <span>{user.name}</span>
                                }
                                <span>{chevronDownIcon(showProfileNavDropdown)}</span>
                            </Link>
                            {
                                !showProfileNavDropdown
                                    ? ""
                                    : <div className="absolute -right-5 w-48 flex flex-col">
                                        {/* Dropdown diamond */}
                                        <div className={`absolute -top-1 right-11 translate-x-1/2 w-4 h-4 mx-auto rotate-45 ${topDropdownHover}`}></div>
                                        {/* Dropdown options container */}
                                        <div className="z-10 float-right min-w-fit flex flex-col rounded bg-black font-thin">
                                            <span
                                                className="w-full p-3 rounded-none hover:bg-accent-secondary-color-dark hover:text-bg-primary-color hover:font-normal hover:cursor-pointer"
                                                onMouseOver={() => setTopDropdownHover("bg-accent-secondary-color-dark")}
                                                onMouseOut={() => setTopDropdownHover("bg-black")}
                                                onClick={() => {
                                                    navigate(`/account/${user.firebaseId}`)
                                                    setShowProfileNavDropdown(false)
                                                }}
                                            >
                                                Account
                                            </span>
                                            <span
                                                className="w-full p-3 rounded-none hover:bg-accent-secondary-color-dark hover:text-bg-primary-color hover:font-normal hover:cursor-pointer"
                                                onClick={() => {
                                                    navigate(`/favorites/${user.firebaseId}`)
                                                    setShowProfileNavDropdown(false)
                                                }}
                                            >
                                                Saved
                                            </span>
                                            <span
                                                className="w-full p-3 rounded-none hover:bg-accent-secondary-color-dark hover:text-bg-primary-color hover:font-normal hover:cursor-pointer"
                                                onClick={() => {
                                                    navigate("/orderHistory")
                                                    setShowProfileNavDropdown(false)
                                                }}
                                            >
                                                Order History
                                            </span>
                                            <button
                                                onMouseOver={() => setSignOutHover("-rotate-180")}
                                                onMouseOut={() => setSignOutHover("")}
                                                onClick={() => {
                                                    setSignOutHover("")
                                                    logout.logout(setUser, navigate)
                                                    setShowProfileNavDropdown(false)
                                                }}
                                                className="w-full mx-auto p-3 flex justify-between items-center gap-2 rounded-none text-center text-accent-secondary-color-light hover:bg-bg-tint-color-2"
                                            >
                                                <span>Sign Out</span>
                                                <span>{signOutIcon(signOutHover)}</span>
                                            </button>
                                        </div>
                                    </div>
                            }
                        </div>

                        {/* Cart */}
                        <Link
                            to="/cart"
                            className="relative p-3 rounded-full hover:bg-bg-tint-color-2"
                        >
                            <span>{shoppingCartIcon()}</span>
                            <div className="absolute top-0 right-0 w-4 h-4 flex flex-col justify-center items-center rounded-full bg-accent-secondary-color-light">
                                <span
                                    className="text-sm font-semibold text-bg-primary-color">
                                        {
                                            !cartItemCount
                                                ? 0
                                                : cartItemCount
                                        }
                                </span>
                            </div>
                        </Link>

                    </div>
            }
        </main>
    )
}