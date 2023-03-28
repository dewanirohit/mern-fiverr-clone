import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import newRequest from "../../utils/newRequest";

import "./gigCard.scss";

export default function GigCard({ item }) {
	const { isLoading, error, data } = useQuery({
		queryKey: [item.userId],
		queryFn: () =>
			newRequest.get(`/users/${item.userId}`).then((res) => {
				return res.data;
			}),
	});

	return (
		<Link
			className="link"
			to={`/gig/${item._id}`}
		>
			<div className="gigCard">
				<img
					src={item.cover}
					alt="gig cover"
				/>

				<div className="info">
					{isLoading ? (
						"loading"
					) : error ? (
						"Something went wrong!"
					) : (
						<div className="user">
							<img
								src={data.img || "/img/noavatar.jpg"}
								alt=""
							/>
							<span>{data.username}</span>
						</div>
					)}

					<p>{item.title}</p>

					<div className="star">
						<img
							src="./img/star.png"
							alt=""
						/>

						<span>
							{!isNaN(item.totalStars / item.starNumber) &&
								Math.round(item.totalStars / item.starNumber)}
						</span>
					</div>
				</div>

				<hr />

				<div className="detail">
					<img
						src="./img/heart.png"
						alt=""
					/>

					<div className="price">
						<span>STARTING AT</span>

						<h2>$ {item.price}</h2>
					</div>
				</div>
			</div>
		</Link>
	);
}
