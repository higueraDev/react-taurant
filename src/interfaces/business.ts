import { ICenter } from "./getRestaurantsResponse";

export interface IBusiness {
	id: string;
	alias: string;
	name: string;
	image_url: string;
	is_closed: boolean;
	url: string;
	review_count: number;
	categories: ICategory[];
	rating: number;
	coordinates: ICenter;
	transactions: Transaction[];
	price?: Price;
	location: ILocation;
	phone: string;
	display_phone: string;
	distance: number;
}

export interface ICategory {
	alias: string;
	title: string;
}

export enum Price {
	Empty = "-",
	Low = "$",
	Regular = "$$",
	High = "$$$",
	VeryHigh = "$$$$",
}

enum Transaction {
	Delivery = "delivery",
	Pickup = "pickup",
	RestaurantReservation = "restaurant_reservation",
}

interface ILocation {
	address1: string;
	address2: null | string;
	address3: null | string;
	city: string;
	zip_code: string;
	country: Country;
	state: State;
	display_address: string[];
}

enum Country {
	Us = "US",
}

enum State {
	CA = "CA",
}
