import { useMemo } from "react";
import {
	Column,
	useFilters,
	usePagination,
	useSortBy,
	useTable,
} from "react-table";

export interface TableProps {
	title: string;
	columns: readonly Column<{}>[];
	data: readonly {}[];
}

export const Table = ({ title, columns, data }: TableProps) => {
	const memoizedColumns = useMemo(() => columns, []);
	const memoizedData = useMemo(() => data, []);
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		pageOptions,
		state,
		canNextPage,
		canPreviousPage,
		prepareRow,
	} = useTable(
		{ columns: memoizedColumns, data: memoizedData },
		useFilters,
		useSortBy,
		usePagination
	);

	return (
		<div className="w-full shadow rounded">
			<h2 className="text-sm font-semibold p-5">{title}</h2>
			{!data.length ? (
				<div>No results found</div>
			) : (
				<>
					<table className="w-full" {...getTableProps()}>
						<thead>
							{headerGroups.map((headerGroup) => (
								<tr {...headerGroup.getHeaderGroupProps()}>
									{headerGroup.headers.map((column) => {
										return (
											<th
												className="text-left bg-dark/5 text-[10px] py-3 px-7 hover:bg-dark/5 first:w-[5%] first:text-center last:w-[5%] select-none"
												{...column.getHeaderProps()}
											>
												<div className="flex gap-1 items-center">
													<div
														{...column.getSortByToggleProps(
															{
																title: "",
															}
														)}
													>
														{column.render(
															"Header"
														)}
														<span className="mx-1">
															{column.isSorted &&
																(column.isSortedDesc ? (
																	<>&#9660;</>
																) : (
																	<>&#9650;</>
																))}
														</span>
													</div>
													{column.canFilter &&
														column.render("Filter")}
												</div>
											</th>
										);
									})}
								</tr>
							))}
						</thead>
						<tbody {...getTableBodyProps()}>
							{page.map((row) => {
								prepareRow(row);
								return (
									<tr
										className="border-b-[1px] border-dark/5 hover:bg-dark/5"
										{...row.getRowProps()}
									>
										{row.cells.map((cell) => (
											<td
												className="text-sm text-dark/70 py-3 px-7 first:w-[5%] first:text-center last:w-[5%]"
												{...cell.getCellProps()}
											>
												{cell.render("Cell")}
											</td>
										))}
									</tr>
								);
							})}
						</tbody>
					</table>
					<div className="float-right my-2 mr-7">
						<span className="text-sm text-dark/70 mx-6">
							{state.pageIndex + 1} {" - "} {pageOptions.length}
						</span>
						<button
							className="p-2 mr-7 disabled:text-dark/30"
							disabled={!canPreviousPage}
							onClick={() => previousPage()}
						>
							&#12296;
						</button>
						<button
							className="p-2 disabled:text-dark/30"
							disabled={!canNextPage}
							onClick={() => nextPage()}
						>
							&#12297;
						</button>
					</div>
				</>
			)}
		</div>
	);
};
