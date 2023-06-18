import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addOrder, fetchOrders, fetchUserByFirebaseIdWithAddresses, updateOrder } from "../../APIManager"
import { CheckoutItem } from "./CheckoutItem"
import { UserAddressForm } from "../account/UserAddressForm"

export const Checkout = ({ getNavCartItemTotal, setIsItemFilterActive }) => {

    const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

    const navigate = useNavigate()

    const [order, setOrder] = useState()
    const [orderItems, setOrderItems] = useState([])
    
    const [shippingAddresses, setShippingAddresses] = useState([])
    const [shippingAddressEdit, setShippingAddressEdit] = useState(null)
    const [shippingAddressState, setShippingAddressState] = useState({})
    const [orderHasAddress, setOrderHasAddress] = useState(true)

    const getAddresses = async () => {
        const response = await fetchUserByFirebaseIdWithAddresses(localUser.firebaseId)
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
        getAddresses()
        getOrder()
    },[])

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
            window.alert("Please fill out the required fields, highlighted in green.")
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
        const newConfirmationNumber = getConfirmationNumber()
        const cartPrice = getCartTotalPrice()

        const currentOrder = {
            id: order.id,
            userId: order.userId,
            dateCreated: order.dateCreated,
            dateCompleted: new Date(),
            rewardsUsed: null,
            totalValue: cartPrice,
            totalPaid: cartPrice,
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

        window.alert(`ORDER COMPLETE\nCONFIRMATION NUMBER: ${newConfirmationNumber}`)
        await getNavCartItemTotal(localUser.firebaseId)
        navigate("/")
    }


    return (
        <main className="my-nav-height-plus">
            {
                !orderItems || orderItems.length === 0
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
                                                    userId: "",
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
                                : <div>
                                    <UserAddressForm
                                        addressState={shippingAddressState}
                                        setAddressState={setShippingAddressState}
                                        showDiscardButton={orderHasAddress}
                                        handleDiscard={handleAddressDiscardChanges}
                                        handleSave={handleSaveAddress}
                                        currentRoute="checkout"
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
                        <button
                            className="mt-12 px-4 py-1 self-center bg-accent-primary-color-dark text-2xl text-text-secondary-color transition-all duration-300 hover:text-text-primary-color"
                            onClick={handlePurchase}
                        >
                            Complete order (${getCartTotalPrice()})
                        </button>
                    </section>
                </div>
            }
        </main>
    )
}