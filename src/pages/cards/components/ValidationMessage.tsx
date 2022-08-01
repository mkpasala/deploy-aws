import { FormikProps } from "formik";

interface ErrorMessageProps {
	name: string;
	formik: FormikProps<any>;
}

const ValidationMessage = ({ name, formik }: ErrorMessageProps) => {
	const { touched, errors, values } = formik;
	const isTouched = (touched as any)[name];
	const error = (errors as any)[name];

	return (
		<>
			{isTouched && error && (
				<p className="mt-2 text-sm text-red-600 dark:text-red-500">{error}</p>
			)}
			{isTouched && error && (
				<span className="absolute top-8 right-4">
					<svg
						width="21"
						height="22"
						viewBox="0 0 21 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M18.1 3.89998C14.2 -2.43187e-05 7.80001 -2.43187e-05 3.90001 3.89998C6.19888e-06 7.79998 6.19888e-06 14.2 3.90001 18.1C7.80001 22 14.1 22 18 18.1C21.9 14.2 22 7.79998 18.1 3.89998ZM13.8 15.2L11 12.4L8.20001 15.2L6.80001 13.8L9.60001 11L6.80001 8.19998L8.20001 6.79998L11 9.59998L13.8 6.79998L15.2 8.19998L12.4 11L15.2 13.8L13.8 15.2Z"
							fill="#F35858"
						/>
					</svg>
				</span>
			)}
			{isTouched && !error && (
				<span className="absolute top-8 right-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 100 100"
						width="25px"
						height="25px"
					>
						<circle cx="50" cy="50" r="44" fill="#f2f2f2" />
						<path
							fill="#f2f2f2"
							d="M50,91C27.393,91,9,72.607,9,50S27.393,9,50,9s41,18.393,41,41S72.607,91,50,91z"
						/>
						<circle cx="50.026" cy="50.026" r="38.026" fill="#64C093" />
						<g>
							<path
								fill="#ffffff"
								d="M42.017,65c-0.767,0-1.534-0.292-2.119-0.877l-10.017-10c-1.173-1.17-1.175-3.07-0.004-4.243 c1.17-1.173,3.07-1.175,4.242-0.003l7.896,7.882l23.881-23.88c1.172-1.172,3.07-1.172,4.242,0c1.172,1.171,1.172,3.071,0,4.242 l-26,26C43.552,64.707,42.784,65,42.017,65z"
							/>
						</g>
					</svg>
				</span>
			)}
		</>
	);
};
export default ValidationMessage;
