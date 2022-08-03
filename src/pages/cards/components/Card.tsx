import CARD_BACKGROUND_LOGO from "../../../assets/card-background.png";
import CARD_LOGO from "../../../assets/card-logo.png";
import { createSearchParams, useNavigate } from "react-router-dom";

const Card = ({ card }: any) => {
	const name = card!.name || card.cardholder!.name;
	const exp_date = `${card.exp_month}/${card.exp_year}`;
	const last4 = card.last4;
	const balance = `$${card.spending_controls!.spending_limits[0]!.amount / 100}/$${
		card.spending_controls!.spending_limits[0]!.amount / 100
	}`;

	const active: boolean = card.status === "active";
	let navigate = useNavigate();

	return (
		<div
			onClick={() => {
				navigate({
					pathname: "/view-card",
					search: createSearchParams({
						id: card.id,
					}).toString(),
				});
			}}
			className="h-[143px] w-[255px] mx-3 my-2"
			style={{ backgroundImage: `url(${CARD_BACKGROUND_LOGO})` }}
		>
			<div className="flex justify-between items-center">
				<span className="mt-5 ml-5 flex">
					<span className="text-white text-xs font-bold z-30">Flare</span>
					<img src={CARD_LOGO} className="h-3 -ml-8 mt-1" />
				</span>
				<span className="text-white mt-5 mr-5 text-xs font-bold">{name}</span>
			</div>
			<div className="flex justify-end">
				<div className="text-white mt-0 mr-5 text-xs">{balance}</div>
			</div>
			<div className="text-white ml-5 mt-7 text-sm font-bold">{`**** **** **** ${last4}`}</div>
			<div className="flex justify-between items-center">
				<div className="text-white ml-5 text-xs">{exp_date}</div>
				{!active && (
					<div
						className="bg-gray-400 w-8 h-4 mr-5 rounded-full"
						onClick={(event) => {
							event.stopPropagation();
						}}
					>
						<div className="bg-white w-3 h-3 rounded-full mt-[2px] mr-[3px]"></div>
					</div>
				)}
				{active && (
					<div
						className="bg-orange-600 w-8 h-4 mr-5 rounded-full flex justify-end"
						onClick={(event) => {
							event.stopPropagation();
						}}
					>
						<div className="bg-white w-3 h-3 rounded-full mt-[2px] mr-[3px]"></div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Card;
