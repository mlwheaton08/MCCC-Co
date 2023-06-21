import { Route, Routes } from "react-router-dom";
import { Account } from "../account/Account";
import { Cart } from "../cart/Cart";
import { OrderHistory } from "../orderHistory/OrderHistory";
import { Checkout } from "../cart/Checkout";

export const UserViews = ({ getNavCartItemTotal, getNavUserName, setSearchState, setSeriesFilter, setTypeFilter, setIsItemFilterActive }) => {
    return (
        <Routes>

            <Route path="/account" element={ <Account getNavUserName={getNavUserName} /> } />
            <Route path="/cart"
                element={ <Cart
                    getNavCartItemTotal={getNavCartItemTotal}
                    setIsItemFilterActive={setIsItemFilterActive}
                /> }
            />
            <Route path="/checkout"
                element={ <Checkout
                    getNavCartItemTotal={getNavCartItemTotal}
                    setSearchState={setSearchState}
                    setSeriesFilter={setSeriesFilter}
                    setTypeFilter={setTypeFilter}
                    setIsItemFilterActive={setIsItemFilterActive}
                /> }
            />
            <Route path="/orderHistory" element={ <OrderHistory /> } />
            
        </Routes>
    )
}