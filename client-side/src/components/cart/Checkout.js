import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addOrder, fetchOrders, fetchUserByFirebaseIdWithAddresses, updateOrder, updateUser } from "../../APIManager"
import { CheckoutItem } from "./CheckoutItem"
import { UserAddressForm } from "../account/UserAddressForm"
import { arrowRightIcon } from "../../icons"
import { alertTopRed, alertTopYellow } from "../alerts/AlertTop"

export const Checkout = ({ getNavCartItemTotal, setIsItemFilterActive }) => {

    const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

    const navigate = useNavigate()

    const [order, setOrder] = useState()
    const [orderItems, setOrderItems] = useState([])
    
    const [user, setUser] = useState({})
    const [rewardsUsed, setRewardsUsed] = useState(0)
    const [shippingAddresses, setShippingAddresses] = useState([])
    const [shippingAddressEdit, setShippingAddressEdit] = useState(null)
    const [shippingAddressState, setShippingAddressState] = useState({
        companyName: "",
        lineOne: "",
        lineTwo: "",
        city: "",
        state: "",
        zipCode: "",
        country: ""
    })
    const [alert, setAlert] = useState("")
    const [addressFormError, setAddressFormError] = useState(false)
    const [orderHasAddress, setOrderHasAddress] = useState(true)
    const [orderConfirmationNumber, setOrderConfirmationNumber] = useState("")
    const [rewardsEarned, setRewardsEarned] = useEffect(0)

    const getUser = async () => {
        const response = await fetchUserByFirebaseIdWithAddresses(localUser.firebaseId)
        setUser(response)
        setShippingAddresses(response.addresses)
    }

    const getOrder = async () => {
        const response = await fetchOrders(localUser.firebaseId, false)
        if (response.length > 0) {
            setOrder(response[0])
            setOrderItems(response[0].orderItems)
            if (!response[0].shipLineOne) {
                setOrderHasAddress(false)
                setShippingAddressEdit(true)
            } else {
                setShippingAddressState({
                    companyName: response[0].shipCompanyName,
                    lineOne: response[0].shipLineOne,
                    lineTwo: response[0].shipLineTwo,
                    city: response[0].shipCity,
                    state: response[0].shipState,
                    zipCode: response[0].shipZIPCode,
                    country: response[0].shipCountry
                })
            }
        }
    }

    useEffect(() => {
        getUser()
        getOrder()
    },[])

    useEffect(() => {
        if (!shippingAddressEdit) {
            setAddressFormError(false)
        }
    },[shippingAddressEdit])

    const hideAlert = () => {
        setAlert("")
    }

    const handleAddressDropdownChange = (addressId) => {
        if (!addressId) {
            setShippingAddressState({
                companyName: "",
                lineOne: "",
                lineTwo: "",
                city: "",
                state: "",
                zipCode: "",
                country: ""
            })
        } else {
            const selectedAddress = shippingAddresses.find((a) => a.id === parseInt(addressId))
            setShippingAddressState({
                companyName: selectedAddress.companyName,
                lineOne: selectedAddress.lineOne,
                lineTwo: selectedAddress.lineTwo,
                city: selectedAddress.city,
                state: selectedAddress.state,
                zipCode: selectedAddress.zipCode,
                country: selectedAddress.country
            })
        }
    }

    const handleAddressDiscardChanges = () => {
        setShippingAddressEdit(null)
        setShippingAddressState({
            companyName: order.shipCompanyName,
            lineOne: order.shipLineOne,
            lineTwo: order.shipLineTwo,
            city: order.shipCity,
            state: order.shipState,
            zipCode: order.shipZIPCode,
            country: order.shipCountry
        })
    }

    const handleSaveAddress = async () => {
        if (!shippingAddressState.lineOne
            || !shippingAddressState.city
            || !shippingAddressState.state
            || !shippingAddressState.zipCode
            || !shippingAddressState.country) {
            setAddressFormError(true)
            setAlert(alertTopRed("Please fill out the required fields."))
            setTimeout(hideAlert, 2000)
        } else {
            const orderToUpdate = order
            orderToUpdate.shipCompanyName = shippingAddressState.companyName
            orderToUpdate.shipLineOne = shippingAddressState.lineOne
            orderToUpdate.shipLineTwo = shippingAddressState.lineTwo
            orderToUpdate.shipCity = shippingAddressState.city
            orderToUpdate.shipState = shippingAddressState.state
            orderToUpdate.shipZIPCode = shippingAddressState.zipCode
            orderToUpdate.shipCountry = shippingAddressState.country

            await updateOrder(order.id, orderToUpdate)
            setShippingAddressEdit(null)
            setOrderHasAddress(true)
            await getOrder()
            setAlert(alertTopYellow("Address saved."))
            setTimeout(hideAlert, 2000)
        }
    }

    const orderItemCountMessage = () => {
        let count = 0
        for (const orderItem of orderItems) {
            count += orderItem.itemQuantity
        }

        if (count === 1) {
            return "1 item"
        } else {
            return `${count} items`
        }
    }

    const handleRewardsInput = (rewardsNum) => {
        if (rewardsNum > user.rewardsPoints) {
            setRewardsUsed(user.rewardsPoints)
        } else if (rewardsNum < 0 || !rewardsNum) {
            setRewardsUsed(0)
        } else {
            setRewardsUsed(rewardsNum)
        }
    }

    const getCartTotalPrice = () => {
        let total = 0
        for (const orderItem of orderItems) {
            total += (orderItem.itemQuantity * orderItem.item.price)
        }
        return total
    }

    const getConfirmationNumber = () => {
        let result = ''
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        for (let i = 20; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)]
        }
        return result;
    }

    const handlePurchase = async () => {
        // complete order
        const newConfirmationNumber = getConfirmationNumber()
        const cartPrice = getCartTotalPrice()

        const currentOrder = {
            id: order.id,
            userId: order.userId,
            dateCreated: order.dateCreated,
            dateCompleted: new Date(),
            rewardsUsed: rewardsUsed,
            totalValue: cartPrice,
            totalPaid: cartPrice - rewardsUsed,
            confirmationNumber: newConfirmationNumber,
            shipCompanyName: order.shipCompanyName,
            shipLineOne: order.shipLineOne,
            shipLineTwo: order.shipLineTwo,
            shipCity: order.shipCity,
            shipState: order.shipState,
            shipZIPCode: order.shipZIPCode,
            shipCountry: order.shipCountry
        }

        await updateOrder(order.id, currentOrder)

        // update user rewards points
        const earnedRewards = Math.round((cartPrice * 0.05))
        setRewardsEarned(earnedRewards)

        const newUserObj = {
            id: user.id,
            firebaseId: user.firebaseId,
            isAdmin: user.isAdmin,
            name: user.name,
            email: user.email,
            rewardsPoints: (user.rewardsPoints - rewardsUsed) + earnedRewards
        }
        await updateUser(user.id, newUserObj)
        
        // create new open order
        const userOpenOrder = await fetchOrders(localUser.firebaseId, false)
        if (!userOpenOrder[0]) {
            let newOpenOrder = {
              userId: localUser.id,
              dateCreated: new Date(),
              dateCompleted: null,
              rewardsUsed: null,
              totalValue: null,
              totalPaid: null,
              confirmationNumber: null,
              shipCompanyName: null,
              shipLineOne: null,
              shipLineTwo: null,
              shipCity: null,
              shipState: null,
              shipZIPCode: null,
              shipCountry: null
            }
            const defaultAddress = shippingAddresses.find((a) => a.isDefault)
            if (defaultAddress) {
              newOpenOrder.shipCompanyName = defaultAddress.companyName
              newOpenOrder.shipLineOne = defaultAddress.lineOne
              newOpenOrder.shipLineTwo = defaultAddress.lineTwo
              newOpenOrder.shipCity = defaultAddress.city
              newOpenOrder.shipState = defaultAddress.state
              newOpenOrder.shipZIPCode = defaultAddress.zipCode
              newOpenOrder.shipCountry = defaultAddress.country
            }
            await addOrder(newOpenOrder)
          }

        await getNavCartItemTotal(localUser.firebaseId)

        // show order completed view
        setOrderConfirmationNumber(newConfirmationNumber)
    }


    return (
        <main className="my-nav-height-plus">

            {alert}

            {
                orderConfirmationNumber
                    ? <div className="flex flex-col items-center text-text-primary-color">
                        <h3 className="mb-3 font-light text-4xl">Your order has been placed!</h3>
                        <p className="mb-10 font-light text-2xl">Confirmation number: {orderConfirmationNumber}</p>
                        <p>
                            <span>+{rewardsEarned} </span>
                            <span>Rewards</span>
                        </p>
                        <button
                            className="flex items-center gap-2 px-3 py-1 bg-accent-primary-color-dark text-2xl font-thin rounded transition-property:gap duration-300 hover:gap-3"
                            onClick={() => {
                                setIsItemFilterActive(false)
                                navigate("/cymbals")
                            }}
                        >
                            <span>Continue Shopping</span>
                            <span>{arrowRightIcon()}</span>
                        </button>
                    </div>
                    : !orderItems || orderItems.length === 0
                        ? <div className="flex flex-col items-center text-text-primary-color">
                            <h3 className="mb-8 font-light text-3xl">There are no items in your cart.</h3>
                            <button
                                className="px-4 py-1 flex items-center gap-2 bg-accent-primary-color-dark text-2xl text-text-secondary-color transition-all duration-300 hover:bg-accent-primary-color hover:text-text-primary-color"
                                onClick={() => {
                                    setIsItemFilterActive(false)
                                    navigate("/cymbals")
                                }}
                            >
                                Start Shopping!
                            </button>
                        </div>
                        : <div className="flex justify-center gap-8">
                            {/* Shipping address */}
                            <section className="w-1/3 flex flex-col items-center gap-8 text-xl font-thin">
                                <h6 className="text-3xl">Shipping Address</h6>
                                {/* Address */}
                                {
                                    !shippingAddressEdit
                                        ? <div className="flex flex-col gap-3">
                                            <div className="flex flex-col items-center">
                                                {!shippingAddressState.companyName ? "" : <p>{shippingAddressState.companyName}</p>}
                                                <p>{shippingAddressState.lineOne}</p>
                                                {!shippingAddressState.lineTwo ? "" : <p>{shippingAddressState.lineTwo}</p>}
                                                <p>{shippingAddressState.city}, {shippingAddressState.state} {shippingAddressState.zipCode}</p>
                                                <p>{shippingAddressState.country}</p>
                                            </div>
                                            <div className="flex justify-end gap-2 font-thin">
                                                <button
                                                    className="px-2 border border-accent-secondary-color text-accent-secondary-color"
                                                    onClick={() => setShippingAddressEdit(true)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="px-2 border border-accent-secondary-color text-accent-secondary-color"
                                                    onClick={() => {
                                                        setShippingAddressState({
                                                            companyName: "",
                                                            lineOne: "",
                                                            lineTwo: "",
                                                            city: "",
                                                            state: "",
                                                            zipCode: "",
                                                            country: ""
                                                        })
                                                        setShippingAddressEdit(true)
                                                    }}
                                                >
                                                    New
                                                </button>
                                            </div>
                                        </div>
                                        : <div className="flex flex-col gap-3">
                                            {
                                                shippingAddresses.length === 0
                                                    ? ""
                                                    : <div className="flex flex-col">
                                                        <label htmlFor="saved-addresses-dropdown">Saved Addresses: </label>
                                                        <select
                                                            id="saved-addresses-dropdown"
                                                            className="rounded border border-text-secondary-color bg-bg-primary-color text-lg font-thin"
                                                            onChange={(evt) => handleAddressDropdownChange(evt.target.value)}
                                                        >
                                                            <option value={null}></option>
                                                            {
                                                                shippingAddresses.map((address) => {
                                                                    return (
                                                                        <option
                                                                            key={address.id}
                                                                            value={address.id}
                                                                        >
                                                                            {
                                                                                address.nickName
                                                                                    ? address.nickName
                                                                                    : address.lineOne
                                                                            }
                                                                        </option>
                                                                    )
                                                                })
                                                            }
                                                        </select>
                                                    </div>
                                            }
                                            <UserAddressForm
                                                addressState={shippingAddressState}
                                                setAddressState={setShippingAddressState}
                                                showDiscardButton={orderHasAddress}
                                                handleDiscard={handleAddressDiscardChanges}
                                                handleSave={handleSaveAddress}
                                                currentRoute="checkout"
                                                highlightRequiredFields={addressFormError}
                                            />
                                        </div>
                                }
                            </section>
                            {/* Order items */}
                            <section className="w-1/3 flex flex-col">
                                <h2 className="mb-2 text-3xl font-thin">
                                    My Cart ({orderItemCountMessage()})
                                </h2>
                                <div className="flex flex-col rounded border border-text-secondary-color">
                                    {
                                        orderItems.map((orderItem, index) => {
                                            return (
                                                <CheckoutItem
                                                    key={orderItem.id}
                                                    orderItem={orderItem}
                                                    getOrder={getOrder}
                                                    getNavCartItemTotal={getNavCartItemTotal}
                                                    localUser={localUser}
                                                    isLastItem={index === (orderItems.length - 1)}
                                                />
                                            )
                                        })
                                    }
                                </div>
                                <div className="mt-4 flex flex-col items-start text-xl font-thin">
                                    <p>Total: ${getCartTotalPrice()}</p>
                                    <p>Rewards Available: {user.rewardsPoints - rewardsUsed}</p>
                                    <div>
                                        <label htmlFor="rewards-input-checkout">Apply rewards: </label>
                                        <input
                                            id="rewards-input-checkout"
                                            type="number"
                                            value={rewardsUsed}
                                            className="w-14 pl-1 rounded border border-text-secondary-color bg-bg-primary-color text-lg font-thin"
                                            onChange={(evt) => handleRewardsInput(evt.target.value)}
                                        />
                                    </div>
                                    <p className="mt-2 text-2xl font-normal">Grand Total: ${getCartTotalPrice() - rewardsUsed}</p>
                                </div>
                                <button
                                    className="mt-12 px-4 py-1 self-center bg-accent-primary-color-dark text-2xl text-text-secondary-color transition-all duration-300 hover:text-text-primary-color"
                                    onClick={handlePurchase}
                                >
                                    Complete order
                                </button>
                            </section>
                        </div>
            }
        </main>
    )
}