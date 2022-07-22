import Rect, { useState, useEffect } from "react";
import { Form, Formik, FormikErrors, FormikProps } from "formik";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import cardsAPIService from "../../../services/cardsAPIService";

interface WithdrawData {
	account_id: string;
	source_id: string;
	amount: string;
	memo: string;
}
interface WithdrawFundsErrorMessageProps {
	name: string;
	formik: FormikProps<WithdrawData>;
}
const WithdrawFundsErrorMessage = ({ name, formik }: WithdrawFundsErrorMessageProps) => {
	const { touched, errors, values } = formik;
	const isTouched = (touched as any)[name];
	const error = (errors as any)[name];

	return (
		<>
			{isTouched && error && (
				<p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
			)}
			{isTouched && error && (
				<span className="absolute top-8 right-4">
					<svg
						width="21"
						height="22"
						viewBox="0 0 21 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M18.1 3.89998C14.2 -2.43187e-05 7.80001 -2.43187e-05 3.90001 3.89998C6.19888e-06 7.79998 6.19888e-06 14.2 3.90001 18.1C7.80001 22 14.1 22 18 18.1C21.9 14.2 22 7.79998 18.1 3.89998ZM13.8 15.2L11 12.4L8.20001 15.2L6.80001 13.8L9.60001 11L6.80001 8.19998L8.20001 6.79998L11 9.59998L13.8 6.79998L15.2 8.19998L12.4 11L15.2 13.8L13.8 15.2Z"
							fill="#F35858"
						/>
					</svg>
				</span>
			)}
			{isTouched && !error && (
				<span className="absolute top-8 right-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 100 100"
						width="25px"
						height="25px"
					>
						<circle cx="50" cy="50" r="44" fill="#f2f2f2" />
						<path
							fill="#f2f2f2"
							d="M50,91C27.393,91,9,72.607,9,50S27.393,9,50,9s41,18.393,41,41S72.607,91,50,91z"
						/>
						<circle cx="50.026" cy="50.026" r="38.026" fill="#64C093" />
						<g>
							<path
								fill="#ffffff"
								d="M42.017,65c-0.767,0-1.534-0.292-2.119-0.877l-10.017-10c-1.173-1.17-1.175-3.07-0.004-4.243 c1.17-1.173,3.07-1.175,4.242-0.003l7.896,7.882l23.881-23.88c1.172-1.172,3.07-1.172,4.242,0c1.172,1.171,1.172,3.071,0,4.242 l-26,26C43.552,64.707,42.784,65,42.017,65z"
							/>
						</g>
					</svg>
				</span>
			)}
		</>
	);
};

interface WithdrawFundsPopupProps {
	isShow: boolean;
	onHide: () => void;
}

const WithdrawFundsPopup = ({ isShow, onHide }: WithdrawFundsPopupProps) => {
	const cardsService = new cardsAPIService();
	let navigate = useNavigate();
	const [showSpinner, setShowSpinner] = useState(false);
	const [message, setMessage] = useState("");
	const account_id = sessionStorage.getItem("account_id");
	const initialValues: WithdrawData = {
		account_id: account_id || "",
		source_id: "src_1LNBMbR1aSxGwRclfo8FZZdU",
		amount: "",
		memo: "",
	};
	const [sources, setSources] = useState<any>([]);
	const styleInputNormal = "border border-slate-200 focus:border-sky-500 focus:ring-sky-500";
	const styleInputValid = "border border-green-500 focus:border-green-500 focus:ring-green-500";
	const styleInputInvalid = "border border-red-500 focus:border-red-500 focus:ring-red-500";

	const [balance, setbBalance] = useState<any>(null);

	useEffect(() => {
		if (isShow) {
			retrieveBalance();
			getAllSources();
		}
	}, [isShow]);
	const retrieveBalance = async () => {
		setShowSpinner(true);
		try {
			let response: any = await cardsService.retrieveBalance({ account_id: account_id });
			setShowSpinner(false);
			if (
				response.type === "StripePermissionError" ||
				response.type === "StripeInvalidRequestError"
			) {
			} else {
				setbBalance(response!.issuing!.available[0]!.amount);
			}
		} catch (ex) {
			console.log("exception", ex);
			setShowSpinner(false);
		}
	};
	const getAllSources = async () => {
		setShowSpinner(true);
		// try {
		// 	let response: any = await cardsService.retrieveBalance({ account_id: account_id });
		// 	setShowSpinner(false);
		// 	if (
		// 		response.type === "StripePermissionError" ||
		// 		response.type === "StripeInvalidRequestError"
		// 	) {
		// 		//setMessage(data.raw.message);
		// 	} else {
		// 		setSources(response);
		// 	}
		// } catch (ex) {
		// 	console.log("exception", ex);
		// 	setShowSpinner(false);
		// }
		setSources([
			{
				id: "src_1LNBMbR1aSxGwRclfo8FZZdU",
				object: "source",
				ach_debit: {
					last4: "9991",
					bank_name: "STRIPE TEST BANK",
				},
				owner: {
					name: "Jenny Rosen",
				},
			},
		]);
	};
	const onSubmit = (values: WithdrawData) => {
		withdrawFunds(values);
	};
	const validate = (values: WithdrawData) => {
		setMessage("");
		let errors: FormikErrors<WithdrawData> = {};
		if (!values.amount) {
			errors.amount = "Amount must be greater than zero";
		} else {
			// let reg = new RegExp("^[0-9]*$");
			// if (!reg.test(values.amount)) {
			// 	errors.amount = "Amount required integer value";
			// }
		}
		return errors;
	};
	const withdrawFunds = async (values: WithdrawData) => {
		setShowSpinner(true);
		setMessage("");
		try {
			let response: any = await cardsService.withdrawFunds(values);
			setShowSpinner(false);
			debugger;
			if (
				response.type === "StripePermissionError" ||
				response.type === "StripeInvalidRequestError"
			) {
				setMessage(response.raw.message);
			} else {
				onHide();
				setMessage("");
			}
		} catch (ex) {
			console.log("exception", ex);
			setShowSpinner(false);
		}
	};
	return (
		<>
			{isShow && (
				<Formik
					initialValues={initialValues}
					validate={validate}
					onSubmit={(values, actions) => {
						onSubmit(values);
						actions.setSubmitting(false);
					}}
				>
					{(formik) => {
						const { handleSubmit, handleChange, touched, errors, handleBlur, values } =
							formik;

						const isTouched = (touched as any)["source_id"];
						const error = (errors as any)["source_id"];

						const getInputStyle = (name: string): string => {
							let style = styleInputNormal;
							if ((touched as any)[name]) {
								if ((errors as any)[name]) {
									style = styleInputInvalid;
								} else {
									style = styleInputValid;
								}
							}
							return style;
						};
						return (
							<>
								<Spinner show={showSpinner} />
								<Form className="connect-bk-form" onSubmit={handleSubmit}>
									<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
										<div className="flex justify-center overflow-x-hidden overflow-y-auto px-6 py-6">
											<div className="flex bg-white w-[817px] h-[500px] border-gray-300 rounded-md shadow-lg">
												<div className="relative w-full h-full max-w-auto p-5">
													<div className="flex justify-between items-center">
														<p className="text-2xl text-gray-900 font-bold">
															Withdraw Funds
														</p>
														<button
															onClick={(event) => {
																onHide();
																setMessage("");
															}}
															className="hover:bg-gray-200"
														>
															<svg
																width="16"
																height="16"
																viewBox="0 0 16 16"
																fill="none"
																xmlns="http://www.w3.org/2000/svg"
															>
																<path
																	d="M16 1.4L14.6 0L8 6.6L1.4 0L0 1.4L6.6 8L0 14.6L1.4 16L8 9.4L14.6 16L16 14.6L9.4 8L16 1.4Z"
																	fill="#060F14"
																	//fill-opacity="0.8"
																	className=" hover:fill-gray-400"
																/>
															</svg>
														</button>
													</div>
													<div className="header-desc text-gray-600 text-base">
														From your FlareFS account
													</div>
													<div className="bank-info flex flex-row mb-2 mt-4">
														<div className="w-full relative">
															<label
																className="block text-gray-500 bk-form-label"
																htmlFor="amount"
															>
																Amount
															</label>
															<span className="absolute top-8 left-4">
																&#36;
															</span>
															<input
																className={`marker:bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full rounded-sm py-2 px-3 pl-9 shadow-md focus:outline-none focus:ring-1 ${getInputStyle(
																	"amount"
																)}`}
																placeholder="Enter amount here"
																type="number"
																name="amount"
																onChange={handleChange}
																onBlur={handleBlur}
																value={values.amount}
															/>
															<p className="text-xs mt-1">
																out of ${balance}
															</p>
															<WithdrawFundsErrorMessage
																name="amount"
																formik={formik}
															/>
														</div>
													</div>
													<div className="bank-info flex flex-row mb-2">
														<div className="w-full relative">
															<label
																className="block text-gray-500 bk-form-label"
																htmlFor="memo"
															>
																Memo
															</label>
															<div className="flex items-center">
																<input
																	className={`bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full border rounded-sm py-2 px-3 pl-9 shadow-md focus:outline-none focus:ring-1 ${getInputStyle(
																		"memo"
																	)}`}
																	placeholder="Enter Memo Line For Fund Transfer"
																	type="text"
																	name="memo"
																	onChange={handleChange}
																	onBlur={handleBlur}
																	value={values.memo}
																/>
																<WithdrawFundsErrorMessage
																	name="memo"
																	formik={formik}
																/>
															</div>
														</div>
													</div>
													<div className="mt-10">
														<div className="text-black-600 text-xs">
															Withdraw Funds to
														</div>
														{sources.map((source: any) => (
															<>
																<div className=" text-black-500 text-sm">
																	<input
																		type="radio"
																		name="source_id"
																		className="mr-2 accent-red-600"
																		onChange={handleChange}
																		onBlur={handleBlur}
																		value={source.id}
																	/>
																	{`${source.owner!.name} | ${
																		source.ach_debit!.bank_name
																	}`}
																</div>
																<div className=" text-gray-600 text-sm">
																	************
																	{source.ach_debit!.last4}
																</div>
															</>
														))}
														{isTouched && error && (
															<p className="mt-2 text-sm text-red-600 dark:text-red-500">
																Select source from source list
															</p>
														)}
														<div
															className="text-sm text-red-500 mt-3 cursor-pointer hover:font-bold"
															onClick={() => {
																navigate("/connect-bank-account");
															}}
														>
															+ Add Another Bank Account
														</div>
													</div>
													<div className="flex justify-between space-x-4 mb-0 mt-6 border-t-2 pt-6">
														<div className="text-sm font-bold ml-4 h-auto w-72">
															{message && message.length > 0 && (
																<p>{message}</p>
															)}
														</div>
														<div className="flex justify-end space-x-4">
															<button
																type="reset"
																onClick={(event) => {
																	onHide();
																	setMessage("");
																}}
																className="bg-white hover:bg-gray-200 font-bold py-2 px-2 rounded w-32"
															>
																Cancel
															</button>
															<button
																type="submit"
																className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded w-32"
															>
																Withdraw
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Form>
							</>
						);
					}}
				</Formik>
			)}
		</>
	);
};
export default WithdrawFundsPopup;
