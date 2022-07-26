export default {
	Header: {
		Time: "2022-07-07T09:01:39-07:00",
		ReportName: "ProfitAndLoss",
		DateMacro: "this calendar year-to-date",
		ReportBasis: "Accrual",
		StartPeriod: "2022-01-01",
		EndPeriod: "2022-07-07",
		SummarizeColumnsBy: "Total",
		Currency: "USD",
		Option: [
			{
				Name: "AccountingStandard",
				Value: "GAAP",
			},
			{
				Name: "NoReportData",
				Value: "false",
			},
		],
	},
	Columns: {
		Column: [
			{
				ColTitle: "",
				ColType: "Account",
				MetaData: [
					{
						Name: "ColKey",
						Value: "account",
					},
				],
			},
			{
				ColTitle: "Total",
				ColType: "Money",
				MetaData: [
					{
						Name: "ColKey",
						Value: "total",
					},
				],
			},
		],
	},
	Rows: {
		//^ does not have a type
		Row: [
			{
				/*
				{
					Header: {ColData:{value:string}[]},
					Rows: {ColData: {value:string}[], type: string}[],
					type:string,
					group:string
				}
				 */
				//^ has type of "Section"
				Header: {
					ColData: [
						{
							value: "Income",
						},
						{
							value: "",
						},
					],
				},
				Rows: {
					/*
						{Row: []}

					*/
					Row: [
						{
							// {ColData: {value:string}[], type: string}
							// ^ type of "Data"
							ColData: [
								{
									value: "Design income",
									id: "82",
								},
								{
									value: "2250.00",
								},
							],
							type: "Data",
						},
						{
							ColData: [
								{
									value: "Discounts given",
									id: "86",
								},
								{
									value: "-89.50",
								},
							],
							type: "Data",
						},
						{
							Header: {
								ColData: [
									{
										value: "Landscaping Services",
										id: "45",
									},
									{
										value: "1287.50",
									},
								],
							},
							Rows: {
								Row: [
									{
										Header: {
											ColData: [
												{
													value: "Job Materials",
													id: "46",
												},
												{
													value: "",
												},
											],
										},
										Rows: {
											Row: [
												{
													ColData: [
														{
															value: "Fountains and Garden Lighting",
															id: "48",
														},
														{
															value: "2246.50",
														},
													],
													type: "Data",
												},
												{
													ColData: [
														{
															value: "Plants and Soil",
															id: "49",
														},
														{
															value: "2220.72",
														},
													],
													type: "Data",
												},
												{
													ColData: [
														{
															value: "Sprinklers and Drip Systems",
															id: "50",
														},
														{
															value: "138.00",
														},
													],
													type: "Data",
												},
											],
										},
										Summary: {
											ColData: [
												{
													value: "Total Job Materials",
												},
												{
													value: "4605.22",
												},
											],
										},
										type: "Section",
									},
									{
										Header: {
											ColData: [
												{
													value: "Labor",
													id: "51",
												},
												{
													value: "",
												},
											],
										},
										Rows: {
											Row: [
												{
													ColData: [
														{
															value: "Installation",
															id: "52",
														},
														{
															value: "250.00",
														},
													],
													type: "Data",
												},
												{
													ColData: [
														{
															value: "Maintenance and Repair",
															id: "53",
														},
														{
															value: "50.00",
														},
													],
													type: "Data",
												},
											],
										},
										Summary: {
											ColData: [
												{
													value: "Total Labor",
												},
												{
													value: "300.00",
												},
											],
										},
										type: "Section",
									},
								],
							},
							Summary: {
								ColData: [
									{
										value: "Total Landscaping Services",
									},
									{
										value: "6192.72",
									},
								],
							},
							type: "Section",
						},
						{
							ColData: [
								{
									value: "Pest Control Services",
									id: "54",
								},
								{
									value: "40.00",
								},
							],
							type: "Data",
						},
						{
							ColData: [
								{
									value: "Sales of Product Income",
									id: "79",
								},
								{
									value: "912.75",
								},
							],
							type: "Data",
						},
						{
							ColData: [
								{
									value: "Services",
									id: "1",
								},
								{
									value: "503.55",
								},
							],
							type: "Data",
						},
					],
				},
				Summary: {
					ColData: [
						{
							value: "Total Income",
						},
						{
							value: "9809.52",
						},
					],
				},
				type: "Section",
				group: "Income",
			},
			{
				Header: {
					ColData: [
						{
							value: "Cost of Goods Sold",
						},
						{
							value: "",
						},
					],
				},
				Rows: {
					Row: [
						{
							ColData: [
								{
									value: "Cost of Goods Sold",
									id: "80",
								},
								{
									value: "405.00",
								},
							],
							type: "Data",
						},
					],
				},
				Summary: {
					ColData: [
						{
							value: "Total Cost of Goods Sold",
						},
						{
							value: "405.00",
						},
					],
				},
				type: "Section",
				group: "COGS",
			},
			{
				Summary: {
					ColData: [
						{
							value: "Gross Profit",
						},
						{
							value: "9404.52",
						},
					],
				},
				type: "Section",
				group: "GrossProfit",
			},
			{
				Header: {
					ColData: [
						{
							value: "Expenses",
						},
						{
							value: "",
						},
					],
				},
				Rows: {
					Row: [
						{
							ColData: [
								{
									value: "Advertising",
									id: "7",
								},
								{
									value: "74.86",
								},
							],
							type: "Data",
						},
						{
							Header: {
								ColData: [
									{
										value: "Automobile",
										id: "55",
									},
									{
										value: "113.96",
									},
								],
							},
							Rows: {
								Row: [
									{
										ColData: [
											{
												value: "Fuel",
												id: "56",
											},
											{
												value: "349.41",
											},
										],
										type: "Data",
									},
								],
							},
							Summary: {
								ColData: [
									{
										value: "Total Automobile",
									},
									{
										value: "463.37",
									},
								],
							},
							type: "Section",
						},
						{
							ColData: [
								{
									value: "Equipment Rental",
									id: "29",
								},
								{
									value: "112.00",
								},
							],
							type: "Data",
						},
						{
							ColData: [
								{
									value: "Insurance",
									id: "11",
								},
								{
									value: "241.23",
								},
							],
							type: "Data",
						},
						{
							Header: {
								ColData: [
									{
										value: "Job Expenses",
										id: "58",
									},
									{
										value: "155.07",
									},
								],
							},
							Rows: {
								Row: [
									{
										Header: {
											ColData: [
												{
													value: "Job Materials",
													id: "63",
												},
												{
													value: "",
												},
											],
										},
										Rows: {
											Row: [
												{
													ColData: [
														{
															value: "Decks and Patios",
															id: "64",
														},
														{
															value: "234.04",
														},
													],
													type: "Data",
												},
												{
													ColData: [
														{
															value: "Plants and Soil",
															id: "66",
														},
														{
															value: "353.12",
														},
													],
													type: "Data",
												},
												{
													ColData: [
														{
															value: "Sprinklers and Drip Systems",
															id: "67",
														},
														{
															value: "215.66",
														},
													],
													type: "Data",
												},
											],
										},
										Summary: {
											ColData: [
												{
													value: "Total Job Materials",
												},
												{
													value: "802.82",
												},
											],
										},
										type: "Section",
									},
								],
							},
							Summary: {
								ColData: [
									{
										value: "Total Job Expenses",
									},
									{
										value: "957.89",
									},
								],
							},
							type: "Section",
						},
						{
							Header: {
								ColData: [
									{
										value: "Legal & Professional Fees",
										id: "12",
									},
									{
										value: "75.00",
									},
								],
							},
							Rows: {
								Row: [
									{
										ColData: [
											{
												value: "Accounting",
												id: "69",
											},
											{
												value: "640.00",
											},
										],
										type: "Data",
									},
									{
										ColData: [
											{
												value: "Bookkeeper",
												id: "70",
											},
											{
												value: "55.00",
											},
										],
										type: "Data",
									},
									{
										ColData: [
											{
												value: "Lawyer",
												id: "71",
											},
											{
												value: "100.00",
											},
										],
										type: "Data",
									},
								],
							},
							Summary: {
								ColData: [
									{
										value: "Total Legal & Professional Fees",
									},
									{
										value: "870.00",
									},
								],
							},
							type: "Section",
						},
						{
							Header: {
								ColData: [
									{
										value: "Maintenance and Repair",
										id: "72",
									},
									{
										value: "185.00",
									},
								],
							},
							Rows: {
								Row: [
									{
										ColData: [
											{
												value: "Equipment Repairs",
												id: "75",
											},
											{
												value: "755.00",
											},
										],
										type: "Data",
									},
								],
							},
							Summary: {
								ColData: [
									{
										value: "Total Maintenance and Repair",
									},
									{
										value: "940.00",
									},
								],
							},
							type: "Section",
						},
						{
							ColData: [
								{
									value: "Meals and Entertainment",
									id: "13",
								},
								{
									value: "28.49",
								},
							],
							type: "Data",
						},
						{
							ColData: [
								{
									value: "Office Expenses",
									id: "15",
								},
								{
									value: "18.08",
								},
							],
							type: "Data",
						},
						{
							ColData: [
								{
									value: "Rent or Lease",
									id: "17",
								},
								{
									value: "900.00",
								},
							],
							type: "Data",
						},
						{
							Header: {
								ColData: [
									{
										value: "Utilities",
										id: "24",
									},
									{
										value: "",
									},
								],
							},
							Rows: {
								Row: [
									{
										ColData: [
											{
												value: "Gas and Electric",
												id: "76",
											},
											{
												value: "200.53",
											},
										],
										type: "Data",
									},
									{
										ColData: [
											{
												value: "Telephone",
												id: "77",
											},
											{
												value: "130.86",
											},
										],
										type: "Data",
									},
								],
							},
							Summary: {
								ColData: [
									{
										value: "Total Utilities",
									},
									{
										value: "331.39",
									},
								],
							},
							type: "Section",
						},
					],
				},
				Summary: {
					ColData: [
						{
							value: "Total Expenses",
						},
						{
							value: "4937.31",
						},
					],
				},
				type: "Section",
				group: "Expenses",
			},
			{
				Summary: {
					ColData: [
						{
							value: "Net Operating Income",
						},
						{
							value: "4467.21",
						},
					],
				},
				type: "Section",
				group: "NetOperatingIncome",
			},
			{
				Header: {
					ColData: [
						{
							value: "Other Expenses",
						},
						{
							value: "",
						},
					],
				},
				Rows: {
					Row: [
						{
							ColData: [
								{
									value: "Miscellaneous",
									id: "14",
								},
								{
									value: "2916.00",
								},
							],
							type: "Data",
						},
					],
				},
				Summary: {
					ColData: [
						{
							value: "Total Other Expenses",
						},
						{
							value: "2916.00",
						},
					],
				},
				type: "Section",
				group: "OtherExpenses",
			},
			{
				Summary: {
					ColData: [
						{
							value: "Net Other Income",
						},
						{
							value: "-2916.00",
						},
					],
				},
				type: "Section",
				group: "NetOtherIncome",
			},
			{
				Summary: {
					ColData: [
						{
							value: "Net Income",
						},
						{
							value: "1551.21",
						},
					],
				},
				type: "Section",
				group: "NetIncome",
			},
		],
	},
};
