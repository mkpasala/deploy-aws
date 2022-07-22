export default interface User {
	id?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	phone?: string;
	department?: string;
	token?: string;
	orgId?: string;
	role?:string; //TODO: Make a role enum
}
