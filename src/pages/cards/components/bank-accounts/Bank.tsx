import { useEffect, useState } from "react";

const Bank = ({ bank, handleChange, handleBlur, values }: any) => {
	const [checked, setChecked] = useState(false);
	useEffect(() => {
		setChecked(bank.id === values.source_id);
		console.log(values);
	}, [values]);
	return (
		<>
			<div className=" text-black-500 text-sm">
				<input
					type="radio"
					name="source_id"
					className="mr-2 accent-red-600"
					onChange={handleChange}
					onBlur={handleBlur}
					value={bank.id}
					checked={checked}
				/>
				{`${bank.accountNickname} | ${bank.bankName}`}
			</div>
			<div className=" text-gray-600 text-sm ml-5">
				************
				{bank.lastFourDigits}
			</div>
		</>
	);
};

export default Bank;
