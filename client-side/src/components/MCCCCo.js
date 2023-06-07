import { Outlet, Route, Routes } from "react-router-dom";
import { AuthorizedUser } from "./views/AuthorizedUser";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Home } from "./home/Home";
import { Nav } from "./nav/Nav";
import { Items } from "./items/Items";
import { ItemDetail } from "./items/ItemDetail";
import { useEffect, useState } from "react";
import { fetchOpenOrderItemTotal } from "../APIManager";
import { UserViews } from "./views/UserViews";

export const MCCCCo = () => {
	const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

	const [cartItemCount, setCartItemCount] = useState()

	const getNavCartItemTotal = async (firebaseId) => {
		const total = await fetchOpenOrderItemTotal(firebaseId)
		setCartItemCount(total)
	}

	useEffect(() => {
		if (localUser) {
			getNavCartItemTotal(localUser.firebaseId)
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
            	<Route path="/login" element={ <Login getNavCartItemTotal={getNavCartItemTotal} /> } />
            	<Route path="/register" element={ <Register getNavCartItemTotal={getNavCartItemTotal} /> } />
            	<Route path="/items/:sortBy/:asc" element={ <Items /> } />
            	<Route path="/item/:id" element={ <ItemDetail getNavCartItemTotal={getNavCartItemTotal} /> } />

				<Route
					path="*"
					element={
					<AuthorizedUser>
						<>
							<UserViews getNavCartItemTotal={getNavCartItemTotal} />
						</>
					</AuthorizedUser>
					}
				/>
            
            </Route>
        </Routes>
    )
}