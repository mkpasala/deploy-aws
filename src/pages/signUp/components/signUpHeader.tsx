import { useContext } from "react";
import { sessionContext } from "../../../app";
import { StepperProgressBar } from "../../components/Form/StepperProgressBar";

interface SignUpHeader {
	currentStep: number;
}

export const SignUpHeader = ({ currentStep }: SignUpHeader) => {
	const session = useContext(sessionContext);
	const userName = session?.user?.firstName || "USER";
	const returnWelcomeHeader = () => (
		<div className="mt-10 mb-5">
			<h1 className="text-lg font-bold">Welcome {userName},</h1>
			<p className="text-sm text-dark/70">
				One more thing!
			</p>
		</div>
	);

	const returnProgressBar = () => {
		const props = {
			stepLabels: [
				"Create your organization",
				"Connect to Accounting Information System",
			],
			currentStep: currentStep,
			wrapperStyle: "mb-6",
		};
		return <StepperProgressBar {...props} />;
	};

	return (
		<>
			{returnWelcomeHeader()}
			{/* {returnProgressBar()} */}
		</>
	);
};
