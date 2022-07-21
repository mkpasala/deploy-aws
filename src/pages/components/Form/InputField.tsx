import clsx from "clsx";
import React from "react";
import { FieldWrapper, FieldWrapperPassedProps } from "./FieldWrapper";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputFieldProps extends FieldWrapperPassedProps {
	type?: string;
	placeholder?: string;
	className?: string;
	registration?: UseFormRegisterReturn<any>;
	icon?: React.ReactNode;
	alignIcon?: "left" | "right";
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
	(
		{
			label,
			className,
			classNameWrapper,
			icon,
			alignIcon = "left",
			registration,
			error,
			...rest
		},
		ref
	) => {
		return (
			<FieldWrapper
				label={label}
				classNameWrapper={classNameWrapper}
				error={error}
			>
				<div className="relative group">
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
					<input
						ref={ref}
						className={clsx(
							"px-4 py-3 rounded shadow w-full placeholder-dark/30 placeholder:text-sm outline-none appearance-none",
							icon && alignIcon === "left" ? "pl-10" : "pr-10",
							error && "outline outline-red-400 shadow-none",
							className
						)}
						{...registration}
						{...rest}
					/>
				</div>
			</FieldWrapper>
		);
	}
);
