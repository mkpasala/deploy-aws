import { ChevronDownIcon, LogoutIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { useContext, useRef, useState } from "react";
import { sessionContext } from "../../../../app";
import { useNavigate } from "react-router-dom";

export const UserAccountSetting = () => {
	const navigate = useNavigate();
	const settingsRef = useRef<HTMLDivElement>(null);
	const toggle = () => setOpen(!open);
	const session = useContext(sessionContext);
	const sessionUser = session?.user;
	const user = {
		fullName: `${sessionUser?.firstName || "First"} ${sessionUser?.lastName || "Last"}`,
		role: `${sessionUser?.role?.toUpperCase() || "ROLE"}`,
	};
	const [open, setOpen] = useState(false);
	const settings = [
		// {
		// 	name: "Bank Accounts",
		// 	onClick: () => {
		// 		navigate("/bank-account-list");
		// 	},
		// },
		{
			icon: <LogoutIcon className="w-4" />,
			name: "Logout",
			onClick: session?.signOut,
		},
	];

	const outOfScope = (e: any) => {
		if (settingsRef.current?.contains(e.target)) return;
		setOpen(false);
	};

	useEffect(() => {
		document.addEventListener("mousedown", outOfScope);
		return () => {
			document.removeEventListener("mousedown", outOfScope);
		};
	}, [open]);

	return (
		<div
			className={"relative flex gap-3 items-center cursor-pointer select-none"}
			ref={settingsRef}
			onClick={toggle}
		>
			<div className="min-w-[28px] min-h-[28px] text-xs text-center leading-7 rounded-full bg-slate-500 text-white">
				{user.fullName
					.split(" ")
					.map((str) => str.at(0))
					.join(".")}
			</div>
			<div className="flex flex-col gap-1">
				<p className="text-sm text-dark font-semibold">{user.fullName}</p>
				<p className="text-xs text-dark/70">{user.role}</p>
			</div>
			<button className="ml-7">
				<ChevronDownIcon className="w-3" />
			</button>
			{open && (
				<div className="absolute py-2 top-full bg-white w-[150%] rounded-b shadow-sm border-b border-x focus:border focus:border-red-500">
					{settings.map((setting, idx) => (
						<button
							key={idx}
							className="flex gap-3 py-2 px-5 hover:cursor-pointer hover:bg-slate-100 border-y items-center w-full"
							onClick={setting.onClick}
							aria-label={setting.name}
						>
							{setting.icon}
							{setting.name}
						</button>
					))}
				</div>
			)}
		</div>
	);
};
