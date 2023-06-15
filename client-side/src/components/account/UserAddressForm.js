export const UserAddressForm = ({ addressState, setAddressState }) => {

    return (
        <div className="flex flex-col">
            <span>Nickname</span>
            <input
                value={addressState.nickName}
                className="mb-2 px-2 py-1 border border-bg-tint-color-3 bg-bg-tint-color focus:outline-none"
                onChange={(evt) => {
                    const copy = {...addressState}
                    copy.nickName = evt.target.value
                    setAddressState(copy)
                }}
            />
            <span>Company</span>
            <input
                value={addressState.companyName}
                className="mb-2 px-2 py-1 border border-bg-tint-color-3 bg-bg-tint-color focus:outline-none"
                onChange={(evt) => {
                    const copy = {...addressState}
                    copy.companyName = evt.target.value
                    setAddressState(copy)
                }}
            />
            <span>Line 1</span>
            <input
                value={addressState.lineOne}
                className="mb-2 px-2 py-1 border border-accent-secondary-color-dark bg-bg-tint-color focus:outline-none"
                onChange={(evt) => {
                    const copy = {...addressState}
                    copy.lineOne = evt.target.value
                    setAddressState(copy)
                }}
            />
            <span>Line 2</span>
            <input
                value={addressState.lineTwo}
                className="mb-2 px-2 py-1 border border-bg-tint-color-3 bg-bg-tint-color focus:outline-none"
                onChange={(evt) => {
                    const copy = {...addressState}
                    copy.lineTwo = evt.target.value
                    setAddressState(copy)
                }}
            />
            <span>City</span>
            <input
                value={addressState.city}
                className="mb-2 px-2 py-1 border border-accent-secondary-color-dark bg-bg-tint-color focus:outline-none"
                onChange={(evt) => {
                    const copy = {...addressState}
                    copy.city = evt.target.value
                    setAddressState(copy)
                }}
            />
            <span>State</span>
            <input
                value={addressState.state}
                className="mb-2 px-2 py-1 border border-accent-secondary-color-dark bg-bg-tint-color focus:outline-none"
                onChange={(evt) => {
                    const copy = {...addressState}
                    copy.state = evt.target.value
                    setAddressState(copy)
                }}
            />
            <span>ZIP</span>
            <input
                value={addressState.zipCode}
                className="mb-2 px-2 py-1 border border-accent-secondary-color-dark bg-bg-tint-color focus:outline-none"
                onChange={(evt) => {
                    const copy = {...addressState}
                    copy.zipCode = evt.target.value
                    setAddressState(copy)
                }}
            />
            <span>Country</span>
            <input
                value={addressState.country}
                className="mb-2 px-2 py-1 border border-accent-secondary-color-dark bg-bg-tint-color focus:outline-none"
                onChange={(evt) => {
                    const copy = {...addressState}
                    copy.country = evt.target.value
                    setAddressState(copy)
                }}
            />
        </div>
    )
}