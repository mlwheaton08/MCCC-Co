import { useEffect, useState } from "react"
import { fetchUserByFirebaseIdWithAddresses } from "../../APIManager"
import { checkMarkIcon, editIcon } from "../../icons"

export const Account = () => {

    const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

    const [user, setUser] = useState({})
    const [shippingAddresses, setShippingAddresses] = useState([])

    const getUser = async () => {
        const response = await fetchUserByFirebaseIdWithAddresses(localUser.firebaseId)
        setUser(response)
        setShippingAddresses(response.addresses)
    }

    useEffect(() => {
        getUser()
    },[])


    return (
        <main className="my-nav-height-plus font-thin">

                {/* Name and Shipping */}
                <section className="flex flex-col justify-center items-center gap-36">
                    {/* Name */}
                    <div className="flex items-center gap-6">
                        <span className="text-4xl">{user.name}</span>
                        <span className="hover:cursor-pointer">{editIcon()}</span>
                    </div>
                    {/* Shipping */}
                    <div>
                        <h4 className="mb-2 text-2xl font-normal">Saved addresses</h4>
                        {/* Addresses container */}
                        <div className="flex items-start gap-8">
                            {
                                shippingAddresses.map((address) => {
                                    return (
                                        <div
                                            key={address.id}
                                            className={`p-4 pb-2 flex flex-col rounded bg-bg-tint-color text-xl
                                                ${!address.isDefault ? "" : "border border-accent-secondary-color"}`}
                                        >
                                            {!address.nickName ? "" : <span className="mb-2 underline">{address.nickName}</span>}
                                            {!address.companyName ? "" : <span>{address.companyName}</span>}
                                            <span>{address.lineOne}</span>
                                            {!address.lineTwo ? "" : <span>{address.lineTwo}</span>}
                                            <span>{address.city}, {address.state} {address.zipCode}</span>
                                            <span>{address.country}</span>
                                            {
                                                address.isDefault
                                                    ? ""
                                                    : <span
                                                        className="self-end mt-2 text-base text-accent-secondary-color underline hover:cursor-pointer"
                                                    >
                                                        set as default
                                                    </span>
                                            }
                                        </div>
                                    )
                                })
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