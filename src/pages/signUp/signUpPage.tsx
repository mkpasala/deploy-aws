import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import OrganizationSignUpCard from "./components/organizationSignUpCard";
import QuickbooksAuthCard from "./components/quickbooksAuthCard";
import UserSignUpCard from "./components/userSignUpCard";
import OnboardingStatus from "./models/onboardingStatus";
import OrganizationInformation from "./models/organizationInformation";
import UserInformation from "./models/userInformation";

export default function SignUpPage() {
	let navigate = useNavigate();

	let [onboardStatus, setOnboardStatus] = useState(OnboardingStatus.User);

	let [userInfo, setUserInfo] = useState({} as UserInformation);
	let [orgInfo, setOrgInfo] = useState({} as OrganizationInformation);

	let [errorMessage, setErrorMessage] = useState("");

	const showOnboaringCard = () => {
		switch (onboardStatus) {
			case OnboardingStatus.OAuth:
				return <QuickbooksAuthCard />;
			case OnboardingStatus.Organization:
				return (
					<OrganizationSignUpCard
						orgInfo={orgInfo}
						handleOrgInputChange={handleOrgInputChange}
						handleOrgSubmit={handleOrgSumbit}
						handleOrgSelectChange={handleOrgInputChange}
					/>
				);
			default:
				return (
					<UserSignUpCard
						userInfo={userInfo}
						handleUserInputChange={handleUserInputChange}
						handleUserSubmit={handleUserSumbit}
					/>
				);
		}
	};

	const handleUserInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		let inputName = event.target.name;
		let newValue = event.target.value;

		setUserInfo({ ...userInfo, [inputName]: newValue });
		console.log(JSON.stringify(userInfo, null, 2));
	};

	const handleOrgInputChange = (
		event:
			| React.ChangeEvent<HTMLSelectElement>
			| React.ChangeEvent<HTMLInputElement>
	) => {
		let inputName = event.target.name;
		let newValue = event.target.value;

		setOrgInfo({ ...orgInfo, [inputName]: newValue });
	};

	const handleUserSumbit = (event: React.FormEvent<HTMLButtonElement>) => {
		//TODO: validate all fields
		event.preventDefault();
		if (
			userInfo.password &&
			userInfo.password !== userInfo.confirmPassword
		) {
			let errorMessage = `Passwords do not match: ${userInfo.password} !== ${userInfo.confirmPassword}`;
			setErrorMessage(errorMessage);
			console.error(errorMessage);
			return;
		}

		setOnboardStatus(OnboardingStatus.Organization);
	};

	const handleOrgSumbit = (event: React.FormEvent<HTMLButtonElement>) => {
		setOnboardStatus(OnboardingStatus.OAuth);
	};

	return (
		<>
			<NavBar userStatus={false} />
			<div>
				{showOnboaringCard()}
				<div>{errorMessage}</div>
			</div>
		</>
	);
}
