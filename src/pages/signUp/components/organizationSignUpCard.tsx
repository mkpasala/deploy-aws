import { useState } from "react";
import { Button } from "../../components/Elements/Button/Button";
import { Form } from "../../components/Form/Form";
import { InputField, InputFieldProps } from "../../components/Form/InputField";
import { SelectField } from "../../components/Form/SelectField";
import { entityTypes, organizationSchema } from "../models/organizationSchema";

type orgFieldProps = InputFieldProps & { name: string };
const orgInfoFields: orgFieldProps[] = [
	{
		name: "name",
		label: "Organization Name",
		type: "text",
		placeholder: "Organization name here",
	},
	{
		name: "entityType",
		label: "Entity Type",
		placeholder: "Organization type",
	},
];

const returnOrganizationInfo = (values: any) => {
	const { formState, register } = values;
	const { name: orgName, ...orgNameProps } = orgInfoFields[0];
	const { name: entityName, ...entityNameProps } = orgInfoFields[1];
	return (
		<>
			<div className="flex flex-col gap-4">
				<InputField
					key={orgName}
					registration={register(orgName)}
					error={formState.errors[orgName]}
					{...orgNameProps}
				/>
				<SelectField
					key={entityName}
					registration={register(entityName)}
					error={formState.errors[entityName]}
					{...entityNameProps}
				>
					{entityTypes.map((type, idx) => (
						<option key={idx} value={type}>
							{type}
						</option>
					))}
				</SelectField>
			</div>
		</>
	);
};

interface OrganizationSignUpCardProps {
	handleSubmit: (data: any) => void;
	submitting: boolean;
	prev: () => void;
}

export const OrganizationSignUpCard = ({
	handleSubmit,
	prev,
	submitting
}: OrganizationSignUpCardProps) => {

	return (
		<div className="flex flex-col items-center">
			<div className="flex flex-col justify-between items-center py-12 px-24 gap-14 bg-white">
				<h1 className="text-center font-bold text-2xl">
					Organization Sign Up
				</h1>
				<div className="flex flex-col gap-3">
					<Form
						id="form"
						schema={organizationSchema}
						onSubmit={(data) => handleSubmit(data)}
					>
						{({ formState, register }) => (
							<>
								{returnOrganizationInfo({
									formState,
									register,
								})}
							</>
						)}
					</Form>
					{/* Footer */}
					<div className="flex justify-between items-center mt-4">
						<Button variant="secondaryLink" onClick={prev}>
							Back
						</Button>
						<Button
							type="submit"
							form="form"
							variant="primary"
							disabled={submitting}
						>
							{submitting ? "Submitting..." : "Next"}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
