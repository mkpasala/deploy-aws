import CARDS_LANDING_LOGO from "../../../assets/card-landing-page-logo.png";
import Spinner from "./Spinner";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import cardsAPIService from "../../../services/cardsAPIService";
import { sessionContext } from "../../../app";
import organizationService from "../../../services/organizationService";
import flareDBService from "../../../services/flareDBService";

const CardsInit = (props: any) => {
	const cardsService = new cardsAPIService();
	const flareService = new flareDBService();

	// call Create custom connect account with known information.
	const [showSpinner, setShowSpinner] = useState(false);
	const [email, setEmail] = useState("");
	const [accountId, setAccountId] = useState("");
	const [isResume, setIsResume] = useState(false);
	const session = useContext(sessionContext);
	const sessionUser = session?.user;
	const sessionOrganization = session?.organization;
	let navigate = useNavigate();

	useEffect(() => {
		//callling stripe connect account details;;
		(async () => {
			setShowSpinner(true);
			let account: any = await getAccountDetails(); //fetching the account details
			if (account) {
				if (account && account.id) {
					let currently_due =
						account.requirements && account.requirements.currently_due.length > 0;
					if (account.requirements.currently_due.length === 1) {
						currently_due = !(
							account.requirements.currently_due[0] === "external_account"
						);
					}
					let eventually_due =
						account.requirements && account.requirements.eventually_due.length > 0;
					if (account.requirements.eventually_due.length === 1) {
						eventually_due = !(
							account.requirements.eventually_due[0] === "external_account"
						);
					}
					if (currently_due || eventually_due) {
						setIsResume(true);
					} else if (account.charges_enabled) {
						//issuing cards can be done
						navigate("/connect-bank-account");
					}
					// if no external bank account id added to the stripe account payouts won't happen and
					// account shows error banner in dashboard which indicates account not in complete state
					// how to add external bank account 1. On onboard 2. add a new page :: TBD
					else if (account.payouts_enabled) {
						// payouts can be done
					}
				}
			}
			setShowSpinner(false);
		})();
	}, [session]);

	const getAccountDetails = async () => {
		if (sessionUser && sessionUser.email) {
			setEmail(sessionUser!.email);
		}
		let connectAccountId, account;
		if (sessionOrganization && sessionOrganization.stripeConnectId) {
			connectAccountId = sessionOrganization.stripeConnectId;
			setAccountId(connectAccountId);
		} else if (props.accountId) {
			connectAccountId = props.accountId;
			setAccountId(connectAccountId);
			//REST call to update the StipeConnectId
			await updateOrganization(connectAccountId);
		} else {
			setIsResume(false);
		}
		if (connectAccountId) {
			setShowSpinner(true);
			account = await cardsService.getConnectAccountDetails({ id: connectAccountId });
			setShowSpinner(false);
			if (account && account.id) {
				return account;
			}
		} else {
			return null;
		}
	};

	const emailHandler = (e: any) => {
		e.preventDefault();
		setEmail(e.target.value);
		setIsResume(false);
	};

	const getRedirectURL = async (e: any) => {
		e.preventDefault();
		try {
			setShowSpinner(true);
			let res: any = await cardsService.getAccountURL({
				email: email,
				id: accountId,
				app_url: "dev",
			});
			setShowSpinner(false);
			if (res && res.goto_url) {
				window.location.href = res.goto_url;
			}
		} catch (ex) {
			console.log("exception", ex);
			setShowSpinner(false);
		}
	};

	const updateOrganization = async (accountId: string): Promise<void> => {
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
					stripeCardholderId: null,
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

	return (
		<>
			<Spinner show={showSpinner} />
			{!showSpinner && (
				<main className="main-content flex flex-col mx-[205px]">
					<div className="screen-title pt-[28px] pb-[32px]">Cards</div>
					<div className="get-started flex flex-col text-center">
						<div className="card-start-img mb-11 mt-14">
							<img className="mx-auto" src={CARDS_LANDING_LOGO} alt="Get started" />
						</div>
						<div className="text-sm w-auto mb-6 mx-auto">
							{isResume ? (
								<p>
									Account details are not fully submitted please resume onboarding
								</p>
							) : (
								<p>To create an account Get started and complete onboarding.</p>
							)}
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
							{isResume ? "Resume" : "Get Started"}
						</button>
					</div>
				</main>
			)}
		</>
	);
};

export default CardsInit;
