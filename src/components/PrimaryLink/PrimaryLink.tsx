import { ButtonHTMLAttributes } from "react";
// styles
import "./PrimaryLink.scss";
// interfaces
interface IPrimaryLinkProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const PrimaryLink = ({ children }: IPrimaryLinkProps): JSX.Element => {
	return (
		<button className="button">
			{children}
		</button>
	);
};

export default PrimaryLink;
