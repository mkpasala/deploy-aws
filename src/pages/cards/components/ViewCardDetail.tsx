import CARD_BACKGROUND_LOGO from "../../../assets/card-background.png";
import CARD_LOGO from "../../../assets/card-logo.png";
import NavBar from "./navbar";
import Spinner from "./Spinner";
import cardsAPIService from "../../../services/cardsAPIService";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCurrencySymbol } from "../../../data/data";
import { sessionContext } from "../../../app";
import eyeOff from '../../../assets/visibility-off.png';
const ViewCardDetail = () => {
	//const location = useLocation();
	const param = useParams();
	console.log(param);
	const cardsService = new cardsAPIService();

	const [showSpinner, setShowSpinner] = useState(false);
	const [reveal, setReveal] = useState<boolean>(false);
	const [cardData, setCardData] = useState<any>([]);
	const [transactionData, setTransactionData] = useState([] as any);
	const transactionDetails = {
		spendingLimit: null,
		currency: null,
		spendAmount: null,
		balance: null,
		remaining: null,
	};
	const session = useContext(sessionContext);
	const orgIds = session?.organization?.id;
	const userId = session?.user?.id;
	// const orgId = session?.organization?.id;
	sessionStorage.setItem("account_id", "acct_1LLOc6R80wjEJFG5");
	const account_id = sessionStorage.getItem("account_id");

	sessionStorage.setItem("orgId", "68167b70-8427-4c91-8ad1-6b8d0dfd861f");
	const orgId = sessionStorage.getItem("orgId");

	// sessionStorage.setItem("card_id", "ic_1LPncLJhE2tXq2CUO4IS8r4P");
	// const card_id = sessionStorage.getItem("card_id");

	const queryParams = new URLSearchParams(window.location.search);
	const card_id = queryParams.get("id");
	console.log("cardID", card_id);

	useEffect(() => {
		retrieveCard();
		getTransactionList();
		getUserData();
	}, []);

	const retrieveCard = async () => {
		
		setShowSpinner(true);
		try {
			let response: any = await cardsService.retrieveCard({ card_id: card_id });
			setShowSpinner(false);
			if (
				response.type === "StripePermissionError" ||
				response.type === "StripeInvalidRequestError"
			) {
			} else {
				setCardData([response]);
				//setCardData(["response"]);
				
			}
		} catch (ex) {
			setShowSpinner(false);
		}
	};

	// useEffect(() => {
	//     getTransactionList();
	// }, []);
	const getTransactionList = async () => {
		setShowSpinner(true);
		try {
			let response: any = await cardsService.getTransactionList({ id: account_id });
			setShowSpinner(false);
			if (
				response.type === "StripePermissionError" ||
				response.type === "StripeInvalidRequestError"
			) {
			} else {
				setTransactionData(response["data"]);
			}
			//console.log("Response", response["data"]);
		} catch (ex) {
			setShowSpinner(false);
		}
	};

	const getUserData = async () => {
		const userCardData = await fetch(
			`https://h3tqg8ihpg.execute-api.us-east-1.amazonaws.com/staging/organizations/${orgIds}/cards/${card_id}`
		);
		console.log("userCardData===>", userCardData);
	};
	// const cardData1 = [{
	//     "id": "ic_1LPncLJhE2tXq2CUO4IS8r4P",
	//     "object": "issuing.card",
	//     "brand": "Visa",
	//     "cancellation_reason": null,
	//     "cardholder": {
	//         "id": "ich_1LKNsJJhE2tXq2CU1Ygf7E1a",
	//         "object": "issuing.cardholder",
	//         "billing": {
	//             "address": {
	//                 "city": "San Francisco",
	//                 "country": "US",
	//                 "line1": "123 Main Street",
	//                 "line2": null,
	//                 "postal_code": "94111",
	//                 "state": "CA"
	//             }
	//         },
	//         "company": null,
	//         "created": 1657550775,
	//         "email": "jenny.rosen@example.com",
	//         "individual": null,
	//         "livemode": false,
	//         "metadata": {},
	//         "name": "neti",
	//         "phone_number": "+18008675309",
	//         "requirements": {
	//             "disabled_reason": null,
	//             "past_due": []
	//         },
	//         "spending_controls": {
	//             "allowed_categories": [],
	//             "blocked_categories": [],
	//             "spending_limits": [],
	//             "spending_limits_currency": null
	//         },
	//         "status": "active",
	//         "type": "individual"
	//     },
	//     "created": 1658841369,
	//     "currency": "usd",
	//     "exp_month": 6,
	//     "exp_year": 2025,
	//     "financial_account": null,
	//     "last4": "1292",
	//     "livemode": false,
	//     "metadata": {},
	//     "replaced_by": null,
	//     "replacement_for": null,
	//     "replacement_reason": null,
	//     "shipping": null,
	//     "spending_controls": {
	//         "allowed_categories": null,
	//         "blocked_categories": null,
	//         "spending_limits": [
	//             {
	//                 "amount": 50000,
	//                 "categories": [],
	//                 "interval": "daily"
	//             }
	//         ],
	//         "spending_limits_currency": "usd"
	//     },
	//     "status": "inactive",
	//     "type": "virtual",
	//     "wallets": {
	//         "apple_pay": {
	//             "eligible": true,
	//             "ineligible_reason": null
	//         },
	//         "google_pay": {
	//             "eligible": true,
	//             "ineligible_reason": null
	//         },
	//         "primary_account_identifier": null
	//     }
	// }]
	// console.log("CardData", cardData1)

	// console.log("transactionData==>", transactionData);

	// console.log("cardData===>",cardData)
	// console.log("cardData===>",cardData[0]?.spending_controls?.spending_limits_currency)
	const getTransactionData = transactionData?.filter((item: any) => item.card === card_id);
	// console.log("getTransactionData===>", getTransactionData, getTransactionData?.length);

	// console.log(,getTransactionData[0]?.amount/100)

	const total = cardData
		? getTransactionData.reduce((total: any, item: any) => item.amount + total, 0) / 100
		: "";
	transactionDetails.spendingLimit = cardData[0]?.spending_controls?.spending_limits[0]?.amount;
	transactionDetails.currency = cardData[0]?.spending_controls?.spending_limits_currency;
	transactionDetails.spendAmount =
		getTransactionData.length > 0
			? getCurrencySymbol(getTransactionData[0]?.merchant_currency, total)
			: "";
	transactionDetails.balance =
		getTransactionData.length > 0
			? cardData[0]?.spending_controls?.spending_limits[0]?.amount + total
			: transactionDetails.spendingLimit;
	transactionDetails.remaining =
		getTransactionData.length > 0
			? getCurrencySymbol(transactionDetails.currency, transactionDetails.balance)
			: getCurrencySymbol(transactionDetails.currency, transactionDetails.spendingLimit);
	const { spendingLimit, currency, balance, spendAmount, remaining } = transactionDetails;
	return (
		<div className="card-section font-sans">
			<NavBar />
			<main className="main-content flex flex-col mx-[205px] ">
				<div className="bl-section flex flex-col pt-[28px] pb-[32px]">
					<div className="flex flex-row ml-0 w-[955px] overflow-x-hidden">
						<div className="mt-3">
							<span className="absolute ml-0  ">
								<Link to="/card-list">
									<svg
										width="20"
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
								</Link>
							</span>
						</div>
						<div className="screen-title ml-8">Mike Males</div>
						{cardData &&
							cardData.map((card: any) => {
								const status = card.status;
								const type = card.type;
								return (
									<div className="ml-2 relative mt-2">
										<button
											type="button"
											className="bg-green-200 text-green-500 text-xs capitalize font-bold border border-green-300 rounded-full py-1 px-2 w-30"
										>
											{status}
										</button>
										<button
											type="button"
											className="bg-gray-200 capitalize text-gray-500 text-xs font-bold border border-gray-300 rounded-full py-1 px-2 w-30 ml-2"
										>
											{`${type} ${"Card"}`}
										</button>
									</div>
								);
							})}
						<div className="ml-[385px] mt-2 relative mx-2">
							<button
								//type="button"
								className="bg-transparent hover:bg-red-500 text-red-600 text-xs font-bold hover:text-white border border-red-500 hover:border-transparent rounded py-1 px-2 w-26"
							>
								Freeze Card
							</button>
							<button
								//type="button"
								className="bg-transparent hover:bg-red-500 text-red-600 text-xs font-bold hover:text-white border border-red-500 hover:border-transparent rounded py-1 px-2 w-26 ml-2"
							>
								Cancel Card
							</button>
						</div>
					</div>
				</div>
				<div className="cards-management flex flex-row text-gray-700 font-sans">
					{cardData &&
						cardData.map((card: any) => {
							const name = card.cardholder!.name;
							const exp_date = `${card.exp_month}/${card.exp_year}`;
							const last4 = card.last4;
							const balance = `$${
								card.spending_controls!.spending_limits[0]!.amount
							}/$${card.spending_controls!.spending_limits[0]!.amount}`;
							const balanceLimit = getCurrencySymbol(
								card.spending_controls!.spending_limits_currency,
								card.spending_controls!.spending_limits[0]!.amount
							);

							const billingaddress = `  ${card.cardholder!.billing!.address.line1}, ${
								card.cardholder!.billing!.address.city
							}, 
                                                ${card.cardholder!.billing!.address.state} (${
								card.cardholder!.billing!.address.country
							}), ${card.cardholder!.billing!.address.postal_code}`;

							return (
								<div className="cards-section fs-box-shadow flex flex-col">
									<div className="cards-list">
										<div
											className="h-[143px] w-[255px] mx-0 my-0"
											style={{
												backgroundImage: `url(${CARD_BACKGROUND_LOGO})`,
											}}
										>
											<div className="flex justify-between items-center">
												<span className="mt-5 ml-5 flex">
													<span className="text-white text-xs font-bold z-30">
														Flare
													</span>
													<img
														src={CARD_LOGO}
														className="h-3 -ml-8 mt-1"
													/>
												</span>
												<span className="text-white mt-5 mr-5 text-xs font-semibold">
													{name}
												</span>
											</div>
											<div className="flex justify-end">
												<div className="text-white text-xs mt-0 mr-5 font-thin">
													{balanceLimit}
												</div>
											</div>
											<div className="flex justify-between">
												<div className="text-white ml-5 mt-8 text-sm font-bold">
													{reveal
														? card?.number
																.toString()
																.replace(/\d{4}?(?=...)/g, "$& ")
														: `**** **** **** ${last4}`}
												</div>
												<div className="text-white ml-5 mx-5 mt-8 text-sm font-bold">
													{reveal ? card?.cvc : "***"}
												</div>
											</div>
											<div className=" flex justify-between items-center">
												<div className="text-white ml-5 text-xs tracking-widest font-thin">
													{exp_date}
												</div>
												<div className="text-white ml-5 mx-5 text-xs tracking-widest font-thin">
													CVV
												</div>
											</div>
										</div>
										<div
											onClick={() => setReveal(!reveal)}
											className="reveal-info hover:bg-pink-500 relative border-y border-gray-200 flex justify-center overflow-hidden "
										>
											 <span className="absolute top-2 left-12 pl-10">
                                             {!reveal?
                                           
                                                    <img src={eyeOff} alt="hide" style={{width:14,height:17}}/>
                                            
                                            
                                                        :
												<svg
													width="15"
													height="19"
													viewBox="0 0 19 19"
													fill="none"
													xmlns="http://www.w3.org/2000/svg"
												>
													<g clip-path="url(#clip0_1106_4822)">
														<path
															d="M9.58826 12.0005C10.8661 12.0005 11.902 10.9646 11.902 9.68677C11.902 8.40894 10.8661 7.37305 9.58826 7.37305C8.31043 7.37305 7.27454 8.40894 7.27454 9.68677C7.27454 10.9646 8.31043 12.0005 9.58826 12.0005Z"
															fill="#191918"
															fill-opacity="0.7"
														/>
														<path
															d="M18.2297 9.4903C17.5494 7.73051 16.3683 6.20863 14.8325 5.11278C13.2966 4.01692 11.4734 3.39512 9.58797 3.32422C7.70258 3.39512 5.87929 4.01692 4.34345 5.11278C2.8076 6.20863 1.62653 7.73051 0.946203 9.4903C0.900257 9.61738 0.900257 9.75654 0.946203 9.88363C1.62653 11.6434 2.8076 13.1653 4.34345 14.2611C5.87929 15.357 7.70258 15.9788 9.58797 16.0497C11.4734 15.9788 13.2966 15.357 14.8325 14.2611C16.3683 13.1653 17.5494 11.6434 18.2297 9.88363C18.2757 9.75654 18.2757 9.61738 18.2297 9.4903V9.4903ZM9.58797 13.4468C8.84435 13.4468 8.11743 13.2263 7.49913 12.8131C6.88084 12.4 6.39893 11.8128 6.11436 11.1258C5.82979 10.4388 5.75533 9.68279 5.90041 8.95346C6.04548 8.22413 6.40357 7.5542 6.92938 7.02838C7.4552 6.50256 8.12514 6.14448 8.85447 5.9994C9.5838 5.85433 10.3398 5.92879 11.0268 6.21336C11.7138 6.49793 12.301 6.97983 12.7141 7.59813C13.1273 8.21643 13.3478 8.94334 13.3478 9.68696C13.3462 10.6837 12.9496 11.6391 12.2449 12.3439C11.5401 13.0486 10.5847 13.4452 9.58797 13.4468V13.4468Z"
															fill="#191918"
															fill-opacity="0.7"
														/>
													</g>
													<defs>
														<clipPath id="clip0_1106_4822">
															<rect
																width="18.5098"
																height="18.5098"
																fill="white"
																transform="translate(0.333496 0.431641)"
															/>
														</clipPath>
													</defs>
												</svg>
                                                }
											</span>
											<input
												className="search-txt placeholder:text-slate-300 block text-sm bg-white border-0 py-[6px] pl-[48%] focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
												placeholder="Reveal Info"
												type="text"
												name="revealInfo"
												disabled={true}
											/>
										</div>
										<div className="card-nickname border-b border-gray-200 py-2 px-2">
											<div className="no-of-cards text-gray-500 text-xs">
												Card Nickname
											</div>
											<div className="cards-type font-semibold text-sm py-1">
												{name}
											</div>
										</div>
										<div className="card-number border-b border-gray-200 py-2 px-2">
											<div className="no-of-cards text-gray-500 text-xs">
												Card Number
											</div>
											<div className="absolute ml-[210px] mt-[-4px]">
												<a href="">
													<svg
														width="16"
														height="16"
														viewBox="0 0 16 16"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M14 5V14H5V5H14ZM14 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V14C4 14.2652 4.10536 14.5196 4.29289 14.7071C4.48043 14.8946 4.73478 15 5 15H14C14.2652 15 14.5196 14.8946 14.7071 14.7071C14.8946 14.5196 15 14.2652 15 14V5C15 4.73478 14.8946 4.48043 14.7071 4.29289C14.5196 4.10536 14.2652 4 14 4Z"
															fill="#191918"
															fill-opacity="0.7"
														/>
														<path
															d="M2 9H1V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H9V2H2V9Z"
															fill="#191918"
															fill-opacity="0.7"
														/>
													</svg>
												</a>
											</div>
											<div className="cards-type font-semibold text-xs py-1">
												{`**** **** **** ${last4}`}
											</div>
										</div>
										<div className="cvv border-b border-gray-200 py-2 px-2">
											<div className="no-of-cards text-gray-500 text-xs">
												Expiry
											</div>
											<div className="cards-type font-semibold text-sm py-1">
												{exp_date}
											</div>
										</div>
										<div className="cvv border-b border-gray-200 py-2 px-2">
											<div className="no-of-cards text-gray-500 text-xs">
												CVV
											</div>
											<div className="absolute ml-[210px] mt-[-4px]">
												<a href="">
													<svg
														width="16"
														height="16"
														viewBox="0 0 16 16"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															d="M14 5V14H5V5H14ZM14 4H5C4.73478 4 4.48043 4.10536 4.29289 4.29289C4.10536 4.48043 4 4.73478 4 5V14C4 14.2652 4.10536 14.5196 4.29289 14.7071C4.48043 14.8946 4.73478 15 5 15H14C14.2652 15 14.5196 14.8946 14.7071 14.7071C14.8946 14.5196 15 14.2652 15 14V5C15 4.73478 14.8946 4.48043 14.7071 4.29289C14.5196 4.10536 14.2652 4 14 4Z"
															fill="#191918"
															fill-opacity="0.7"
														/>
														<path
															d="M2 9H1V2C1 1.73478 1.10536 1.48043 1.29289 1.29289C1.48043 1.10536 1.73478 1 2 1H9V2H2V9Z"
															fill="#191918"
															fill-opacity="0.7"
														/>
													</svg>
												</a>
											</div>
											<div className="cards-type font-semibold text-sm py-1">
												****
											</div>
										</div>

										<div className="cvv border-b border-gray-200 py-2 px-2">
											<div className="no-of-cards text-gray-500 text-xs">
												Expense Type
											</div>
											<div className="cards-type text-sm font-semibold py-1">
												Loren Ipsum
											</div>
										</div>
										<div className="cvv border-b border-gray-200 py-2 px-2">
											<div className="no-of-cards text-gray-500 text-xs">
												Billing Address
											</div>
											<div className="cards-type text-sm font-semibold py-1">
												{billingaddress}
											</div>
										</div>
									</div>
								</div>
							);
						})}
					<div className="bl-section flex flex-col">
						<div className="fs-box-shadow flex flex-row ml-4 w-[700px] overflow-x-hidden">
							<div className="cards-header flex flex-row justify-between mb-2 mx-2 mt-2">
								<div className="card-title text-sm font-bold">Spending Limits</div>
								<div className="view-cards text-xs ml-[360px] mt-1">
									Resets on: July1, 2022
								</div>
								<div className="view-cards text-sm flex ml-[40px]">
									<a href="">Edit Limit</a>
									<span className="absolute right ml-[-22px]">
										<svg
											width="14"
											height="17"
											viewBox="0 0 18 17"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M0.25 15.25H17.75V16.5H0.25V15.25ZM14.875 4.625C15.375 4.125 15.375 3.375 14.875 2.875L12.625 0.625C12.125 0.125 11.375 0.125 10.875 0.625L1.5 10V14H5.5L14.875 4.625ZM11.75 1.5L14 3.75L12.125 5.625L9.875 3.375L11.75 1.5ZM2.75 12.75V10.5L9 4.25L11.25 6.5L5 12.75H2.75Z"
												fill="#191918"
												fill-opacity="0.7"
											/>
										</svg>
									</span>
								</div>
							</div>

							<div className=" flex flex-row justify-between mb-2 mt-8">
								{cardData && (
									<>
										<div className="total-issued-cards ml-[-687px] mt-2">
											<div className="no-of-cards text-xs font-semibold">
												{getCurrencySymbol(currency, spendingLimit)} per
												month
											</div>
											<div className="cards-type text-gray-500 text-[10px]">
												Spending Limit
											</div>
										</div>
										<div className="total-issued-cards mt-2 mr-[100px]">
											<div className="no-of-cards text-xs font-semibold">
												{spendAmount}
											</div>
											<div className="cards-type text-gray-500 text-[10px]">
												Spent
											</div>
										</div>
										<div className="total-issued-cards mt-2 mx-2 flex-col">
											<div className="no-of-cards text-xs font-semibold self-center">
												{remaining}
											</div>
											<div className="cards-type text-gray-500 text-[10px] self-center">
												Remaining
											</div>
										</div>
									</>
								)}
							</div>

							<div className=" flex flex-row justify-between mt-[80px] mb-4">
								<div className="total-issued-cards ml-[-687px]">
									<span>
										<svg
											width="680"
											height="5"
											viewBox="0 0 779 5"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<line
												y1="2.5"
												x2="779"
												y2="2.5"
												stroke="red"
												stroke-opacity="0.3"
												stroke-width="5"
											/>
										</svg>
									</span>
								</div>
							</div>
						</div>
						{getTransactionData.length > 0 ? (
							<div className="fs-box-shadow ts-section mt-4 ml-4">
								<div className="ts-header px-3 py-3 border-b border-gray-200">
									<span className="flex justify-between font-bold">
										Transactions
									</span>
								</div>

								<div className="ts-table">
									<table className="min-w-full leading-normal">
										<thead>
											<tr>
												<th
													scope="col"
													className="px-4 w-1/6 pr-5 py-1 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-xs font-semibold"
												>
													Date
												</th>
												<th
													scope="col"
													className="py-1 px-5 w-1/5 mr-auto bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-xs  font-semibold"
												>
													Card
												</th>
												<th
													scope="col"
													className="py-1 px-5 w-1/5 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-xs  font-semibold"
												>
													Type
												</th>
												<th
													scope="col"
													className="px-3 py-1 bg-gray-200  border-b border-gray-200 text-gray-800  text-xs text-right font-semibold"
												>
													Amount
												</th>
											</tr>
										</thead>
										<tbody>
											{/* .map((transaction: any) => {
                                        const date = new Date(transaction!.created).toLocaleDateString();
                                        const created_by = transaction!.merchant_data!.name;
                                        const cardname = transaction!.merchant_data!.name;
                                        const type = transaction!.type;
                                        const amount = transaction!.amount < 0 ? `-$${transaction!.amount * -1}` : `$${transaction!.amount}`;
                                        return( */}
											{getTransactionData &&
												getTransactionData.map((item: any) => {
													return (
														<tr>
															<td className="px-4 w-1/6 pr-5 py-2 border-b border-gray-200 bg-white text-xs">
																<p className="text-gray-500 whitespace-no-wrap ">
																	{new Date(
																		item?.created * 1000
																	).toLocaleDateString()}
																</p>
															</td>
															<td className="py-2 px-5 w-1/5 border-b text-left border-gray-200 bg-white text-xs">
																<p className="text-gray-500 whitespace-no-wrap capitalize">
																	{cardData[0]?.cardholder?.name}
																</p>
															</td>

															<td className="py-2 px-5 w-1/5 border-b text-left border-gray-200 bg-white text-xs">
																<p className="text-gray-500 whitespace-no-wrap capitalize">
																	{item?.type}
																</p>
															</td>
															<td className="px-3 py-2 mr-4  border-b border-gray-200 bg-white text-xs text-right">
																<p className="text-gray-500 whitespace-no-wrap">
																	{getCurrencySymbol(
																		item?.currency,
																		item?.amount / 100
																	)}
																</p>
															</td>
														</tr>
													);
												})}
										</tbody>
									</table>
									<div className="flex justify-end items-center ">
										<span className="text-xs">1 - 25</span>
										<button
											type="button"
											className="p-4  text-base  text-gray-600 bg-white hover:bg-gray-100"
										>
											<svg
												width="8"
												height="12"
												viewBox="0 0 8 14"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M7 13L1 7L7 1"
													stroke="#191918"
													stroke-opacity="0.5"
												/>
											</svg>
										</button>
										<button
											type="button"
											className="p-4  text-base  text-gray-600 bg-white hover:bg-gray-100"
										>
											<svg
												width="8"
												height="12"
												viewBox="0 0 8 14"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M1 1L7 7L1 13"
													stroke="#191918"
													stroke-opacity="0.5"
												/>
											</svg>
										</button>
									</div>
								</div>
							</div>
						) : (
							<div className="fs-box-shadow flex flex-1 justify-center items-center">
								<div className=" self-auto font-bold">No Transactions Found</div>
							</div>
						)}
					</div>
				</div>
			</main>
		</div>
	);
};
export default ViewCardDetail;
