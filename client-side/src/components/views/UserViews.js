import { Route, Routes, useNavigate } from "react-router-dom";
import { logout } from "../helpers/logout";
import { Account } from "../account/Account";

export const UserViews = () => {
    return (
        <Routes>

            <Route path="/account" element={ <Account /> } />
            
        </Routes>
    )
}