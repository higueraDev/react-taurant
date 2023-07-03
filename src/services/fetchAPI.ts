import axios from "axios";
// plugins
import { v4 as uuidv4 } from "uuid";
// interfaces
import { IGetCategoriesResponse, ICategory } from "../interfaces/categories";
import { IGetRestaurantsResponse } from "../interfaces/get-restaurants-response";
// variables
const serverUrl = process.env.REACT_APP_SERVER_URL || "";
const apiRestaurants = serverUrl + "/api/restaurants";
const apiCategories = serverUrl + "/api/categories";

export const fetchCategories = async () => {
	try {
		const response = await axios.get(apiCategories);
		const data: IGetCategoriesResponse = response.data;

		const categories: ICategory[] = data.categories.map((category) => ({
			...category,
			id: uuidv4(),
		}));

		return categories;
	} catch (error) {
		console.error("Error fetching categories:", error);
		return [];
	}
};

export const fetchRestaurants = async (
	selectedCategory: ICategory["alias"]
) => {
	try {
		const response = await axios.get(
			`${apiRestaurants}/category/${selectedCategory}`
		);
		const data: IGetRestaurantsResponse = response.data;
		return data.businesses;
	} catch (error) {
		console.error("Error fetching restaurants:", error);
		return [];
	}
};
