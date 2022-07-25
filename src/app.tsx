import { withAuthenticator } from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

import { createContext, useEffect, useState } from "react";
import Organization from "./models/organization";
import User from "./models/user";
import { ExecutiveDashboard } from "./pages/dashboard/routes/executiveDashboard";
import { ReportingUnitDashboard } from "./pages/dashboard/routes/reportingUnitDashboard";
import Home from "./pages/home";
import Profile from "./pages/profile";
import { SignUpPage } from "./pages/signUp/routes/signUp";
import organizationService from "./services/organizationService";
import userService from "./services/userService";
import OAuth from "./pages/oauth";

import CardsLayout from "./pages/cards/CardsLayout";
import ConnectBankAccount from "./pages/cards/components/ConnectBankAccount";
import AddCardNoTransaction from "./pages/cards/components/AddCardNoTransaction";
import TransactionTable from "./pages/cards/components/CardTransactionList";
interface SessionContext {
	user: User | null;
	organization: Organization | null;
	updateSession: () => Promise<void>;
	signOut: () => void;
}

export const sessionContext = createContext<SessionContext | null>(null);

function App({ signOut, user: cognitoUser }: { signOut: () => any; user: any }) {
	const [loading, setLoading] = useState(true);
	const [session, setSession] = useState<SessionContext>({
		user: null,
		organization: null,
		updateSession,
		signOut: signUserOut,
	});

	async function updateSession(): Promise<void> {
		await loadData();
	}

	async function signUserOut() {
		console.log("Signing out user.");
		signOut();
	}

	useEffect(() => {
		console.log("Cognito User", cognitoUser);
		loadData();
	}, []);

	useEffect(() => {
		console.log("Your session in memory", session);
	}, [session]);

	const loadData = async (): Promise<void> => {
		setLoading(true);
		let user: User | null = null;
		let organization: Organization | null = null;

		try {
			user = await userService.getUser(cognitoUser.username);
		} catch {
			setLoading(false);
			return;
		}

		if (!user)
			user = {
				id: cognitoUser.username,
				email: cognitoUser.attributes.email,
			};

		if (user?.orgId) {
			organization = await organizationService.getOrg(user.orgId as string);
		}

		console.log("User retrieved from database", user);
		setSession({ ...session, user, organization });
		setLoading(false);
	};

	return loading ? (
		<div>Loading...</div>
	) : (
		<Router>
			<sessionContext.Provider value={session}>
				<Routes>
					<Route path="/" element={<Home />}>
						<Route index element={<ExecutiveDashboard />} />
					</Route>
					{/* Sign Up Flow */}
					<Route path="signup" element={<SignUpPage />}></Route>
					<Route path="profile" element={<Profile />} />
					<Route path="auth/dashboard/executive" element={<ExecutiveDashboard />} />
					<Route
						path="auth/dashboard/reportingUnit"
						element={<ReportingUnitDashboard />}
					/>
					<Route path="oauth" element={<OAuth />} />
					<Route path="cards" element={<CardsLayout />}>
						{/*<Route path='' element={} />
						<Route path='' element={} /> */}
					</Route>
					<Route path="cards/:accountId" element={<CardsLayout />}/>
					<Route path="connect-bank-account" element={<ConnectBankAccount />} />
					<Route path="card-list" element={<AddCardNoTransaction />} />
					<Route path="transactions" element={<TransactionTable />} />
				</Routes>
			</sessionContext.Provider>
		</Router>
	);
}

export default withAuthenticator(App as any);
