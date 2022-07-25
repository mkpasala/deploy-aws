import { Callout, CalloutProps } from "../components/callout";
import { RowFormat } from "../components/incomeStatementTable";
import { ReportingUnitLayout } from "../components/reportingUnitLayout";
import { PNLTable } from "../components/pnlTable";
import { ProgressBar, ProgressBarProps } from "../components/progressBar";
import { RevenueExpenseBar } from "../components/revenueExpenseBar";
import {
	DescriptionSectionProps,
	ReportingUnitDescription,
} from "../components/reportingUnitDescription";
import MOCK_DATA from "../MOCK_DATA";

const fundRaisingBarProps: ProgressBarProps = {
	total: { value: 10000, label: "Fundraising Goal" },
	current: { value: 6920, label: "Raised" },
	styles: {
		barColor: {
			filledColor: "#64C093",
			unfilledColor: "#D1EDDF",
		},
		container: "col-span-full",
	},
};

const expenseBarProps: ProgressBarProps = {
	total: { value: 10000, label: "Budget" },
	current: { value: 3213, label: "Spent" },
	styles: {
		barColor: {
			filledColor: "#F25858",
			unfilledColor: "#FCCDCD",
		},
		container: "col-span-full",
	},
};

const calloutProps: CalloutProps = {
	callouts: [
		{ value: 3707, label: "Cash on Hand" },
		{ value: 1837, label: "Less Accounts Payable" },
		{ value: 400, label: "Budgeted Spend Remaining" },
		{ value: 1470, label: "Expendable Free Cash" },
	],
	styles: {
		container: "col-span-full",
	},
};

const quickBooksData: { month: string; revenue: number; expense: number }[] = [
	{
		month: "January 2022",
		revenue: 180000,
		expense: 100000,
	},
	{
		month: "February 2022",
		revenue: 60000,
		expense: 40000,
	},
	{
		month: "March 2022",
		revenue: 520000,
		expense: 620000,
	},
	{
		month: "April 2022",
		revenue: 100000,
		expense: 50000,
	},
];

const barDatasets = [
	{
		label: "Revenue",
		backgroundColor: "#64C093",
		data: quickBooksData.map((data) => data.revenue),
	},
	{
		label: "Expense",
		backgroundColor: "#F25858",
		data: quickBooksData.map((data) => data.expense),
	},
];

const data: RowFormat[] = [
	{
		id: 0,
		account: "test",
		amount: 0,
	},
];

for (let i = 1; i <= 200; i++) {
	data.push({
		id: i,
		account: "4,000 Contributions",
		amount: 181212 * i,
	});
}

const sections: DescriptionSectionProps[] = [
	{
		title: "Reporting Unit Manager",
		body: (
			<div className="flex gap-2">
				<div>IMG</div>
				<div className="text-sm text-dark">Andrew Loos</div>
			</div>
		),
	},
	{
		title: "Grant",
		body: "$10,000",
	},
	{
		title: "Program Description",
		body: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum
				quo, saepe autem non excepturi numquam! Doloribus accusamus
				tempore illo perferendis placeat labore quas accusantium ipsum
				fuga dignissimos, culpa laboriosam animi!`,
	},
	{
		title: "Accounting Tag",
		body: "Tag A",
	},
];

export const ReportingUnitDashboard = () => {
	const title = "Reporting Unit";
	return (
		<ReportingUnitLayout>
			<h1 className="col-span-full text-dark text-3xl font-bold">
				{title}
			</h1>
			<div className="flex flex-col gap-5">
				<ProgressBar {...fundRaisingBarProps} />
				<ProgressBar {...expenseBarProps} />
				<Callout {...calloutProps} />
				<RevenueExpenseBar
					data={{
						labels: quickBooksData.map((data) => data.month),
						datasets: barDatasets,
					}}
				/>
			</div>
			<ReportingUnitDescription sections={sections} />
			<PNLTable data={MOCK_DATA} />
		</ReportingUnitLayout>
	);
};
