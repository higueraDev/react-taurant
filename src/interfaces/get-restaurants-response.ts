import { IBusiness } from "./business";

export interface IGetRestaurantsResponse {
	businesses: IBusiness[];
	total: number;
	region: IRegion;
}

interface IRegion {
	center: ICenter;
}

export interface ICenter {
	latitude: number;
	longitude: number;
}

