import BankAccountTransactionListItem from "./BankAccountTransactionListItem";

const BankAccountsTransactionList = ({ transactions }: any) => {
	return (
		<div className="fs-box-shadow ts-section">
			<div className="ts-table">
				<table className="min-w-full leading-normal table-auto justify-between">
					<thead>
						<tr>
							<th
								scope="col"
								className="px-6 py-1 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-xs font-semibold"
							>
								Date
							</th>
							<th
								scope="col"
								className="px-3 py-1 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-xs  font-semibold"
							>
								Bank
							</th>
							<th
								scope="col"
								className="px-3 py-1 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-xs  font-semibold"
							>
								Account Number
							</th>
							<th
								scope="col"
								className="px-3 py-1 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-xs  font-semibold"
							>
								Type
							</th>
							<th
								scope="col"
								className="px-3 py-1 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-xs  font-semibold"
							>
								Amount
							</th>
						</tr>
					</thead>
					<tbody>
						{transactions &&
							transactions.map((transaction: any) => (
								<BankAccountTransactionListItem
									transaction={transaction}
									key={transaction.id}
								/>
							))}
					</tbody>
				</table>
				<div className="flex justify-end items-center ">
					<span className="text-xs">1 - 25</span>
					<button
						type="button"
						className="p-4  text-base  text-gray-600 bg-white hover:bg-gray-100"
					>
						<svg
							width="8"
							height="12"
							viewBox="0 0 8 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M7 13L1 7L7 1" stroke="#191918" stroke-opacity="0.5" />
						</svg>
					</button>
					<button
						type="button"
						className="p-4  text-base  text-gray-600 bg-white hover:bg-gray-100"
					>
						<svg
							width="8"
							height="12"
							viewBox="0 0 8 14"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M1 1L7 7L1 13" stroke="#191918" stroke-opacity="0.5" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default BankAccountsTransactionList;
