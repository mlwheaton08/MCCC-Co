import { useEffect, useState } from "react"
import { addOrderItem, fetchOrders, fetchPack } from "../../APIManager"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { ItemCard } from "../items/ItemCard"

export const PackDetail = ({ getNavCartItemTotal }) => {

    window.scrollTo(0, 0);

    const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

    const navigate = useNavigate()

    let location = useLocation()
    const {id} = useParams()

    const [pack, setPack] = useState({})
    const [packItems, setPackItems] = useState([])
    // const [packValue, setPackValue] = useState(0)
    // const [packPrice, setPackPrice] = useState(0)

    const [addToCartDisabled, setAddToCartDisabled] = useState(false)

    const getPack = async () => {
        const response = await fetchPack(id)
        setPack(response)
        setPackItems(response.packItems)
        // getPackValue(response.packItems)
    }

    useEffect(() => {
        getPack()
    },[])

    // const getPackValue = (packItems) => {
    //     let value = 0
    //     for (const packItem of packItems) {
    //         value += packItem.item.price
    //     }
    //     const price = value - (value * 0.078)

    //     setPackValue(value)
    //     setPackPrice(price.toFixed(2))
    // }

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
        for await (const packItem of packItems) {
            const orderItemToAdd = {
                orderId: userOpenOrder[0].id,
                itemId: packItem.itemId,
                itemQuantity: 1
            }
            await addOrderItem(orderItemToAdd)
        }

        setAddToCartDisabled(true)
        setTimeout(enableAddToCart, 2000)
        await getNavCartItemTotal(localUser.firebaseId)
    }


    return (
        <main className="w-4/5 mx-auto my-nav-height-plus flex flex-col items-center gap-28">
            <section className="flex flex-col items-center">
                <img
                    src={pack.image}
                    alt={`${pack.name} cymbal pack`}
                    className="h-96"
                />
                {/* Name, Description, Price */}
                <div className="mt-4 flex flex-col items-center gap-4">
                    <h4 className="text-5xl font-thin">MCCC Co. {pack.name} Pack</h4>
                    <p className="text-xl font-thin">{pack.description}</p>
                    {/* <p className="text-2xl font-thin">
                        <span className="text-text-secondary-color line-through">${packValue}</span>
                        <span className="text-accent-primary-color-light"> ${packPrice}</span>
                    </p> */}
                </div>
                {
                    !localUser
                    ? <button
                        className="mt-24 px-4 py-1 bg-accent-secondary-color-dark text-2xl font-semibold text-bg-primary-color transition-all duration-300 hover:bg-accent-secondary-color"
                        onClick={toLogin}
                    >
                        Sign in to add to cart!
                    </button>
                    : addToCartDisabled
                        ? <span className="mt-24 px-4 py-1 text-2xl text-accent-primary-color-light">
                            Pack added to cart!
                        </span>
                        : <button
                            className="mt-24 px-4 py-1 bg-accent-primary-color-dark text-2xl text-text-secondary-color transition-all duration-300 hover:bg-accent-primary-color hover:text-text-primary-color"
                            onClick={handleAddToCart}
                        >
                            Add to cart
                        </button>
                }
            </section>
            {/* Item Cards */}
            <section className="flex flex-col items-center gap-8">
                <h6 className="text-2xl font-thin underline">Includes</h6>
                <div className="flex justify-center flex-wrap">
                    {
                        packItems.map((item) => {
                            return (
                                <ItemCard
                                    key={item.id}
                                    item={item.item}
                                    showPrice={false}
                                />
                            )
                        })
                    }
                </div>
            </section>
        </main>
    )
}