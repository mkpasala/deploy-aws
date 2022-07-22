import { useEffect } from "react";
import { NavBar } from "../../components/Navbar/components/navbar";

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	useEffect(() => {
		document.body.classList.add("bg-mint-green");
		return () => {
			document.body.classList.remove("bg-mint-green");
		};
	}, []);
	return (
		<>
			<NavBar />
			<div className="w-full mt-20">{children}</div>
		</>
	);
};
