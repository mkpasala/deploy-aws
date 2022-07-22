import { API } from "aws-amplify";
import User from "../models/user";

const userService = {
	createUser: async (user: User): Promise<User> => {
		let newUser: User;

		try {
			newUser = await API.post("flareapi", "/users", { body: user });
		} catch (error) {
			let message = "error saving to the database."
			console.error(message, error);
			throw `${message}: ${error}`;
		}

		return newUser;
	},

	getUser: async (userId: string): Promise<User | null> => {
		let user: User | null = null;

		try {
			user = await API.get("flareapi", `/users/${userId}`,{});
		} catch (error) {
			console.info("error getting from the database.", error);
		}

		return user;
	}
}

export default userService;