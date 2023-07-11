import { useEffect, useState } from "react";
import { useCloneItems } from "./useCloneItems";

export function useInfiniteScroll<T extends { id: string }>(
	items: T[],
	listRef: React.RefObject<HTMLDivElement>,
	isLoading: boolean
) {
	const { updatedItems: leftItems } = useCloneItems<T>(items, true);
	const { updatedItems: rightItems } = useCloneItems<T>(items, false);
	const [scrollPosition, setScrollPosition] = useState<number>(0);
	const [isCloned, setIsCloned] = useState<boolean>(false);
	const [infiniteList, setInfiniteList] = useState<T[]>([]);

	useEffect(() => {
		const list = listRef.current;
		if (!list) return;

		const handleScroll = () => {
			setScrollPosition(list.scrollLeft);
		};

		list.addEventListener("scroll", handleScroll);

		return () => {
			list.removeEventListener("scroll", handleScroll);
		};
	}, [listRef.current]);

	useEffect(() => {
		const list = listRef.current;
		if (!list || leftItems.length < 1) return;
		setInfiniteList(leftItems);
		setIsCloned(true);
	}, [listRef.current, leftItems]);

	useEffect(() => {
		const list = listRef.current;
		if (!list) return;

		const firstItems = list.scrollLeft < 10;
		const lastItems =
			list.scrollLeft > 0 &&
			list.scrollLeft + list.clientWidth > list.scrollWidth - 10;

		if (firstItems || lastItems) {
			setInfiniteList(firstItems ? leftItems : rightItems);
			setIsCloned(true);
		} else {
			setIsCloned(false);
		}
	}, [scrollPosition]);

	useEffect(() => {
		const list = listRef.current;
		if (!list || !isCloned || isLoading) return;

		list.scrollTo({
			left:
				list.scrollLeft < 10
					? list.scrollWidth / 2
					: list.scrollWidth / 2 - list.clientWidth,
		});
	}, [isLoading, listRef.current?.scrollWidth, isCloned]);

	return { infiniteList };
}
