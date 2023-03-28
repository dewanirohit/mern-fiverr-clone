import { Link } from "react-router-dom";

import "./catCard.scss";

export default function CatCard({ card }) {
	return (
		<Link
			to="/gigs?cat=design"
			className="link"
		>
			<div className="cat-card">
				<img
					src={card.img}
					alt=""
				/>

				<span className="desc">{card.desc}</span>

				<span className="title">{card.title}</span>
			</div>
		</Link>
	);
}
