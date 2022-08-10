import Rect, { useState, useContext, useEffect } from "react";
import ConnectBankAccountTab from "./ConnectBankAccountTab";
import VerifyDepositAmountsTab from "./VerifyDepositAmountsTab";
import AddFundsTab from "./AddFundsTab";
import NavBar from "../navbar";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { sessionContext } from "../../../../app";
import { useLocation, useNavigate } from "react-router-dom";
import cardsAPIService from "../../../../services/cardsAPIService";
import flareDBService from "../../../../services/flareDBService";
import Spinner from "../Spinner";

const ConnectBankAccount = () => {
	const cardsService = new cardsAPIService();
	const flareService = new flareDBService();

	const [showSpinner, setShowSpinner] = useState(false);
	const session = useContext(sessionContext);
	const account_id = session?.organization?.stripeConnectId;

	if (process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) {
		console.log("Stripe publishable key found");
	} else {
		console.log("Stripe publishable key not found");
	}
	if (account_id) {
		console.log("Stripe account id found");
	} else {
		console.log("Stripe account id not found");
	}

	const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY, {
		stripeAccount: account_id,
	});
	const [stepCount, setStepCount] = useState<number>(0);
	const { pathname } = useLocation();
	const [tabTitles, setTabTitles] = useState<string[]>([]);
	const navigate = useNavigate();
	const [newBankAccount, setNewBankAccount] = useState(false);

	useEffect(() => {
		(async () => {
			//setTabTitles([]);
			sessionStorage.removeItem("source_id");
			if (pathname && pathname.includes("/add-new-bank-account")) {
				setNewBankAccount(true);
				setTabTitles(["Connect your Bank Account", "Verify Deposit Amounts"]);
			} else {
				setNewBankAccount(false);
				const bankAccounts = await getAllBankAccounts();
				if (bankAccounts && bankAccounts.length > 0) {
					const bankAccount = await getVerifiedBankAccount(bankAccounts);
					if (bankAccount) {
						const code_verification =
							bankAccount.code_verification.status === "succeeded";
						const chargeable = bankAccount.status === "chargeable";
						if (chargeable && code_verification) {
							const balance = await retrieveBalance();
							const amount = balance!.issuing!.available[0]!.amount / 100;
							if (amount > 0) {
								navigate("/card-list");
							} else {
								const source_id = bankAccount.id;
								sessionStorage.setItem("source_id", source_id);
								setTabTitles(["Add Funds"]);
							}
						} else {
							const source_id = bankAccount.id;
							sessionStorage.setItem("source_id", source_id);
							const attempts_remaining =
								bankAccount.code_verification.attempts_remaining;
							if (attempts_remaining > 0) {
								setTabTitles(["Verify Deposit Amounts", "Add Funds"]);
							} else {
								setTabTitles([
									"Connect your Bank Account",
									"Verify Deposit Amounts",
									"Add Funds",
								]);
								setStepCount(1);
							}
						}
					} else {
						setTabTitles([
							"Connect your Bank Account",
							"Verify Deposit Amounts",
							"Add Funds",
						]);
					}
				} else {
					setTabTitles([
						"Connect your Bank Account",
						"Verify Deposit Amounts",
						"Add Funds",
					]);
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

	const getAllBankAccounts = async (): Promise<any> => {
		const organization = session?.organization;
		if (organization && organization.id) {
			setShowSpinner(true);
			try {
				let response: any = await flareService.getAllBankAccounts(organization.id);
				setShowSpinner(false);
				if (
					response.type === "StripePermissionError" ||
					response.type === "StripeInvalidRequestError"
				) {
					return null;
				} else {
					return response;
				}
			} catch (ex) {
				console.log("exception", ex);
				setShowSpinner(false);
				return null;
			}
		}
		return null;
	};
	const getSourceDetails = async (sourceId: string) => {
		try {
			let response: any = await cardsService.getSourceDetails({
				account_id: account_id,
				source_id: sourceId,
			});
			if (
				response.type === "StripePermissionError" ||
				response.type === "StripeInvalidRequestError"
			) {
				return null;
			} else {
				return response;
			}
		} catch (ex) {
			console.log("exception", ex);
			return null;
		}
	};
	const getVerifiedBankAccount = async (bankAccounts: any): Promise<any> => {
		const account_id = session?.organization?.stripeConnectId;
		setShowSpinner(true);
		const chargeableSources = [];
		const pendingSources = [];
		if (bankAccounts && bankAccounts.length > 0) {
			for (let bankAccount of bankAccounts) {
				const source = await getSourceDetails(bankAccount.id);
				console.log(source);
				if (source) {
					const chargeable = source.status === "chargeable";
					const code_verification = source.code_verification.status === "succeeded";
					if (chargeable) {
						chargeableSources.push(source);
						if (code_verification) {
							setShowSpinner(false);
							return source;
						} else {
							continue;
						}
					} else {
						pendingSources.push(source);
					}
				} else {
					continue;
				}
			}
			if (chargeableSources.length > 0) {
				setShowSpinner(false);
				return chargeableSources[0];
			}
			if (pendingSources.length > 0) {
				setShowSpinner(false);
				return pendingSources[0];
			}
		}
		setShowSpinner(false);
		return null;
	};

	const nextStep = (): void => {
		setStepCount(stepCount + 1);
	};
	const previousStep = (): void => {
		setStepCount(stepCount - 1);
	};
	const updateTabs = (tabs: string[], tabIndex: number): void => {
		//setTabTitles([]);
		setTabTitles((prev) => {
			return [...tabs];
		});
		setStepCount(tabIndex);
	};
	const loadComponent = (title: string) => {
		console.log(tabTitles);
		console.log(title);
		console.log(stepCount);

		switch (title) {
			case "Connect your Bank Account":
				return <ConnectBankAccountTab nextStep={nextStep} previousStep={previousStep} />;
			case "Verify Deposit Amounts":
				return (
					<VerifyDepositAmountsTab
						nextStep={nextStep}
						previousStep={previousStep}
						updateTabs={updateTabs}
					/>
				);
			case "Add Funds":
				return <AddFundsTab nextStep={nextStep} previousStep={previousStep} />;
		}
	};

	const stepNoBackGround = (stepIndex: number): string => {
		if (stepIndex <= stepCount) {
			return "bg-green-300";
		} else {
			return "bg-gray-300";
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
					{tabTitles.length > 0 && (
						<div className="screen-title pt-[28px] pb-[15px] flex items-center">
							{newBankAccount && (
								<a href="/bank-account-list" className="mr-2">
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M16 1.4L14.6 0L8 6.6L1.4 0L0 1.4L6.6 8L0 14.6L1.4 16L8 9.4L14.6 16L16 14.6L9.4 8L16 1.4Z"
											fill="#060F14"
											fill-opacity="0.8"
										/>
									</svg>
								</a>
							)}
							{newBankAccount ? "Add New Bank Account" : "Cards"}
						</div>
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
											{index + 1}
										</span>

										<a className={`mr-4 ${stepTitleTextColor(index)}`}>
											{tabTitle}
										</a>

										{index < tabTitles.length - 1 && (
											<span className="w-10 h-0 border rounded-[1px] m-[2px] inline-block border-gray-500"></span>
										)}
									</li>
								);
							})}
						</ul>
					</div>
					{loadComponent(tabTitles[stepCount])}
				</main>
			</div>
		</Elements>
	);
};

export default ConnectBankAccount;
