import Address from "./Address";

interface ResponspiblePartyInformation {
	firstName?: string;
	lastName?: string;
	phone?: string;
	dob?: string;
	taxId?: string;
	relationship?: string;
	address?: Address;
}

export default ResponspiblePartyInformation;