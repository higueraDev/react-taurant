import React, { useEffect, useState } from "react";
// components
import Card from "../Card/Card";
import "./RestaurantList.scss";
// interfaces
import { IBusiness } from "../../interfaces/business";
import Dots from "../Dots/Dots";
import { skeleton } from "../Card/skeleton";
interface IRestaurantListProps {
	restaurants: IBusiness[];
	onLoadMore: () => void;
	limit: number;
	offset: number;
	loadingRestaurants: boolean;
}

const RestaurantList = ({
	restaurants,
	onLoadMore,
	offset,
	limit,
	loadingRestaurants,
}: IRestaurantListProps): JSX.Element => {
	const [isMobile, setIsMobile] = useState<boolean>(false);

	const skeletonItems = Array(9)
		.fill(null)
		.map((_, i) => <Card {...skeleton} key={skeleton.name + i} />);

	const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
		const element = e.target as HTMLDivElement;
		const position = element.scrollTop;
		const height = element.scrollHeight;
		const itemsLoaded = isMobile ? offset + limit : (offset + limit) / 3;
		const itemHeight = height / itemsLoaded;
		const itemsToScroll = isMobile ? itemsLoaded - 6 : itemsLoaded - 3;
		const targetZone = itemsToScroll * itemHeight;

		if (position > targetZone && !loadingRestaurants) {
			onLoadMore();
		}
	};

	useEffect(() => {
		setIsMobile(window.innerWidth < 768);
	}, []);

	return (
		<section onScroll={handleScroll} className="restaurant-list">
			{restaurants.map((restaurant) => (
				<Card
					{...restaurant}
					key={restaurant.id}
					isSkeleton={loadingRestaurants}
				/>
			))}
			{loadingRestaurants && skeletonItems}
			{loadingRestaurants && <Dots />}
		</section>
	);
};

export default RestaurantList;
