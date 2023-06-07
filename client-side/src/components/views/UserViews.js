import { Route, Routes, useNavigate } from "react-router-dom";
import { logout } from "../helpers/logout";
import { Account } from "../account/Account";
import { Cart } from "../cart/Cart";
import { OrderHistory } from "../cart/OrderHistory";

export const UserViews = ({ getNavCartItemTotal }) => {
    return (
        <Routes>

            <Route path="/account" element={ <Account /> } />
            <Route path="/cart" element={ <Cart getNavCartItemTotal={getNavCartItemTotal} /> } />
            <Route path="/orderHistory" element={ <OrderHistory /> } />
            
        </Routes>
    )
}