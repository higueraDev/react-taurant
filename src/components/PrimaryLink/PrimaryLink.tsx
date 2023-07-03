import React, { AnchorHTMLAttributes } from "react";
// styles
import "./PrimaryLink.scss";
// interfaces
interface IPrimaryLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {}

const PrimaryLink = ({ children, href }: IPrimaryLinkProps): JSX.Element => {
	return (
		<a className="button" rel="noopener noreferrer" href={href}>
			{children}
		</a>
	);
};

export default PrimaryLink;
