export default interface Organization {
	id?: string;
	name?: string;
	entityType?: string;
	aisSystem?: string; // TODO: make aisSystem a type
	aisOrganizationId?: string;
	aisToken?: Object;
	createdWhen?: Date;
	stripeConnectId?: string;
	stripeCardholderId: string;
}
