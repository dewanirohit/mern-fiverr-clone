import "./projectCard.scss";

export default function ProjectCard({ card }) {
	return (
		<div className="project-card">
			<img
				src={card.img}
				alt=""
			/>

			<div className="info">
				<img
					src={card.pp}
					alt=""
				/>

				<div className="texts">
					<h2>{card.cat}</h2>

					<span>{card.username}</span>
				</div>
			</div>
		</div>
	);
}
