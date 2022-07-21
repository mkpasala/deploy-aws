import React from "react";

const buttonStyles = {
	primary: `bg-flare-red text-white text-sm font-bold rounded-md py-2 px-12 leading-6`,
	secondary: `bg-dark/50 text-white text-sm font-bold rounded-md py-2 px-12 leading-6`,
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	variant?: keyof typeof buttonStyles;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, variant = "primary", ...rest }, ref) => {
		return (
			<button ref={ref} className={buttonStyles[variant]} {...rest}>
				{children}
			</button>
		);
	}
);
