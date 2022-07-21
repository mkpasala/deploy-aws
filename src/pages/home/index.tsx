import { API } from "aws-amplify";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { create } from "../../data/organization";


export default function Home({ signOut, user }) {
	let [name, setName] = useState("");
	let [ein, setEin] = useState("");
	let [searchParams, setSearchParams] = useSearchParams();
	let [loadingQuickbooks, setLoadingQuickBooks] = useState(false);

	const submit = (): void => {
		try {
			create(name, ein);
		} catch (e) {
			console.log(e);
		}
	};

	const connectToQuickBooks = async () => {
		setLoadingQuickBooks(true);
		console.log(`Connecting to Quickbooks. Please hold...`);
		let response = await API.post("devflarerest", "/quickbooks", {});

		console.log(JSON.stringify(response, null, 4));

		if (response.statusCode) window.open(response.body.authUri);
	};

	return (

			<div>
				<h1>Welcome to Flare!</h1>
				<nav>
					<Link to="/">Home</Link> |<Link to="profile">Profile</Link> |
					<Link to="signup">Sign Up</Link> | <Link to="signup/user-form">User Sign Up</Link> |
					<Link to="cards">Cards</Link> 
					
					<>
						<h1>Hello {user.name}</h1>
						<button onClick={signOut}>Sign out</button>
					</>
				</nav>
				This is your user object: {JSON.stringify(user, null, 2)}
				console.log(`This is the attributes of user $
				{user["custom:organization_id"]}`)
				<h1>Create Organization</h1>
				<input
					type="text"
					placeholder="Organization Name"
					value={name}
					onChange={(event) => {
						setName(event.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="Organization Eid"
					value={ein}
					onChange={(event) => {
						setEin(event.target.value);
					}}
				/>
				<button onClick={submit}>Create</button>
				<hr />
				These are the url parameters
				{JSON.stringify(searchParams, null, 4)}
				<hr />
				<h1>Connect to QuickBooks</h1>
				<button onClick={connectToQuickBooks}>Connect to QuickBooks</button>
				You QuickBooks code is {searchParams.get("code")}
			</div>
	);
}
