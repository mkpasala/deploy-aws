import { API } from "aws-amplify";
import User from "../models/User";

export default class UserService {
	async createUser(user: User): Promise<User> {
		let newUser: User;

		try {
			newUser = await API.post("flareapi", "/users", { body: user });
		} catch (error) {
			let message = "error saving to the database."
			console.error(message, error);
			throw `${message}: ${error}`;
		}

		return newUser;
	}

	async getUser(userId: string): Promise<User> {
		let user: User;

		try {
			user = await API.get("flareapi", `/users/${userId}`,{});
		} catch (error) {
			console.error("error saving to the database.", error);
			throw `There was an error signing up with Cognito: ${error}`;
		}

		return user;
	}
}
