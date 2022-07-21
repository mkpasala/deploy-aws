import { useContext, useState } from "react";
import { sessionContext } from "../../app";
import { Auth } from "aws-amplify";

export default function signInPage() {
	let user: any = useContext(sessionContext);

	console.log(
		`This is the user on the profile page ${JSON.stringify(user, null, 4)}`
	);
	let [firstName, setFirstName] = useState(user.firstName || "");
	let [lastName, setLastName] = useState(user.lastName || "");
	let [orgId, setOrgId] = useState(user.orgId|| "");

	const handleUpdate= () => {
		Auth.updateUserAttributes(user.congitoUser, {given_name: firstName, family_name: lastName, "custom:organization_id": orgId})
	}

	return (
		<>
			<label>
				First Name
				<input
					value={firstName}
					onChange={(event) => setFirstName(event.target.value)}
					type="text"
				/>
			</label>
			<br />
			<label>
				Last Name
				<input
					value={lastName}
					onChange={(event) => setLastName(event.target.value)}
					type="text"
				/>
			</label>
			<br />
			<label>
				Organization Id
				<input
					value={orgId}
					onChange={(event) => setOrgId(event.target.value)}
					type="text"
				/>
			</label>
			<br />
			<button onClick={handleUpdate}>Update</button>
		</>
	);
}
