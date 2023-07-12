import React, { useState } from "react";
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
	setLoadingRestaurants: React.Dispatch<React.SetStateAction<boolean>>;
}

const RestaurantList = ({
	restaurants,
	onLoadMore,
	offset,
	limit,
	loadingRestaurants,
}: IRestaurantListProps): JSX.Element => {
	const skeletonItems = Array(9)
		.fill(null)
		.map((_, i) => <Card {...skeleton} key={skeleton.name + i} />);

	const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
		const element = e.target as HTMLDivElement;
		const position = element.scrollTop;
		const height = element.scrollHeight;
		const itemsLoaded =
			window.innerWidth > 767 ? (offset + limit) / 3 : offset + limit;
		const itemHeight = height / itemsLoaded;
		const itemsToScroll = itemsLoaded - 2;
		const targetZone = itemsToScroll * itemHeight;

		if (position > targetZone) {
			if (!loadingRestaurants) {
				onLoadMore();
			}
		}
	};

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
