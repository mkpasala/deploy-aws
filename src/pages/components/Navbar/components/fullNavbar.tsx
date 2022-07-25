import {
	CreditCardIcon,
	DocumentTextIcon,
	HomeIcon,
	UsersIcon,
} from "@heroicons/react/outline";
import FlareLogo from "../../../../assets/Flare_Logo_Color.svg";
import { UserAccountSetting } from "./userAccountSetting";

const links: {
	img: React.ReactNode;
	label: string;
	handleClick: () => void;
}[] = [
	{
		img: <HomeIcon />,
		label: "Home",
		handleClick: () => {},
	},
	{
		img: <DocumentTextIcon />,
		label: "Programs",
		handleClick: () => {},
	},
	{
		img: <UsersIcon />,
		label: "Users",
		handleClick: () => {},
	},
	{
		img: <CreditCardIcon />,
		label: "Cards",
		handleClick: () => {},
	},
];

export const FullNavBar = () => {
	return (
		<>
			<nav className="sticky z-10 top-0 flex items-center justify-between w-full px-28 h-14 bg-white shadow select-none">
				<img src={FlareLogo} />
				<div className="flex gap-16 h-full">
					{links.map((link, idx) => {
						const { img, label, handleClick } = link;
						return (
							<button
								key={idx}
								className="group flex gap-3 text-dark/50 items-center cursor-pointer
									     hover:text-dark hover:border-b-2 hover:border-flare-red hover:font-bold"
								onClick={handleClick}
							>
								<span className="w-4">{img}</span>
								<p className="">{label}</p>
							</button>
						);
					})}
				</div>
				<UserAccountSetting />
			</nav>
		</>
	);
};
