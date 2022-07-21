import { useLocation } from "react-router-dom";

const SignUpHeader: React.FC = () => {
	const userName = "USER";
	const path = useLocation().pathname;
	const returnWelcomeHeader = () => (
		<div className="mt-10 mb-5">
			<h1 className="text-lg font-bold">Welcome {userName},</h1>
			<p className="text-sm text-dark/70">
				You are X steps closer to finishing your sign up
			</p>
		</div>
	);

	const iconStyle = `my-auto rounded-full min-w-[24px]
					   min-h-[24px] mr-2 leading-6 font-barlow
					   text-sm text-center`;

	const inactiveIconStyle = `${iconStyle} text-black bg-dark/10`;
	const activeIconStyle = `${iconStyle} text-white bg-[#64C093]`;

	const returnProgressionBar = () => (
		<div className="flex mb-6">
			<div className="flex">
				<span className={`${activeIconStyle}`}>
					{path.includes("api-auth") ? "✓" : "1"}
				</span>
				<h2
					className={`font-semibold text-base ${
						path?.includes("api-auth") ? "text-[#64C093]" : null
					}`}
				>
					Create your organization
				</h2>
			</div>
			<hr className="border-dark/30 my-auto mx-3 w-16 h-0" />
			<div className="flex">
				<span
					className={
						path.includes("api-auth")
							? activeIconStyle
							: inactiveIconStyle
					}
				>
					2
				</span>
				<h2 className={`font-semibold text-base`}>
					Connect to Accounting Information System
				</h2>
			</div>
		</div>
	);

	return (
		<>
			{returnWelcomeHeader()}
			{returnProgressionBar()}
		</>
	);
};

export default SignUpHeader;
