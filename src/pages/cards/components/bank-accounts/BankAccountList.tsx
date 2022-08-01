import Rect, { useState, useEffect, useContext } from "react";
import cardsAPIService from "../../../../services/cardsAPIService";
import flareDBService from "../../../../services/flareDBService";
import Spinner from "../Spinner";
import { sessionContext } from "../../../../app";
import BankAccountListItem from "./BankAccountListItem";
import NavBar from "../navbar";
import BankAccountsTransactionList from "./BankAccountsTransactionList";
import { useNavigate } from "react-router-dom";

const BankAccountList = () => {
	const cardsService = new cardsAPIService();
	const flareService = new flareDBService();
	const session = useContext(sessionContext);
	const account_id = "acct_1LKdCqR1aSxGwRcl"; //session?.organization?.stripeConnectId;
	const [sources, setSources] = useState<any>([]);
	const [showSpinner, setShowSpinner] = useState(false);
	const [message, setMessage] = useState("");
	const [transactions, setTransactions] = useState<any>([]);
	let navigate = useNavigate();

	useEffect(() => {
		getAllBankccounts();
		(async () => {
			setShowSpinner(true);
			const response = await cardsService.getAllBankTransactions({ account_id });
			setShowSpinner(false);
			if (response) {
				setTransactions(response);
			}
		})();
	}, []);

	const getAllBankccounts = async (): Promise<void> => {
		const organization = session?.organization;
		if (organization) {
			setShowSpinner(true);
			const organizationId = organization.id ? organization.id : "";
			try {
				let response: any = await flareService.getAllBankAccounts(organizationId);
				setShowSpinner(false);
				if (
					response.type === "StripePermissionError" ||
					response.type === "StripeInvalidRequestError"
				) {
					setMessage(response.raw.message);
				} else {
					setMessage("");
					setSources(response);
				}
			} catch (ex) {
				console.log("exception", ex);
				setShowSpinner(false);
			}
		}
	};

	return (
		<>
			<Spinner show={showSpinner} />
			<div className="card-section font-sans">
				<NavBar />
				<main className="main-content flex flex-col mx-28 my-[25px] min-w-fit min-h-fit">
					<div className="flex justify-between py-5">
						<div className="screen-title text-2xl">Bank Accounts</div>
						<div>
							<button
								type="button"
								className="bg-transparent hover:bg-red-500 text-red-600 hover:text-white border border-red-500 hover:border-transparent rounded text-xs font-bold h-8 mt-1 p-1"
								onClick={() => {
									navigate("/add-new-bank-account");
								}}
							>
								Add New Bank Account
							</button>
						</div>
					</div>
					<div className="cards-management flex flex-row text-gray-700 font-sans">
						<div className="bl-section w-full">
							<div className="overflow-y-auto">
								{sources.map((source: any) => (
									<BankAccountListItem
										bank={source}
										handleChange={() => {}}
										handleBlur={() => {}}
										key={source.id}
									/>
								))}
							</div>
							<div className="ts-header mt-3 border border-gray-200">
								<div className="flex justify-between font-bold">
									<span className="p-4"> Transactions History</span>
									<button className="bg-white hover:bg-gray-200 font-bold p-4 rounded text-sm">
										<svg
											width="18"
											height="18"
											viewBox="0 0 18 18"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M10.5 18H7.5C7.10218 18 6.72064 17.842 6.43934 17.5607C6.15804 17.2794 6 16.8978 6 16.5V10.8075L0.4425 5.25C0.160809 4.96999 0.00167459 4.58968 0 4.1925V1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0H16.5C16.8978 0 17.2794 0.158035 17.5607 0.43934C17.842 0.720644 18 1.10218 18 1.5V4.1925C17.9983 4.58968 17.8392 4.96999 17.5575 5.25L12 10.8075V16.5C12 16.8978 11.842 17.2794 11.5607 17.5607C11.2794 17.842 10.8978 18 10.5 18ZM1.5 1.5V4.1925L7.5 10.1925V16.5H10.5V10.1925L16.5 4.1925V1.5H1.5Z"
												fill="#191918"
												fill-opacity="0.5"
											/>
										</svg>
									</button>
								</div>
								<BankAccountsTransactionList transactions={transactions} />
							</div>
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

export default BankAccountList;
