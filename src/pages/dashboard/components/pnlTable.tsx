import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";
import MOCK_DATA from "../MOCK_DATA";
import {
	Branch,
	restructurePNLData,
	Tree
} from "../utilities/restructurePNLData";

export type PNLData = typeof MOCK_DATA;
export type Row = typeof MOCK_DATA.Rows.Row[0] & {
	ColData?: { value: string; id?: string }[];
};

import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/solid";

interface PNLTableProps {
	data: PNLData;
	styles?: {
		container?: string;
	};
}

interface TreeItemProps {
	row: { colData: string[]; type: string; total?: string | null };
	children: JSX.Element[];
	status: boolean | null;
	setStatus: React.Dispatch<boolean | null>;
}

const TreeItem = ({ row, children, status, setStatus }: TreeItemProps) => {
	const [open, setOpen] = useState(status || false);
	const toggle = () => {
		setOpen(!open);
		setStatus(null);
	};

	useEffect(() => {
		if (status === null) return;
		setOpen(status);
	}, [status]);

	const returnCol = (col: string, numChildren: number, curIndex: number) => {
		const isFirstCol = curIndex === 0;
		const isLastCol = curIndex === row.colData.length - 1;
		const isParentRow = numChildren > 0;
		if (isParentRow && isFirstCol) {
			return (
				<div className="flex gap-1 select-none">
					{open ? (
						<ChevronDownIcon width={16} />
					) : (
						<ChevronRightIcon width={16} />
					)}
					{col}
				</div>
			);
		} else if (isParentRow && isLastCol && !open && row.total) {
			return <b>{row.total}</b>;
		} else return col;
	};

	return (
		<>
			<div
				onClick={toggle}
				role="row"
				className={clsx(
					"grid grid-cols-2 px-3 py-1 hover:bg-gray-50",
					children.length > 0 && "cursor-pointer select-none"
				)}
			>
				{row.colData.map((col, idx) => (
					<div
						key={idx}
						role="column"
						className={clsx(
							"last:text-right",
							row.type === "Summary" && "font-semibold border-t"
						)}
					>
						{returnCol(col, children.length, idx)}
					</div>
				))}
			</div>
			{open && <div className="pl-3">{children}</div>}
		</>
	);
};

const RecursiveTree = ({
	data,
	status,
	setStatus,
}: {
	data: Tree;
	status: boolean | null;
	setStatus: React.Dispatch<boolean | null>;
}) => {
	const createTree = (branch: Branch) => {
		return (
			branch.branches && (
				<TreeItem
					setStatus={setStatus}
					status={status}
					row={{
						colData: branch.colData,
						type: branch.type,
						total: branch.branches.at(-1)?.colData.at(-1),
					}}
				>
					{branch.branches.map((branch: Branch, idx) => {
						return (
							<React.Fragment key={idx}>
								{createTree(branch)}
							</React.Fragment>
						);
					})}
				</TreeItem>
			)
		);
	};
	return (
		<>
			{data.map((branch, idx) => (
				<div key={idx}>{createTree(branch)}</div>
			))}
		</>
	);
};

export const PNLTable = ({ data, styles }: PNLTableProps) => {
	const [status, setStatus] = useState<boolean | null>(false);
	const expandAll = () => setStatus(true);
	const collapseAll = () => setStatus(false);
	const topColumns = data?.Columns?.Column;
	const flattenedData = useMemo(() => restructurePNLData(data), [data]);

	return (
		<div className={clsx("w-full shadow rounded", styles?.container)}>
			<h2 className="text-sm font-semibold p-5 flex justify-between">
				Statement of Activity
				<span className="text-right flex gap-2 text-xs text-blue-400">
					<button className="hover:underline" onClick={expandAll}>
						Expand All
					</button>
					<button className="hover:underline" onClick={collapseAll}>
						Collapse All
					</button>
				</span>
			</h2>
			<div
				role="row"
				className="grid grid-flow-col text-sm bg-gray-100 p-3 font-bold"
			>
				{topColumns.map((col, idx) => (
					<div role="column" key={idx} className="text-right">
						{col.ColTitle}
					</div>
				))}
			</div>
			<RecursiveTree
				setStatus={setStatus}
				status={status}
				data={flattenedData}
			/>
		</div>
	);
};
