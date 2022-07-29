import FlareLogo from "../../../assets/Flare_Logo_Color.svg";
import { useLocation, useNavigate } from "react-router-dom";

interface NavBarProps {
	userStatus?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ userStatus = false }) => {
	const location = useLocation();
	const pathname = location.pathname;
	console.log(pathname);
	const isCardTabSelected = (): boolean => {
		let result = false;
		const cardsScreenPaths = [
			"/cards",
			"/connect-bank-account",
			"/card-list",
			"/transactions",
			"/bank-account-list",
		];
		for (var value of cardsScreenPaths) {
			if (pathname.includes(value)) {
				result = true;
				break;
			}
		}
		return result;
	};
	return (
		<nav className="bg-white shadow-lg">
			<div className="max-w-7xl mx-auto px-[100px]">
				<div className="flex justify-between">
					<div className="flex">
						<div>
							<a href="#" className="flex items-center">
								<img src={FlareLogo} alt="Logo" className="" />
							</a>
						</div>
						<div className="flex ml-[200px]">
							<ul className="text-base text-gray-700 flex justify-between">
								<li className="flex items-center px-5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
										/>
									</svg>
									<a className="ml-1" href="#">
										Home
									</a>
								</li>
								<li className="flex items-center px-5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
										/>
									</svg>
									<a className="ml-1" href="#">
										Users
									</a>
								</li>
								<li className="flex items-center px-5">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
										/>
									</svg>
									<a className="ml-1" href="#">
										Programs
									</a>
								</li>
								<li
									className={`flex items-center px-5 py-[18px] ${
										isCardTabSelected() ? "border-b-2 border-red-500" : ""
									}`}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
										/>
									</svg>
									<a className="ml-1" href="/cards">
										Cards
									</a>
								</li>
								<li className="flex items-center px-14">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-4 w-4"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										stroke-width="2"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
										/>
									</svg>
									<a className="ml-1" href="#">
										Login
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
