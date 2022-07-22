import FlareLogo from "../../../../assets/Flare_Logo_Color.svg";
import { UserAccountSetting } from "./userAccountSetting";

export const NavBar = () => {
	return (
		<>
			<nav className="sticky z-10 top-0 flex items-center justify-between w-full py-2 px-28 bg-white shadow">
				<img src={FlareLogo} />
				<UserAccountSetting />
			</nav>
		</>
	);
};
