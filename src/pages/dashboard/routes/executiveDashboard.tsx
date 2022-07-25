import { Callout, CalloutProps } from "../components/callout";
import { RowFormat } from "../components/incomeStatementTable";
import { ExecutiveLayout } from "../components/execLayout";
import { PNLTable } from "../components/pnlTable";
import { ProgressBar, ProgressBarProps } from "../components/progressBar";
import { RevenueExpenseBar } from "../components/revenueExpenseBar";
import MOCK_DATA from "../MOCK_DATA";
import { useContext, useEffect, useState } from "react";
import { sessionContext } from "../../../app";
import organizationService from "../../../services/organizationService";
import Organization from "../../../models/organization";

const fundRaisingBarProps: ProgressBarProps = {
	total: { value: 10000, label: "Fundraising Goal" },
	current: { value: 6920, label: "Raised" },
	styles: {
		barColor: {
			filledColor: "#64C093",
			unfilledColor: "#D1EDDF",
		},
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
	},
};

const calloutProps: CalloutProps = {
	callouts: [
		{ value: 3707, label: "Cash on Hand" },
		{ value: 1837, label: "Less Accounts Payable" },
		{ value: 400, label: "Budgeted Spend Remaining" },
		{ value: 1470, label: "Expendable Free Cash" },
	],
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

export const ExecutiveDashboard = () => {
	let [loading, setLoading] = useState(false);
	let [reportData, setReportData] = useState();
	let session = useContext(sessionContext);

	useEffect(() => {
		loadReport();
	}, []);

	const loadReport = async () => {
		setLoading(true);

		let data = 	await organizationService.getPnlReport(
			session?.organization as Organization
		)

		console.log("This is retreived from the service", data)
		setReportData(data);
		console.log("Report Data", reportData);
		setLoading(false);
	};
	
	const title = "Executive Dashboard";
	return (
		<ExecutiveLayout>
			<h1 className="col-span-full text-dark text-3xl font-bold">
				{title}
			</h1>
			<ProgressBar {...fundRaisingBarProps} />
			<ProgressBar {...expenseBarProps} />
			<Callout {...calloutProps} />
			<RevenueExpenseBar
				data={{
					labels: quickBooksData.map((data) => data.month),
					datasets: barDatasets,
				}}
			/>
			{/* <PNLTable data={MOCK_DATA} /> */}
			{reportData && <PNLTable data={reportData} />}
		</ExecutiveLayout>
	);
};
