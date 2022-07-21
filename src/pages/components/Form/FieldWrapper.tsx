import clsx from "clsx";
import { FieldError } from "react-hook-form";

interface FieldWrapperProps {
	classNameWrapper?: string;
	label?: string;
	children: React.ReactNode;
	error?: FieldError;
}

export type FieldWrapperPassedProps = Omit<FieldWrapperProps, "children">;

export const FieldWrapper = ({
	classNameWrapper,
	label,
	children,
	error,
}: FieldWrapperProps) => {
	return (
		<div className={clsx("flex flex-col gap-1", classNameWrapper)}>
			<label className="block text-dark text-xs">{label}</label>
			{children}
			{error ? (
				<p className="text-xs text-red-600">{error.message}</p>
			) : null}
		</div>
	);
};
