const Bank = ({ bank, handleChange, handleBlur }: any) => {
	return (
		<>
			{" "}
			<div className=" text-black-500 text-sm">
				<input
					type="radio"
					name="source_id"
					className="mr-2 accent-red-600"
					onChange={handleChange}
					onBlur={handleBlur}
					value={bank.id}
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
