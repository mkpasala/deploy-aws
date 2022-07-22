import clsx from "clsx";
import React from "react";
import { valueLabel } from "./progressBar";

export interface CalloutProps {
	callouts: valueLabel[];
	styles?: {
		container?: string;
		wrapper?: string;
		value?: string;
		label?: string;
	};
}

export const Callout = ({ callouts, styles }: CalloutProps) => {
	const defaultStyles = {
		wrapper: "first:text-left last:text-right",
		value: "text-2xl text-dark leading-7 mb-1",
		label: "text-xs text-dark/50 leading-4",
	};

	return (
		<div
			className={clsx(
				"flex justify-between w-full shadow rounded p-5",
				styles?.container
			)}
		>
			{callouts.map((callout, idx) => (
				<React.Fragment key={idx}>
					<div
						className={clsx(defaultStyles.wrapper, styles?.wrapper)}
					>
						<div
							className={clsx(defaultStyles.value, styles?.value)}
						>
							{"$" + callout.value.toLocaleString("en-us")}
						</div>
						<p className={clsx(defaultStyles.label, styles?.label)}>
							{callout.label}
						</p>
					</div>
					{idx < callouts.length - 1 && (
						<div className="h-7 w-[1px] bg-dark/5 self-center" />
					)}
				</React.Fragment>
			))}
		</div>
	);
};
