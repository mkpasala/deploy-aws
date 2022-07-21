import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import flareLogo from "../../../assets/Flare_Logo_Color.png";
import qbLogo from "../../../assets/QuickBooks_Logo_Color.png";
import QuickbooksAuthService from "../../../services/quickbooksAuthService";
import SignUpHeader from "./signUpHeader";

const quickbooksAuthService = new QuickbooksAuthService();
let windowObjectReference: Window | null = null;
let previousUrl: string = "";

export default function QuickbooksAuthCard() {
	const navigate = useNavigate();
	const messagesRecieved = useRef(0);

	let [authenticating, setAuthenticating] = useState(false);

	useEffect(() => {
		return () => {
			window.removeEventListener("message", receiveMessage);
		};
	}, []);

	const handleAuthResults = () => {};

	const handleClick = async () => {
		setAuthenticating(true);
		// user clicks button
		// call api for auth url
		const { authUri } = await quickbooksAuthService.getQuickbooksAuthUrl();
		console.log("Quickbooks Auth URL", authUri);

		// open new window with url
		openSignInWindow(authUri, "Authorize Flare to Use Your Quickbooks");

		// on failure
		// close window and give failure message (or navigate to failure page?)
		// on success
		// send to opener window realmId (ais_customer_id), access token, and refresh token
		// close the window
		// store the data in the org database
		// navigate to user dashboard
	};

	const receiveMessage = useCallback(async (event: MessageEvent<any>) => {
		messagesRecieved.current += 1;
		console.log("MESSAGES RECEIVED", messagesRecieved.current);
		setAuthenticating(false);
		console.log("Event", event);
		const { data: url } = event;
		console.log("Redirect URL", url);
		const tokens = await quickbooksAuthService.getQuickbooksTokens(url);
		console.log("Tokens", tokens);
	}, []);

	const openSignInWindow = (url: string, name: string) => {
		window.removeEventListener("message", receiveMessage);

		const strWindowFeatures =
			"toolbar=no, menubar=no, width=600, height=700, top=100, left=100";

		if (windowObjectReference === null || windowObjectReference.closed) {
			windowObjectReference = window.open(url, name, strWindowFeatures);
		} else if (previousUrl !== url) {
			windowObjectReference = window.open(url, name, strWindowFeatures);
			windowObjectReference?.focus();
		} else {
			windowObjectReference.focus();
		}

		window.addEventListener("message", receiveMessage, false);
		previousUrl = url;
	};

	return (
		<div className="w-3/4 mx-auto">
			<SignUpHeader />
			<div className="flex flex-col pt-14 bg-white rounded-md shadow">
				<div className="flex mx-auto mb-8 gap-5">
					<img
						id="qb-logo"
						style={{ width: "62px", height: "62px" }}
						src={qbLogo}
						alt="qb-logo"
					/>
					<div className="flex flex-col justify-center">
						<div className="">&larr;</div>
						<div className="">&rarr;</div>
					</div>
					<img
						id="flare-logo"
						style={{ width: "90px", height: "53px" }}
						src={flareLogo}
						alt="flare-logo"
					/>
				</div>
				<div className="flex flex-col items-center text-center gap-4 mb-4">
					<h1 className="text-dark text-2xl font-bold w-96">
						Connect your QuickBooks Online to get started
					</h1>
					<p className="text-xs w-96">
						Flare conveniently uses your QuickBooks data so that you
						can continue to work in your tools while providing
						importing information to your teams.
					</p>
				</div>
				<button
					className="mx-auto w-52 py-3 text-white bg-flare-red rounded"
					onClick={handleClick}
					disabled={authenticating}
				>
					{authenticating ? "Connecting..." : "Connect"}
				</button>
				{/* Footer */}
				<hr className="border-dark/5 mt-10 " />
				<div className="flex justify-between items-center p-5">
					<a
						className="text-dark/70 text-base cursor-pointer"
						onClick={() => navigate("/signup/org-form")}
					>
						Back
					</a>
					<button
						className="text-white text-base bg-dark/50 px-10 py-2 rounded"
						onClick={() => navigate("/signup/api-auth-setup")}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}
