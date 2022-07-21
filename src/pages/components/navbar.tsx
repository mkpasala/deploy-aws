import FlareLogo from "../../assets/Flare_Logo_Color.svg";

interface NavBarProps {
	userStatus?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ userStatus = false }) => {
	return (
		<nav className="sticky z-10 top-0 flex items-center justify-between w-full py-2 px-28 bg-white shadow">
			<img src={FlareLogo} />
			{userStatus ? null : (
				<p className="text-base">
					Already have an account?{" "}
					<span className="text-base text-flare-red hover:underline hover:cursor-pointer">
						Login here
					</span>
				</p>
			)}
		</nav>
	);
};

export default NavBar;
