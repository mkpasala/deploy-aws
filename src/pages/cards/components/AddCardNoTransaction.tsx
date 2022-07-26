import React, { useState, useEffect, useContext } from "react";
import AddCardPopup from "./AddCardPopup";
import { useNavigate } from "react-router-dom";
import FLARE_LOGO from "../../../assets/Flare_Logo_Color.png";
import GROUP_LOGO from "../../../assets/Group.png";
import "./filterMenu.scss";
import NavBar from "./navbar";
import DepositFundsPopup from "./DepositFundsPopup";
import WithdrawFundsPopup from "./WithdrawFundsPopup";
import Spinner from "./Spinner";

import cardsAPIService from "../../../services/cardsAPIService";
import flareDBService from "../../../services/flareDBService";

import Card from "./Card";
import Transaction from "./Transaction";
import { sessionContext } from "../../../app";
import SuccessPopupMessage from "./SuccessPopupMessage";

const AddCardNoTransaction = () => {
	const cardsService = new cardsAPIService();
	const flareService = new flareDBService();

	const [modalOn, setModalOn] = useState<any>(false);
	const [showDepositFunds, setShowDepositFunds] = useState<boolean>(false);
	const [showWithdrawFunds, setShowWithdrawFunds] = useState<boolean>(false);
	const [showSpinner, setShowSpinner] = useState(false);
	const [showSpinnerGetCard, setShowSpinnerGetCard] = useState(false);
	const [showSpinnerTransaction, setShowSpinnerTransaction] = useState(false);
	const [balance, setbBalance] = useState<any>("");
	const [cardData, setCardData] = useState<any>(null);
	const [transactionData, setTransactionData] = useState([] as any);
	const [newCardInfo, setNewCardInfo] = useState<any>({});
	const [showSuccess, setShowSuccess] = useState<any>(false);
	const [filterMenu, setFilterMenu] = useState<any>(false);
	const navigate = useNavigate();
	const session = useContext(sessionContext);
	const sessionUser = session?.user;
	const account_id = session?.organization?.stripeConnectId;
	const orgId = session?.organization?.id;
	const cardholder_id = session?.organization?.stripeCardholderId;
	const [filter, setFilter] = useState<string>("");

	if (account_id) {
		console.log("Stripe account id found");
	} else {
		console.log("Stripe account id not found");
	}

	if (cardholder_id) {
		console.log("cardholder id found");
	} else {
		console.log("cardholder id not found");
	}

	const getBlockedCardCount = () => {
		if (cardData) {
			const filterData = cardData.data.filter((card: any) => card.status !== "active");
			if (filterData) return filterData.length;
		}
		return 0;
	};

	useEffect(() => {
		(async () => {
			if (!cardholder_id) {
				if (account_id) {
					const cardholder = await createCardholder(account_id);
					if (cardholder && cardholder.id) {
						await updateOrganization(account_id, cardholder.id);
					}
				}
			}
			updateCardList();
			retrieveBalance();
			getTransactionList();
		})();
	}, []);

	const retrieveBalance = async () => {
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
				setbBalance(response!.issuing!.available[0]!.amount / 100);
			}
		} catch (ex) {
			setShowSpinner(false);
		}
	};

	const updateCardList = async () => {
		setShowSpinnerGetCard(true);
		const cardList = await getCardList();
		let cardListWithName: any = [];
		if (orgId) cardListWithName = await getAllCardsForOrganization();
		if (cardList && cardListWithName) {
			const cardDataWithName = cardList.data.map((card: any) => {
				const cardWithName = cardListWithName.filter(
					(cardWithName: any) => cardWithName.stripeCardId === card.id
				);
				console.log("cardDataWithName====>", cardWithName);
				let mergedCard = [];
				if (cardWithName && cardWithName.length > 0) {
					const obj = cardWithName[0];
					mergedCard = { ...card, ...obj };
				} else {
					mergedCard = { ...card };
				}
				return mergedCard;
			});
			setCardData({ data: cardDataWithName });
		} else {
			setCardData(null);
		}
		setShowSpinnerGetCard(false);
	};

	const getCardList = async () => {
		try {
			let response: any = await cardsService.getCardList({
				account_id: account_id,
				// limit: 3,
				cardholder: cardholder_id,
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
			console.log(ex);
			return null;
		}
		return null;
	};

	const getAllCardsForOrganization = async (): Promise<any> => {
		const organization = session?.organization;
		if (organization && organization.id) {
			setShowSpinner(true);
			try {
				let response: any = await flareService.getAllCards(organization.id);
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

	const getNewCardData = (data: any) => {
		setNewCardInfo(data);
	};

	const getTransactionList = async () => {
		setShowSpinnerTransaction(true);
		try {
			let response: any = await cardsService.getTransactionList({ id: account_id });
			setShowSpinnerTransaction(false);
			if (
				response.type === "StripePermissionError" ||
				response.type === "StripeInvalidRequestError"
			) {
			} else {
				setTransactionData(response["data"]);
			}
			//console.log("Response", response["data"]);
		} catch (ex) {
			setShowSpinnerTransaction(false);
		}
	};

	const getAccountDetails = async (accountId: string) => {
		try {
			setShowSpinner(true);
			let account: any = await cardsService.getConnectAccountDetails({ id: accountId });
			setShowSpinner(false);
			if (
				account.type === "StripePermissionError" ||
				account.type === "StripeInvalidRequestError"
			) {
				return null;
			} else {
				return account;
			}
		} catch (ex) {
			console.log(ex);
			setShowSpinner(false);
			return null;
		}
	};

	const createCardholder = async (accountId: string): Promise<any> => {
		try {
			let account: any = await getAccountDetails(accountId);
			if (!account) {
				return null;
			} else {
				const requestData: any = {
					account_id: accountId,
					email: account.email || sessionUser?.email,
					type:
						account.business_type === "non_profit" ? "company" : account.business_type,
				};
				if (account.business_type === "company" || account.business_type === "non_profit") {
					requestData.name = account.company.name;
					requestData.phone_number = account.company.phone;
					requestData.billing = { address: account.company.address };
				} else if (account.business_type === "individual") {
					const name = `${account.individual.first_name} ${account.individual.last_name}`;
					requestData.name = name;
					requestData.phone_number = account.individual.phone;
					requestData.billing = { address: account.individual.address };
				}
				console.log(requestData);
				if (!requestData.billing.address.line2) delete requestData.billing.address.line2;
				setShowSpinner(true);
				let response: any = await cardsService.createCardholder(requestData);
				setShowSpinner(false);
				if (
					response.type === "StripePermissionError" ||
					response.type === "StripeInvalidRequestError"
				) {
					return null;
				} else {
					return response;
				}
			}
		} catch (ex) {
			console.log(ex);
			setShowSpinner(false);
			return null;
		}
		return null;
	};

	const updateOrganization = async (accountId: string, cardHolderId: string): Promise<void> => {
		if (accountId) {
			const organization = session?.organization;
			if (organization && organization.id) {
				const payload = {
					id: organization.id,
					name: organization?.name,
					entityType: organization?.entityType,
					aisSystem: organization?.aisSystem,
					aisOrganizationId: organization?.aisOrganizationId,
					stripeConnectId: accountId,
					stripeCardholderId: cardHolderId,
				};

				try {
					setShowSpinner(true);
					let response: any = await flareService.updateOrganization(
						organization.id,
						payload
					);
					setShowSpinner(false);
					if (
						response.type === "StripePermissionError" ||
						response.type === "StripeInvalidRequestError"
					) {
						return;
					} else {
						setShowSpinner(true);
						await session?.updateSession();
						setShowSpinner(false);
						return;
					}
				} catch (ex) {
					console.log("exception", ex);
					setShowSpinner(false);
				}
			}
		}
		return;
	};

	const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		let name: any = transactionData.filter(
			(item: any) => item?.merchant_data?.name.toLowerCase() === value
		);
		console.log(name, transactionData);
		setFilter(value);
	};
	var check:any = []
	const method = ()=>{
		 if(transactionData &&cardData){
			transactionData?.map((item:any)=>{
			cardData?.data.map((dta:any)=>{
				if(dta.id=== item.card) check.push({...item,cardName:dta.name})
		})
		})
	}
	check.flat(1)
	}
	method()
	
	return (
		<>
			{/* {modalOn && <AddCardPopup setModalOn={setModalOn} />} */}
			<Spinner show={showSpinner || showSpinnerGetCard || showSpinnerTransaction} />
			<div className="card-section font-sans">
				<NavBar />
				<main className="main-content flex flex-col mx-[75px] my-[25px] min-w-fit min-h-fit">
					<div className="screen-title pt-[28px] pb-[2px]">Cards</div>
					<div className="cards-management flex flex-row text-gray-700 font-sans">
						<div className="bl-section flex flex-col w-auto">
							<div className="fs-box-shadow  flex flex-row">
								<div className="bl-details-left flex flex-row justify-center align-middle p-6">
									<div className="bl mr-7">
										<div className="bl-amount font-bold text-lg">
											${balance}
										</div>
										<div className="bl-type text-sm text-gray-500">
											Issuing Balance
										</div>
									</div>
									<div id="bl-actions">
										<button
											type="button"
											className="mr-[10px] bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded py-2 px-2 w-32"
											onClick={(event) => {
												setShowDepositFunds(true);
											}}
										>
											Deposit funds
										</button>
										{/* <button
											type="button"
											className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded  py-2 px-2 w-34"
											onClick={(event) => {
												setShowWithdrawFunds(true);
											}}
										>
											Withdraw funds
										</button> */}
									</div>
								</div>
								{/* <div className="bl-details-right ml-20 border-l-[1px] border-gray-300 py-6 pr-6">
									<div className="bl pl-4">
										<div className="bl-amount font-bold text-lg">$0</div>
										<div className="bl-type text-sm text-gray-500">
											Deposited Balance
										</div>
									</div>
								</div> */}
							</div>
							{/* <div class="fs-box-shadow ts-section mt-4"> */}
							<div className=" px-6 py-2  border-gray-200"></div>
							<div className="fs-box-shadow flex flex-col border-gray-200 w-[800px] h-[285px] relative">
								{transactionData && transactionData.length != 0 ? (
									<div>
										<div className="ts-header px-6 py-3 border-b border-gray-200">
											<span className="flex justify-between font-bold ">
												Transactions
												<button
													className="bg-white hover:bg-gray-200 font-bold p-4 rounded text-sm"
													onClick={() => {
														setFilterMenu(!filterMenu);
													}}
												>
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
											</span>
										</div>
										{filterMenu && (
											<div className="filterBoxMenu py-2">
												<div className="font-semibold font-inter text-xl leading-4  fs-box-shadow ts-section mb-2 h-10 p-2 pl-3">
													Filters
												</div>
												<div className="px-3">
													<div className="flex flex-1 justify-between py-3">
														<div className="font-light font-inter text-xs text-black">
															0 Selected
														</div>
														<div className="font-extralight font-inter text-xs text-inherit">
															Clear All
														</div>
													</div>

													<div className="relative ">
														<label
															className="text-xs bold text-gray-900 dark:text-gray-300"
															htmlFor="cardName"
														>
															CardName
														</label>

														<select
															className={`rounded block  placeholder:text-slate-400 bg-white w-full border py-2 px-3  shadow-md focus:outline-none focus:ring-1`}
															name="cardName"
															onChange={() => console.log("changes")}
															// onBlur={handleBlur}
															value={"check"}
														>
															<option
																value=""
																className="text-slate-400"
															>
																choose
															</option>
															{/* {states.map((state) => (
																	<option
																		value={state.abbreviation}
																		key={state.abbreviation}
																	>
																		{state.name}
																	</option>
																))} */}
														</select>
													</div>
													<div className="relative ">
														<label
															className="text-xs bold text-gray-900 dark:text-gray-300"
															htmlFor="cardName"
														>
															Transaction Type
														</label>

														<select
															className={`rounded block  placeholder:text-slate-400 mr-2 bg-white w-full border py-2 px-3  shadow-md focus:outline-none focus:ring-1`}
															name="cardName"
															onChange={() => console.log("changes")}
															// onBlur={handleBlur}
															value={"check"}
														>
															<option
																value=""
																className="text-slate-400"
															>
																choose
															</option>
															{/* {states.map((state) => (
																	<option
																		value={state.abbreviation}
																		key={state.abbreviation}
																	>
																		{state.name}
																	</option>
																))} */}
														</select>
													</div>
												</div>
											</div>
										)}
										<div className="ts-search relative ">
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
												className="bk-form-input bk-input-placeholder placeholder:text-slate-400 text-sm bg-white border-0 py-2 pr-3 pl-12 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 ml-4 w-96"
												placeholder="Search user or program"
												type="text"
												name="searchTransaction text-xs"
												onChange={handleFilterChange}
											/>
										</div>
										{transactionData && transactionData ? (
											<Transaction
												transaction={transactionData}
												value={filter}
												cardData={check}
											/>
										) : null}
									</div>
								) : (
									<>
										<div className="cards-header flex flex-row justify-items-center mb-10 mx-5 mt-5">
											<div className="card-title font-bold">Transactions</div>
										</div>
										<div className="mr-40 ml-60 flex justify-center ">
											<span className="mt-[1px] mb-[5px] mr-[120px] ml-[120px] flex justify-center">
												<svg
													width="30"
													height="40"
													viewBox="0 0 40 52"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														d="M36.25 6H3.75C2.36929 6 1.25 7.11929 1.25 8.5V48.5C1.25 49.8807 2.36929 51 3.75 51H36.25C37.6307 51 38.75 49.8807 38.75 48.5V8.5C38.75 7.11929 37.6307 6 36.25 6Z"
														stroke="#191918"
														stroke-opacity="0.3"
														stroke-width="2"
														stroke-linejoin="round"
													/>
													<path
														d="M12.5 1V8.5M27.5 1V8.5M10 19.75H30M10 29.75H25M10 39.75H20"
														stroke="#191918"
														stroke-opacity="0.3"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
													/>
												</svg>
											</span>
										</div>
										{/* <div className="mb-[15px] ml-[80px] mr-[80px] flex font-bold align-middle place-items-center"> */}
										<div className="mb-[5px] ml-[90px] mr-[70px] flex font-bold text-sm justify-center mt-[-1px]">
											No Transaction to show yet!
										</div>
										<div className="card-start-desc flex ml-20 mr-90 mb-6 justify-center">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit,
											sed
										</div>
									</>
								)}
							</div>
						</div>
						<div className=" px-2 border-gray-200"></div>
						<div className="fs-box-shadow flex flex-col border-gray-800 w-[300px] h-[400px] overflow-hidden">
							{cardData && cardData.data.length != 0 ? (
								<div className="overflow-y-auto">
									{/* <div className="cards-list overflow-y-auto"> */}
									<div className="cards-header flex flex-row justify-between mb-2 mx-3 mt-5">
										<div className="card-title font-bold">Cards</div>
										<div
											className="view-cards text-sm hover:cursor-pointer"
											onClick={() => {
												navigate(`/view-all-card`, { state: cardData });
											}}
										>
											View All Cards
										</div>
									</div>
									<div className="cards-details flex flex-row mb-2 mx-3">
										<div className="total-issued-cards mr-2">
											<div className="no-of-cards font-semi-bold">
												{cardData && cardData.data!.length > 0
													? cardData && cardData.data.length
													: 0}
											</div>
											<div className="cards-type text-[10px] text-gray-500">
												Cards Issued
											</div>
										</div>
										<div className="total-blocked-cards mr-2">
											<div className="no-of-cards font-semi-bold">
												{getBlockedCardCount()}
											</div>
											<div className="cards-type text-[10px] text-gray-500">
												Cards Blocked
											</div>
										</div>
										{/* <div className="add-new-card text-red-500  hover:text-red-600 font-xs font-bold">Add New</div> */}
										<div className="ml-8">
											<button
												type="button"
												onClick={() => setModalOn(true)}
												className="bg-transparent hover:bg-red-500 text-red-600 hover:text-white hover:border-transparent rounded text-xs font-bold h-8 w-20 mt-1"
											>
												Add New
											</button>
										</div>
									</div>
									<div className="search-user relative border-y border-gray-200 overflow-y-auto">
										<span className="absolute top-5 left-3">
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
										{/* {!setModalOn && */}
										{/* <input
											className="search-txt text-xs bg-white border-0 py-3 pl-8 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 m-2 w-64"
											placeholder="Search card name"
											type="text"
											name="searchcardname"
											onChange={handleFilterChange}
										/> */}
										{/* } */}
									</div>
									{cardData &&
										cardData.data
											.slice(0, 3)
											.map((card: any) => <Card card={card} key={card.id} />)}
									{/* </div> */}
								</div>
							) : (
								<>
									<div className="cards-header flex flex-row justify-items-center mb-2 mx-2 mt-5 ">
										<div className="card-title font-bold ">Cards</div>
									</div>
									<div className="cards-list place-items-center mb-11 mt-14 justify-center">
										<span className="mt-5 mr-[120px] ml-[120px] flex justify-center">
											<img src={GROUP_LOGO} width="50" height="30" />
										</span>
										<div className="mt-5 ml-[90px] mr-[70px] flex font-bold text-sm align-middle justify-center">
											No card added yet!
										</div>
										<div className="card-start-desc ml-[80px] mr-[60px] w-96 mb-6 place-items-center justify-center">
											<p>Lorem ipsum dolor sit amet,</p>
											<p>consectetur adipiscing elit, sed</p>
										</div>

										<div className="flex justify-center">
											<button
												type="button"
												data-modal-toggle="authentication-modal"
												onClick={() => setModalOn(true)}
												className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded  py-2 px-2 w-34"
											>
												Add New Card
											</button>
										</div>
									</div>
								</>
							)}
						</div>
					</div>
					{modalOn && (
						<AddCardPopup
							setModalOn={setModalOn}
							onSuccess={async () => {
								await updateCardList();
								setShowSuccess(true);
							}}
						/>
					)}
					<DepositFundsPopup
						isShow={showDepositFunds}
						onSuccess={async () => {
							await retrieveBalance();
							setShowDepositFunds(false);
						}}
						onHide={async () => {
							setShowDepositFunds(false);
						}}
					/>
					<WithdrawFundsPopup
						isShow={showWithdrawFunds}
						onSuccess={async () => {
							await retrieveBalance();
							setShowWithdrawFunds(false);
						}}
						onHide={async () => {
							setShowWithdrawFunds(false);
						}}
					/>
					<SuccessPopupMessage
						isShow={showSuccess}
						onHide={() => {
							setShowSuccess(false);
						}}
						header="New Card Added Successfully!"
						message="Lorem Ipsum dolar imit Lorem Ipsum dolar imit,"
					/>
				</main>
			</div>
		</>
	);
};

export default AddCardNoTransaction;
