import clsx from "clsx";
import { useState } from "react";
import MOCK_DATA from "../MOCK_DATA";

type MockData = typeof MOCK_DATA;
type MockRow = typeof MOCK_DATA.Rows.Row[0] & {
	ColData?: { value: string; id?: string }[];
};

interface PNLTableProps {
	data: any,
	styles?: {
		container?: string;
	};
}

export const PNLTable = ({data, styles }: PNLTableProps) => {
	// MockData

	data = MOCK_DATA; // TODO: Remove when retrieving real data.
	const topColumns = data.Columns.Column;
	const rows = data.Rows.Row;

	const defaultStyles = {
		header: "text-right bg-dark/5 text-sm p-3",
		bodyRow: "border-b-[1px] border-dark/5 hover:bg-dark/5",
		cell: "text-sm text-dark/70 py-3 px-7 first:w-[5%] first:text-center last:w-[5%]",
	};

	const cascadeRows = (row: MockRow, level: number = 0): JSX.Element => {
		let headerRow;
		let summaryRow;
		let dataRow;
		const [open, setOpen] = useState(true);

		if (row.Header)
			headerRow = (
				<tr className="hover:text-dark hover:bg-dark/5">
					{row.Header.ColData.map((header, index) => {
						return (
							<td
								style={{
									paddingLeft:
										index === 0 ? level * 10 + 10 : 10,
									paddingRight: 10,
								}}
								className={clsx("last:text-right")}
								key={index}
							>
								{index === 0 && (
									<span
										className="hover:cursor-pointer text-xs select-none mx-1"
										onClick={() => setOpen(!open)}
									>
										{open ? "\u25BC" : "\u25B6"}
									</span>
								)}
								{header.value}
							</td>
						);
					})}
				</tr>
			);

		if (row.type !== "Data") {
			dataRow = row?.Rows?.Row.map((rowItem) => {
				return cascadeRows(rowItem as any, level + 1); //TODO: Change type to actual type
			});
		} else {
			dataRow = (
				<tr className="hover:text-dark hover:bg-dark/5">
					{row?.ColData?.map((column, index) => {
						return (
							<td
								className="last:text-right"
								style={{
									paddingLeft:
										index === 0 ? level * 10 + 10 : 10,
									paddingRight: 10,
								}}
								key={index}
							>
								{column.value}
							</td>
						);
					})}
				</tr>
			);
		}

		if (row.Summary)
			summaryRow = (
				<tr className="hover:text-dark hover:bg-dark/5">
					{row.Summary.ColData.map((summary, index) => {
						return (
							<td
								style={{
									paddingLeft:
										index === 0 ? level * 10 + 10 : 10,
									paddingRight: 10,
								}}
								className="font-bold border-t border-b last:text-right"
								key={index}
							>
								{summary.value}
							</td>
						);
					})}
				</tr>
			);

		return (
			<>
				{headerRow}
				{open && dataRow}
				{summaryRow}
			</>
		);
	};

	return (
		<div className={clsx("w-full shadow rounded", styles?.container)}>
			<h2 className="text-sm font-semibold p-5">Statement of Activity</h2>
			<table className="w-full ">
				<thead>
					<tr className={defaultStyles.bodyRow}>
						{topColumns.map((column: any, idx: any) => (
							<th key={idx} className={defaultStyles.header}>
								{column.ColTitle}
							</th>
						))}
					</tr>
				</thead>
				<tbody>{rows.map((row: any) => cascadeRows(row))}</tbody>
			</table>
		</div>
	);
};