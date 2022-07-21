import { SearchIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { Form } from "../../components/Form/Form";
import { InputField, InputFieldProps } from "../../components/Form/InputField";
import { organizationSchema } from "../models/organizationSchema";
import SignUpHeader from "./signUpHeader";
import { useContext, useState } from "react";
import OrganizationService from "../../../services/organizationService";
import { sessionContext } from "../../../app";
import Organization from "../../../models/Organization";


type orgFieldProps = InputFieldProps & { name: string };
const orgInfoFields: orgFieldProps[] = [
	{
		name: "name",
		label: "Organization Name",
		type: "text",
		placeholder: "Enter your organization name here",
	},
	{
		name: "dba",
		label: "DBA (Optional)",
		type: "text",
		placeholder: "Enter DBA here",
	},
	{
		name: "ein",
		label: "EIN",
		type: "text",
		placeholder: "Enter EIN Here",
	},
	{
		name: "phone",
		label: "Company Phone",
		type: "tel",
		placeholder: "XXX XXX XXXX",
	},
];

const orgAddressFields: orgFieldProps[] = [
	{
		name: "address1",
		label: "Address Line 1",
		type: "text",
		placeholder: "Enter your address line 1 here",
		classNameWrapper: "col-span-3",
	},
	{
		name: "address2",
		label: "Address Line 2",
		type: "text",
		placeholder: "Enter your address line 2 here",
		classNameWrapper: "col-span-3",
	},
	{
		name: "city",
		label: "City",
		placeholder: "Enter or choose",
	},
	{
		name: "state",
		label: "State",
		placeholder: "Enter or choose",
		icon: <SearchIcon />,
	},
	{
		name: "zip",
		label: "Zip Code",
		type: "text",
		placeholder: "Enter Zip Code here",
	},
];

const returnOrganizationInfo = (values: any) => {
	const { formState, register } = values;
	return (
		<>
			<h3 className="text-xs text-dark/50 mb-3">Organization Info</h3>
			<div className="grid grid-cols-3 gap-4 mb-4">
				{orgInfoFields.map(({ name, ...rest }) => {
					return (
						<InputField
							key={name}
							registration={register(name)}
							error={formState.errors[name]}
							{...rest}
						/>
					);
				})}
			</div>
		</>
	);
};

const returnOrganizationAddressFields = (values: any) => {
	const { formState, register } = values;
	return (
		<>
			<h3 className="text-xs text-dark/50 mb-3">Organization Address</h3>
			<div className="grid grid-cols-3 gap-4 mb-4">
				{orgAddressFields.map(({ name, ...rest }) => {
					return (
						<InputField
							key={name}
							registration={register(name)}
							error={formState.errors[name]}
							{...rest}
						/>
					);
				})}
			</div>
		</>
	);
};

const OrganizationSignUpCard =  () => {
	const session = useContext(sessionContext);
	const organizationService = new OrganizationService();

	const [submitting, setSubmitting] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (data: any) => {
		setSubmitting(true);
		console.log(data);
		
		if (!session?.user?.id) throw new Error("SESSION_USER_ID_NOT_DEFINED");

		const newOrg = await organizationService.createOrg(session.user.id, data);
		if (newOrg) session.updateOrganizationId(newOrg.id);
		console.log("New Org", newOrg);

		setSubmitting(false);
		navigate("/signup/api-auth-connect", {replace: true});
	};

	return (
		<div className="w-3/4 mx-auto">
			<SignUpHeader />
			<div className="flex flex-col w-full mb-16 bg-white shadow rounded-md">
				<Form
					className="p-6"
					id="form"
					schema={organizationSchema}
					onSubmit={(data) => handleSubmit(data)}
				>
					{({ formState, register }) => (
						<>
							{returnOrganizationInfo({ formState, register })}
							{returnOrganizationAddressFields({
								formState,
								register,
							})}
						</>
					)}
				</Form>
				{/* Footer */}
				<hr className="border border-dark/5 mt-11" />
				<div className="flex justify-end items-center p-5">
					
					<button
						form="form"
						className="bg-flare-red text-white py-3 px-12 rounded float-right disabled:bg-flare-red/50"
						disabled={submitting}
					>
					{submitting ? "Submitting..." : "Next"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default OrganizationSignUpCard;
