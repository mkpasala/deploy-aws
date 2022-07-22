import clsx from "clsx";

export interface DescriptionSectionProps {
	title: string;
	body: React.ReactNode | string;
}

const DescriptionSection = ({ title, body }: DescriptionSectionProps) => {
	return (
		<div className="border-b border-dark/5 p-5">
			<p className="text-dark/50 text-sm mb-2">{title}</p>
			<div className="text-sm text-dark">{body}</div>
		</div>
	);
};

interface ReportingUnitDescriptionProps {
	sections: DescriptionSectionProps[];
	styles?: { container?: string };
}

export const ReportingUnitDescription = ({
	sections,
	styles,
}: ReportingUnitDescriptionProps) => {
	return (
		<div
			className={clsx(
				"flex flex-col bg-white rounded w-full h-fit shadow",
				styles?.container
			)}
		>
			{sections.map((props, idx) => (
				<DescriptionSection key={idx} {...props} />
			))}
		</div>
	);
};
