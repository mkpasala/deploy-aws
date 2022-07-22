import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import clsx from "clsx";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

interface RevenueExpenseBarProps {
	data: any;
	className?: string;
}

export const RevenueExpenseBar = ({
	data,
	className,
}: RevenueExpenseBarProps) => {
	return (
		<div className={clsx("shadow rounded p-5", className)}>
			<div className="flex justify-between mb-5 items-center">
				<h1 className="text-sm font-semibold">
					Revenue and Expense by Month
				</h1>
				<select
					className="shadow pl-4 pr-20 py-2 text-dark outline-none font-inter"
					defaultValue="year"
				>
					<option value="year">This Year</option>
				</select>
			</div>
			<div>
				<Bar
					data={data}
					height={350}
					options={{
						maintainAspectRatio: false,
						plugins: {
							legend: {
								position: "bottom",
							},
						},
						datasets: {
							bar: {
								barThickness: 24,
								barPercentage: 1.0,
							},
						},
					}}
				/>
			</div>
		</div>
	);
};
