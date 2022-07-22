import { Column, ColumnInstance, TableInstance } from "react-table";
import { Table } from "../../components/Elements/Table/Table";

const dedupeArray = <T,>(array: T[]) => {
	return array.reduce((result: T[], cur: T) => {
		if (!result.includes(cur)) result.push(cur);
		return result;
	}, []);
};

const AccountFilter = ({ column }: { column: ColumnInstance<{}> }) => {
	const accounts = ["4,000 Contributions", "test"];
	const uniqAccounts = accounts;
	const { filterValue, setFilter } = column;

	return (
		<select
			className="p-2 outline-none"
			name="account-filter"
			id="account-filter"
			value={filterValue || ""}
			onChange={(e) => setFilter(e.target.value)}
		>
			<option value="">All Accounts</option>
			{uniqAccounts.map((account, idx) => (
				<option key={idx} value={account}>
					{account}
				</option>
			))}
		</select>
	);
};

const columns: Column<{}>[] = [
	{
		Header: "",
		accessor: "id",
		disableSortBy: true,
		Filter: <div></div>,
		disableFilters: true,
	},
	{
		Header: "Account",
		accessor: "account",
		Filter: ({ column }) => <AccountFilter column={column} />,
	},
	{
		Header: "Amount",
		accessor: "amount",
		Cell: ({ value }: any) => value.toLocaleString("en-us"),
		Filter: <div></div>,
		disableFilters: true,
	},
];

export interface RowFormat {
	id: number;
	account: string;
	amount: number;
}

interface IncomeStatementTableProps {
	data: RowFormat[];
}
export const IncomeStatementTable = ({ data }: IncomeStatementTableProps) => {
	return <Table title="Income Statement" columns={columns} data={data} />;
};
