import React, { useState, useEffect, useContext } from "react";
import cardsAPIService from "../../../services/cardsAPIService";
import Spinner from "./Spinner";
import Card from "./Card";
import { sessionContext } from "../../../app";

const ViewAllCards = () => {
	const cardsService = new cardsAPIService();
	const [showSpinner, setShowSpinner] = useState(false);
	const [cardList, setCardList] = useState<any>(null);
	const [filter, setFilter] = useState<string>("");
	const session = useContext(sessionContext);
	const account_id = session?.organization?.stripeConnectId;

	useEffect(() => {
		getCardList();
	}, []);

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setFilter(value);
	};

	const getCardList = async () => {
		setShowSpinner(true);
		try {
			let response: any = await cardsService.getCardList({ id: account_id });
			setShowSpinner(false);
			if (
				response.type === "StripePermissionError" ||
				response.type === "StripeInvalidRequestError"
			) {
			} else {
				setCardList(response);
			}
		} catch (ex) {
			setShowSpinner(false);
		}
	};

	return (
		<>
			<Spinner show={showSpinner} />
			<main className="main-content flex flex-col mx-[105px] w-screen">
				<div className="screen-title pt-[28px] pb-[32px[143px]] flex items-center">
					<a href="/card-list">
						<svg
							width="27"
							height="21"
							viewBox="0 0 27 21"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M10 1.5L1 10.5M1 10.5L10 19.5M1 10.5H25.5"
								stroke="#191918"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</a>
					All Cards
				</div>
				<div className="cards-management flex flex-row text-gray-700 font-sans">
					<div className="fs-box-shadow ts-section">
						<div className="ts-search relative">
							<span className="absolute top-[14px] left-6">
								<svg
									fill="none"
									stroke="#94a3b8"
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									viewBox="0 0 24 24"
									className="w-4 h-4"
								>
									<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
								</svg>
							</span>
							<input
								className="bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-1/2 border-0 py-2 pr-3 pl-12 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
								placeholder="Search card name"
								type="text"
								name="searchTransaction"
								onChange={handleFilterChange}
							/>
						</div>
						<div className="grid grid-cols-4">
							{cardList &&
								cardList.data
									.filter((card: any) => card.cardholder!.name.includes(filter))
									.map((card: any) => <Card card={card} />)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default ViewAllCards;
