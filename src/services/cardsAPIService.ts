import { API } from "aws-amplify";

class cardsAPIService {
	getAccountURL = async (payload: any) =>
		await API.post("flareapi", "/cards", { body: { payload } });

	createBankAccount = async (payload: any) =>
		await API.post("flareapi", "/cards/createBankAccount", { body: payload });

	verifyDepositAmounts = async (payload: any) =>
		await API.post("flareapi", "/cards/verifyDepositAmounts", { body: payload });

	addFunds = async (payload: any) =>
		await API.post("flareapi", "/cards/addFunds", { body: payload });

	retrieveBalance = async (payload: any) =>
		await API.post("flareapi", "/cards/retrievebalance", { body: payload });
}

export default cardsAPIService;
