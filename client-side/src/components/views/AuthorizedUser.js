export const AuthorizedUser = ({ children }) => {

	if (localStorage.getItem("user")) {
		return children;
	} else {
		return (
			<p className="mt-nav-height">You do not have access to this page.</p>
		);
	}
}