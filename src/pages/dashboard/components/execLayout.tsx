import { FullNavBar } from "../../components/Navbar/components/fullNavbar";

interface LayoutProps {
	children: React.ReactNode;
}

export const ExecutiveLayout = ({ children }: LayoutProps) => {
	return (
		<>
			<FullNavBar />
			<div className="flex flex-col gap-5 w-3/4 mx-auto my-8 bg-white">
				{children}
			</div>
		</>
	);
};
