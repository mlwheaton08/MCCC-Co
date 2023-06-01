import { Outlet, Route, Routes } from "react-router-dom";
import { AuthorizedUser } from "./views/AuthorizedUser";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { UserViews } from "./views/UserViews";
import { Home } from "./home/Home";
import { Nav } from "./nav/Nav";

export const MCCCCo = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <Nav />
                    <Outlet />
                </>
            }>

            	<Route path="/" element={ <Home /> } />

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