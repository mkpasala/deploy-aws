const BankAccountTransactionListItem = ({ transaction }: any) => {
	let date = "";
	let bank = "";
	let accountNumber = "";
	let type = "";
	let amount = "";
	if (transaction!.object === "topup") {
		date = new Date(transaction!.created * 1000).toLocaleDateString();
		bank = transaction!.source!.ach_debit!.bank_name;
		accountNumber = `****${transaction!.source!.ach_debit!.last4}`;
		type = transaction!.statement_descriptor || "Deposit";
		amount =
			transaction!.amount < 0 ? `-$${transaction!.amount * -1}` : `$${transaction!.amount}`;
	} else if (transaction!.object === "payout") {
		date = new Date(transaction!.created * 1000).toLocaleDateString();
		// bank = transaction!.source!.ach_debit!.bank_name;
		// accountNumber = `****${transaction!.source!.ach_debit!.last4}`;
		type = transaction!.statement_descriptor || "Withdraw";
		amount =
			transaction!.amount < 0 ? `-$${transaction!.amount * -1}` : `$${transaction!.amount}`;
	}
	return (
		<>
			<tr>
				<td className="px-6 py-2 border-b border-gray-200 bg-white text-xs">
					<p className="text-gray-500 whitespace-no-wrap ">{date}</p>
				</td>
				<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
					<p className="text-gray-500 whitespace-no-wrap">{bank}</p>
				</td>
				<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
					<p className="text-gray-500 whitespace-no-wrap">{accountNumber}</p>
				</td>
				<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
					<p className="text-gray-500 whitespace-no-wrap">{type}</p>
				</td>
				<td className="px-3 py-2 mr-4 border-b border-gray-200 bg-white text-xs">
					<p className="text-gray-500 whitespace-no-wrap">{amount}</p>
				</td>
			</tr>
		</>
	);
};

export default BankAccountTransactionListItem;
