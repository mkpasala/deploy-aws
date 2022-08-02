import React, { useState, useEffect } from "react";
import CARD_BACKGROUND_LOGO from "../../../assets/card-background.png";
import FLARE_LOGO from "../../../assets/Flare_Logo_Color.png";
import CARD_LOGO from "../../../assets/card-logo.png";
import AddCardPopup from "./AddCardPopup";
import DepositFundsPopup from "./DepositFundsPopup";
import WithdrawFundsPopup from "./WithdrawFundsPopup";
import Spinner from "./Spinner";
import cardsAPIService from "../../../services/cardsAPIService";

const TransactionTable = () => {
	const cardsService = new cardsAPIService();
	const [modalOn, setModalOn] = useState<any>(false);
	const [showDepositFunds, setShowDepositFunds] = useState<boolean>(false);
	const [showWithdrawFunds, setShowWithdrawFunds] = useState<boolean>(false);
	const [showSpinner, setShowSpinner] = useState(false);
	const [balance, setbBalance] = useState<any>(null);
	const account_id = sessionStorage.getItem("account_id");

	useEffect(() => {
		retrieveBalance();
	}, []);
	const retrieveBalance = async () => {
		setShowSpinner(true);
		try {
			let response: any = await cardsService.retrieveBalance({ account_id: account_id });
			setShowSpinner(false);
			if (
				response.type === "StripePermissionError" ||
				response.type === "StripeInvalidRequestError"
			) {
			} else {
				setbBalance(response!.issuing!.available[0]!.amount / 100);
			}
		} catch (ex) {
			console.log("exception", ex);
			setShowSpinner(false);
		}
	};

	// modalOn && (
	//     <AddCardPopup
	//         setModalOn={setModalOn}
	//     />
	// )
	return (
		<>
			<body className="h-screen">
				<Spinner show={showSpinner} />
				<div className="card-section font-sans" />
				<nav className="bg-white shadow-lg">
					<div className="max-w-7xl mx-auto px-[100px] py-[9px]">
						<div className="flex justify-between">
							<div className="flex">
								{/* <!-- Website Logo --> */}
								<div>
									<a href="#" className="flex items-center">
										<img src={FLARE_LOGO} alt="Logo" className="" />
									</a>
								</div>

								{modalOn && <AddCardPopup setModalOn={setModalOn} />}
								{/* <!-- Primary Navbar items --> */}
								<div className="flex ml-[200px] py-[9px]">
									<ul className="text-base text-gray-700 flex justify-between">
										<li className="flex items-center px-5">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
												/>
											</svg>
											<a className="ml-1" href="#">
												Home
											</a>
										</li>
										<li className="flex items-center px-5">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
												/>
											</svg>
											<a className="ml-1" href="#">
												Users
											</a>
										</li>
										<li className="flex items-center px-5">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
												/>
											</svg>
											<a className="ml-1" href="#">
												Programs
											</a>
										</li>
										<li className="flex items-center px-5">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
												/>
											</svg>
											<a className="ml-1" href="#">
												Cards
											</a>
										</li>
										<li className="flex items-center px-14">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="h-4 w-4"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												stroke-width="2"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
												/>
											</svg>
											<a className="ml-1" href="#">
												Login
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</nav>
				<main className="main-content flex flex-col mx-[205px]">
					<div className="screen-title pt-[28px] pb-[32px]">Cards</div>
					<div className="cards-management flex flex-row text-gray-700 font-sans">
						<div className="bl-section flex flex-col">
							<div className="fs-box-shadow flex flex-row w-[650px] overflow-x-hidden justify-between">
								<div className="bl-details-left flex flex-row p-6">
									<div className="bl mr-7">
										<div className="bl-amount font-bold">${balance}</div>
										<div className="bl-type text-xs text-gray-500">Balance</div>
									</div>
									<div id="bl-actions">
										<button
											type="button"
											className="mr-[4px] text-sm bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded py-2 px-2 w-32"
											onClick={(event) => {
												setShowDepositFunds(true);
											}}
										>
											Deposit funds
										</button>
										<button
											type="button"
											className="text-sm bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded  py-2 px-2 w-34"
											onClick={(event) => {
												setShowWithdrawFunds(true);
											}}
										>
											Withdraw funds
										</button>
									</div>
								</div>
								<div className="bl-details-right ml-12 border-l-[1px] border-gray-300 py-6 pr-6">
									<div className="bl pl-4">
										<div className="bl-amount font-bold">$5,700</div>
										<div className="bl-type text-xs text-gray-500">
											Deposited Balance
										</div>
									</div>
								</div>
							</div>
							<div className="fs-box-shadow ts-section mt-4 h-[400px]">
								<div className="ts-header px-6 py-3 border-b border-gray-200">
									<span className="flex justify-between font-bold ">
										Transactions
										{/* <img src={FILTER} className="cursor-pointer" alt="" /> */}
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
									</span>
								</div>

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
										className="bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full border-0 py-2 pr-3 pl-12 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
										placeholder="Search user or program"
										type="text"
										name="searchTransaction text-xs"
									/>
								</div>
								<div className="ts-table">
									<table className="min-w-full leading-normal table-auto justify-between">
										<thead>
											<tr>
												<th
													scope="col"
													className="px-6 py-1 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-xs font-semibold"
												>
													Date
												</th>
												<th
													scope="col"
													className="px-3 py-1 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-xs  font-semibold"
												>
													User
												</th>
												<th
													scope="col"
													className="px-3 py-1 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-xs  font-semibold"
												>
													Program
												</th>
												<th
													scope="col"
													className="px-3 py-1 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-xs  font-semibold"
												>
													Type
												</th>
												<th
													scope="col"
													className="px-3 py-1 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-xs  font-semibold"
												>
													Amount
												</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className="px-6 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap ">
														20/06/2022
													</p>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<div className="flex items-center">
														<div className="flex-shrink-0">
															<a href="#" className="block relative">
																<svg
																	width="20"
																	height="20"
																	viewBox="0 0 20 20"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M16.7181 15.5812C17.6157 14.5013 18.24 13.221 18.5381 11.8488C18.8363 10.4766 18.7996 9.05273 18.4311 7.69771C18.0625 6.34268 17.3731 5.09634 16.421 4.06412C15.469 3.0319 14.2823 2.24417 12.9614 1.76756C11.6405 1.29095 10.2243 1.1395 8.83248 1.326C7.44067 1.5125 6.11426 2.03147 4.96545 2.83901C3.81664 3.64655 2.87922 4.71891 2.2325 5.96537C1.58577 7.21182 1.24877 8.5957 1.25 9.99995C1.25048 12.0413 1.96984 14.0173 3.28188 15.5812L3.26938 15.5918C3.31313 15.6443 3.36313 15.6893 3.40813 15.7412C3.46438 15.8056 3.525 15.8662 3.58313 15.9287C3.75813 16.1187 3.93813 16.3012 4.12688 16.4724C4.18438 16.5249 4.24375 16.5737 4.30188 16.6237C4.50188 16.7962 4.7075 16.9599 4.92063 17.1124C4.94813 17.1312 4.97313 17.1556 5.00063 17.1749V17.1674C6.46444 18.1975 8.21069 18.7504 10.0006 18.7504C11.7906 18.7504 13.5368 18.1975 15.0006 17.1674V17.1749C15.0281 17.1556 15.0525 17.1312 15.0806 17.1124C15.2931 16.9593 15.4994 16.7962 15.6994 16.6237C15.7575 16.5737 15.8169 16.5243 15.8744 16.4724C16.0631 16.3006 16.2431 16.1187 16.4181 15.9287C16.4763 15.8662 16.5363 15.8056 16.5931 15.7412C16.6375 15.6893 16.6881 15.6443 16.7319 15.5912L16.7181 15.5812ZM10 4.99995C10.5563 4.99995 11.1 5.1649 11.5625 5.47394C12.0251 5.78298 12.3855 6.22223 12.5984 6.73615C12.8113 7.25007 12.867 7.81557 12.7585 8.36114C12.6499 8.90671 12.3821 9.40785 11.9887 9.80118C11.5954 10.1945 11.0943 10.4624 10.5487 10.5709C10.0031 10.6794 9.43762 10.6237 8.92371 10.4109C8.40979 10.198 7.97054 9.8375 7.6615 9.37499C7.35245 8.91247 7.1875 8.36871 7.1875 7.81245C7.1875 7.06652 7.48382 6.35115 8.01127 5.82371C8.53871 5.29626 9.25408 4.99995 10 4.99995ZM5.00438 15.5812C5.01522 14.7606 5.34872 13.9772 5.93273 13.4005C6.51673 12.8239 7.30429 12.5004 8.125 12.4999H11.875C12.6957 12.5004 13.4833 12.8239 14.0673 13.4005C14.6513 13.9772 14.9848 14.7606 14.9956 15.5812C13.6249 16.8164 11.8452 17.5 10 17.5C8.15484 17.5 6.3751 16.8164 5.00438 15.5812Z"
																		fill="#191918"
																		fill-opacity="0.5"
																	/>
																</svg>
															</a>
														</div>
														<div className="ml-1">
															<p className="text-gray-500 whitespace-no-wrap">
																Mike Males
															</p>
														</div>
													</div>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														Program Title A
													</p>
												</td>

												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														Lorem Ipsum
													</p>
												</td>
												<td className="px-3 py-2 mr-4 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														-$1,280
													</p>
												</td>
											</tr>
											<tr>
												<td className="px-6 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														20/06/2022
													</p>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<div className="flex items-center">
														<div className="flex-shrink-0">
															<a href="#" className="block relative">
																<svg
																	width="20"
																	height="20"
																	viewBox="0 0 20 20"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M16.7181 15.5812C17.6157 14.5013 18.24 13.221 18.5381 11.8488C18.8363 10.4766 18.7996 9.05273 18.4311 7.69771C18.0625 6.34268 17.3731 5.09634 16.421 4.06412C15.469 3.0319 14.2823 2.24417 12.9614 1.76756C11.6405 1.29095 10.2243 1.1395 8.83248 1.326C7.44067 1.5125 6.11426 2.03147 4.96545 2.83901C3.81664 3.64655 2.87922 4.71891 2.2325 5.96537C1.58577 7.21182 1.24877 8.5957 1.25 9.99995C1.25048 12.0413 1.96984 14.0173 3.28188 15.5812L3.26938 15.5918C3.31313 15.6443 3.36313 15.6893 3.40813 15.7412C3.46438 15.8056 3.525 15.8662 3.58313 15.9287C3.75813 16.1187 3.93813 16.3012 4.12688 16.4724C4.18438 16.5249 4.24375 16.5737 4.30188 16.6237C4.50188 16.7962 4.7075 16.9599 4.92063 17.1124C4.94813 17.1312 4.97313 17.1556 5.00063 17.1749V17.1674C6.46444 18.1975 8.21069 18.7504 10.0006 18.7504C11.7906 18.7504 13.5368 18.1975 15.0006 17.1674V17.1749C15.0281 17.1556 15.0525 17.1312 15.0806 17.1124C15.2931 16.9593 15.4994 16.7962 15.6994 16.6237C15.7575 16.5737 15.8169 16.5243 15.8744 16.4724C16.0631 16.3006 16.2431 16.1187 16.4181 15.9287C16.4763 15.8662 16.5363 15.8056 16.5931 15.7412C16.6375 15.6893 16.6881 15.6443 16.7319 15.5912L16.7181 15.5812ZM10 4.99995C10.5563 4.99995 11.1 5.1649 11.5625 5.47394C12.0251 5.78298 12.3855 6.22223 12.5984 6.73615C12.8113 7.25007 12.867 7.81557 12.7585 8.36114C12.6499 8.90671 12.3821 9.40785 11.9887 9.80118C11.5954 10.1945 11.0943 10.4624 10.5487 10.5709C10.0031 10.6794 9.43762 10.6237 8.92371 10.4109C8.40979 10.198 7.97054 9.8375 7.6615 9.37499C7.35245 8.91247 7.1875 8.36871 7.1875 7.81245C7.1875 7.06652 7.48382 6.35115 8.01127 5.82371C8.53871 5.29626 9.25408 4.99995 10 4.99995ZM5.00438 15.5812C5.01522 14.7606 5.34872 13.9772 5.93273 13.4005C6.51673 12.8239 7.30429 12.5004 8.125 12.4999H11.875C12.6957 12.5004 13.4833 12.8239 14.0673 13.4005C14.6513 13.9772 14.9848 14.7606 14.9956 15.5812C13.6249 16.8164 11.8452 17.5 10 17.5C8.15484 17.5 6.3751 16.8164 5.00438 15.5812Z"
																		fill="#191918"
																		fill-opacity="0.5"
																	/>
																</svg>
															</a>
														</div>
														<div className="ml-1">
															<p className="text-gray-500 whitespace-no-wrap">
																Mike Males
															</p>
														</div>
													</div>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														Program Title A
													</p>
												</td>

												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														Lorem Ipsum
													</p>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														-$1,280
													</p>
												</td>
											</tr>
											<tr>
												<td className="px-6 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														20/06/2022
													</p>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<div className="flex items-center">
														<div className="flex-shrink-0">
															<a href="#" className="block relative">
																<svg
																	width="20"
																	height="20"
																	viewBox="0 0 20 20"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M16.7181 15.5812C17.6157 14.5013 18.24 13.221 18.5381 11.8488C18.8363 10.4766 18.7996 9.05273 18.4311 7.69771C18.0625 6.34268 17.3731 5.09634 16.421 4.06412C15.469 3.0319 14.2823 2.24417 12.9614 1.76756C11.6405 1.29095 10.2243 1.1395 8.83248 1.326C7.44067 1.5125 6.11426 2.03147 4.96545 2.83901C3.81664 3.64655 2.87922 4.71891 2.2325 5.96537C1.58577 7.21182 1.24877 8.5957 1.25 9.99995C1.25048 12.0413 1.96984 14.0173 3.28188 15.5812L3.26938 15.5918C3.31313 15.6443 3.36313 15.6893 3.40813 15.7412C3.46438 15.8056 3.525 15.8662 3.58313 15.9287C3.75813 16.1187 3.93813 16.3012 4.12688 16.4724C4.18438 16.5249 4.24375 16.5737 4.30188 16.6237C4.50188 16.7962 4.7075 16.9599 4.92063 17.1124C4.94813 17.1312 4.97313 17.1556 5.00063 17.1749V17.1674C6.46444 18.1975 8.21069 18.7504 10.0006 18.7504C11.7906 18.7504 13.5368 18.1975 15.0006 17.1674V17.1749C15.0281 17.1556 15.0525 17.1312 15.0806 17.1124C15.2931 16.9593 15.4994 16.7962 15.6994 16.6237C15.7575 16.5737 15.8169 16.5243 15.8744 16.4724C16.0631 16.3006 16.2431 16.1187 16.4181 15.9287C16.4763 15.8662 16.5363 15.8056 16.5931 15.7412C16.6375 15.6893 16.6881 15.6443 16.7319 15.5912L16.7181 15.5812ZM10 4.99995C10.5563 4.99995 11.1 5.1649 11.5625 5.47394C12.0251 5.78298 12.3855 6.22223 12.5984 6.73615C12.8113 7.25007 12.867 7.81557 12.7585 8.36114C12.6499 8.90671 12.3821 9.40785 11.9887 9.80118C11.5954 10.1945 11.0943 10.4624 10.5487 10.5709C10.0031 10.6794 9.43762 10.6237 8.92371 10.4109C8.40979 10.198 7.97054 9.8375 7.6615 9.37499C7.35245 8.91247 7.1875 8.36871 7.1875 7.81245C7.1875 7.06652 7.48382 6.35115 8.01127 5.82371C8.53871 5.29626 9.25408 4.99995 10 4.99995ZM5.00438 15.5812C5.01522 14.7606 5.34872 13.9772 5.93273 13.4005C6.51673 12.8239 7.30429 12.5004 8.125 12.4999H11.875C12.6957 12.5004 13.4833 12.8239 14.0673 13.4005C14.6513 13.9772 14.9848 14.7606 14.9956 15.5812C13.6249 16.8164 11.8452 17.5 10 17.5C8.15484 17.5 6.3751 16.8164 5.00438 15.5812Z"
																		fill="#191918"
																		fill-opacity="0.5"
																	/>
																</svg>
															</a>
														</div>
														<div className="ml-1">
															<p className="text-gray-500 whitespace-no-wrap">
																Mike Males
															</p>
														</div>
													</div>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														Program Title A
													</p>
												</td>

												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														Lorem Ipsum
													</p>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														-$1,280
													</p>
												</td>
											</tr>
											<tr>
												<td className="px-6 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														20/06/2022
													</p>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<div className="flex items-end">
														<div className="flex-shrink-0">
															<a href="#" className="block relative">
																<svg
																	width="20"
																	height="20"
																	viewBox="0 0 20 20"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M16.7181 15.5812C17.6157 14.5013 18.24 13.221 18.5381 11.8488C18.8363 10.4766 18.7996 9.05273 18.4311 7.69771C18.0625 6.34268 17.3731 5.09634 16.421 4.06412C15.469 3.0319 14.2823 2.24417 12.9614 1.76756C11.6405 1.29095 10.2243 1.1395 8.83248 1.326C7.44067 1.5125 6.11426 2.03147 4.96545 2.83901C3.81664 3.64655 2.87922 4.71891 2.2325 5.96537C1.58577 7.21182 1.24877 8.5957 1.25 9.99995C1.25048 12.0413 1.96984 14.0173 3.28188 15.5812L3.26938 15.5918C3.31313 15.6443 3.36313 15.6893 3.40813 15.7412C3.46438 15.8056 3.525 15.8662 3.58313 15.9287C3.75813 16.1187 3.93813 16.3012 4.12688 16.4724C4.18438 16.5249 4.24375 16.5737 4.30188 16.6237C4.50188 16.7962 4.7075 16.9599 4.92063 17.1124C4.94813 17.1312 4.97313 17.1556 5.00063 17.1749V17.1674C6.46444 18.1975 8.21069 18.7504 10.0006 18.7504C11.7906 18.7504 13.5368 18.1975 15.0006 17.1674V17.1749C15.0281 17.1556 15.0525 17.1312 15.0806 17.1124C15.2931 16.9593 15.4994 16.7962 15.6994 16.6237C15.7575 16.5737 15.8169 16.5243 15.8744 16.4724C16.0631 16.3006 16.2431 16.1187 16.4181 15.9287C16.4763 15.8662 16.5363 15.8056 16.5931 15.7412C16.6375 15.6893 16.6881 15.6443 16.7319 15.5912L16.7181 15.5812ZM10 4.99995C10.5563 4.99995 11.1 5.1649 11.5625 5.47394C12.0251 5.78298 12.3855 6.22223 12.5984 6.73615C12.8113 7.25007 12.867 7.81557 12.7585 8.36114C12.6499 8.90671 12.3821 9.40785 11.9887 9.80118C11.5954 10.1945 11.0943 10.4624 10.5487 10.5709C10.0031 10.6794 9.43762 10.6237 8.92371 10.4109C8.40979 10.198 7.97054 9.8375 7.6615 9.37499C7.35245 8.91247 7.1875 8.36871 7.1875 7.81245C7.1875 7.06652 7.48382 6.35115 8.01127 5.82371C8.53871 5.29626 9.25408 4.99995 10 4.99995ZM5.00438 15.5812C5.01522 14.7606 5.34872 13.9772 5.93273 13.4005C6.51673 12.8239 7.30429 12.5004 8.125 12.4999H11.875C12.6957 12.5004 13.4833 12.8239 14.0673 13.4005C14.6513 13.9772 14.9848 14.7606 14.9956 15.5812C13.6249 16.8164 11.8452 17.5 10 17.5C8.15484 17.5 6.3751 16.8164 5.00438 15.5812Z"
																		fill="#191918"
																		fill-opacity="0.5"
																	/>
																</svg>
															</a>
														</div>
														<div className="ml-1">
															<p className="text-gray-500 whitespace-no-wrap">
																Mike Males
															</p>
														</div>
													</div>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														Program Title A
													</p>
												</td>

												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														Lorem Ipsum
													</p>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														-$1,280
													</p>
												</td>
											</tr>
											<tr>
												<td className="px-6 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														20/06/2022
													</p>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<div className="flex items-end">
														<div className="flex-shrink-0">
															<a href="#" className="block relative">
																<svg
																	width="20"
																	height="20"
																	viewBox="0 0 20 20"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M16.7181 15.5812C17.6157 14.5013 18.24 13.221 18.5381 11.8488C18.8363 10.4766 18.7996 9.05273 18.4311 7.69771C18.0625 6.34268 17.3731 5.09634 16.421 4.06412C15.469 3.0319 14.2823 2.24417 12.9614 1.76756C11.6405 1.29095 10.2243 1.1395 8.83248 1.326C7.44067 1.5125 6.11426 2.03147 4.96545 2.83901C3.81664 3.64655 2.87922 4.71891 2.2325 5.96537C1.58577 7.21182 1.24877 8.5957 1.25 9.99995C1.25048 12.0413 1.96984 14.0173 3.28188 15.5812L3.26938 15.5918C3.31313 15.6443 3.36313 15.6893 3.40813 15.7412C3.46438 15.8056 3.525 15.8662 3.58313 15.9287C3.75813 16.1187 3.93813 16.3012 4.12688 16.4724C4.18438 16.5249 4.24375 16.5737 4.30188 16.6237C4.50188 16.7962 4.7075 16.9599 4.92063 17.1124C4.94813 17.1312 4.97313 17.1556 5.00063 17.1749V17.1674C6.46444 18.1975 8.21069 18.7504 10.0006 18.7504C11.7906 18.7504 13.5368 18.1975 15.0006 17.1674V17.1749C15.0281 17.1556 15.0525 17.1312 15.0806 17.1124C15.2931 16.9593 15.4994 16.7962 15.6994 16.6237C15.7575 16.5737 15.8169 16.5243 15.8744 16.4724C16.0631 16.3006 16.2431 16.1187 16.4181 15.9287C16.4763 15.8662 16.5363 15.8056 16.5931 15.7412C16.6375 15.6893 16.6881 15.6443 16.7319 15.5912L16.7181 15.5812ZM10 4.99995C10.5563 4.99995 11.1 5.1649 11.5625 5.47394C12.0251 5.78298 12.3855 6.22223 12.5984 6.73615C12.8113 7.25007 12.867 7.81557 12.7585 8.36114C12.6499 8.90671 12.3821 9.40785 11.9887 9.80118C11.5954 10.1945 11.0943 10.4624 10.5487 10.5709C10.0031 10.6794 9.43762 10.6237 8.92371 10.4109C8.40979 10.198 7.97054 9.8375 7.6615 9.37499C7.35245 8.91247 7.1875 8.36871 7.1875 7.81245C7.1875 7.06652 7.48382 6.35115 8.01127 5.82371C8.53871 5.29626 9.25408 4.99995 10 4.99995ZM5.00438 15.5812C5.01522 14.7606 5.34872 13.9772 5.93273 13.4005C6.51673 12.8239 7.30429 12.5004 8.125 12.4999H11.875C12.6957 12.5004 13.4833 12.8239 14.0673 13.4005C14.6513 13.9772 14.9848 14.7606 14.9956 15.5812C13.6249 16.8164 11.8452 17.5 10 17.5C8.15484 17.5 6.3751 16.8164 5.00438 15.5812Z"
																		fill="#191918"
																		fill-opacity="0.5"
																	/>
																</svg>
															</a>
														</div>
														<div className="ml-1">
															<p className="text-gray-500 whitespace-no-wrap">
																Mike Males
															</p>
														</div>
													</div>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														Program Title A
													</p>
												</td>

												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														Lorem Ipsum
													</p>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														-$1,280
													</p>
												</td>
											</tr>
											<tr>
												<td className="px-6 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														20/06/2022
													</p>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<div className="flex items-end">
														<div className="flex-shrink-0">
															<a href="#" className="block relative">
																<svg
																	width="20"
																	height="20"
																	viewBox="0 0 20 20"
																	fill="none"
																	xmlns="http://www.w3.org/2000/svg"
																>
																	<path
																		d="M16.7181 15.5812C17.6157 14.5013 18.24 13.221 18.5381 11.8488C18.8363 10.4766 18.7996 9.05273 18.4311 7.69771C18.0625 6.34268 17.3731 5.09634 16.421 4.06412C15.469 3.0319 14.2823 2.24417 12.9614 1.76756C11.6405 1.29095 10.2243 1.1395 8.83248 1.326C7.44067 1.5125 6.11426 2.03147 4.96545 2.83901C3.81664 3.64655 2.87922 4.71891 2.2325 5.96537C1.58577 7.21182 1.24877 8.5957 1.25 9.99995C1.25048 12.0413 1.96984 14.0173 3.28188 15.5812L3.26938 15.5918C3.31313 15.6443 3.36313 15.6893 3.40813 15.7412C3.46438 15.8056 3.525 15.8662 3.58313 15.9287C3.75813 16.1187 3.93813 16.3012 4.12688 16.4724C4.18438 16.5249 4.24375 16.5737 4.30188 16.6237C4.50188 16.7962 4.7075 16.9599 4.92063 17.1124C4.94813 17.1312 4.97313 17.1556 5.00063 17.1749V17.1674C6.46444 18.1975 8.21069 18.7504 10.0006 18.7504C11.7906 18.7504 13.5368 18.1975 15.0006 17.1674V17.1749C15.0281 17.1556 15.0525 17.1312 15.0806 17.1124C15.2931 16.9593 15.4994 16.7962 15.6994 16.6237C15.7575 16.5737 15.8169 16.5243 15.8744 16.4724C16.0631 16.3006 16.2431 16.1187 16.4181 15.9287C16.4763 15.8662 16.5363 15.8056 16.5931 15.7412C16.6375 15.6893 16.6881 15.6443 16.7319 15.5912L16.7181 15.5812ZM10 4.99995C10.5563 4.99995 11.1 5.1649 11.5625 5.47394C12.0251 5.78298 12.3855 6.22223 12.5984 6.73615C12.8113 7.25007 12.867 7.81557 12.7585 8.36114C12.6499 8.90671 12.3821 9.40785 11.9887 9.80118C11.5954 10.1945 11.0943 10.4624 10.5487 10.5709C10.0031 10.6794 9.43762 10.6237 8.92371 10.4109C8.40979 10.198 7.97054 9.8375 7.6615 9.37499C7.35245 8.91247 7.1875 8.36871 7.1875 7.81245C7.1875 7.06652 7.48382 6.35115 8.01127 5.82371C8.53871 5.29626 9.25408 4.99995 10 4.99995ZM5.00438 15.5812C5.01522 14.7606 5.34872 13.9772 5.93273 13.4005C6.51673 12.8239 7.30429 12.5004 8.125 12.4999H11.875C12.6957 12.5004 13.4833 12.8239 14.0673 13.4005C14.6513 13.9772 14.9848 14.7606 14.9956 15.5812C13.6249 16.8164 11.8452 17.5 10 17.5C8.15484 17.5 6.3751 16.8164 5.00438 15.5812Z"
																		fill="#191918"
																		fill-opacity="0.5"
																	/>
																</svg>
															</a>
														</div>
														<div className="ml-1">
															<p className="text-gray-500 whitespace-no-wrap">
																Mike Males
															</p>
														</div>
													</div>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														Program Title A
													</p>
												</td>

												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														Lorem Ipsum
													</p>
												</td>
												<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
													<p className="text-gray-500 whitespace-no-wrap">
														-$1,280
													</p>
												</td>
											</tr>
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
						</div>
						<div className="mr-6"></div>
						<div className="cards-section fs-box-shadow flex flex-col">
							<div className="cards-header flex flex-row justify-between mb-2 mx-3 mt-5">
								<div className="card-title font-bold">Cards</div>
								<div className="view-cards text-sm">
									<a href="">View All Cards</a>
								</div>
							</div>
							<div className="cards-details flex flex-row mb-2 mx-3">
								<div className="total-issued-cards mr-2">
									<div className="no-of-cards font-bold">23</div>
									<div className="cards-type text-[10px] text-gray-500">
										Cards Issued
									</div>
								</div>
								<div className="total-blocked-cards mr-2">
									<div className="no-of-cards font-bold">3</div>
									<div className="cards-type text-[10px] text-gray-500">
										Cards Blocked
									</div>
								</div>
								{/* <div className="add-new-card text-red-500  hover:text-red-600 font-xs font-bold">Add New</div> */}
								<div className="ml-8">
									<button
										type="button"
										onClick={() => setModalOn(true)}
										className="bg-transparent hover:bg-red-500 text-red-600 hover:text-white border border-red-500 hover:border-transparent rounded text-xs font-bold h-8 w-20 mt-1"
									>
										Add New
									</button>
								</div>
							</div>
							<div className="search-user relative border-y border-gray-200 overflow-y-auto">
								<span className="absolute top-3 left-7">
									<svg
										fill="none"
										stroke="#94a3b8"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										viewBox="0 0 24 24"
										className="w-3 h-3"
									>
										<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
									</svg>
								</span>
								<input
									className="search-txt text-xs bg-white w-full border-0 py-[6px] pr-3 pl-12 focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
									placeholder="Search Card Name"
									type="text"
									name="searchcardname"
								/>
							</div>
							<div className="cards-list">
								<div
									className="h-[143px] w-[255px] mx-3 my-2"
									style={{ backgroundImage: `url(${CARD_BACKGROUND_LOGO})` }}
								>
									<div className="flex justify-between items-center">
										<span className="mt-5 ml-5 flex">
											<span className="text-white text-xs font-bold z-30">
												Flare
											</span>
											<img src={CARD_LOGO} className="h-3 -ml-8 mt-1" />
										</span>
										<span className="text-white mt-5 mr-5 text-xs font-bold">
											Mike Males
										</span>
									</div>
									<div className="flex justify-end">
										<div className="text-white mt-0 mr-5 text-xs">
											{" "}
											$2,000/$2,500
										</div>
									</div>
									<div className="text-white ml-5 mt-7 text-sm font-bold">
										**** **** **** 6712
									</div>
									<div className="flex justify-between items-center">
										<div className="text-white ml-5 text-xs">01/24</div>
										<div className="bg-gray-400 w-8 h-4 mr-5 rounded-full">
											<div className="bg-white w-3 h-3 rounded-full mt-[2px] mr-[3px]"></div>
										</div>
									</div>
								</div>
								<div
									className="h-[143px] w-[255px] mx-3 my-2"
									style={{ backgroundImage: `url(${CARD_BACKGROUND_LOGO})` }}
								>
									<div className="flex justify-between items-center">
										<span className="mt-5 ml-5 flex">
											<span className="text-white text-xs font-bold z-30">
												Flare
											</span>
											<img src={CARD_LOGO} className="h-3 -ml-8 mt-1" />
										</span>
										<span className="text-white mt-5 mr-5 text-xs font-bold">
											David Loss
										</span>
									</div>
									<div className="flex justify-end">
										<div className="text-white text-xs mt-0 mr-5">Disabled</div>
									</div>
									<div className="text-white ml-5 mt-7 text-sm font-bold">
										**** **** **** 2181
									</div>
									<div className="flex justify-between items-center">
										<div className="text-white ml-5 text-xs">01/24</div>
										<div className="bg-orange-600 w-8 h-4 mr-5 rounded-full flex justify-end">
											<div className="bg-white w-3 h-3 rounded-full mt-[2px] mr-[3px]"></div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<DepositFundsPopup
						isShow={showDepositFunds}
						onHide={() => {
							setShowDepositFunds(false);
						}}
					/>
					<WithdrawFundsPopup
						isShow={showWithdrawFunds}
						onHide={() => {
							setShowWithdrawFunds(false);
						}}
					/>
				</main>
			</body>
		</>
	);
};

export default TransactionTable;
