import React from "react";
// styles
import "./Category.scss";
// interfaces
import { ICategoryProps } from "../../interfaces/categoryProps";

const Category = ({ children, onClick }: ICategoryProps) => {
	return (
		<button onClick={onClick} className="category">
			{children}
		</button>
	);
};

export default Category;
