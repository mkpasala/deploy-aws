import { API } from "aws-amplify";

class flareDBService {
	createBankAccount = async (organizationId: string, payload: any) =>
		await API.post("flareapi", `/organizations/${organizationId}/bank-accounts`, {
			body: payload,
		});

	// updateBankAccount = async (organizationId: string, bankAccountId: string, payload: any) =>
	// 	await API.put(
	// 		"flareapi",
	// 		`/organizations/${organizationId}/bank-accounts${bankAccountId}`,
	// 		{ body: payload }
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
}

export default flareDBService;
