import "./Dots.scss";

const Dots = () => {
	const totalDots = 3;
	const dots = Array(totalDots)
		.fill(null)
		.map((_, i) => (
			<span
				className="dot pulse"
				key={i}
				style={{ animationDelay: `${(i+1)*0.2}s` }}
			></span>
		));

	return <div className="dots">{dots}</div>;
};

export default Dots;
