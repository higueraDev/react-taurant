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

	const { categoryResponse, restaurantResponse, isLoading } =
		useFetchAPI(selectedCategory);

	const handleCategory = (category: string) => {
		if (isLoading) return;
		setSelectedCategory(category);
	};

	useEffect(() => {
		setCategories(categoryResponse);
	}, [categoryResponse]);

	useEffect(() => {
		setRestaurants(restaurantResponse);
	}, [restaurantResponse]);

	return (
		<main className="container">
			<h1>Restaurants</h1>

			{isLoading ? (
				<Loader />
			) : (
				<>
					<CategoryList
						categories={categories}
						sendCategory={handleCategory}
						isLoading={isLoading}
					/>
					<RestaurantList restaurants={restaurants} />
				</>
			)}
		</main>
	);
};

export default App;
