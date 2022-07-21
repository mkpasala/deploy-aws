import { useEffect } from "react";
export default function OAuth() {
	useEffect(() => {
		// get the URL parameters which will include the auth token
		const url = window.location.href;

		if (window.opener) {
			// send them to the opening window
			window.opener.postMessage(url);
			// close the popup
			window.close();
		}
	}, []);
	// some text to show the user
	return (
		<p className="flex mx-auto justify-center items-center vh-screen">
			Please wait...
		</p>
	);
}
