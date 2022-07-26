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

	withdrawFunds = async (payload: any) =>
		await API.post("flareapi", "/cards/withdrawFunds", { body: payload });
	
	createCardholder = async (payload: any) =>
		await API.post("flareapi", "/cards/createCardholder", { body: payload });
	
	createCard = async (payload: any) =>
		await API.post("flareapi", "/cards/createCard", { body: payload });
	
	getCardList = async (payload: any) =>
		await API.post("flareapi", "/cards/getCardList", { body: payload });

	getConnectAccountDetails = async (payload: any) =>
		await API.post("flareapi", "/cards/getConnectAccountDetails", { body: payload });
	
	getTransactionList = async (payload: any) =>
		await API.post("flareapi", "/cards/getTransactionList", { body: payload });
}

export default cardsAPIService;
