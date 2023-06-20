import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { addOrderItem, fetchItem, fetchOrders } from "../../APIManager"
import { caretDownIcon } from "../../icons"

export const ItemDetail = ({ getNavCartItemTotal }) => {
    const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

    const navigate = useNavigate()

    let location = useLocation()
    const {id} = useParams()

    const [item, setItem] = useState({
        id: 0,
        typeId: 0,
        seriesId: 0,
        height: null,
        width: 0,
        depth: 0,
        description: null,
        image: "",
        price: 0,
        purchaseCount: 0,
        type: {
          id: 0,
          name: "",
          image: null
        },
        series: {
          id: 0,
          name: "",
          alloy: "",
          brightnessLevel: 0,
          description: "",
          image: null
        }
    })
    const [itemApplications, setItemApplications] = useState([])
    const [orderItem, setOrderItem] = useState({
        itemId: parseInt(id),
        itemQuantity: 1
    })

    const [addToCartDisabled, setAddToCartDisabled] = useState(false)

    const getItem = async () => {
        const fetchedItem = await fetchItem(id)
        setItem(fetchedItem)
        setItemApplications(fetchedItem.applications)
    }

    const getCymbalBrightness = () => {
        return item.series.brightnessLevel
    }

    useEffect(() => {
        getItem()
    },[])

    useEffect(() => {
        if (item) {
            getCymbalBrightness()
        }
    },[item])

    const toLogin = () => {
        if (location.pathname !== "/register" && location.pathname !== "/login") {
            sessionStorage.setItem("prevLocation", location.pathname)
        }
        navigate("/login")
    }

    const enableAddToCart = () => {
        setAddToCartDisabled(false)
    }

    const handleAddToCart = async () => {
        const userOpenOrder = await fetchOrders(localUser.firebaseId, false)
        const orderItemToAdd = {
            orderId: userOpenOrder[0].id,
            itemId: orderItem.itemId,
            itemQuantity: orderItem.itemQuantity
        }
        await addOrderItem(orderItemToAdd)
        setAddToCartDisabled(true)
        setTimeout(enableAddToCart, 2000)
        await getNavCartItemTotal(localUser.firebaseId)
    }


    return (
        <main className="my-nav-height-plus">
            {/* Item Container */}
            <section className="flex justify-between flex-wrap">
                {/* Image */}
                <img
                    src={item.image}
                    alt={`Cymbal - ${item.width} ${item.series.name} ${item.type.name}`}
                    className="w-1/2"
                />
                {/* Item Details Container */}
                <section className="w-1/2 pl-8 pr-24 flex flex-col justify-between items-center">
                    {/* Item Header */}
                    <div className="w-full flex justify-between">
                        {/* Header Left */}
                        <div>
                            <h2 className="text-5xl">{item.width}" {item.series.name} {item.type.name}</h2>
                            <h3 className="text-3xl font-thin">${item.price}</h3>
                        </div>
                        {/* Header Right */}
                        <div className="text-right">
                            <h3 className="text-3xl font-semibold">Alloy</h3>
                            <h4 className="text-xl font-thin">{item.series.alloy}</h4>
                        </div>
                    </div>
                    {/* Details */}
                    <div className="flex justify-between items-center">
                        {/* Brightness and Description */}
                        <div className="w-2/3 flex flex-col gap-14">
                            <div className="w-3/5">
                                <h4 className="text-2xl">Brightness</h4>
                                <div>
                                    {caretDownIcon(`relative left-${getCymbalBrightness()}/4 h-6 fill-accent-primary-color`)}
                                </div>
                                <div className="w-full h-4 px-2 flex justify-between rounded-full bg-yellow-300 bg-gradient-to-r from-amber-900"></div>
                            </div>
                            <div>
                                <h4 className="text-2xl">Description</h4>
                                <p className="text-xl font-thin">{item.series.description}</p>
                            </div>
                        </div>
                        {/* Applications */}
                        <div className="text-right">
                            <h4 className="mb-1 text-2xl font-semibold">Applications</h4>
                            <ul>
                                {
                                    itemApplications.map((app, index) => {
                                        return <li
                                            key={`itemApplication--${index}`}
                                            className="text-lg font-thin"
                                        >
                                            {app}
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    {/* Purchase Options */}
                    {
                        !localUser
                            ? <button
                                className="px-4 py-1 bg-accent-secondary-color-dark text-2xl font-semibold text-bg-primary-color transition-all duration-300 hover:bg-accent-secondary-color"
                                onClick={toLogin}
                            >
                                Sign in to add to cart!
                            </button>
                            : <div className="w-full flex justify-start items-center gap-10">
                                <div>
                                    <span className="text-2xl font-thin">Quantity: </span>
                                    <select
                                        className="bg-bg-secondary-color text-lg font-thin"
                                        onChange={async (evt) => {
                                            const copy = {...orderItem}
                                            copy.itemQuantity = parseInt(evt.target.value)
                                            setOrderItem(copy)
                                        }}
                                    >
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                    </select>
                                </div>
                                {
                                    addToCartDisabled
                                        ? <span className="px-4 py-1 text-2xl text-accent-primary-color-light">
                                            Item added to cart!
                                        </span>
                                        : <button
                                            className="px-4 py-1 bg-accent-primary-color-dark text-2xl text-text-secondary-color transition-all duration-300 hover:bg-accent-primary-color hover:text-text-primary-color"
                                            onClick={handleAddToCart}
                                        >
                                            Add to cart
                                        </button>
                                }
                            </div>
                    }
                </section>
            </section>
        </main>
    )
}