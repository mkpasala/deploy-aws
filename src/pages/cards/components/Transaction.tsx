const Transaction = ({ transaction }: any) => {
	let transactionData = transaction;
	return (
		<div>
			<div className="fs-box-shadow ts-section mt-4 h-[400px]">
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
									Created By
								</th>
								<th
									scope="col"
									className="px-3 py-1 bg-gray-200  border-b border-gray-200 text-gray-800  text-left text-xs  font-semibold"
								>
									Card
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
							{transactionData &&
								transactionData.map((transaction: any) => {
									const date = new Date(transaction!.created * 1000).toLocaleDateString();
									const created_by = transaction!.merchant_data!.name;
									const cardname = transaction!.merchant_data!.name;
									const type = transaction!.type;
									const amount =
										transaction!.amount < 0
											? `-$${(transaction!.amount * -1)/100}`
											: `$${(transaction!.amount/100)}`;
									return (
										<tr key={transaction!.id}>
											<td className="px-6 py-2 border-b border-gray-200 bg-white text-xs">
												<p className="text-gray-500 whitespace-no-wrap ">
													{date}
												</p>
											</td>
											<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
												<div className="flex items-center">
													<div className="flex-shrink-0">
														<a href="#" className="block relative">
															<svg
																width="20"
																height="20"
																viewBox="0 0 20 20"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M16.7181 15.5812C17.6157 14.5013 18.24 13.221 18.5381 11.8488C18.8363 10.4766 18.7996 9.05273 18.4311 7.69771C18.0625 6.34268 17.3731 5.09634 16.421 4.06412C15.469 3.0319 14.2823 2.24417 12.9614 1.76756C11.6405 1.29095 10.2243 1.1395 8.83248 1.326C7.44067 1.5125 6.11426 2.03147 4.96545 2.83901C3.81664 3.64655 2.87922 4.71891 2.2325 5.96537C1.58577 7.21182 1.24877 8.5957 1.25 9.99995C1.25048 12.0413 1.96984 14.0173 3.28188 15.5812L3.26938 15.5918C3.31313 15.6443 3.36313 15.6893 3.40813 15.7412C3.46438 15.8056 3.525 15.8662 3.58313 15.9287C3.75813 16.1187 3.93813 16.3012 4.12688 16.4724C4.18438 16.5249 4.24375 16.5737 4.30188 16.6237C4.50188 16.7962 4.7075 16.9599 4.92063 17.1124C4.94813 17.1312 4.97313 17.1556 5.00063 17.1749V17.1674C6.46444 18.1975 8.21069 18.7504 10.0006 18.7504C11.7906 18.7504 13.5368 18.1975 15.0006 17.1674V17.1749C15.0281 17.1556 15.0525 17.1312 15.0806 17.1124C15.2931 16.9593 15.4994 16.7962 15.6994 16.6237C15.7575 16.5737 15.8169 16.5243 15.8744 16.4724C16.0631 16.3006 16.2431 16.1187 16.4181 15.9287C16.4763 15.8662 16.5363 15.8056 16.5931 15.7412C16.6375 15.6893 16.6881 15.6443 16.7319 15.5912L16.7181 15.5812ZM10 4.99995C10.5563 4.99995 11.1 5.1649 11.5625 5.47394C12.0251 5.78298 12.3855 6.22223 12.5984 6.73615C12.8113 7.25007 12.867 7.81557 12.7585 8.36114C12.6499 8.90671 12.3821 9.40785 11.9887 9.80118C11.5954 10.1945 11.0943 10.4624 10.5487 10.5709C10.0031 10.6794 9.43762 10.6237 8.92371 10.4109C8.40979 10.198 7.97054 9.8375 7.6615 9.37499C7.35245 8.91247 7.1875 8.36871 7.1875 7.81245C7.1875 7.06652 7.48382 6.35115 8.01127 5.82371C8.53871 5.29626 9.25408 4.99995 10 4.99995ZM5.00438 15.5812C5.01522 14.7606 5.34872 13.9772 5.93273 13.4005C6.51673 12.8239 7.30429 12.5004 8.125 12.4999H11.875C12.6957 12.5004 13.4833 12.8239 14.0673 13.4005C14.6513 13.9772 14.9848 14.7606 14.9956 15.5812C13.6249 16.8164 11.8452 17.5 10 17.5C8.15484 17.5 6.3751 16.8164 5.00438 15.5812Z"
																	fill="#191918"
																	fill-opacity="0.5"
																/>
															</svg>
														</a>
													</div>
													<div className="ml-1">
														<p className="text-gray-500 whitespace-no-wrap">
															{created_by}
														</p>
													</div>
												</div>
											</td>
											<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
												<p className="text-gray-500 whitespace-no-wrap">
													{cardname}
												</p>
											</td>

											<td className="px-3 py-2 border-b border-gray-200 bg-white text-xs">
												<p className="text-gray-500 whitespace-no-wrap">
													{type}
												</p>
											</td>
											<td className="px-3 py-2 mr-4 border-b border-gray-200 bg-white text-xs">
												<p className="text-gray-500 whitespace-no-wrap">
													{amount}
												</p>
											</td>
										</tr>
									);
								})}
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
		</div>
	);
};

export default Transaction;
