import { ButtonHTMLAttributes } from "react";

export interface ICategoryProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	onClick: () => void;
}
