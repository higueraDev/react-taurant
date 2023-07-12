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
	isSkeleton = false,
}: ICardProps): JSX.Element => {
	return isSkeleton ? (
		<div
			className="link"
		>
			<article className="card card--skeleton loading">
				<div className="card__image-wrapper">
					<span className="card__image"  />
				</div>
				<div className="card__info-wrapper">
					<span className="card__title"></span>
					<hr />
					<div className="card__info">
						<p className="stars-wrapper">
							<Stars color="lightgray" rating={5} />
						</p>
						<p className="price"></p>
					</div>
					<div className="button"></div>
				</div>
			</article>
		</div>
	) : (
		<a
			className="link"
			href={url}
			target="_blank"
			rel="noopener noreferrer"
		>
			<article className="card">
				<div className="card__image-wrapper">
					<img className="card__image" src={image_url} alt={name} />
				</div>
				<div className="card__info-wrapper">
					<h3 className="card__title">{name}</h3>
					<hr />
					<div className="card__info">
						<p className="stars-wrapper">
							<Stars rating={rating} />
						</p>
						<p className="price">{price}</p>
					</div>
					<PrimaryLink>View</PrimaryLink>
				</div>
			</article>
		</a>
	);
};

export default Card;
