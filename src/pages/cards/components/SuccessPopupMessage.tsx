import CARDS_LANDING_LOGO from "../../../assets/card-landing-page-logo.png";

const SuccessPopupMessage = ({ isShow, onHide, title, header, message }: any) => {
	return (
		<>
			{isShow && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-30">
					<div className="flex justify-center overflow-x-hidden overflow-y-auto px-6 py-16">
						<div className="bg-white w-[817px] h-[425px] border-gray-300 rounded-lg shadow-lg">
							<div
								className={`flex justify-end items-center p-5 ${
									title ? "justify-between" : "justify-end"
								}`}
							>
								{title && (
									<p className="text-2xl text-gray-900 font-bold">{title}</p>
								)}
								<button
									onClick={(event) => {
										onHide();
										console.log("xxxxxxxxxxxxxxx");
									}}
									className="hover:bg-gray-200"
								>
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M16 1.4L14.6 0L8 6.6L1.4 0L0 1.4L6.6 8L0 14.6L1.4 16L8 9.4L14.6 16L16 14.6L9.4 8L16 1.4Z"
											fill="#060F14"
											//fill-opacity="0.8"
											className=" hover:fill-gray-400"
										/>
									</svg>
								</button>
							</div>
							<div className="relative w-full h-full max-w-auto p-5">
								<div className="flex flex-col text-center">
									<div className="card-start-img mb-11">
										<img
											className="mx-auto"
											src={CARDS_LANDING_LOGO}
											alt="Okay"
										/>
									</div>
									<div className="text-sm w-auto mb-6 mx-auto">
										<div className="text-2xl font-bold">{header}</div>
										<div className="text-base">{message}</div>
									</div>
									<button
										onClick={() => {
											onHide();
										}}
										type="button"
										className="mx-auto  mb-20  text-white font-bold py-2 px-4 rounded w-36 bg-red-500  hover:bg-red-700"
									>
										Okay
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default SuccessPopupMessage;
