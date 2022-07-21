import clsx from "clsx";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sessionContext } from "../../../app";
import User from "../../../models/User";
import UserService from "../../../services/userService";
import { Form } from "../../components/Form/Form";
import { InputField, InputFieldProps } from "../../components/Form/InputField";
import { userSchema } from "../models/userSchema";

type userFieldProps = InputFieldProps & { name: string };
const userFormFields: userFieldProps[] = [
	{
		type: "text",
		label: "First Name",
		name: "firstName",
		placeholder: "Enter your first name here",
	},
	{
		type: "text",
		label: "Last Name",
		name: "lastName",
		placeholder: "Enter your last name here",
	},
	{
		type: "tel",
		label: "Phone Number",
		name: "phone",
		placeholder: "Enter your phone here",
	},
	{
		type: "text",
		label: "Department",
		name: "department",
		placeholder: "Enter your department here",
	},
];

const UserSignUpCard = () => {
	const session = useContext(sessionContext);
	const userService = new UserService();

	let [submitting, setSubmitting] = useState(false);

	const navigate = useNavigate();
	const onSubmit = async (data: any) => {
		setSubmitting(true);

		console.log("Form data", data);

		if (!session) throw new Error("SESSION_NOT_DEFINED");
		
		let user: User = { ...session.user, ...data };
		console.log("User data", user);

		let newUser = await userService.createUser(user);
		console.log("New User", newUser);
		if (newUser) session.updateUser(newUser);

		setSubmitting(false);
		navigate("/signup/org-form", { replace: true });
	};

	return (
		<div className="flex flex-col items-center mt-20">
			<div className="flex flex-col justify-between items-center py-12 px-24 gap-14 bg-white">
				<h1 className="text-center font-bold text-2xl">Sign up</h1>
				<div className="flex flex-col gap-3">
					<Form
						id="userForm"
						className="flex flex-col gap-4"
						schema={userSchema}
						onSubmit={(data) => onSubmit(data)}
					>
						{({ formState, register }) =>
							userFormFields.map(({ name, ...rest }) => (
								<InputField
									key={name}
									registration={register(name)}
									error={formState.errors[name]}
									{...rest}
								/>
							))
						}
					</Form>
					<button
						form="userForm"
						type="submit"
						className={clsx(
							`w-full text-white flex flex-row justify-center items-center px-6 py-3 mt-5 bg-flare-red disabled:bg-flare-red/50 shadow rounded border-none text-sm`
						)}
						disabled={submitting}
					>
						{submitting ? "Submitting..." : "Continue"}
					</button>
					<div className="flex justify-center text-xs w-full">
						<p className="text-center w-3/5">
							By signing up, I agree to FlareFS'{" "}
							<Link
								className="text-flare-red hover:underline"
								to={""}
							>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link
								className="text-flare-red hover:underline"
								to={""}
							>
								Privacy Policy
							</Link>
						</p>
					</div>
				</div>
			</div>
			<br />
		</div>
	);
};

export default UserSignUpCard;
