import clsx from "clsx";
import React from "react";

interface StepperProgressBarProps {
	stepLabels: string[];
	currentStep: number;
	wrapperStyle?: string;
}

export const StepperProgressBar = ({
	stepLabels,
	currentStep,
	wrapperStyle,
}: StepperProgressBarProps) => {
	return (
		<div className={clsx("w-fit", wrapperStyle)}>
			<div className="flex gap-3 justify-between">
				{stepLabels.map((label, idx) => {
					const isCompleted = idx < currentStep;
					const isLast = idx === stepLabels.length - 1;
					return (
						<React.Fragment key={idx}>
							<div className="flex gap-2 justify-center items-center">
								{/* Step Number */}
								<div
									className={clsx(
										"text-base m-auto text-center min-h-[24px] min-w-[24px] rounded-full",
										isCompleted
											? "bg-[#64C093] text-white"
											: "bg-dark/10 text-dark"
									)}
								>
									{isCompleted ? "\u2714" : idx + 1}
								</div>
								{/* Label Text */}
								<span
									className={clsx(
										"font-semibold",
										isCompleted
											? "text-[#64C093]"
											: "text-dark"
									)}
								>
									{label}
								</span>
							</div>
							{/* Divider */}
							{!isLast && (
								<div className="flex h-[1px] w-32 self-center bg-dark" />
							)}
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
};
