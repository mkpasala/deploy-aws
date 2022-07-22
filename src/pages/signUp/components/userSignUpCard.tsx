import { Button } from "../../components/Elements";
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
];

interface UserSignUpCardProps {
	handleSubmit: (data: any) => void;
}

export const UserSignUpCard = ({ handleSubmit }: UserSignUpCardProps) => {
	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-col justify-between items-center py-12 px-24 gap-14 bg-white">
				<h1 className="text-center font-bold text-2xl">
					Personal Information
				</h1>
				<div className="flex flex-col gap-3">
					<Form
						id="userForm"
						className="flex flex-col gap-4"
						schema={userSchema}
						onSubmit={(data) => handleSubmit(data)}
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
					<Button
						form="userForm"
						type="submit"
						variant="primary"
						className="mt-4"
					>
						Continue
					</Button>
				</div>
			</div>
			<br />
		</div>
	);
};
