import { Children, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sessionContext } from "../../../app";
import Organization from "../../../models/organization";
import User from "../../../models/user";
import organizationService from "../../../services/organizationService";
import userService from "../../../services/userService";
import {
	OrganizationSignUpCard,
	QuickbooksAuthCard,
	UserSignUpCard,
} from "../components";
import { Layout } from "../components/layout";

interface FormStepper {
	children: React.ReactNode;
	step: number;
}

const FormStepper = ({ children, step }: FormStepper) => {
	const childrenArray = Children.toArray(children);
	const currentChild = childrenArray[step];

	return <>{currentChild}</>;
};

enum STEPS {
	USER_SIGN_UP,
	ORGANIZATION_SIGN_UP,
	QUICKBOOKS_AUTH,
}

export const SignUpPage = () => {
	const [user, setUser] = useState<User>();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const session = useContext(sessionContext);
	const navigate = useNavigate();
	const isUserCreated = session?.user?.firstName && session.organization?.id;
	const isAISConnected = !!session?.organization?.aisToken;
	let initialStep = STEPS.USER_SIGN_UP;
	if (isUserCreated) initialStep = STEPS.QUICKBOOKS_AUTH;
	if (isAISConnected) navigate("auth/dashboard/executive");

	const [step, setStep] = useState(initialStep);
	const next = () => setStep(step + 1);
	const prev = () => setStep(step - 1);

	const userHandleSubmit = useCallback(
		async (data: any) => {
			console.log("User data", data);
			console.log(
				"User data from session in sign up form",
				session?.user
			);
			setUser({
				id: session?.user?.id,
				email: session?.user?.email,
				...data,
			});
			console.log("Going to save this user", user);
			next();
		},
		[step]
	);

	const orgHandleSubmit = useCallback(
		async (data: any) => {
			setIsSubmitting(true);
			console.log("Organization data", data);
			const newUser = await userService.createUser(user as User);
			await organizationService.createOrg(newUser.id as string, data);

			await session?.updateSession();
			next();
			setIsSubmitting(false);
		},
		[step]
	);

	return (
		<Layout>
			<FormStepper step={step}>
				<UserSignUpCard handleSubmit={userHandleSubmit} />
				<OrganizationSignUpCard
					submitting={isSubmitting}
					handleSubmit={orgHandleSubmit}
					prev={prev}
				/>
				<QuickbooksAuthCard />
			</FormStepper>
		</Layout>
	);
};

export default SignUpPage;
