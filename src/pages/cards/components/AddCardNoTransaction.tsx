import CARDS_LANDING_LOGO from "../../../assets/card-landing-page-logo.png";
import React, { useState, useEffect } from "react";
import AddCardPopup from "./AddCardPopup";
const GROUP_LOGO = new URL('../../../assets/GROUP.png', import.meta.url);
import NavBar from "./navbar";
import DepositFundsPopup from "./DepositFundsPopup";
import WithdrawFundsPopup from "./WithdrawFundsPopup";
import Spinner from "./Spinner";
import cardsAPIService from "../../../services/cardsAPIService";

const AddCardNoTransaction = () => {
	const cardsService = new cardsAPIService();
	const [modalOn, setModalOn] = useState<any>(false);
	const [showDepositFunds, setShowDepositFunds] = useState<boolean>(false);
	const [showWithdrawFunds, setShowWithdrawFunds] = useState<boolean>(false);
	const [showSpinner, setShowSpinner] = useState(false);
	const [balance, setbBalance] = useState<any>("");
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
				setbBalance(response!.issuing!.available[0]!.amount);
			}
		} catch (ex) {
			console.log("exception", ex);
			setShowSpinner(false);
		}
	};
	return (
		<>
			{`showSpinner${showSpinner}`}
			{modalOn && <AddCardPopup setModalOn={setModalOn} />}
			<Spinner show={showSpinner} />
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
										<button
											type="button"
											className="bg-transparent hover:bg-red-500 text-red-600 font-semibold hover:text-white border border-red-500 hover:border-transparent rounded  py-2 px-2 w-34"
											onClick={(event) => {
												setShowWithdrawFunds(true);
											}}
										>
											Withdraw funds
										</button>
									</div>
								</div>
								<div className="bl-details-right ml-20 border-l-[1px] border-gray-300 py-6 pr-6">
									<div className="bl pl-4">
										<div className="bl-amount font-bold text-lg">$0</div>
										<div className="bl-type text-sm text-gray-500">
											Deposited Balance
										</div>
									</div>
								</div>
							</div>
							{/* <div class="fs-box-shadow ts-section mt-4"> */}
							<div className=" px-6 py-2  border-gray-200"></div>
							<div className="fs-box-shadow flex flex-col border-gray-200 w-[800px] h-[285px] overflow-hidden">
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
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
								</div>
							</div>
						</div>
						<div className=" px-2 border-gray-200"></div>
						<div className="fs-box-shadow flex flex-col border-gray-800 w-[300px] h-[400px] overflow-hidden">
							<div className="cards-header flex flex-row justify-items-center mb-2 mx-2 mt-5">
								<div className="card-title font-bold">Cards</div>
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
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

export default AddCardNoTransaction;
