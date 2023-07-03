import React from "react";
// components
import Card from "../Card/Card";
import "./RestaurantList.scss";
// interfaces
import { IBusiness } from "../../interfaces/business";
interface IRestaurantListProps {
	restaurants: IBusiness[];
}

const RestaurantList = ({ restaurants }: IRestaurantListProps): JSX.Element => {
	return (
		<section className="restaurant-list">
			{restaurants.map((restaurant) => (
				<Card {...restaurant} key={restaurant.id} />
			))}
		</section>
	);
};

export default RestaurantList;
