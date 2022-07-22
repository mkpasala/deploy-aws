import { yupResolver } from "@hookform/resolvers/yup";
import {
	FieldValue,
	SubmitHandler,
	useForm,
	UseFormReturn,
} from "react-hook-form";
import { AnyObjectSchema } from "yup";

interface FormProps {
	id?: string;
	className?: string;
	schema?: AnyObjectSchema;
	children: (
		formReturn: UseFormReturn<FieldValue, object>
	) => React.ReactNode;
	onSubmit: SubmitHandler<FieldValue>;
}

export const Form = ({
	id,
	className,
	schema,
	children,
	onSubmit,
}: FormProps) => {
	const resolver = schema && yupResolver(schema);
	const formReturn = useForm({ resolver });
	return (
		<form
			id={id}
			className={className}
			onSubmit={formReturn.handleSubmit(onSubmit)}
			autoComplete="off"
		>
			{children(formReturn)}
		</form>
	);
};
