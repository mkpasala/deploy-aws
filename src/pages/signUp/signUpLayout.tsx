import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar";

const SignUpLayout: React.FC = () => {
	useEffect(() => {
		document.body.classList.add("bg-mint-green");
		return () => {
			document.body.classList.remove("bg-mint-green");
		};
	}, []);

	return (
		<>
			<NavBar />
			<Outlet />
		</>
	);
};

export default SignUpLayout;
