import * as yup from "yup";
import { phoneRegExp } from "./schemaConstants";

export const userSchema = yup.object().shape({
	firstName: yup.string().required("Please enter your first name"),
	lastName: yup.string().required("Please enter your last name"),
	phone: yup
		.string()
		.trim()
		.required("Please enter your phone number")
		.matches(phoneRegExp, "Invalid phone number"),
});
