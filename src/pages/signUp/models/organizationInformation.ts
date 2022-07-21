import Address from "./Address";
import ResponspiblePartyInformation from "./responspiblePartyInformation";

interface OrganizationInformation {
	name?: string;
	dba?: string;
	ein?: string;
	orgType?: string;
	companyPhone?: string;
	address?: Address;
	responsibleParty?: ResponspiblePartyInformation;
}

export default OrganizationInformation;