import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import CardsInit from "./components/CardsInit";
import NavBar from "./components/navbar";
import "./cards.scss";
const CardsLayout: React.FC = () => {
	useEffect(() => {
		document.body.classList.add("bg-mint-green");
		return () => {
			document.body.classList.remove("bg-mint-green");
		};
	}, []);

	return (
		<>
			<div className="card-section font-sans">
				<NavBar />
				<CardsInit />
				<Outlet />
			</div>
		</>
	);
};

export default CardsLayout;
