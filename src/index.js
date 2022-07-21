import ReactDOM from "react-dom/client";
import App from "./app";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY, {
	stripeAccount: "acct_1LKdCqR1aSxGwRcl",
});
// const options = {
// 	clientSecret: process.env.CLIENT_SECRET,
// };
const root = ReactDOM.createRoot(document.getElementById("app")).render(
	// <Elements stripe={promise} options={options}>
	<Elements stripe={promise}>
		<App />
	</Elements>
);
