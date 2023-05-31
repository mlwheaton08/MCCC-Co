import { Route, Routes, useNavigate } from "react-router-dom";
import { PhotoUpload } from "../photoStorage/PhotoUpload";
import { logout } from "../helpers/logout";
import { Account } from "../account/Account";

export const UserViews = () => {
    let navigate = useNavigate();

    const onLogout = () => {
        logout.logout(navigate);
    };

    return (
        <Routes>

            <Route path="/account" element={ <Account /> } />
            
        </Routes>
    )
}