import React, { useRef, useState } from "react";

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
// utilities
import { roundBy } from "../../util/roundBy";
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
	const [scrollPosition, setScrollPosition] = useState<number>(0);
	const categoryListRef = useRef<HTMLDivElement | null>(null);
	const list = categoryListRef.current;
	const scrollMax = (list?.scrollWidth || 0) - (list?.clientWidth || 0);

	const onCategoryClick = (category: string) => {
		sendCategory(category);
	};

	const onScroll = () => {
		if (!list) return;
		setScrollPosition(list.scrollLeft);
	};

	const onScrollClick = (isToRight: boolean) => {
		const scrollSpace = isToRight ? 900 : -900;

		if (!list) return;
		const movement = list.scrollLeft + scrollSpace;

		list.scroll({
			left: movement,
			behavior: "smooth",
		});
	};

	return (
		<section className="category-section">
			<div
				ref={categoryListRef}
				onScroll={onScroll}
				className="category-list"
			>
				{categories.map(({ title, alias, id }) => (
					<Category onClick={() => onCategoryClick(alias)} key={id}>
						{title}
					</Category>
				))}
			</div>
			<FontAwesomeIcon
				onClick={() => onScrollClick(false)}
				className={`scroll scroll--left ${
					scrollPosition > 0 ? "show" : "hide"
				}`}
				icon={faCircleLeft}
			/>
			<FontAwesomeIcon
				onClick={() => onScrollClick(true)}
				className={`scroll scroll--right ${
					roundBy(scrollPosition, 100) < scrollMax ? "show" : "hide"
				}`}
				icon={faCircleRight}
			/>
		</section>
	);
};

export default CategoryList;
