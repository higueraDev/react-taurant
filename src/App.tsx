import React, { useEffect, useState } from "react";
// components
import CategoryList from "./components/CategoryList/CategoryList";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import Loader from "./components/Loader/Loader";
// styles
import "./App.scss";
// hooks
// interfaces
import { IBusiness } from "./interfaces/business";
import { ICategory } from "./interfaces/categories";
import { useFetchAPI } from "./hooks/fetchAPI";

const App = (): JSX.Element => {
	const [restaurants, setRestaurants] = useState<IBusiness[]>([]);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>("bars");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleCategory = (category: string) => {
		if (isLoading) return;
		setSelectedCategory(category);
	};

	const { fetchCategories, fetchRestaurants } = useFetchAPI();

	// fetch logic

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const [categories, restaurants] = await Promise.allSettled([
				fetchCategories(),
				fetchRestaurants(selectedCategory),
			]);

			if (categories.status === "fulfilled")
				setCategories(categories.value);
			if (restaurants.status === "fulfilled")
				setRestaurants(restaurants.value);

			setIsLoading(false);
		};

		fetchData();
	}, [selectedCategory, fetchCategories, fetchRestaurants]);

	return (
		<main className="container">
			<h1>Restaurants</h1>
			<CategoryList
				categories={categories}
				sendCategory={handleCategory}
			/>
			{isLoading ? (
				<Loader />
			) : (
				<RestaurantList restaurants={restaurants} />
			)}
		</main>
	);
};

export default App;
