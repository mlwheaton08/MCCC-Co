export const DistributorCard = ({ distributor }) => {

    return (
        <main className="w-96 h-72 p-4 flex flex-col justify-between rounded bg-bg-tint-color-2 text-xl font-thin">
            <span className="text-2xl font-normal">{distributor.name}</span>
            <div className="flex flex-col">
                <span>{distributor.addressLineOne}</span>
                <span>{distributor.addressLineTwo}</span>
                <span>{distributor.city}, {distributor.state} {distributor.zipCode}</span>
                <span>{distributor.country}</span>
            </div>
            <span>Phone: {distributor.phoneNumber}</span>
        </main>
    )
}