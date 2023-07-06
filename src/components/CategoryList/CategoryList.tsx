import React, { useEffect, useRef, useState } from "react";

// components
import Category from "../Category/Category";

// plugins
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleLeft,
	faCircleRight,
} from "@fortawesome/free-regular-svg-icons";
import { v4 as uuidv4 } from "uuid";

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
	const [scrollPosition, setScrollPosition] = useState<number>(0);
	const [isCloned, setIsCloned] = useState<boolean>(false);
	const [updatedCategories, setUpdatedCategories] = useState<ICategory[]>([]);
	const listRef = useRef<HTMLDivElement | null>(null);

	const cloneCategories = (isLeft: boolean) => {
		const clonedCategories = categories.map((category) => ({
			...category,
			id: uuidv4(),
		}));
		if (isLeft) {
			clonedCategories.unshift(...categories);
		} else {
			clonedCategories.push(...categories);
		}
		setUpdatedCategories(clonedCategories);
	};

	useEffect(() => {
		cloneCategories(true);
	}, [categories]);

	const onCategoryClick = (category: string) => {
		sendCategory(category);
	};

	const onScroll = () => {
		const list = listRef.current;
		if (!list) return;
		setScrollPosition(list.scrollLeft);
	};

	useEffect(() => {
		const list = listRef.current;
		if (!list) return;
		const firstItems = scrollPosition < 10;
		const lastItems =
			scrollPosition > 0 &&
			scrollPosition + list.clientWidth > list.scrollWidth - 10;

		const handleInfiniteScroll = () => {
			cloneCategories(firstItems);
			setIsCloned(true);
		};

		if (firstItems || lastItems) {
			if (!isCloned) handleInfiniteScroll();
		} else {
			setIsCloned(false);
		}
	}, [scrollPosition]);

	useEffect(() => {
		const list = listRef.current;
		if (!list || !isCloned || list.scrollWidth < 700) return;
		list.scrollTo({
			left:
				list.scrollLeft < 10
					? list.scrollWidth / 2
					: list.scrollWidth / 2 - list.clientWidth,
		});
	}, [updatedCategories]);

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

	return (
		<section className="category-section">
			<div ref={listRef} className="category-list" onScroll={onScroll}>
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
