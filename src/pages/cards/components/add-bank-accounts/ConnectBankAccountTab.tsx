import Rect, { useState, useContext } from "react";
import { Form, Formik, FormikErrors, FormikProps } from "formik";
import { useStripe } from "@stripe/react-stripe-js";
import Spinner from "../Spinner";
import cardsAPIService from "../../../../services/cardsAPIService";
import { sessionContext } from "../../../../app";
import flareDBService from "../../../../services/flareDBService";
import { Toast, toastFunction } from "../ToastComponent";

interface ConnectBankAccountTabProps {
	nextStep: () => void;
	previousStep: () => void;
}

interface BankAccountData {
	email: string;
	account_id: string;
	token_id: string;
	routingNumber: string;
	accountHolderName: string;
	accountNumber: string;
	bankName: string;
	accountNickName: string;
	addressLine1: string;
	addressLine2: string;
	city: string;
	state: string;
	zipCode: string;
}
interface BankAccountErrorMessageProps {
	name: string;
	formik: FormikProps<BankAccountData>;
	showIcon?: boolean;
}

const BankAccountErrorMessage = ({
	name,
	formik,
	showIcon = true,
}: BankAccountErrorMessageProps) => {
	const { touched, errors, values } = formik;
	const isTouched = (touched as any)[name];
	const error = (errors as any)[name];

	return (
		<>
			{isTouched && error && (
				<p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
			)}
			{isTouched && error && showIcon && (
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
			{isTouched && !error && showIcon && (
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

const ConnectBankAccountTab = ({ nextStep, previousStep }: ConnectBankAccountTabProps) => {
	const cardsService = new cardsAPIService();
	const flareService = new flareDBService();
	const [message, setMessage] = useState("");
	const [showSpinner, setShowSpinner] = useState(false);
	const states = [
		{
			name: "Alabama",
			abbreviation: "AL",
		},
		{
			name: "Alaska",
			abbreviation: "AK",
		},
		{
			name: "American Samoa",
			abbreviation: "AS",
		},
		{
			name: "Arizona",
			abbreviation: "AZ",
		},
		{
			name: "Arkansas",
			abbreviation: "AR",
		},
		{
			name: "California",
			abbreviation: "CA",
		},
		{
			name: "Colorado",
			abbreviation: "CO",
		},
		{
			name: "Connecticut",
			abbreviation: "CT",
		},
		{
			name: "Delaware",
			abbreviation: "DE",
		},
		{
			name: "District Of Columbia",
			abbreviation: "DC",
		},
		{
			name: "Federated States Of Micronesia",
			abbreviation: "FM",
		},
		{
			name: "Florida",
			abbreviation: "FL",
		},
		{
			name: "Georgia",
			abbreviation: "GA",
		},
		{
			name: "Guam",
			abbreviation: "GU",
		},
		{
			name: "Hawaii",
			abbreviation: "HI",
		},
		{
			name: "Idaho",
			abbreviation: "ID",
		},
		{
			name: "Illinois",
			abbreviation: "IL",
		},
		{
			name: "Indiana",
			abbreviation: "IN",
		},
		{
			name: "Iowa",
			abbreviation: "IA",
		},
		{
			name: "Kansas",
			abbreviation: "KS",
		},
		{
			name: "Kentucky",
			abbreviation: "KY",
		},
		{
			name: "Louisiana",
			abbreviation: "LA",
		},
		{
			name: "Maine",
			abbreviation: "ME",
		},
		{
			name: "Marshall Islands",
			abbreviation: "MH",
		},
		{
			name: "Maryland",
			abbreviation: "MD",
		},
		{
			name: "Massachusetts",
			abbreviation: "MA",
		},
		{
			name: "Michigan",
			abbreviation: "MI",
		},
		{
			name: "Minnesota",
			abbreviation: "MN",
		},
		{
			name: "Mississippi",
			abbreviation: "MS",
		},
		{
			name: "Missouri",
			abbreviation: "MO",
		},
		{
			name: "Montana",
			abbreviation: "MT",
		},
		{
			name: "Nebraska",
			abbreviation: "NE",
		},
		{
			name: "Nevada",
			abbreviation: "NV",
		},
		{
			name: "New Hampshire",
			abbreviation: "NH",
		},
		{
			name: "New Jersey",
			abbreviation: "NJ",
		},
		{
			name: "New Mexico",
			abbreviation: "NM",
		},
		{
			name: "New York",
			abbreviation: "NY",
		},
		{
			name: "North Carolina",
			abbreviation: "NC",
		},
		{
			name: "North Dakota",
			abbreviation: "ND",
		},
		{
			name: "Northern Mariana Islands",
			abbreviation: "MP",
		},
		{
			name: "Ohio",
			abbreviation: "OH",
		},
		{
			name: "Oklahoma",
			abbreviation: "OK",
		},
		{
			name: "Oregon",
			abbreviation: "OR",
		},
		{
			name: "Palau",
			abbreviation: "PW",
		},
		{
			name: "Pennsylvania",
			abbreviation: "PA",
		},
		{
			name: "Puerto Rico",
			abbreviation: "PR",
		},
		{
			name: "Rhode Island",
			abbreviation: "RI",
		},
		{
			name: "South Carolina",
			abbreviation: "SC",
		},
		{
			name: "South Dakota",
			abbreviation: "SD",
		},
		{
			name: "Tennessee",
			abbreviation: "TN",
		},
		{
			name: "Texas",
			abbreviation: "TX",
		},
		{
			name: "Utah",
			abbreviation: "UT",
		},
		{
			name: "Vermont",
			abbreviation: "VT",
		},
		{
			name: "Virgin Islands",
			abbreviation: "VI",
		},
		{
			name: "Virginia",
			abbreviation: "VA",
		},
		{
			name: "Washington",
			abbreviation: "WA",
		},
		{
			name: "West Virginia",
			abbreviation: "WV",
		},
		{
			name: "Wisconsin",
			abbreviation: "WI",
		},
		{
			name: "Wyoming",
			abbreviation: "WY",
		},
	];

	const session = useContext(sessionContext);
	const account_id = session?.organization?.stripeConnectId;
	const initialValues: BankAccountData = {
		email: "yitehac360@weepm.com",
		account_id: account_id || "",
		token_id: "",
		routingNumber: "",
		accountHolderName: "",
		accountNumber: "",
		bankName: "",
		accountNickName: "",
		addressLine1: "",
		addressLine2: "",
		city: "",
		state: "",
		zipCode: "",
	};
	const styleInputNormal = "border border-slate-200 focus:border-sky-500 focus:ring-sky-500";
	const styleInputValid = "border border-green-500 focus:border-green-500 focus:ring-green-500";
	const styleInputInvalid = "border border-red-500 focus:border-red-500 focus:ring-red-500";
	const stripe = useStripe();

	const onSubmit = (values: BankAccountData) => {
		setMessage("");
		generateToken(values);
	};
	const validate = (values: BankAccountData) => {
		setMessage("");
		let errors: FormikErrors<BankAccountData> = {};
		if (!values.routingNumber) {
			errors.routingNumber = "Routing Number required";
		} else {
			let reg = new RegExp("^[0-9]*$");
			if (!reg.test(values.routingNumber)) {
				errors.routingNumber = "Please Enter Numbers only";
			}
		}
		if (!values.accountNumber) {
			errors.accountNumber = "Account Number required";
		} else {
			let reg = new RegExp("^[0-9]*$");
			if (!reg.test(values.accountNumber)) {
				errors.accountNumber = "Please Enter Numbers only";
			}
		}
		if (!values.accountHolderName) {
			errors.accountHolderName = "Account Holder Name required";
		} else {
			let reg = new RegExp("^[a-z A-Z]*$");
			if (!reg.test(values.accountHolderName)) {
				errors.accountHolderName = "Please Enter Valid value";
			}
		}
		// 	let reg = new RegExp("^[0-9]*$");
		// 	if (!reg.test(values.firstAmount)) {
		// 		errors.firstAmount = "First Amount required integer value";
		// 	}
		// }
		// if (!values.secondAmount) {
		// 	errors.secondAmount = "Second Amount must be greater than or equal to 1";
		// } else {
		// 	let reg = new RegExp("^[0-9]*$");
		// 	if (!reg.test(values.secondAmount)) {
		// 		errors.secondAmount = "Second Amount required integer value";
		// 	}
		// }
		return errors;
	};
	const connectBackAccount = async (values: BankAccountData): Promise<void> => {
		setShowSpinner(true);
		try {
			let response: any = await cardsService.createBankAccount(values);
			setShowSpinner(false);
			if (
				response.type === "StripePermissionError" ||
				response.type === "StripeInvalidRequestError"
			) {
				toastFunction(false, response.raw.message, "error");
			} else {
				sessionStorage.setItem("source_id", response.source_id);
				await createBankccount(response.source_id, values);
				nextStep();
			}
		} catch (ex) {
			console.log("exception", ex);
			setShowSpinner(false);
		}
	};

	const createBankccount = async (sourceId: string, values: BankAccountData): Promise<void> => {
		const organization = session?.organization;
		if (organization) {
			setShowSpinner(true);
			const organizationId = organization.id ? organization.id : "";
			const payload = {
				id: sourceId,
				bankName: values.bankName,
				accountNickname: values.accountNickName,
				lastFourDigits: values.accountNumber.substring(values.accountNumber.length - 4),
			};
			try {
				let response: any = await flareService.createBankAccount(organizationId, payload);
				setShowSpinner(false);
			} catch (ex) {
				console.log("exception", ex);
				setShowSpinner(false);
			}
		}
	};

	const getAccountDetails = async (accountId: string) => {
		try {
			setShowSpinner(true);
			let account: any = await cardsService.getConnectAccountDetails({ id: accountId });
			setShowSpinner(false);
			if (
				account.type === "StripePermissionError" ||
				account.type === "StripeInvalidRequestError"
			) {
				return null;
			} else {
				return account;
			}
		} catch (ex) {
			console.log(ex);
			setShowSpinner(false);
			return null;
		}
	};

	const generateToken = async (values: BankAccountData) => {
		setShowSpinner(true);
		if (!stripe) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}
		let account = null;
		if (account_id) {
			account = await getAccountDetails(account_id);
		}
		if (!account) {
			return;
		}
		const { routingNumber, accountNumber, accountHolderName } = values;
		try {
			const body = {
				country: "US",
				currency: "usd",
				routing_number: routingNumber,
				account_number: accountNumber,
				account_holder_name: accountHolderName,
				account_holder_type:
					account.business_type === "non_profit" ? "company" : account.business_type,
			};
			const { token, error } = await stripe.createToken("bank_account", body);
			setShowSpinner(false);
			if (token && token.id) {
				values.token_id = token.id;
				connectBackAccount(values);
			} else if (error) {
				toastFunction(false, error.message, "error");
			}
		} catch (e) {
			console.log("exception::", e);
		}
	};

	return (
		<>
			<Toast />
			<Spinner show={showSpinner} />
			<div className="bk-form-section shadow-md w-full border-[1px] flex flex-col mb-2">
				<div className="bk-form-header px-6 pt-6 mb-5 font-sans">
					<div className="header font-bold mb-1">
						Connect your bank account to fund lorem ipsum
					</div>
					<div className="header-desc text-gray-600">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit sed
					</div>
				</div>
				<Formik
					initialValues={initialValues}
					validate={validate}
					onSubmit={(values: BankAccountData, actions: any) => {
						onSubmit(values);
						actions.setSubmitting(false);
					}}
				>
					{(formik: FormikProps<BankAccountData>) => {
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
								<div className="input-section-label text-gray-400 mb-3 px-6">
									Bank info
								</div>
								<div className="bank-info flex flex-row justify-between mb-2 px-6">
									<div className="relative w-64">
										<label
											className="block text-gray-500 bk-form-label"
											htmlFor="routingNumber"
										>
											Routing Number
										</label>
										<input
											className={`bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full border rounded-sm py-2 px-3 shadow-md focus:outline-none focus:ring-1 ${getInputStyle(
												"routingNumber"
											)}`}
											placeholder="Enter Routing Number"
											type="text"
											name="routingNumber"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.routingNumber}
											maxLength={9}
										/>
										<BankAccountErrorMessage
											name="routingNumber"
											formik={formik}
										/>
									</div>
									<div className="relative w-64">
										<label
											className="block text-gray-500 bk-form-label"
											htmlFor="accountNumber"
										>
											Account Number
										</label>
										<input
											className={`bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full border rounded-sm py-2 px-3 shadow-md focus:outline-none focus:ring-1 ${getInputStyle(
												"accountNumber"
											)}`}
											placeholder="Enter Account Number"
											type="text"
											name="accountNumber"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.accountNumber}
											maxLength={17}
										/>
										<BankAccountErrorMessage
											name="accountNumber"
											formik={formik}
										/>
									</div>
									<div className="relative w-64">
										<label
											className="block text-gray-500 bk-form-label"
											htmlFor="accountHolderName"
										>
											Account Holder Name
										</label>
										<input
											className={`bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full border rounded-sm py-2 px-3 shadow-md focus:outline-none focus:ring-1 ${getInputStyle(
												"accountHolderName"
											)}`}
											placeholder="Enter Account Holder Name"
											type="text"
											name="accountHolderName"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.accountHolderName}
											maxLength={50}
										/>
										<BankAccountErrorMessage
											name="accountHolderName"
											formik={formik}
										/>
									</div>
								</div>
								<div className="bank-info flex flex-row justify-between mb-2 px-6">
									<div className="relative w-64">
										<label
											className="block text-gray-500 bk-form-label"
											htmlFor="accountNickName"
										>
											Account Nick Name
										</label>
										<input
											className={`bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full border rounded-sm py-2 px-3 shadow-md focus:outline-none focus:ring-1 ${getInputStyle(
												"accountNickName"
											)}`}
											placeholder="Enter Account Nick Name"
											type="text"
											name="accountNickName"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.accountNickName}
											maxLength={50}
										/>
									</div>
									<div className="relative w-64">
										<label
											className="block text-gray-500 bk-form-label"
											htmlFor="bankName"
										>
											Bank Name
										</label>
										<input
											className="bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full border rounded-sm py-2 px-3 shadow-md focus:outline-none focus:ring-1"
											placeholder="Enter Bank Name"
											type="text"
											name="bankName"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.bankName}
											maxLength={50}
										/>
									</div>
									<div className="w-64"></div>
								</div>
								<div className="input-section-label text-gray-400 mt-5 mb-3 px-6">
									Bank address
								</div>
								<div className="bank-info flex flex-row mb-2 px-6">
									<div className="relative w-full">
										<label
											className="block text-gray-500 bk-form-label"
											htmlFor="addressLine1"
										>
											Address Line 1
										</label>
										<input
											className="selection:bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full border rounded-sm py-2 px-3 shadow-md focus:outline-none focus:ring-1"
											placeholder="Enter your address line 1 here"
											type="text"
											name="addressLine1"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.addressLine1}
											maxLength={50}
										/>
									</div>
								</div>
								<div className="bank-info flex flex-row mb-2 px-6">
									<div className="relative w-full">
										<label
											className="block text-gray-500 bk-form-label"
											htmlFor="addressLine2"
										>
											Address Line 2
										</label>
										<input
											className="bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full border rounded-sm py-2 px-3 shadow-md focus:outline-none focus:ring-1"
											placeholder="Enter your address line 2 here"
											type="text"
											name="addressLine2"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.addressLine2}
											maxLength={50}
										/>
									</div>
								</div>
								<div className="bank-info flex flex-row justify-between mb-2 px-6">
									<div className="relative w-64">
										<label
											className="block text-gray-500 bk-form-label"
											htmlFor="city"
										>
											City
										</label>
										<input
											className="bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full border rounded-sm py-2 pr-3 pl-9 shadow-md focus:outline-none focus:ring-1"
											placeholder="Enter City"
											type="text"
											name="city"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.city}
											maxLength={50}
										/>
									</div>
									<div className="relative w-64">
										<label
											className="block text-gray-500 bk-form-label"
											htmlFor="state"
										>
											State
										</label>
										<select
											className="bk-form-input block bg-white w-full border rounded-sm py-2 pr-3 pl-9 shadow-md focus:outline-none focus:ring-1"
											name="state"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.state}
										>
											<option value="">Enter or choose</option>
											{states.map((state) => (
												<option
													value={state.abbreviation}
													key={state.abbreviation}
												>
													{state.name}
												</option>
											))}
										</select>
									</div>
									<div className="relative w-64">
										<label
											className="block text-gray-500 bk-form-label"
											htmlFor="zipCode"
										>
											Zip Code
										</label>
										<input
											className="bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full border rounded-sm py-2 px-3 shadow-md focus:outline-none focus:ring-1"
											placeholder="Enter Zip Code here"
											type="text"
											name="zipCode"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.zipCode}
											maxLength={5}
										/>
									</div>
								</div>
								<div className="btn-bottom-section border-t-[1px] border-gray-200 py-4  flex justify-between items-center mt-10 pr-6">
									<div className="text-sm font-bold ml-4 h-auto w-full mr-9">
										{message && <p>{message}</p>}
									</div>
									<button
										type="submit"
										className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded w-32 disabled:bg-gray-200"
									>
										Next
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
export default ConnectBankAccountTab;
