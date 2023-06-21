import { useEffect, useState } from "react"
import { addUserShippingAddress, deleteUserShippingAddress, fetchUserByFirebaseIdWithAddresses, updateUser, updateUserShippingAddress } from "../../APIManager"
import { editIcon, plusSignIcon, trashCanIcon } from "../../icons"
import { UserAddressForm } from "./UserAddressForm"
import { alertTopYellow, alertTopRed } from "../alerts/AlertTop"

export const Account = ({ getNavUserName }) => {

    const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

    const [user, setUser] = useState({})
    const [shippingAddresses, setShippingAddresses] = useState([])

    const [userNameEdit, setUserNameEdit] = useState(false)
    const [userNameState, setUserNameState] = useState("")
    const [userNameInputError, setUserNameInputError] = useState(false)

    const [shippingAddressEdit, setShippingAddressEdit] = useState(null)
    const [shippingAddressState, setShippingAddressState] = useState({
        userId: null,
        nickName: "",
        companyName: "",
        lineOne: "",
        lineTwo: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        isDefault: false
    })

    const [addressFormError, setAddressFormError] = useState(false)
    const [alert, setAlert] = useState("")

    const getUser = async () => {
        const response = await fetchUserByFirebaseIdWithAddresses(localUser.firebaseId)
        setUser(response)
        setShippingAddresses(response.addresses)
        setUserNameState(response.name)
    }

    const hideAlert = () => {
        setAlert("")
    }

    useEffect(() => {
        getUser()
    },[])

    useEffect(() => {
        if (!userNameEdit) {
            setUserNameInputError(false)
        }
    },[userNameEdit])

    useEffect(() => {
        if (userNameState.match(/^ *$/) !== null) {
            setUserNameInputError(true)
        } else {
            setUserNameInputError(false)
        }
    },[userNameState])

    useEffect(() => {
        if (!shippingAddressEdit) {
            setAddressFormError(false)
        }
    },[shippingAddressEdit])

    const handleUserNameEdit = async () => {
        if (userNameState.match(/^ *$/) !== null) {
            setUserNameInputError(true)
            setAlert(alertTopRed("Please enter a name."))
            setTimeout(hideAlert, 2000)
        } else if (userNameState === user.name) {
            setUserNameEdit(false)
        } else {
            const newUserObj = {
                id: localUser.id,
                firebaseId: localUser.firebaseId,
                isAdmin: localUser.isAdmin,
                name: userNameState,
                email: localUser.email,
                rewardsPoints: localUser.rewardsPoints,
                type: localUser.type
            }
            await updateUser(user.id, newUserObj)
            await getUser()
            localStorage.setItem("user", JSON.stringify(newUserObj))
            await getNavUserName()
            setUserNameEdit(false)
            setAlert(alertTopYellow("Profile name updated."))
            setTimeout(hideAlert, 2000)
        }
    }

    const changeDefaultShippingAddress = async (newDefaultAddress) => {
        const oldDefaultAddress = shippingAddresses.find((a) => a.isDefault)
        if (oldDefaultAddress) {
            oldDefaultAddress.isDefault = false
            await updateUserShippingAddress(oldDefaultAddress.id, oldDefaultAddress)
        }

        newDefaultAddress.isDefault = true
        await updateUserShippingAddress(newDefaultAddress.id, newDefaultAddress)
        await getUser()
        setAlert(alertTopYellow("Default shipping address changed."))
        setTimeout(hideAlert, 2000)
    }

    const handleShippingAddressDelete = async (addressId, address) => {
        if (address.isDefault) {
            const nextInLineDefaultAddress = shippingAddresses.find((a) => !a.isDefault)
            if (nextInLineDefaultAddress) {
                nextInLineDefaultAddress.isDefault = true
                await updateUserShippingAddress(nextInLineDefaultAddress.id, nextInLineDefaultAddress)
            }
        }
        await deleteUserShippingAddress(addressId)
        await getUser()
        setAlert(alertTopYellow("Shipping address deleted."))
        setTimeout(hideAlert, 2000)
    }

    const openAddressForm = (addressId, addressObj) => {
        setShippingAddressEdit(addressId)
        setShippingAddressState(addressObj)
    }

    const handleAddressSaveChanges = async () => {
        if (!shippingAddressState.lineOne
            || !shippingAddressState.city
            || !shippingAddressState.state
            || !shippingAddressState.zipCode
            || !shippingAddressState.country) {
            setAddressFormError(true)
            setAlert(alertTopRed("Please fill out the required fields."))
            setTimeout(hideAlert, 2000)
        } else {
            await updateUserShippingAddress(shippingAddressState.id, shippingAddressState)
            await getUser()
            setShippingAddressEdit(null)
            setShippingAddressState({
                userId: null,
                nickName: "",
                companyName: "",
                lineOne: "",
                lineTwo: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
                isDefault: false
            })
            setAlert(alertTopYellow("Address changes saved."))
            setTimeout(hideAlert, 2000)
        }
    }

    const handleAddressDiscardChanges = () => {
        setShippingAddressEdit(null)
        setShippingAddressState({
            userId: null,
            nickName: "",
            companyName: "",
            lineOne: "",
            lineTwo: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            isDefault: false
        })
    }

    const handleAddNewAddress = async () => {
        if (!shippingAddressState.lineOne
            || !shippingAddressState.city
            || !shippingAddressState.state
            || !shippingAddressState.zipCode
            || !shippingAddressState.country) {
            setAddressFormError(true)
            setAlert(alertTopRed("Please fill out the required fields."))
            setTimeout(hideAlert, 2000)
        } else {
            shippingAddressState.userId = user.id
            // make default if there are no other addresses
            if (shippingAddresses.length === 0) {
                shippingAddressState.isDefault = true
            }
            await addUserShippingAddress(shippingAddressState)
            await getUser()
            setShippingAddressEdit(null)
            setShippingAddressState({
                userId: null,
                nickName: "",
                companyName: "",
                lineOne: "",
                lineTwo: "",
                city: "",
                state: "",
                zipCode: "",
                country: "",
                isDefault: false
            })
            setAlert(alertTopYellow("New shipping address saved."))
            setTimeout(hideAlert, 2000)
        }
    }


    return (
        <main className="my-nav-height-plus font-thin">

                {alert}

                {/* Name and Shipping */}
                <section className="flex flex-col justify-center items-center gap-36">
                    {/* Name */}
                    {
                        !userNameEdit
                            ? <div className="flex items-center gap-6">
                                <span className="text-4xl">{user.name}</span>
                                <span className="hover:cursor-pointer" onClick={() => setUserNameEdit(true)}>{editIcon("h-5 fill-accent-secondary-color")}</span>
                            </div>
                            : <div className="flex items-center gap-6">
                                <input
                                    autoFocus
                                    value={userNameState}
                                    className={`px-2 py-1 text-2xl bg-bg-tint-color-2 focus:outline-none ${userNameInputError ? "border border-accent-primary-color-dark" : ""}`}
                                    onChange={(evt) => setUserNameState(evt.target.value)}
                                />
                                <button
                                    className="px-3 py-1 border border-accent-secondary-color text-accent-secondary-color font-normal"
                                    onClick={handleUserNameEdit}
                                >
                                        Save
                                    </button>
                            </div>
                    }
                    {/* Shipping */}
                    <div>
                        <h4 className="mb-2 text-2xl font-normal">Saved addresses</h4>
                        {/* Addresses container */}
                        <div className="flex items-start gap-8">
                            {
                                shippingAddresses.map((address) => {
                                    return (
                                        shippingAddressEdit === address.id
                                            ? <UserAddressForm
                                                key={address.id}
                                                addressState={shippingAddressState}
                                                setAddressState={setShippingAddressState}
                                                showDiscardButton={true}
                                                handleDiscard={handleAddressDiscardChanges}
                                                handleSave={handleAddressSaveChanges}
                                                highlightRequiredFields={addressFormError}
                                            />
                                            : <div
                                                key={address.id}
                                                className={`relative p-4 pb-2 flex flex-col rounded bg-bg-tint-color text-xl
                                                    ${!address.isDefault ? "" : "border border-accent-secondary-color"}`}
                                            >
                                                {!address.nickName ? "" : <p className="mb-2 underline">{address.nickName}</p>}
                                                {!address.companyName ? "" : <p>{address.companyName}</p>}
                                                <p>{address.lineOne}</p>
                                                {!address.lineTwo ? "" : <p>{address.lineTwo}</p>}
                                                <p>{address.city}, {address.state} {address.zipCode}</p>
                                                <p>{address.country}</p>

                                                {/* Set as default */}
                                                {
                                                    address.isDefault || shippingAddressEdit
                                                        ? ""
                                                        : <span
                                                            className="self-end mt-2 text-base text-accent-secondary-color underline hover:cursor-pointer"
                                                            onClick={() => changeDefaultShippingAddress(address)}
                                                        >
                                                            set as default
                                                        </span>
                                                }
                                                {/* Edit and Delete */}
                                                {
                                                    shippingAddressEdit
                                                        ? ""
                                                        : <div className="absolute top-1 right-1 flex gap-3">
                                                            <span
                                                                className="hover:cursor-pointer"
                                                                onClick={() => openAddressForm(address.id, address)}
                                                            >
                                                                {editIcon("h-4 fill-accent-secondary-color")}
                                                            </span>
                                                            <span
                                                                className="hover:cursor-pointer"
                                                                onClick={() => handleShippingAddressDelete(address.id, address)}
                                                            >
                                                                {trashCanIcon("h-4 fill-accent-secondary-color")}
                                                            </span>
                                                        </div>
                                                }

                                            </div>
                                    )
                                })
                            }

                            {/* Add address */}
                            {
                                shippingAddressEdit === null
                                    ? <div
                                        className="self-center w-20 h-20 flex justify-center items-center rounded fill-bg-primary-color bg-bg-tint-color-2 hover:bg-bg-tint-color-3 hover:cursor-pointer"
                                        onClick={() => setShippingAddressEdit("addNew")}
                                    >
                                        {plusSignIcon("h-4/5")}
                                    </div>
                                    : shippingAddressEdit === "addNew"
                                        ? <div className="flex flex-col gap-4">
                                            <h5 className="text-xl">Add a new address</h5>
                                            <UserAddressForm
                                                addressState={shippingAddressState}
                                                setAddressState={setShippingAddressState}
                                                showDiscardButton={true}
                                                handleDiscard={handleAddressDiscardChanges}
                                                handleSave={handleAddNewAddress}
                                                currentRoute="account"
                                                highlightRequiredFields={addressFormError}
                                            />
                                        </div>
                                        : ""
                            }

                        </div>
                    </div>
                </section>

                {/* Rewards points */}
                <div className="absolute top-nav-height-plus right-12 w-40 h-40 flex justify-center items-center rounded-full bg-accent-secondary-color">
                    <div className="w-36 h-36 flex flex-col items-center justify-center rounded-full bg-bg-primary-color text-accent-secondary-color">
                        <span className="text-2xl">Rewards</span>
                        <span className="text-5xl font-semibold">{user.rewardsPoints}</span>
                    </div>
                </div>
        </main>
    )
}