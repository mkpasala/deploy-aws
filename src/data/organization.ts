import { DataStore } from "@aws-amplify/datastore";
import { Organization } from "../models";

export const create = async (
	name: string,
	ein: string,
	aisId?: string,
	aisProvider?: string | "quickbooks"
) => {
	await DataStore.save(new Organization({ name, ein, aisId, aisProvider }));
};

