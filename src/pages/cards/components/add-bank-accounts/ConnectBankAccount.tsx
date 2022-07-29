import Rect, { useState, useContext, useEffect } from "react";
import CARDS_LANDING_LOGO from "../../../assets/card-landing-page-logo.png";
import ConnectBankAccountTab from "./ConnectBankAccountTab";
import VerifyDepositAmountsTab from "./VerifyDepositAmountsTab";
import AddFundsTab from "./AddFundsTab";
import NavBar from "../navbar";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { sessionContext } from "../../../../app";
import { useLocation, useNavigate } from "react-router-dom";
import cardsAPIService from "../../../../services/cardsAPIService";
import Spinner from "../Spinner";

const ConnectBankAccount = () => {
	const cardsService = new cardsAPIService();
	const [showSpinner, setShowSpinner] = useState(false);
	const session = useContext(sessionContext);
	const account_id = session?.organization?.stripeConnectId;
	const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY, {
		stripeAccount: account_id,
	});
	const [stepCount, setStepCount] = useState(0);
	const { state } = useLocation();
	const [tabTitles, setTabTitles] = useState<string[]>([]);
	let navigate = useNavigate();

	useEffect(() => {
		(async () => {
			setTabTitles([]);
			if (!state) {
				sessionStorage.removeItem("source_id");
				setTabTitles((prev) => {
					return [...prev, "Connect your Bank Account"];
				});
			}
			if (state) {
				const pending = state.status === "pending";
				const source_id = state.id;
				sessionStorage.setItem("source_id", source_id);
				if (pending) {
					setTabTitles((prev) => {
						return [...prev, "Verify Deposit Amounts", "Add Funds"];
					});
				} else {
					const chargeable = state.status === "chargeable";
					if (chargeable) {
						const balance = await retrieveBalance();
						const amount = balance!.issuing!.available[0]!.amount;
						if (amount > 0) {
							navigate("/card-list");
						} else {
							setTabTitles((prev) => {
								return [...prev, "Add Funds"];
							});
						}
					}
				}
			}
		})();
	}, []);

	const retrieveBalance = async (): Promise<any> => {
		setShowSpinner(true);
		try {
			let response: any = await cardsService.retrieveBalance({
				account_id: account_id,
			});
			setShowSpinner(false);
			if (
				response.type === "StripePermissionError" ||
				response.type === "StripeInvalidRequestError"
			) {
			} else {
				return response;
			}
		} catch (ex) {
			setShowSpinner(false);
			return null;
		}
		return null;
	};

	const nextStep = (): void => {
		setStepCount(stepCount + 1);
	};
	const previousStep = (): void => {
		setStepCount(stepCount - 1);
	};
	const loadComponent = (title: string) => {
		switch (title) {
			case "Connect your Bank Account":
				return <ConnectBankAccountTab nextStep={nextStep} previousStep={previousStep} />;
			case "Verify Deposit Amounts":
				return <VerifyDepositAmountsTab nextStep={nextStep} previousStep={previousStep} />;
			case "Add Funds":
				return <AddFundsTab nextStep={nextStep} previousStep={previousStep} />;
		}
	};

	const stepNoBackGround = (stepIndex: number): string => {
		if (stepIndex <= stepCount) {
			return "bg-green-500";
		} else {
			return "bg-gray-500";
		}
	};
	const stepTitleTextColor = (stepIndex: number): string => {
		if (stepIndex < stepCount) {
			return "text-green-500";
		} else {
			return "text-black-500";
		}
	};
	return (
		<Elements stripe={promise}>
			<Spinner show={showSpinner} />
			<div className="card-section font-sans">
				<NavBar />
				<main className="main-content flex flex-col mx-[205px]">
					{tabTitles.length && (
						<div className="screen-title pt-[28px] pb-[32px]">Cards</div>
					)}
					<div className="flex flex-row breadscrumb mb-3">
						<ul className="list-none flex flex-row flex-nowrap justify-start">
							{tabTitles.map((tabTitle, index) => {
								return (
									<li className="mr-4">
										<span
											className={`w-6 h-6 inline-block text-white rounded-full circel-txt text-center justify-center mr-1 ${stepNoBackGround(
												index
											)}`}
										>
											1
										</span>

										<a
											className={`mr-4 hover:cursor-pointer hover:font-bold ${stepTitleTextColor(
												index
											)}`}
											onClick={() => {
												setStepCount(index);
											}}
										>
											{tabTitle}
										</a>

										{index < tabTitles.length - 1 && (
											<span className="w-10 h-0 border rounded-[1px] m-[2px] inline-block border-gray-500"></span>
										)}
									</li>
								);
							})}
							{/* <li className="mr-4">
								<span
									className={`w-6 h-6 inline-block text-white rounded-full circel-txt text-center justify-center mr-1 ${stepNoBackGround(
										0
									)}`}
								>
									1
								</span>

								<a
									className={`mr-4 hover:cursor-pointer hover:font-bold ${stepTitleTextColor(
										0
									)}`}
									onClick={() => {
										setStepCount(0);
									}}
								>
									Connect your Bank Account
								</a>
								<span className="w-10 h-0 border rounded-[1px] m-[2px] inline-block border-gray-500"></span>
							</li>
							<li className="mr-4">
								<span
									className={`w-6 h-6 inline-block text-white rounded-full circel-txt text-center justify-center mr-1 ${stepNoBackGround(
										1
									)}`}
								>
									2
								</span>

								<a
									className={`mr-4 cursor-pointer hover:font-bold ${stepTitleTextColor(
										1
									)}`}
									onClick={() => {
										setStepCount(1);
									}}
								>
									Verify Deposit Amounts
								</a>
								<span className="w-10 h-0 border rounded-[1px] m-[2px] inline-block border-gray-500"></span>
							</li>
							<li>
								<span
									className={`w-6 h-6 inline-block text-white rounded-full circel-txt text-center justify-center mr-1 ${stepNoBackGround(
										2
									)}`}
								>
									3
								</span>

								<a
									className={`cursor-pointer hover:font-bold ${stepTitleTextColor(
										2
									)}`}
									onClick={() => {
										setStepCount(2);
									}}
								>
									Add Funds
								</a>
							</li> */}
						</ul>
					</div>
					{loadComponent(tabTitles[stepCount])}
				</main>
			</div>
		</Elements>
	);
};

export default ConnectBankAccount;
