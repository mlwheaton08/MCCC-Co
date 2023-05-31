export const AuthorizedUser = ({ children }) => {

	if (localStorage.getItem("capstone_user")) {
		return children;
	} else {
		return (
			<p>You do not have access to this page.</p>
		);
	}
}