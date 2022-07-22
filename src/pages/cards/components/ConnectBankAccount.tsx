import Rect, { useState } from "react";
import CARDS_LANDING_LOGO from "../../../assets/card-landing-page-logo.png";
import ConnectBankAccountTab from "./ConnectBankAccountTab";
import VerifyDepositAmountsTab from "./VerifyDepositAmountsTab";
import AddFundsTab from "./AddFundsTab";
import NavBar from "./navbar";

const ConnectBankAccount = () => {
	const [stepCount, setStepCount] = useState(0);
	const nextStep = (): void => {
		setStepCount(stepCount + 1);
	};
	const previousStep = (): void => {
		setStepCount(stepCount - 1);
	};
	const loadComponent = (stepCount: number) => {
		switch (stepCount) {
			case 0:
				return <ConnectBankAccountTab nextStep={nextStep} previousStep={previousStep} />;
			case 1:
				return <VerifyDepositAmountsTab nextStep={nextStep} previousStep={previousStep} />;
			case 2:
				return <AddFundsTab nextStep={nextStep} previousStep={previousStep} />;
		}
	};

	const stepNoBackGround = (stepIndex: number): string => {
		if (stepIndex <= stepCount) {
			return "bg-green-500";
		} else {
			return "bg-gray-500";
		}
	};
	const stepTitleTextColor = (stepIndex: number): string => {
		if (stepIndex < stepCount) {
			return "text-green-500";
		} else {
			return "text-black-500";
		}
	};
	return (
		<div className="card-section font-sans">
			<NavBar />
			<main className="main-content flex flex-col mx-[205px]">
				<div className="screen-title pt-[28px] pb-[32px]">Cards</div>
				<div className="flex flex-row breadscrumb mb-3">
					<ul className="list-none flex flex-row flex-nowrap justify-start">
						<li className="mr-4">
							<span
								className={`w-6 h-6 inline-block text-white rounded-full circel-txt text-center justify-center mr-1 ${stepNoBackGround(
									0
								)}`}
							>
								1
							</span>

							<a
								className={`mr-4 hover:cursor-pointer hover:font-bold ${stepTitleTextColor(
									0
								)}`}
								onClick={() => {
									setStepCount(0);
								}}
							>
								Connect your Bank Account
							</a>
							<span className="w-10 h-0 border rounded-[1px] m-[2px] inline-block border-gray-500"></span>
						</li>
						<li className="mr-4">
							<span
								className={`w-6 h-6 inline-block text-white rounded-full circel-txt text-center justify-center mr-1 ${stepNoBackGround(
									1
								)}`}
							>
								2
							</span>

							<a
								className={`mr-4 cursor-pointer hover:font-bold ${stepTitleTextColor(
									1
								)}`}
								onClick={() => {
									setStepCount(1);
								}}
							>
								Verify Deposit Amounts
							</a>
							<span className="w-10 h-0 border rounded-[1px] m-[2px] inline-block border-gray-500"></span>
						</li>
						<li>
							<span
								className={`w-6 h-6 inline-block text-white rounded-full circel-txt text-center justify-center mr-1 ${stepNoBackGround(
									2
								)}`}
							>
								3
							</span>

							<a
								className={`cursor-pointer hover:font-bold ${stepTitleTextColor(
									2
								)}`}
								onClick={() => {
									setStepCount(2);
								}}
							>
								Add Funds
							</a>
						</li>
					</ul>
				</div>
				{loadComponent(stepCount)}
			</main>
		</div>
	);
};

export default ConnectBankAccount;
