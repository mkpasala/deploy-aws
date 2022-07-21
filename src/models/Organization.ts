export default interface Organization {
	id?: string;
	name?: string;
	ein?: string;
	aisSystem?: string; // TODO: make aisSystem a type
	aisOrganizationId?: string;
	aisAccessToken?: string;
	aisRefresshToken?: string;
	createdWhen?: Date;
	address1?: string;
	address2?: string;
	city?: string;
	state?: string;
	zip?: string;
}
