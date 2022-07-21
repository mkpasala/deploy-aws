import * as yup from "yup";
import { einRegExp, phoneRegExp, zipCodeRegExp } from "./schemaConstants";

export const organizationSchema = yup.object().shape({
	name: yup.string().required("Organization Name is required"),
	dba: yup.string().notRequired(),
	ein: yup
		.string()
		.required("Please enter your EIN")
		.matches(einRegExp, "Invalid EIN"),
	phone: yup
		.string()
		.required("Please enter your phone number")
		.matches(phoneRegExp, "Invalid phone number"),
	address1: yup.string().required("Invalid address"),
	address2: yup.string().notRequired(),
	city: yup.string().required("City is required"),
	state: yup.string().required("State is required"),
	zip: yup
		.string()
		.required("Please enter your zip code")
		.matches(zipCodeRegExp, "Invalid zip code"),
});
