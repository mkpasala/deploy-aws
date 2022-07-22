import CARDS_LANDING_LOGO from "../../../assets/card-landing-page-logo.png";
import Spinner from "./Spinner";
import React, { useState, useContext, useEffect } from "react";
import cardsAPIService from "../../../services/cardsAPIService";
import { sessionContext } from "../../../app";
import organizationService from "../../../services/organizationService";

const cardsService = new cardsAPIService();
const CardsInit = () => {
	// call Create custom connect account with known information.
	const [showSpinner, setShowSpinner] = useState(false);
	const [email, setEmail] = useState("");
	const [accountId, setAccountId] = useState("");
	//const account_id = 'acct_1LLSk3QvXDA3Gh6f'; //'acct_1LKxZjR52LxNwH3Y'; //acct_1LLOc6R80wjEJFG5

	const session = useContext(sessionContext);
	const sessionUser = session?.user;
	const sessionOrganization = session?.organization;
	const updateSession = session!.updateSession;

	useEffect(() => {
		console.log("sessionUser:", sessionUser);
		console.log("sessionOrganization:", sessionOrganization);
		if (sessionUser && sessionUser.email) setEmail(sessionUser!.email);
	}, [session]);

	const getRedirectURL = async (e: any) => {
		e.preventDefault();
		try {
			setShowSpinner(true);
			let res: any = await cardsService.getAccountURL({ email: email, id: accountId });
			sessionStorage.setItem("account_id", res.account_id);
			if (res && res.goto_url) {
				setShowSpinner(false);
				window.location.href = res.goto_url;
			}
		} catch (ex) {
			console.log("exception", ex);
			setShowSpinner(false);
		}
	};

	return (
		<>
			<Spinner show={showSpinner} />
			<main className="main-content flex flex-col mx-[205px]">
				<div className="screen-title pt-[28px] pb-[32px]">Cards</div>
				<div className="get-started flex flex-col text-center">
					<div className="card-start-img mb-11 mt-14">
						<img className="mx-auto" src={CARDS_LANDING_LOGO} alt="Get started" />
					</div>
					<div className="card-start-header mx-auto mb-3">Create Finance account</div>
					<div className="card-start-desc mx-auto w-96 mb-6">
						<p>
							Enter Email ID to create an account or Account ID to resume onboarding
						</p>
						<form onSubmit={getRedirectURL} className="w-full max-w-sm">
							<div className="flex items-center border-y border-teal-500 py-2 mt-2">
								<input
									className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
									type="text"
									placeholder="Enter Email"
									aria-label="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									disabled={!!accountId}
								/>
							</div>
							<div className="flex items-center border-b border-teal-500 py-2">
								<input
									className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
									type="text"
									placeholder="Enter Account ID"
									aria-label="Account ID"
									value={accountId}
									onChange={(e) => setAccountId(e.target.value)}
									disabled={!!email}
								/>
							</div>
						</form>
					</div>
					<button
						onClick={getRedirectURL}
						type="button"
						className={`mx-auto  mb-20  text-white font-bold py-2 px-4 rounded w-36 ${
							!(!!email || !!accountId)
								? "bg-gray-500 text-gray-600"
								: "bg-red-500  hover:bg-red-700 text-white"
						}`}
						disabled={!(!!email || !!accountId)}
					>
						{accountId ? "Resume" : "Get Started"}
					</button>
				</div>
			</main>
		</>
	);
};

export default CardsInit;
