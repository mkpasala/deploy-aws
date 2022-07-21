import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports.js";
Amplify.configure(awsExports);

import { createContext, useState, useEffect } from "react";
import Home from "./pages/home";
import OAuth from "./pages/oauth";
import Profile from "./pages/profile";
import SignInPage from "./pages/signInPage";
import OrganizationSignUpCard from "./pages/signUp/components/organizationSignUpCard";
import QuickbooksAuthCard from "./pages/signUp/components/quickbooksAuthCard";
import QuickbooksSetupCard from "./pages/signUp/components/quickbooksSetupCard";
import UserSignUpCard from "./pages/signUp/components/userSignUpCard";
import SignUpLayout from "./pages/signUp/signUpLayout";
import User from "./models/User";

import CardsLayout from "./pages/cards/CardsLayout";
import ConnectBankAccount from "./pages/cards/components/ConnectBankAccount";
import AddCardNoTransaction from "./pages/cards/components/AddCardNoTransaction";
import TransactionTable from "./pages/cards/components/CardTransactionList";

interface SessionContext {
	user?: User;
	orgId?: string;
	updateUser: (user: User) => void;
	updateOrganizationId: (orgId: string) => void;
	signOut?: () => void;
}

export const sessionContext = createContext<SessionContext | null>(null);

function App({ signOut, user: cognitoUser }: { signOut: () => any; user: any }) {
	const [flareUser, setUser] = useState<User>({
		id: cognitoUser.username,
		firstName: cognitoUser.attributes.given_name,
		lastName: cognitoUser.attributes.family_name,
		email: cognitoUser.attributes.email,
	});
	const [orgId, setOrgId] = useState<string>("");

	const updateUser = (user: User): void => {
		setUser({ ...flareUser, ...user });
		setSession({ ...session, user });
	};

	const updateOrganizationId = (orgId: string): void => {
		setOrgId(orgId);
		setSession({ ...session, orgId });
	};

	const [session, setSession] = useState<SessionContext>({
		user: flareUser,
		orgId: orgId,
		updateUser: updateUser,
		updateOrganizationId: updateOrganizationId,
		signOut: signOut,
	});

	useEffect(() => {
		const userString = localStorage.getItem("flareUser");
		const organizationString = localStorage.getItem("flareOrganizationId");

		if ((!userString && !organizationString) || !userString) return;

		console.log("User string from user object", userString);
		const userObject = JSON.parse(userString);
		setSession({
			...session,
			user: userObject,
			orgId: organizationString || "",
		});
	}, []);

	useEffect(() => {
		if (session.user) localStorage.setItem("flareUser", JSON.stringify(session.user));
		if (session.orgId)
			localStorage.setItem("flareOrganizationId", JSON.stringify(session.orgId));
	}, [session]);

	console.log("Your session in memory", session);
	console.log(
		"Your flareUser in storage",
		localStorage.getItem("flareUser")
			? JSON.parse(localStorage.getItem("flareUser") as string)
			: null
	);
	console.log(
		"Your flareOrganizationId in storage",
		localStorage.getItem("flareOrganizationId")
			? JSON.parse(localStorage.getItem("flareOrganizationId") as string)
			: null
	);

	return (
		<Router>
			<sessionContext.Provider value={session}>
				<Routes>
					<Route path="/" element={<Home signOut={signOut} user={cognitoUser} />} />
					<Route path="signIn" element={<SignInPage />} />
					<Route path="oauth" element={<OAuth signOut={signOut} user={cognitoUser} />} />
					{/* Sign Up Flow */}
					<Route path="signup" element={<SignUpLayout />}>
						<Route path="user-form" element={<UserSignUpCard />} />
						<Route path="org-form" element={<OrganizationSignUpCard />} />
						<Route path="api-auth-connect" element={<QuickbooksAuthCard />} />
						<Route path="api-auth-setup" element={<QuickbooksSetupCard />} />
					</Route>
					<Route path="profile" element={<Profile />} />
					<Route path="cards" element={<CardsLayout />}>
						{/*<Route path='' element={} />
						<Route path='' element={} /> */}
					</Route>
					<Route path="connect-bank-account" element={<ConnectBankAccount />} />
					<Route path="card-list" element={<AddCardNoTransaction />} />
					<Route path="transactions" element={<TransactionTable />} />
				</Routes>
			</sessionContext.Provider>
		</Router>
	);
}

export default withAuthenticator(App as any);
