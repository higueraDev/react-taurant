import React, { useRef } from "react";

// components
import Category from "../Category/Category";

// plugins
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleLeft,
	faCircleRight,
} from "@fortawesome/free-regular-svg-icons";

// styles
import "./CategoryList.scss";

// interfaces
import { ICategory } from "../../interfaces/categories";

interface ICategoryListProps {
	categories: ICategory[];
	sendCategory: (category: string) => void;
}

const CategoryList = ({
	categories,
	sendCategory,
}: ICategoryListProps): JSX.Element => {
	const categoryListRef = useRef<HTMLDivElement | null>(null);

	const onCategoryClick = (category: string) => {
		sendCategory(category);
	};

	const onScrollClick = (isToRight: boolean) => {
		const movement = isToRight ? 900 : -900;
		const list = categoryListRef.current;
		if (!list) return;
		list.scroll({
			left: list.scrollLeft + movement,
			behavior: "smooth",
		});
	};

	return (
		<section className="category-section">
			<div ref={categoryListRef} className="category-list">
				{categories.map(({ title, alias, id }) => (
					<Category onClick={() => onCategoryClick(alias)} key={id}>
						{title}
					</Category>
				))}
			</div>
			<FontAwesomeIcon
				onClick={() => onScrollClick(false)}
				className="scroll scroll--left"
				icon={faCircleLeft}
			/>
			<FontAwesomeIcon
				onClick={() => onScrollClick(true)}
				className="scroll scroll--right"
				icon={faCircleRight}
			/>
		</section>
	);
};

export default CategoryList;
