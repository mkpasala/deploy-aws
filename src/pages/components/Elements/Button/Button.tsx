import clsx from "clsx";
import React from "react";

const buttonStyles = {
	primary: `bg-flare-red disabled:bg-flare-red/50 text-white text-sm rounded py-2 px-12 leading-6 select-none`,
	secondary: `bg-dark/50 disabled:bg-dark/50 text-white text-sm rounded py-2 px-12 leading-6 select-none`,
	secondaryLink: `text-dark/70 text-base select-none`,
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	variant?: keyof typeof buttonStyles;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, variant = "primary", className, ...rest }, ref) => {
		return (
			<button
				ref={ref}
				className={clsx(buttonStyles[variant], className)}
				{...rest}
			>
				{children}
			</button>
		);
	}
);
