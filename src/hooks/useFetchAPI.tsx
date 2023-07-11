import { useEffect, useState } from "react";
import axios from "axios";
// plugins
import { v4 as uuidv4 } from "uuid";
// interfaces
import { IGetCategoriesResponse, ICategory } from "../interfaces/categories";
import { IGetRestaurantsResponse } from "../interfaces/get-restaurants-response";
import { IBusiness } from "../interfaces/business";
// variables
const serverUrl = process.env.REACT_APP_SERVER_URL || "";
const apiRestaurants = serverUrl + "/api/restaurants";
const apiCategories = serverUrl + "/api/categories";

export function useFetchAPI(selectedCategory: string = "bars") {
	const [categoryResponse, setCategoryResponse] = useState<ICategory[]>([]);
	const [restaurantResponse, setRestaurantResponse] = useState<IBusiness[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	useEffect(() => {
		const fetchCategories = async () => {
			try {
				setIsLoading(true);
				const response = await axios.get<IGetCategoriesResponse>(
					apiCategories
				);
				const data: IGetCategoriesResponse = response.data;

				const categories: ICategory[] = data.categories.map(
					(category) => ({
						...category,
						id: uuidv4(),
					})
				);

				setCategoryResponse(categories);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
			setIsLoading(false);
		};

		fetchCategories();
	}, []);

	useEffect(() => {
		const fetchRestaurants = async (
			selectedCategory: ICategory["alias"]
		) => {
			try {
				setIsLoading(true);
				const response = await axios.get<IGetRestaurantsResponse>(
					`${apiRestaurants}/category/${selectedCategory}`
				);
				const data = response.data;
				setRestaurantResponse(data.businesses);
				setIsLoading(false);
			} catch (error) {
				console.error("Error fetching restaurants:", error);
			}
		};
		fetchRestaurants(selectedCategory);
	}, [selectedCategory]);
	return { categoryResponse, restaurantResponse, isLoading };
}
