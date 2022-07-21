import { API } from "aws-amplify";
import  Organization from "../models/Organization";

export default class OrganizationService {
	async createOrg(
		userId: string,
		organization: Organization
	): Promise<Organization> {
		let newOrganization: Organization;

		try {
			newOrganization = await API.post("flareapi", "/organizations", {
				body: { userId, organization },
			});
		} catch (error) {
			const message = "error saving to the database.";
			console.error(message, error);
			throw `${message}: ${error}`;
		}

		return newOrganization;
	}

	async updateOrg(organization: Organization): Promise<Organization> {
		let newOrganization: Organization;

		try {
			newOrganization = await API.put("flareapi", "/organizations", {
				body: { organization },
			});
		} catch (error) {
			const message = "error saving to the database.";
			console.error(message, error);
			throw `${message}: ${error}`;
		}

		return newOrganization;
	}

	/* 
		TODO
	*/

	// async getOrganization(userId: string): Promise<Organization> {
	// 	let organization: Organization;

	// 	try {
	// 		organization = await API.get("flareapi", `/organizations/${}`,{});
	// 	} catch (error) {
	// 		console.error("error saving to the database.", error);
	// 		throw `There was an error signing up with Cognito: ${error}`;
	// 	}

	// 	return organization;
	// }
}
