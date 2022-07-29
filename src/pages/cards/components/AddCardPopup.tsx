//import CARDS_LANDING_LOGO from "../../../assets/card-landing-page-logo.png";
import { useState, useEffect } from "react";
import CARD_BACKGROUND_LOGO from "../../../assets/card-background.png";
import CARD_LOGO from "../../../assets/card-logo.png";
import Spinner from "./Spinner";
import { Form, Formik, FormikErrors, FormikProps } from "formik";
import { useNavigate } from "react-router-dom";
import cardsAPIService from "../../../services/cardsAPIService";

interface AddCardsData {
	type: string;
	cardnickname: string;
	spending_limits: string;
	frequency: string;
	name: string;
	line1: string;
	line2: string;
	city: string;
	country: string;
	postalcode: string;
	state: string;
}
interface AddCardsErrorMessageProps {
	name: string;
	formik: FormikProps<AddCardsData>;
}

const AddCardPopup = ({ setModalOn }: any) => {
	const handleCancelClick = () => {
		setModalOn(false);
	};
	const cardsService = new cardsAPIService();
	const [showSpinner, setShowSpinner] = useState(false);
	const [message, setMessage] = useState("");
	const [cardID, setCardID] = useState("");
	let navigate = useNavigate();

	sessionStorage.setItem("userId", "7ef23af6-a3ef-48b0-a49c-8b1769bd0169");
	const userId = sessionStorage.getItem("userId");
	sessionStorage.setItem("orgId", "68167b70-8427-4c91-8ad1-6b8d0dfd861f");
	const orgId = sessionStorage.getItem("orgId");

	const initialValues: AddCardsData = {
		type: "virtual",
		cardnickname: "",
		spending_limits: "",
		frequency: "alltime",
		name: "",
		line1: "",
		line2: "",
		city: "",
		country: "",
		postalcode: "",
		state: "",
	};
	interface AddCardsErrorMessageProps {
		name: string;
		formik: FormikProps<AddCardsData>;
	}

	const AddCardsErrorMessage = ({ name, formik }: AddCardsErrorMessageProps) => {
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

	const validate = (values: AddCardsData) => {
		let errors: FormikErrors<AddCardsData> = {};
		if (values.type === "physical") {
			if (!values.name) {
				errors.name = "Name is required";
			}
			if (!values.line1) {
				errors.line1 = "Address Line1 is required";
			}
			if (!values.city) {
				errors.city = "City is required";
			}
			if (!values.country) {
				errors.country = "Country is required";
			}
			if (!values.postalcode) {
				errors.postalcode = "Postal Code is required";
			} else {
				let reg = new RegExp("^[0-9]*$");
				if (!reg.test(values.postalcode)) {
					errors.postalcode = "Postal Code required integer value";
				}
			}
			if (values.postalcode.length != 5) {
				errors.postalcode = "Postal Code should be of 5 digits";
			}
		}
		if (values.type === 'virtual') {
			if (!values.spending_limits) {
				errors.spending_limits = "Spending Limit Amount is required";
			}
		}
		return errors;
	};

	const onSubmit = (values: AddCardsData) => {
		createCard(values);
	};

	const styleInputNormal = "border border-slate-200 focus:border-sky-500 focus:ring-sky-500";
	const styleInputValid = "border border-green-500 focus:border-green-500 focus:ring-green-500";
	const styleInputInvalid = "border border-red-500 focus:border-red-500 focus:ring-red-500";

	const account_id = sessionStorage.getItem("account_id");

	useEffect(() => {
		const cardholder_id = sessionStorage.getItem("cardholder_id");
		if (!cardholder_id) {
			createCardholder();
		}
	}, []);

	const createCardholder = async () => {
		try {
			let response: any = await cardsService.createCardholder({ account_id: account_id });
			setShowSpinner(false);
			if (
				response.type === "StripePermissionError" ||
				response.type === "StripeInvalidRequestError"
			) {
			} else {
				sessionStorage.setItem("cardholder_id", response.id);	
			}
		} catch (ex) {
			setShowSpinner(false);
		}
	};
	// const createCardholder = async (values: any) => {
	// 	try {
	// 		let response: any = await cardsService.createCardholder(values)
	// 		// const response = await fetch("http://localhost:4242/create-cardholder", {
	// 		// 	method: "POST",
	// 		// 	headers: { "Content-Type": "application/json" },
	// 		// 	body: JSON.stringify({
	// 		// 		name: "neti",
	// 		// 		email: "jenny.rosen@example.com",
	// 		// 		phone_number: "+18008675309",
	// 		// 		status: "active",
	// 		// 		type: "individual",
	// 		// 		billing: {
	// 		// 			address: {
	// 		// 				line1: "123 Main Street",
	// 		// 				city: "San Francisco",
	// 		// 				state: "CA",
	// 		// 				postal_code: "94111",
	// 		// 				country: "US",
	// 		// 			},
	// 		// 		},
	// 		// 	}),
	// 		// });
	// 		if (!response.ok) {
	// 			return null;
	// 		}
	// 		const data = await response.json();
	// 		return data;
	// 	} catch (ex) {
	// 		//console.log("exception", ex);
	// 		setShowSpinner(false);
	// 	}
	// };

	const createCard = async (values: AddCardsData) => {
		let reqdata: any;
		setShowSpinner(true);
		setMessage("");
		const cardholder_id = sessionStorage.getItem("cardholder_id");
		if (values.type === "virtual") {
			reqdata = {
				cardholder: cardholder_id,
				currency: "usd",
				type: values.type,
			};
		} else {
			reqdata = {
				cardholder: cardholder_id,
				currency: "usd",
				type: values.type,
				shipping: {
					name: values.name,
					address: {
						line1: values.line1,
						line2: values.line2,
						city: values.city,
						state: values.state,
						postal_code: values.postalcode,
						country: values.country,
					},
				},
			};
		}
		try {
			let response: any = await cardsService.createCard(reqdata)
			setShowSpinner(false);
			if (response.type === "StripePermissionError" ||
				response.type === "StripeInvalidRequestError")
			{
				setMessage(response.raw.message);
			} else {
				setCardID(response.id);
				createCardNew(userId, orgId, response.id, values);
				//navigate("/list-all-cards");
			}
			//const data = await response.json();
		} catch (ex) {
			setShowSpinner(false);
		}
	};

	const createCardNew = async (userId: any, orgId: any, cardID: any, values: AddCardsData) => {
		let reqdata: any;
		reqdata = {
			name: values.cardnickname,
			userId: userId,
			stripeCardId: cardID,
		};
		const response = await fetch(`https://h3tqg8ihpg.execute-api.us-east-1.amazonaws.com/staging/organizations/${orgId}/cards`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(reqdata),
			});
		if (!response.ok) {
			return null;
		}
		setModalOn(false);
		setShowSpinner(true);
		alert("Card Created Successfully");
		//window.location.reload(false)
		const data = await response.json();
		//getNewCardData(data);
		return data;
	};
	
	return (
		<>
			<Spinner show={showSpinner} />
			<Formik
				initialValues={initialValues}
				validate={validate}
				onSubmit={(values, actions) => {
					onSubmit(values);
					actions.setSubmitting(false);
					//setModalOn(false);
					//alert("Card Created Successfully");
				}}
			>
				{(formik) => {
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
							<div className=" bg-gray-400 fixed inset-0 bg-opacity-50 ">
								<div className="flex justify-center overflow-x-hidden overflow-y-auto px-6 py-6 lg:px-6">
									<div className="flex bg-white w-[800px] h-[550px] border-gray-300 rounded-md overflow-y-auto ">
										<div className="relative w-full h-full max-w-auto p-4 md:h-auto overflow-y-auto">
											<div className="flex justify-between items-center text-lg text-gray-900 dark:text-white font-bold">
												<h3>Add New Card</h3>
												<div onClick={handleCancelClick}>
													<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M16 1.4L14.6 0L8 6.6L1.4 0L0 1.4L6.6 8L0 14.6L1.4 16L8 9.4L14.6 16L16 14.6L9.4 8L16 1.4Z" fill="#060F14" fill-opacity="0.8" />
													</svg>
												</div>
												{/* <button onClick={handleCancelClick}>X</button> */}
											</div>
											<div
												className="h-[143px] w-[255px] mx-auto my-auto "
												style={{
													backgroundImage: `url(${CARD_BACKGROUND_LOGO})`,
												}}
											>
												<div className="flex justify-between items-center">
													<span className="mt-5 ml-5 flex">
														<span className="text-white text-xs font-bold z-30">
															Flare
														</span>
														<img
															src={CARD_LOGO}
															className="h-3 -ml-8 mt-1"
														/>
													</span>
													<span className="text-white mt-5 mr-5 text-xs font-bold">
														Card Name
													</span>
												</div>
												<div className="text-white text-xs mr-12 ml-[200px] font-bold">
													$0/$0
												</div>
												<div className="text-white ml-5 mt-7 text-sm font-bold">
													0000 0000 0000 0000
												</div>
												<div className=" flex justify-between items-center">
													<div className="text-white ml-5 text-xs">
														XX/XX
													</div>
												</div>
											</div>

											<div className="justify-between mt-4">
												<label
													htmlFor="cardtype"
													className=" mb-2 text-xs text-gray-900 dark:text-gray-300"
												>
													Card Type
												</label>
												<div className="flex justify-between">
													<div className="flex items-center mr-[80px]">
														<input
															id="physical"
															type="radio"
															value="physical"
															name="type"
															className="w-3 h-3 text-black-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
															
															onChange={handleChange}
															onBlur={handleBlur}
														/>
														<label
															htmlFor="physicalcard"
															className="ml-2 text-xs text-gray-900 dark:text-gray-300"
														>
															Physical Card
														</label>
													</div>
													<div className="flex items-center mr-[400px]">
														<input
															id="virtual"
															type="radio"
															value="virtual"
															name="type"
															className="w-3 h-3 text-black-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
						
															onChange={handleChange}
															onBlur={handleBlur}
															defaultChecked
														/>
														<label
															htmlFor="virtualcard"
															className="ml-2 text-xs text-gray-900 dark:text-gray-300"
														>
															Virtual Card
														</label>
													</div>
												</div>
											</div>
											{values.type === "virtual" ? (
												<div>
													<div className="justify-between mt-4 relative">
														<label
															htmlFor="cardnickname"
															className="mb-2 mt-4 text-xs bold text-gray-900 dark:text-gray-300 "
														>
															Card Nickname
														</label>

														<input
															type="cardnickname"
															name="cardnickname"
															id="cardnickname"
															placeholder="Enter Card Nickname"
															className="bk-form-input dp-input-placeholder placeholder:text-slate-400 block bg-white w-full border border-slate-200 rounded-sm py-2 pr-3 pl-9 shadow-md focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
														
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.cardnickname}
														/>
													</div>
													<div className="justify-between mt-4 relative">
														<label
															htmlFor="spendinglimit"
															className="mb-2 mt-4 text-xs bold text-gray-900 dark:text-gray-300 space-y-2"
														>
															Spending Limit
														</label>
														<span className="absolute top-8 left-5">
															&#36;
														</span>
														<input
															type="spendinglimit"
															name="spending_limits"
															id="spendinglimit"
															placeholder="250"
															className={`marker:bk-form-input dp-input-placeholder placeholder:text-slate-400 block bg-white w-full rounded-sm py-2 pr-3 pl-9 shadow-md focus:outline-none focus:ring-1 ${getInputStyle(
																"spending_limits"
															)}`}
															onChange={handleChange}
															onBlur={handleBlur}
															value={values.spending_limits}
														/>
														<AddCardsErrorMessage
															name="spending_limits"
															formik={formik}
														/>
													</div>
													<div className="justify-between mt-4">
														<label
															htmlFor="frequency"
															className="mb-2 mt-4 text-xs bold text-gray-900 dark:text-gray-300 space-y-2"
														>
															Frequency
														</label>
														<div
															className="flex"
															
														>
															<div className="flex items-center mr-4">
																<input
																	id="perday"
																	type="radio"
																	value="daily"
																	name="frequency"
																	className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
																	onChange={handleChange}
																	onBlur={handleBlur}
																	//defaultChecked
																/>
																<label
																	htmlFor="perday"
																	className="ml-2 text-xs text-gray-900 dark:text-gray-300"
																>
																	Per Day
																</label>
															</div>
															<div className="flex  items-center ml-[40px]">
																<input
																	id="weekly"
																	type="radio"
																	value="weekly"
																	name="frequency"
																	className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
																	onChange={handleChange}
																	onBlur={handleBlur}
																/>
																<label
																	htmlFor="perweek"
																	className="ml-2 text-xs text-gray-900 dark:text-gray-300"
																>
																	Per Week
																</label>
															</div>
															<div className="flex items-center ml-[60px]">
																<input
																	id="monthly"
																	type="radio"
																	value="monthly"
																	name="frequency"
																	className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
																	onChange={handleChange}
																	onBlur={handleBlur}
																/>
																<label
																	htmlFor="monthly"
																	className="ml-2 text-xs text-gray-900 dark:text-gray-300"
																>
																	Month
																</label>
															</div>
															<div className="flex items-center ml-[60px]">
																<input
																	id="yearly"
																	type="radio"
																	value="yearly"
																	name="frequency"
																	className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300  dark:bg-gray-700 dark:border-gray-600"
																	onChange={handleChange}
																	onBlur={handleBlur}
																/>
																<label
																	htmlFor="yearly"
																	className="ml-2 text-xs text-gray-900 dark:text-gray-300"
																>
																	Year
																</label>
															</div>
															<div className="flex items-center ml-[60px]">
																<input
																	id="alltime"
																	type="radio"
																	value="alltime"
																	name="frequency"
																	className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
																	onChange={handleChange}
																	onBlur={handleBlur}
																	defaultChecked
																/>
																<label
																	htmlFor="alltime"
																	className="ml-2 text-xs text-gray-900 dark:text-gray-300"
																>
																	All Time
																</label>
															</div>
														</div>
													</div>
													<div
														className="justify-between mt-4"
													>
														<div className="mb-3 xl:w-full">
															<label
																htmlFor="expensetype"
																className="mb-2 mt-4 text-xs text-gray-900 dark:text-gray-300 space-y-2"
															>
																Expense Type
															</label>
															<select
																id="expensetype"
																name="expensetype"
																placeholder="Software Subscription"
																className="bk-form-input dp-input-placeholder placeholder:text-slate-400 block bg-white w-full border border-slate-200 rounded-sm py-2 pr-3 pl-9 shadow-md focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1"
															>
																<option defaultValue="">
																	Software Subscription
																</option>
															</select>
														</div>
													</div>
												</div>
											) : null}
											{values.type === "physical" ? (
												<div>
													<div className="bank-info flex flex-row justify-between mt-4">
														<div className="relative w-full">
															<label
																htmlFor="name"
																className="mb-2 mt-2 text-xs bold text-gray-900 dark:text-gray-300 "
															>
																Name
															</label>
															<input
																type="name"
																name="name"
																id="name"
																placeholder="Enter Name"
																className={`bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full rounded-sm py-2 px-3 shadow-md focus:outline-none focus:ring-1 ${getInputStyle(
																	"name"
																)}`}
																onChange={handleChange}
																onBlur={handleBlur}
																value={values.name}
															/>
															<AddCardsErrorMessage
																name="name"
																formik={formik}
															/>
														</div>
													</div>

													<div className="bank-info flex flex-row justify-between mt-4">
														<div className="relative w-full">
															<label
																htmlFor="line1"
																className="mb-2 mt-2 text-xs bold text-gray-900 dark:text-gray-300 "
															>
																Address Line 1
															</label>
															<input
																type="line1"
																name="line1"
																id="line1"
																placeholder="Enter Address Line1"
																className={`bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full  rounded-sm py-2 px-3 shadow-md focus:outline-none focus:ring-1 ${getInputStyle(
																	"line1"
																)}`}
																onChange={handleChange}
																onBlur={handleBlur}
																value={values.line1}
															/>
															<AddCardsErrorMessage
																name="line1"
																formik={formik}
															/>
														</div>
													</div>
													<div className="bank-info flex flex-row justify-between mt-4">
														<div className="relative w-full">
															<label
																htmlFor="line2"
																className="mb-2 mt-2 text-xs bold text-gray-900 dark:text-gray-300 "
															>
																Address Line 2
															</label>
															<input
																type="line2"
																name="line2"
																id="line2"
																placeholder="Enter Address Line 2"
																className="bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full border border-slate-200 rounded-sm py-2 px-3 shadow-md focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
																onChange={handleChange}
																onBlur={handleBlur}
																value={values.line2}
															/>
														</div>
													</div>
													<div className="bank-info flex flex-row justify-between mt-4">
														<div className="relative w-1/2">
															<label
																className="text-xs bold text-gray-900 dark:text-gray-300"
																htmlFor="city"
															>
																City
															</label>
															<input
																className={`bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full  rounded-sm py-2 pr-3 pl-9 mr-0 shadow-md focus:outline-none focus:ring-1 ${getInputStyle(
																	"city"
																)}`}
																type="text"
																name="city"
																placeholder="Enter City"
																onChange={handleChange}
																onBlur={handleBlur}
																value={values.city}
															/>
															<AddCardsErrorMessage
																name="city"
																formik={formik}
															/>
														</div>
														<div className="relative w-1/2 ml-6">
															<label
																className="text-xs bold text-gray-900 dark:text-gray-300"
																htmlFor="country"
															>
																Country
															</label>
															<input
																className={`bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full  rounded-sm py-2 pr-3 pl-9 shadow-md focus:outline-none focus:ring-1 ${getInputStyle(
																	"country"
																)}`}
																type="text"
																name="country"
																placeholder="Enter Country"
																onChange={handleChange}
																onBlur={handleBlur}
																value={values.country}
															/>
															<AddCardsErrorMessage
																name="country"
																formik={formik}
															/>
														</div>
													</div>
													<div className="bank-info flex flex-row justify-between mt-4">
														<div className="relative w-1/2">
															<label
																className="text-xs bold text-gray-900 dark:text-gray-300"
																htmlFor="postalcode"
															>
																Postal Code
															</label>
															<input
																className={`bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full rounded-sm py-2 px-3 pl-9 shadow-md focus:outline-none focus:ring-1 ${getInputStyle(
																	"postalcode"
																)}`}
																type="text"
																name="postalcode"
																placeholder="Enter Postal Code"
																onChange={handleChange}
																onBlur={handleBlur}
																value={values.postalcode}
															/>
															<AddCardsErrorMessage
																name="postalcode"
																formik={formik}
															/>
														</div>
														<div className="relative w-1/2 ml-6">
															<label
																className="text-xs bold text-gray-900 dark:text-gray-300"
																htmlFor="state"
															>
																State
															</label>
															<input
																className="bk-form-input bk-input-placeholder placeholder:text-slate-400 block bg-white w-full border border-slate-200 rounded-sm py-2 pl-9 shadow-md focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1"
																type="text"
																name="state"
																placeholder="Enter State"
																onChange={handleChange}
																onBlur={handleBlur}
																value={values.state}
															/>
														</div>
													</div>
												</div>
											) : null}
											<div className="flex justify-end space-x-4 mb-0 mt-6">
												<button
													type="reset"
													onClick={handleCancelClick}
													className="bg-white hover:bg-gray-200 font-semi-bold py-2 px-2 rounded w-32"
												>
													Cancel
												</button>
												<button
													type="submit"
													//className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
													className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded w-32"
												>
													Add
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</Form>
					);
				}}
			</Formik>
		</>
	);
};

export default AddCardPopup;
