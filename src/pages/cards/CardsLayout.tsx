import { useEffect } from "react";
import { Outlet,useParams } from "react-router-dom";
import CardsInit from "./components/CardsInit";
import NavBar from "./components/navbar";
import "./cards.scss";
const CardsLayout: React.FC = () => {
	console.log("inside cards Layout");
		let params = useParams();
		console.log("inside cards Layout",params.accoundId);
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
				<CardsInit accountId={params.accountId ||''} />
				<Outlet />
			</div>
		</>
	);
};

export default CardsLayout;
