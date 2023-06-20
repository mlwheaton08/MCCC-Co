export const UserAddressForm = ({ addressState, setAddressState, handleDiscard, handleSave, currentRoute, showDiscardButton, highlightRequiredFields }) => {

    return (
        <form className="flex flex-col gap-2">
            {
                currentRoute === "checkout"
                    ? ""
                    : <fieldset className="flex flex-col">
                        <label htmlFor="nickName">Nickname</label>
                        <input
                            id="nickName"
                            value={addressState.nickName}
                            className="px-2 py-1 border border-bg-tint-color-3 bg-bg-tint-color focus:outline-none"
                            onChange={(evt) => {
                                const copy = {...addressState}
                                copy.nickName = evt.target.value
                                setAddressState(copy)
                            }}
                        />
                    </fieldset>
            }
            <fieldset className="flex flex-col">
                <label htmlFor="companyName">Company</label>
                <input
                    id="companyName"
                    value={addressState.companyName}
                    className="px-2 py-1 border border-bg-tint-color-3 bg-bg-tint-color focus:outline-none"
                    onChange={(evt) => {
                        const copy = {...addressState}
                        copy.companyName = evt.target.value
                        setAddressState(copy)
                    }}
                />
            </fieldset>
            <fieldset className="flex flex-col">
                <label htmlFor="lineOne">Address Line 1</label>
                <input
                    autoFocus
                    id="lineOne"
                    value={addressState.lineOne}
                    className={`px-2 py-1 bg-bg-tint-color focus:outline-none
                        border ${highlightRequiredFields ? "border-accent-primary-color-dark" : "border-bg-tint-color-3"}`}
                    onChange={(evt) => {
                        const copy = {...addressState}
                        copy.lineOne = evt.target.value
                        setAddressState(copy)
                    }}
                />
            </fieldset>
            <fieldset className="flex flex-col">
                <label htmlFor="lineTwo">Address Line 2</label>
                <input
                    id="lineTwo"
                    value={addressState.lineTwo}
                    className="px-2 py-1 border border-bg-tint-color-3 bg-bg-tint-color focus:outline-none"
                    onChange={(evt) => {
                        const copy = {...addressState}
                        copy.lineTwo = evt.target.value
                        setAddressState(copy)
                    }}
                />
            </fieldset>
            <fieldset className="flex flex-col">
                <label htmlFor="city">City</label>
                <input
                    id="city"
                    value={addressState.city}
                    className={`px-2 py-1 bg-bg-tint-color focus:outline-none
                        border ${highlightRequiredFields ? "border-accent-primary-color-dark" : "border-bg-tint-color-3"}`}
                    onChange={(evt) => {
                        const copy = {...addressState}
                        copy.city = evt.target.value
                        setAddressState(copy)
                    }}
                />
            </fieldset>
            <fieldset className="flex flex-col">
                <label htmlFor="state">State</label>
                <input
                    id="state"
                    value={addressState.state}
                    className={`px-2 py-1 bg-bg-tint-color focus:outline-none
                        border ${highlightRequiredFields ? "border-accent-primary-color-dark" : "border-bg-tint-color-3"}`}
                    onChange={(evt) => {
                        const copy = {...addressState}
                        copy.state = evt.target.value
                        setAddressState(copy)
                    }}
                />
            </fieldset>
            <fieldset className="flex flex-col">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                    id="zipCode"
                    value={addressState.zipCode}
                    className={`px-2 py-1 bg-bg-tint-color focus:outline-none
                        border ${highlightRequiredFields ? "border-accent-primary-color-dark" : "border-bg-tint-color-3"}`}
                    onChange={(evt) => {
                        const copy = {...addressState}
                        copy.zipCode = evt.target.value
                        setAddressState(copy)
                    }}
                />
            </fieldset>
            <fieldset className="flex flex-col">
                <label htmlFor="country">Country</label>
                <input
                    id="country"
                    value={addressState.country}
                    className={`px-2 py-1 bg-bg-tint-color focus:outline-none
                        border ${highlightRequiredFields ? "border-accent-primary-color-dark" : "border-bg-tint-color-3"}`}
                    onChange={(evt) => {
                        const copy = {...addressState}
                        copy.country = evt.target.value
                        setAddressState(copy)
                    }}
                />
            </fieldset>

            <section className="mt-3 flex justify-end gap-2">
                {
                    !showDiscardButton
                        ? ""
                        : <button
                            type="button"
                            className="px-3 py-1 border border-accent-secondary-color text-accent-secondary-color font-normal"
                            onClick={handleDiscard}
                        >
                            Discard
                        </button>
                }
                <button
                    className="px-3 py-1 border border-accent-secondary-color text-accent-secondary-color font-normal"
                    onClick={(e) => {
                        e.preventDefault()
                        handleSave()
                    }}
                >
                    Save
                </button>
            </section>
        </form>
    )
}