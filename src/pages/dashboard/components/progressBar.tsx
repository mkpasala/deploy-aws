import clsx from "clsx";
import { Color } from "../models";

export type valueLabel = { value: number; label: string };

export interface ProgressBarProps {
	total: valueLabel;
	current: valueLabel;
	styles?: {
		barColor?: { filledColor: Color; unfilledColor: Color };
		container?: string;
		wrapper?: string;
		value?: string;
		label?: string;
	};
}

export const ProgressBar = (props: ProgressBarProps) => {
	const { total, current, styles } = props;

	const sections: valueLabel[] = [
		total,
		current,
		{
			value: total.value - current.value,
			label: "Remaining",
		},
	];

	const defaultStyles = {
		barColor: { filledColor: "#808080", unfilledColor: "#EBECF0" },
		wrapper:
			"first:place-self-start place-self-center last:place-self-end last:text-right",
		value: "text-base font-bold text-dark mb-1",
		label: "block text-xs text-dark/70",
	};

	const progressPercentage = ((current.value / total.value) * 100)
		.toFixed()
		.toString()
		.concat("%");

	return (
		<div
			className={clsx(
				"flex flex-col w-full shadow rounded p-5 gap-5",
				styles?.container
			)}
		>
			<div className="grid grid-cols-3">
				{sections.map(({ value, label }, idx) => {
					return (
						<div
							key={idx}
							className={clsx(
								defaultStyles.wrapper,
								styles?.wrapper
							)}
						>
							<div
								className={clsx(
									defaultStyles.value,
									styles?.value
								)}
							>{`$${value.toLocaleString("en-us")}`}</div>
							<p
								className={clsx(
									defaultStyles.label,
									styles?.label
								)}
							>
								{label}
							</p>
						</div>
					);
				})}
			</div>

			<div className="flex w-full">
				<div
					className="h-4"
					style={{
						width: progressPercentage,
						backgroundColor:
							styles?.barColor?.filledColor ||
							defaultStyles.barColor.filledColor,
					}}
				/>
				<div
					className="h-4 flex-grow"
					style={{
						backgroundColor:
							styles?.barColor?.unfilledColor ||
							defaultStyles.barColor.unfilledColor,
					}}
				/>
			</div>
		</div>
	);
};
