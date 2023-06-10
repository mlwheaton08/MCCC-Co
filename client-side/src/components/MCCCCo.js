import { Outlet, Route, Routes } from "react-router-dom";
import { AuthorizedUser } from "./views/AuthorizedUser";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Home } from "./home/Home";
import { Nav } from "./nav/Nav";
import { ItemDetail } from "./items/ItemDetail";
import { useEffect, useState } from "react";
import { fetchOpenOrderItemTotal } from "../APIManager";
import { UserViews } from "./views/UserViews";
import { ItemsPageContainer } from "./items/ItemsPageContainer";

export const MCCCCo = () => {
	const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

	const [cartItemCount, setCartItemCount] = useState()
	const [isItemFilterActive, setIsItemFilterActive] = useState(false)

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
                    <Nav
						cartItemCount={cartItemCount}
						setIsItemFilterActive={setIsItemFilterActive}
					/>
                    <Outlet />
                </>
            }>

            	<Route path="/" element={ <Home setIsItemFilterActive={setIsItemFilterActive} /> } />
            	<Route path="/login" element={ <Login getNavCartItemTotal={getNavCartItemTotal} /> } />
            	<Route path="/register" element={ <Register getNavCartItemTotal={getNavCartItemTotal} /> } />

            	<Route path="/cymbals"
					element={ <ItemsPageContainer
						isFilterActive={isItemFilterActive}
						setIsFilterActive={setIsItemFilterActive}
					/> }
				/>
            	<Route path="/cymbals/series/:seriesFilter"
					element={ <ItemsPageContainer
						isFilterActive={isItemFilterActive}
						setIsFilterActive={setIsItemFilterActive}
					/> }
				/>
            	<Route path="/cymbals/type/:typeFilter"
					element={ <ItemsPageContainer
						isFilterActive={isItemFilterActive}
						setIsFilterActive={setIsItemFilterActive}
					/> }
				/>
            	<Route path="/cymbals/series/:seriesFilter/type/:typeFilter"
					element={ <ItemsPageContainer
						isFilterActive={isItemFilterActive}
						setIsFilterActive={setIsItemFilterActive}
					/> }
				/>

            	<Route path="/cymbal/:id" element={ <ItemDetail getNavCartItemTotal={getNavCartItemTotal} /> } />

				<Route
					path="*"
					element={
					<AuthorizedUser>
						<>
							<UserViews
								getNavCartItemTotal={getNavCartItemTotal}
								setIsItemFilterActive={setIsItemFilterActive}
							/>
						</>
					</AuthorizedUser>
					}
				/>
            
            </Route>
        </Routes>
    )
}