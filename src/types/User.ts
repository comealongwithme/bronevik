export enum UserRole {
	"admin",
	"user"
}

export interface User {
	id: string,
	username: string,
	email: string,
	role: UserRole,
	created: string,
	updated: string,
	emailVisibility: boolean,
	verified: boolean
}
