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
import { Distributors } from "./distributors/Distributors";

export const MCCCCo = () => {
	const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

	const [cartItemCount, setCartItemCount] = useState()
	const [isItemFilterActive, setIsItemFilterActive] = useState(false)

	const [seriesFilter, setSeriesFilter] = useState("")
	const [typeFilter, setTypeFilter] = useState("")
	const [searchState, setSearchState] = useState("")

	const getNavCartItemTotal = async (firebaseId) => {
		const total = await fetchOpenOrderItemTotal(firebaseId)
		setCartItemCount(total)
	}

	useEffect(() => {
		setSearchState("")
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
						setSeriesFilter={setSeriesFilter}
						setTypeFilter={setTypeFilter}
						setIsItemFilterActive={setIsItemFilterActive}
						searchState={searchState}
						setSearchState={setSearchState}
					/>
                    <Outlet />
                </>
            }>

            	<Route path="/" element={ <Home setIsItemFilterActive={setIsItemFilterActive} /> } />
            	<Route path="/login" element={ <Login getNavCartItemTotal={getNavCartItemTotal} /> } />
            	<Route path="/register" element={ <Register getNavCartItemTotal={getNavCartItemTotal} /> } />
            	<Route path="/distributors" element={ <Distributors /> } />
				<Route path="/cymbal/:id" element={ <ItemDetail getNavCartItemTotal={getNavCartItemTotal} /> } />

            	<Route path="/cymbals"
					element={ <ItemsPageContainer
						setSeriesFilter={setSeriesFilter}
						seriesFilter={seriesFilter}
						setTypeFilter={setTypeFilter}
						typeFilter={typeFilter}
						isFilterActive={isItemFilterActive}
						setIsFilterActive={setIsItemFilterActive}
					/> }
				/>
            	<Route path="/cymbals/search/:searchTerms"
					element={ <ItemsPageContainer
						setSeriesFilter={setSeriesFilter}
						seriesFilter={seriesFilter}
						setTypeFilter={setTypeFilter}
						typeFilter={typeFilter}
						isFilterActive={isItemFilterActive}
						setIsFilterActive={setIsItemFilterActive}
					/> }
				/>


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