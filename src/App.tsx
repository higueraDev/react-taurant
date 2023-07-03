import React, { useEffect, useState } from "react";
// components
import CategoryList from "./components/CategoryList/CategoryList";
import RestaurantList from "./components/RestaurantList/RestaurantList";
import Loader from "./components/Loader/Loader";
// styles
import "./App.scss";
// helpers
import { fetchCategories, fetchRestaurants } from "./services/fetchAPI";
// interfaces
import { IBusiness } from "./interfaces/business";
import { ICategory } from "./interfaces/categories";

const App = (): JSX.Element => {
	const [restaurants, setRestaurants] = useState<IBusiness[]>([]);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>("bars");
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleCategory = (category: string) => {
		console.log(isLoading);
		if (isLoading) return;
		setSelectedCategory(category);
	};

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
	}, [selectedCategory]);

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
