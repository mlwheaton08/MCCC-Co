import { Outlet, Route, Routes } from "react-router-dom";
import { AuthorizedUser } from "./views/AuthorizedUser";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { Home } from "./home/Home";
import { Nav } from "./nav/Nav";
import { ItemDetail } from "./items/ItemDetail";
import { useEffect, useState } from "react";
import { fetchOpenOrderItemTotal, fetchUserByFirebaseId } from "../APIManager";
import { UserViews } from "./views/UserViews";
import { ItemsPageContainer } from "./items/ItemsPageContainer";
import { Distributors } from "./distributors/Distributors";
import { Packs } from "./packs/Packs";
import { PackDetail } from "./packs/PackDetail";

export const MCCCCo = () => {
	const localStorageUser = localStorage.getItem("user")
    const localUser = JSON.parse(localStorageUser)

	const [cartItemCount, setCartItemCount] = useState()
	const [navUserName, setNavUserName] = useState("")
	const [isItemFilterActive, setIsItemFilterActive] = useState(false)

	const [seriesFilter, setSeriesFilter] = useState("")
	const [typeFilter, setTypeFilter] = useState("")
	const [searchState, setSearchState] = useState("")

	const getNavCartItemTotal = async (firebaseId) => {
		const total = await fetchOpenOrderItemTotal(firebaseId)
		setCartItemCount(total)
	}

	const getNavUserName = async () => {
		const response = await fetchUserByFirebaseId(localUser.firebaseId)
		setNavUserName(response.name)
	}

	useEffect(() => {
		setSearchState("")
		if (localUser) {
			getNavCartItemTotal(localUser.firebaseId)
			getNavUserName()
		}
	},[])


	return (
        <Routes>
            <Route path="/" element={
                <>
                    <Nav
						cartItemCount={cartItemCount}
						navUserName={navUserName}
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
            	<Route path="/login" element={ <Login getNavCartItemTotal={getNavCartItemTotal} setNavUserName={setNavUserName} /> } />
            	<Route path="/register" element={ <Register getNavCartItemTotal={getNavCartItemTotal} setNavUserName={setNavUserName} /> } />
            	<Route path="/distributors" element={ <Distributors /> } />
				<Route path="/packs" element={ <Packs /> } />
				<Route path="/pack/:id"
					element={ <PackDetail
						getNavCartItemTotal={getNavCartItemTotal}
						setSeriesFilter={setSeriesFilter}
						setTypeFilter={setTypeFilter}
						setIsFilterActive={setIsItemFilterActive}
					/> }
				/>
				<Route path="/cymbal/:id" element={ <ItemDetail getNavCartItemTotal={getNavCartItemTotal} /> } />

            	<Route path="/cymbals"
					element={ <ItemsPageContainer
						setSeriesFilter={setSeriesFilter}
						seriesFilter={seriesFilter}
						setTypeFilter={setTypeFilter}
						typeFilter={typeFilter}
						isFilterActive={isItemFilterActive}
						setIsFilterActive={setIsItemFilterActive}
						setSearchState={setSearchState}
						searchState={searchState}
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
						setSearchState={setSearchState}
						searchState={searchState}
					/> }
				/>


				<Route
					path="*"
					element={
					<AuthorizedUser>
						<>
							<UserViews
								getNavCartItemTotal={getNavCartItemTotal}
								getNavUserName={getNavUserName}
								setSearchState={setSearchState}
								setSeriesFilter={setSeriesFilter}
								setTypeFilter={setTypeFilter}
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