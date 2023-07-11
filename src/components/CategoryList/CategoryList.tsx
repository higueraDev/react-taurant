import React, { useEffect, useRef, useState } from "react";

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
import { ICategory } from "../../interfaces/getCategoriesResponse";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";

interface ICategoryListProps {
	categories: ICategory[];
	sendCategory: (category: string) => void;
	isLoading: boolean
}

const CategoryList = ({
	categories,
	sendCategory,
	isLoading,
}: ICategoryListProps): JSX.Element => {
	const [updatedCategories, setUpdatedCategories] = useState<ICategory[]>([]);
	const listRef = useRef<HTMLDivElement | null>(null);
	const { infiniteList } = useInfiniteScroll(categories, listRef, isLoading);

	const onCategoryClick = (category: string) => {
		sendCategory(category);
	};

	const onScrollClick = (isToRight: boolean) => {
		const list = listRef.current;
		if (!list) return;
		const scrollSpace = isToRight ? list.clientWidth : -list.clientWidth;
		const movement = list.scrollLeft + scrollSpace;

		list.scrollTo({
			left: movement,
			behavior: "smooth",
		});
	};

	useEffect(() => {
		if (!listRef.current) return;
		setUpdatedCategories(infiniteList);
	}, [listRef, infiniteList]);

	return (
		<section className="category-section">
			<div ref={listRef} className="category-list">
				{updatedCategories.map(({ title, alias, id }) => (
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
				className="scroll scroll--right "
				icon={faCircleRight}
			/>
		</section>
	);
};

export default CategoryList;
