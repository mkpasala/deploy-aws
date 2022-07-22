import { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { sessionContext } from "../../app";

export default function Home() {
	const session = useContext(sessionContext);

	console.log("Navigating based off this session", session);

	if (
		!session?.user ||
		!session?.organization?.id ||
		!session?.organization?.aisToken
	)
		return <Navigate to="/signup/" />;

	return <Outlet />;
}
