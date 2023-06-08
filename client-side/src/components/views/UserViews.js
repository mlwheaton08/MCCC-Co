import { Route, Routes, useNavigate } from "react-router-dom";
import { logout } from "../helpers/logout";
import { Account } from "../account/Account";
import { Cart } from "../cart/Cart";
import { OrderHistory } from "../cart/OrderHistory";

export const UserViews = ({ getNavCartItemTotal, setIsItemFilterActive }) => {
    return (
        <Routes>

            <Route path="/account" element={ <Account /> } />
            <Route path="/cart"
                element={ <Cart
                    getNavCartItemTotal={getNavCartItemTotal}
                    setIsItemFilterActive={setIsItemFilterActive}
                /> }
            />
            <Route path="/orderHistory" element={ <OrderHistory /> } />
            
        </Routes>
    )
}