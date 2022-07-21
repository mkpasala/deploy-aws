import clsx from "clsx";
import React from "react";
import { FieldWrapper, FieldWrapperPassedProps } from "./FieldWrapper";

export interface SelectFieldProps extends FieldWrapperPassedProps {
	className?: string;
	children?: React.ReactNode;
	icon?: React.ReactNode;
	alignIcon?: "left" | "right";
	placeholder?: string;
}

export const SelectField = React.forwardRef<
	HTMLSelectElement,
	SelectFieldProps
>(
	(
		{
			label,
			children,
			className,
			classNameWrapper,
			placeholder,
			icon,
			alignIcon = "left",
			error,
		},
		ref
	) => {
		return (
			<FieldWrapper
				label={label}
				classNameWrapper={classNameWrapper}
				error={error}
			>
				<div>
					{icon && (
						<span
							className={clsx(
								`absolute w-4 h-4 top-1/3 text-gray-500 group-focus-within:text-black`,
								alignIcon === "left" ? "left-3" : "right-3"
							)}
						>
							{icon}
						</span>
					)}
					<select
						ref={ref}
						className={clsx(
							"px-4 py-3 rounded shadow w-full placeholder-dark/30 placeholder:text-sm outline-none",
							icon && alignIcon === "left" ? "pl-10" : "pr-10",
							error && "outline outline-red-400 shadow-none",
							className
						)}
						defaultValue="none"
					>
						<option value="none" disabled hidden>
							{placeholder}
						</option>
						{children}
					</select>
				</div>
			</FieldWrapper>
		);
	}
);
