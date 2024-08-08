import { MouseEvent, ReactElement } from "react";

type ButtonProps = {
	type?: "button" | "submit" | "reset";
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	children: React.ReactNode;
	className?: string;
	suffix?: ReactElement;
};

export default function Button({ children, suffix, ...props }: ButtonProps) {
	return (
		<button
			type="button"
			className="text-white bg-gray-900 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none inline-flex justify-center items-center gap-2"
			{...props}
		>
			{children}
			{suffix}
		</button>
	);
}
