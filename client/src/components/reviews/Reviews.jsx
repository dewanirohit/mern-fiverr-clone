import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import newRequest from "../../utils/newRequest";
import Review from "../review/Review";

import "./reviews.scss";

export default function Reviews({ gigId }) {
	const { isLoading, error, data } = useQuery({
		queryKey: ["reviews"],
		queryFn: () =>
			newRequest.get(`/reviews/${gigId}`).then((res) => {
				return res.data;
			}),
	});

	const mutation = useMutation({
		mutationFn: (review) => {
			return newRequest.post("/reviews", review);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["reviews"]);
		},
	});

	function handleSubmit(e) {
		e.preventDefault();

		const desc = e.target[0].value;
		const star = e.target[1].value;

		mutation.mutate({ gigId, desc, star });

		window.location.reload;
	}

	return (
		<div className="reviews">
			<h2>Reviews</h2>
			{isLoading
				? "loading"
				: error
				? "Something went wrong!"
				: data.map((review) => (
						<Review
							key={review._id}
							review={review}
						/>
				  ))}
			<div className="add">
				<h3>Add a review</h3>
				<form
					action=""
					className="addForm"
					onSubmit={handleSubmit}
				>
					<input
						type="text"
						placeholder="Leave a review"
					/>
					<select
						name=""
						id=""
					>
						<option disabled>Leave a rating</option>
						<option value={1}>1</option>
						<option value={2}>2</option>
						<option value={3}>3</option>
						<option value={4}>4</option>
						<option value={5}>5</option>
					</select>
					<button>Send</button>
				</form>
			</div>
		</div>
	);
}
