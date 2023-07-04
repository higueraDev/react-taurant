import React from "react";
// components
import Stars from "../Stars/Stars";
import PrimaryLink from "../PrimaryLink/PrimaryLink";
// styles
import "./Card.scss";
// interfaces
import { Price } from "../../interfaces/business";
import { ICardProps } from "../../interfaces/cardProps";

const Card = ({
	name,
	image_url,
	rating,
	price = Price.Empty,
	url,
}: ICardProps): JSX.Element => {
	return (
		<article className="card">
			<div className="card__image-wrapper">
				<img className="card__image" src={image_url} alt={name} />
			</div>
			<h3 className="card__title">{name}</h3>
			<hr />
			<div className="card__info">
				<p>
					<Stars rating={rating} />
				</p>
				<p>{price}</p>
			</div>
			<PrimaryLink href={url} target="_blank">
				View
			</PrimaryLink>
		</article>
	);
};

export default Card;
