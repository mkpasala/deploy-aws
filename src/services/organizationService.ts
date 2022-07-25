import { API } from "aws-amplify";
import Organization from "../models/organization";

const organizationService = {
	getOrg: async (orgId: string): Promise<Organization> => {
		let organization: Organization;

		try {
			organization = await API.get(
				"flareapi",
				`/organizations/${orgId}`,
				{}
			);

			console.log("organization service retrieved this object", organization);
		} catch (error) {
			const message = "error retreiving org from database.";
			console.error(message, error);
			throw `${message}: ${error}`;
		}

		return organization;
	},
	createOrg: async (
		userId: string,
		organization: Organization
	): Promise<Organization> => {
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
	},

	updateOrg: async (organization: Organization): Promise<Organization> => {
		let newOrganization: Organization;

		try {
			newOrganization = await API.put(
				"flareapi",
				`/organizations/${organization.id}`,
				{
					body: { organization },
				}
			);
		} catch (error) {
			const message = "error saving to the database.";
			console.error(message, error);
			throw `${message}: ${error}`;
		}

		return newOrganization;
	},
	getPnlReport: async (
		organization: Organization
	): Promise<any> => {
		try {
			console.log("Service Fetching PNL Report")
			let report = await API.get(
				"flareapi",
				`/organizations/${organization.id}/pnl-report`,
				{}
			);

			return JSON.parse(report);
		} catch (error) {
			const message = "error getting pnl report.";
			console.error(message, error);
			throw `${message}: ${error}`;
		}
	},
};

export default organizationService;
