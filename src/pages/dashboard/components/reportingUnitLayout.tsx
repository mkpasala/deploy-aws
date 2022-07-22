import { FullNavBar } from "../../components/Navbar/components/fullNavbar";
interface LayoutProps {
	children: React.ReactNode;
}

export const ReportingUnitLayout = ({ children }: LayoutProps) => {
	return (
		<>
			<FullNavBar />
			<div
				className="my-8 gap-5 px-[12.5%]"
				style={{ display: "grid", gridTemplateColumns: "75% 25%" }}
			>
				{children}
			</div>
		</>
	);
};
