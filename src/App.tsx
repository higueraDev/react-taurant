import { useEffect, useState } from "react";
// components
import CategoryList from "./components/CategoryList/CategoryList";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import Loader from "./components/Loader/Loader";
// styles
import "./App.scss";
// hooks
import { useFetchAPI } from "./hooks/useFetchAPI";
// interfaces
import { IBusiness } from "./interfaces/business";
import { ICategory } from "./interfaces/getCategoriesResponse";

const App = (): JSX.Element => {
	const [restaurants, setRestaurants] = useState<IBusiness[]>([]);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>("bars");
	const [offset, setOffset] = useState<number>(0);
	const limit = 15;

	const {
		categoryResponse,
		restaurantResponse,
		isLoading,
		totalRestaurant,
		loadingRestaurants,
	} = useFetchAPI(selectedCategory, offset.toString());

	const handleLoadMore = () => {
		const next = offset + limit;
		if (next > totalRestaurant) return;
		setOffset(next);
	};

	const handleCategory = (category: string) => {
		if (isLoading) return;
		setOffset(0);
		setRestaurants([]);
		setSelectedCategory(category);
	};

	useEffect(() => {
		setCategories(categoryResponse);
	}, [categoryResponse]);

	useEffect(() => {
		if (Number(offset) > 0) {
			const accumulatedRestaurants = [
				...restaurants,
				...restaurantResponse,
			];

			setRestaurants(accumulatedRestaurants);
		} else {
			setRestaurants(restaurantResponse);
		}
	}, [restaurantResponse]);

	return (
		<main className="container">
			<h1>Restaurants</h1>

			{isLoading ? (
				<Loader />
			) : (
				<CategoryList
					categories={categories}
					sendCategory={handleCategory}
					isLoading={isLoading}
				/>
			)}
			<RestaurantList
				restaurants={restaurants}
				onLoadMore={handleLoadMore}
				offset={offset}
				limit={limit}
				loadingRestaurants={loadingRestaurants}
			/>
		</main>
	);
};

export default App;
