import { Search } from "./Search"
import logo from "../../images/MCCC Logo.png"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { chevronDownIcon, gearIcon, shoppingCartIcon, signOutIcon } from "../../icons"
import { useEffect, useState } from "react"
import { logout } from "../helpers/logout"
import { fetchSeries, fetchTypes } from "../../APIManager"

export const Nav = ({ cartItemCount, setIsItemFilterActive }) => {
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
    const [types, setTypes] = useState([])
    const [series, setSeries] = useState([])
    const [showCymbalsNavDropdown, setShowCymbalsNavDropdown] = useState(false)
    const [showProfileNavDropdown, setShowProfileNavDropdown] = useState(false)
    const [topDropdownHover, setTopDropdownHover] = useState("bg-black")
    const [signOutHover, setSignOutHover] = useState("")

    const getCymbalNavOptions = async () => {
        const typesArray = await fetchTypes()
        setTypes(typesArray)
        const seriesArray = await fetchSeries()
        setSeries(seriesArray)
    }

    useEffect(() => {
        getCymbalNavOptions()
    },[])

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
        <main className="fixed z-50 top-0 w-full h-nav-height flex justify-between items-center bg-bg-secondary-color text-xl">
            <img
                className="h-full hover:cursor-pointer"
                src={logo}
                alt="MCCC logo"
                onClick={() => navigate("/")}
            />
            
            {/* Cymbals Dropdown */}
            <div
                className="h-full relative"
                onMouseOver={() => setShowCymbalsNavDropdown(true)}
                onMouseOut={() => setShowCymbalsNavDropdown(false)}
            >
                <Link
                    to="/cymbals"
                    className="h-full px-5 flex items-center gap-2 hover:bg-bg-tint-color-2"
                    onClick={() => setIsItemFilterActive(false)}
                >
                    <span>Cymbals</span>
                    <span>{chevronDownIcon(showCymbalsNavDropdown)}</span>
                </Link>
                {
                    !showCymbalsNavDropdown
                        ? ""
                        : <div className="relative">
                            {/* Dropdown diamond */}
                            <div className="absolute w-4 h-4 right-4 -top-1 mx-auto rotate-45 bg-bg-quaternary-color"></div>
                            {/* Main container */}
                            <div className="absolute w-third-vw flex justify-around bg-bg-quaternary-color">
                                {/* Type options container */}
                                <div className="w-1/2 flex flex-col text-center">
                                    <h4 className="py-4 border-b border-bg-secondary-color text-accent-primary-color-light font-thin text-base">By Type</h4>
                                    <div className="flex flex-col">
                                        {
                                            types.map((type) => {
                                                return (
                                                    <span
                                                        key={type.id}
                                                        className="w-full p-3 rounded-none hover:bg-accent-primary-color-dark hover:font-normal hover:cursor-pointer"
                                                        onClick={() => {
                                                            navigate(`/cymbals/type/${type.name}`)
                                                            setShowCymbalsNavDropdown(false)
                                                        }}
                                                    >
                                                        {type.name}
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                {/* Series options container */}
                                <div className="w-1/2 flex flex-col text-center">
                                    <h4 className="py-4 border-b border-bg-secondary-color text-accent-primary-color-light font-thin text-base">By Series</h4>
                                    <div className="flex flex-col">
                                        {
                                            series.map((series) => {
                                                return (
                                                    <span
                                                        key={series.id}
                                                        className="w-full p-3 rounded-none hover:bg-accent-primary-color-dark hover:font-normal hover:cursor-pointer"
                                                        onClick={() => {
                                                            navigate(`/cymbals/series/${series.name}`)
                                                            setShowCymbalsNavDropdown(false)
                                                        }}
                                                    >
                                                        {series.name}
                                                    </span>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
            
            {/* Distributors */}
            <Link to="/distributors">Distributors</Link>
            <Search />
            
            {/* Cart and User */}
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
                    : <div className="h-full flex items-center gap-6">

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

                        {/* User */}
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
                                    : <div className="absolute right-0 w-48 flex flex-col">
                                        {/* Dropdown diamond */}
                                        <div className={`absolute -top-1 right-4 w-4 h-4 mx-auto rotate-45 ${topDropdownHover}`}></div>
                                        {/* Dropdown options container */}
                                        <div className="min-w-fit flex flex-col bg-bg-quaternary-color font-thin">
                                            <span
                                                className="w-full p-3 rounded-none hover:bg-accent-secondary-color-dark hover:text-bg-primary-color hover:font-normal hover:cursor-pointer"
                                                onMouseOver={() => setTopDropdownHover("bg-accent-secondary-color-dark")}
                                                onMouseOut={() => setTopDropdownHover("bg-bg-quaternary-color")}
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

                        

                    </div>
            }
        </main>
    )
}