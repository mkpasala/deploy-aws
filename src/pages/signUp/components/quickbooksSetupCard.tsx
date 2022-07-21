import { useNavigate } from "react-router-dom";
import qbLogo from "../../../assets/QuickBooks_Logo_Color.png";
import SignUpHeader from "./signUpHeader";

const generateTable = (
	col1Name: string,
	col2Name: string,
	fields: string[]
) => {
	return (
		<table className="w-3/5 mx-auto border-collapse">
			<tbody>
				<tr className="text-dark bg-dark/5 text-left text-xs">
					<th className="border border-dark/5 py-1 px-4 font-normal">
						{col1Name}
					</th>
					<th className="border border-dark/5 py-1 px-4 font-normal">
						{col2Name}
					</th>
				</tr>
				{fields.map((field, idx) => {
					return (
						<tr
							key={idx}
							className="text-dark text-left text-sm leading-6"
						>
							<th className="border border-dark/5 py-3 px-4 font-normal">
								{field}
							</th>
							<td className="border border-dark/5 py-3 px-4">
								<select
									className="border-none w-full text-dark/30"
									defaultValue="none"
								>
									<option value="none" disabled hidden>
										Choose
									</option>
								</select>
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export function QuickbooksSetupCard() {
	const navigate = useNavigate();
	return (
		<div className="w-3/4 mx-auto">
			<SignUpHeader />
			<div className="flex flex-col w-full pt-14 bg-white rounded-md shadow">
				<div className="text-dark w-full text-xs mx-auto">
					<div className="flex mx-auto justify-center items-center gap-2">
						<img
							id="qb-logo"
							style={{ width: "32px", height: "32px" }}
							src={qbLogo}
							alt="qb-logo"
						/>
						<h1 className="text-[32px] font-bold">
							Map Fields from QuickBooks
						</h1>
					</div>
					<p className="text-dark/70 w-96 mx-auto text-center mt-2 mb-7">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Necessitatibus, quas?
					</p>
					{generateTable("FlareFS", "QuickBooks", [
						"Accounts",
						"Programs",
						"Users",
					])}
				</div>
				<hr className="border border-dark/5 mt-11" />
				<div className="flex justify-between items-center p-5">
					<a
						className="text-dark/70 text-base cursor-pointer"
						onClick={() => navigate("/signup/api-auth-connect")}
					>
						Back
					</a>
					<button
						className="text-white text-base bg-dark/50 px-10 py-2 rounded"
						onClick={() => alert("End of Sign Up Flow")}
					>
						Finish
					</button>
				</div>
			</div>
		</div>
	);
}

export default QuickbooksSetupCard;
