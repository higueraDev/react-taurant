import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export function useCloneItems<T extends { id: string }>(
	items: T[],
	isLeft: boolean
) {
	const [updatedItems, setUpdatedItems] = useState<T[]>([]);

	useEffect(() => {
		const clonedItems = items.map((item) => ({
			...item,
			id: uuidv4(),
		}));

		if (isLeft) {
			clonedItems.unshift(...items);
		} else {
			clonedItems.push(...items);
		}
		setUpdatedItems(clonedItems);
	}, [items,isLeft]);

	return { updatedItems };
}
