import { useEffect, useState } from "react";
import axios from "axios";
// plugins
import { v4 as uuidv4 } from "uuid";
// interfaces
import {
	IGetCategoriesResponse,
	ICategory,
} from "../interfaces/getCategoriesResponse";
import { IGetRestaurantsResponse } from "../interfaces/getRestaurantsRepsonse";
import { IBusiness } from "../interfaces/business";
// variables
const serverUrl = process.env.REACT_APP_SERVER_URL || "";
const apiRestaurants = serverUrl + "/api/restaurants";
const apiCategories = serverUrl + "/api/categories";

export function useFetchAPI(selectedCategory: string = "bars", offset: string) {
	const [categoryResponse, setCategoryResponse] = useState<ICategory[]>([]);
	const [restaurantResponse, setRestaurantResponse] = useState<IBusiness[]>(
		[]
	);
	const [totalRestaurant, setTotalRestaurant] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [loadingRestaurants, setLoadingRestaurants] =
		useState<boolean>(false);
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
			} catch (error) {
				console.error("Error fetching categories:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchCategories();
	}, []);

	useEffect(() => {
		const fetchRestaurants = async (
			selectedCategory: ICategory["alias"]
		) => {
			if (!loadingRestaurants)
				try {
					setLoadingRestaurants(true);
					const response = await axios.get<IGetRestaurantsResponse>(
						`${apiRestaurants}/category/${selectedCategory}/offset/${offset}`
					);
					const data = response.data;
					setRestaurantResponse(data.businesses);
					setTotalRestaurant(data.total);
					setLoadingRestaurants(false);
				} catch (error) {
					console.error("Error fetching restaurants:", error);
				}
		};
		fetchRestaurants(selectedCategory);
	}, [selectedCategory, offset]);
	return {
		categoryResponse,
		restaurantResponse,
		isLoading,
		totalRestaurant,
		loadingRestaurants,
		setLoadingRestaurants,
	};
}
