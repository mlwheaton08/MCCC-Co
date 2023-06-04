import { Outlet, Route, Routes } from "react-router-dom";
import { AuthorizedUser } from "./views/AuthorizedUser";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { UserViews } from "./views/UserViews";
import { Home } from "./home/Home";
import { Nav } from "./nav/Nav";
import { Items } from "./items/Items";
import { ItemDetail } from "./items/ItemDetail";
import { useEffect, useState } from "react";

export const MCCCCo = () => {
	const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

	const [cartItemCount, setCartItemCount] = useState()

	useEffect(() => {
		if (localUser) {
			setCartItemCount(localUser.openOrderItemTotal)
		}
	},[])


	return (
        <Routes>
            <Route path="/" element={
                <>
                    <Nav cartItemCount={cartItemCount} />
                    <Outlet />
                </>
            }>

            	<Route path="/" element={ <Home /> } />
            	<Route path="/login" element={ <Login /> } />
            	<Route path="/register" element={ <Register /> } />
            	<Route path="/items/:sortBy/:asc" element={ <Items /> } />
            	<Route path="/item/:id" element={ <ItemDetail setCartItemCount={setCartItemCount} /> } />

				<Route
					path="*"
					element={
					<AuthorizedUser>
						<>
							<UserViews />
						</>
					</AuthorizedUser>
					}
				/>
            
            </Route>
        </Routes>
    )
}