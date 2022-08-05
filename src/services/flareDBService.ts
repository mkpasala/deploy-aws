import { API } from "aws-amplify";

class flareDBService {
	createBankAccount = async (organizationId: string, payload: any) =>
		await API.post("flareapi", `/organizations/${organizationId}/bank-accounts`, {
			body: payload,
		});

	// deleteBankAccount = async (organizationId: string, bankAccountId: string) =>
	// 	await API.delete(
	// 		"flareapi",
	// 		`/organizations/${organizationId}/bank-accounts${bankAccountId}`,
	// 		{}
	// 	);

	getAllBankAccounts = async (organizationId: string) =>
		await API.get("flareapi", `/organizations/${organizationId}/bank-accounts`, {});

	// getBankAccount = async (organizationId: string, bankAccountId: string) =>
	// 	await API.get(
	// 		"flareapi",
	// 		`/organizations/${organizationId}/bank-accounts/${bankAccountId}`,
	// 		{}
	// 	);

	updateOrganization = async (organizationId: string, payload: any) =>
		await API.put("flareapi", `/organizations/${organizationId}`, { body: payload });

	getAllCards = async (organizationId: string) =>
		await API.get("flareapi", `/organizations/${organizationId}/cards`, {});
}

export default flareDBService;
