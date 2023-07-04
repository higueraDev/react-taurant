import { IBusiness } from "./business";

export interface ICardProps
	extends Pick<
		IBusiness,
		"id" | "image_url" | "name" | "rating" | "price" | "url"
	> {}
