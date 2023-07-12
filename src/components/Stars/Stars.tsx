// plugins
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarReg } from "@fortawesome/free-regular-svg-icons";
// styles
import "./Stars.scss";
// interfaces
interface IStarsProps {
	rating: number;
	color?: string;
}

const Stars = ({ rating, color }: IStarsProps): JSX.Element => {
	const stars = [];
	const filledStars = Math.floor(rating);
	const hasHalfStar = rating % 1 !== 0;
	const emptyStars = 5 - (filledStars + Number(hasHalfStar));

	for (let i = 0; i < filledStars; i++) {
		stars.push(
			<FontAwesomeIcon
				style={{ color }}
				className="gold-star"
				icon={faStar}
				key={uuidv4()}
			/>
		);
	}

	if (hasHalfStar) {
		stars.push(
			<FontAwesomeIcon
				className="gold-star"
				icon={faStarHalfAlt}
				key={filledStars}
			/>
		);
	}

	for (let i = 0; i < emptyStars; i++) {
		stars.push(
			<FontAwesomeIcon
				className="gold-star"
				icon={faStarReg}
				key={uuidv4()}
			/>
		);
	}

	return <span>{stars}</span>;
};

export default Stars;
