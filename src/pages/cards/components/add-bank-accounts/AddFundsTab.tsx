import Rect, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { Form, Formik, FormikErrors, FormikProps } from "formik";
import cardsAPIService from "../../../../services/cardsAPIService";
import { sessionContext } from "../../../../app";

interface AddFundsTabProps {
	nextStep: () => void;
	previousStep: () => void;
}
interface AddFundsData {
	account_id: string;
	source_id: string;
	amount: string;
	memo: string;
}
interface AddFundsErrorMessageProps {
	name: string;
	formik: FormikProps<AddFundsData>;
}
const AddFundsErrorMessage = ({ name, formik }: AddFundsErrorMessageProps) => {
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

const AddFundsTab = ({ nextStep, previousStep }: AddFundsTabProps) => {
	const cardsService = new cardsAPIService();
	let navigate = useNavigate();
	const [showSpinner, setShowSpinner] = useState(false);
	const [message, setMessage] = useState("");
	const session = useContext(sessionContext);
	const account_id = session?.organization?.stripeConnectId;
	const source_id = sessionStorage.getItem("source_id");
	const initialValues: AddFundsData = {
		account_id: account_id || "",
		source_id: source_id || "",
		amount: "",
		memo: "",
	};
	const styleInputNormal = "border border-slate-200 focus:border-sky-500 focus:ring-sky-500";
	const styleInputValid = "border border-green-500 focus:border-green-500 focus:ring-green-500";
	const styleInputInvalid = "border border-red-500 focus:border-red-500 focus:ring-red-500";

	const onSubmit = (values: AddFundsData) => {
		addFunds(values);
	};
	const validate = (values: AddFundsData) => {
		setMessage("");
		let errors: FormikErrors<AddFundsData> = {};
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
	const addFunds = async (values: AddFundsData) => {
		setShowSpinner(true);
		setMessage("");
		const request: AddFundsData = { ...values };
		request.amount = String(Number(request.amount) * 100);

		try {
			let response: any = await cardsService.addFunds(request);
			setShowSpinner(false);
			if (
				response.type === "StripePermissionError" ||
				response.type === "StripeInvalidRequestError"
			) {
				setMessage(response.raw.message);
			} else {
				sessionStorage.removeItem("source_id");
				navigate("/card-list");
			}
		} catch (ex) {
			console.log("exception", ex);
			setShowSpinner(false);
		}
	};
	return (
		<>
			<Spinner show={showSpinner} />
			<div className="bk-form-section shadow-md w-full border-[1px] flex flex-col mb-2">
				<div className="bk-form-header px-6 pt-6 mb-5 font-sans">
					<div className="header font-bold mb-1">Add fund to your FlareFS account</div>
					<div className="header-desc text-gray-600">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit sed
					</div>
				</div>
				<Formik
					initialValues={initialValues}
					validate={validate}
					onSubmit={(values: AddFundsData, actions: any) => {
						onSubmit(values);
						actions.setSubmitting(false);
					}}
				>
					{(formik: FormikProps<AddFundsData>) => {
						const { handleSubmit, handleChange, touched, errors, handleBlur, values } =
							formik;
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
							<Form className="connect-bk-form" onSubmit={handleSubmit}>
								<div className="bank-info flex flex-row mb-2 px-6">
									<div className="w-full relative">
										<label
											className="block text-gray-500 bk-form-label"
											htmlFor="amount"
										>
											Amount
										</label>
										<span className="absolute top-8 left-4">&#36;</span>
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
										<AddFundsErrorMessage name="amount" formik={formik} />
									</div>
								</div>
								<div className="bank-info flex flex-row mb-2 px-6">
									<div className="w-full relative">
										<label
											className="block text-gray-500 bk-form-label"
											htmlFor="memo"
										>
											Memo
										</label>
										<div className="flex items-center">
											<input
												className="bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full border rounded-sm py-2 px-3 pl-9 shadow-md focus:outline-none focus:ring-1"
												placeholder="Enter Memo Line For Fund Transfer"
												type="text"
												name="memo"
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.memo}
												maxLength={50}
											/>
										</div>
									</div>
								</div>
								<div className="btn-bottom-section border-t-[1px] border-gray-200 py-4 flex justify-between mt-10 pr-6 items-center">
									<a
										className="mx-9 cursor-pointer hover:font-bold"
										onClick={() => {
											previousStep();
										}}
									>
										Back
									</a>
									<div className="text-sm font-bold ml-4 h-auto w-72">
										{message && message.length > 0 && <p>{message}</p>}
									</div>
									<button
										type="submit"
										className="bg-red-500  hover:bg-red-700 text-white font-bold py-2 px-2 rounded w-32 disabled:bg-gray-200"
										disabled={!(formik.dirty && formik.isValid)}
									>
										Finish
									</button>
								</div>
							</Form>
						);
					}}
				</Formik>
			</div>
		</>
	);
};
export default AddFundsTab;
