import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import getCurrentUser from "../../utils/getCurrentUser";
import newRequest from "../../utils/newRequest";

import "./myGigs.scss";

export default function MyGigs() {
	const currentUser = getCurrentUser();
	const queryClient = useQueryClient();

	const { isLoading, error, data } = useQuery({
		queryKey: ["myGigs"],
		queryFn: () =>
			newRequest.get(`/gigs?userId=${currentUser._id}`).then((res) => {
				return res.data;
			}),
	});

	const mutation = useMutation({
		mutationFn: (id) => {
			return newRequest.delete(`/gigs/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["myGigs"]);
		},
	});

	function handleDelete(id) {
		mutation.mutate(id);
	}

	return (
		<div className="my-gigs">
			{isLoading ? (
				"Loading..."
			) : error ? (
				"Something went wrong!"
			) : (
				<div className="container">
					<div className="title">
						<h1>My Gigs</h1>

						{currentUser.isSeller && (
							<Link to="/add">
								<button>Add New Gig</button>
							</Link>
						)}
					</div>

					<table>
						<thead>
							<tr>
								<th>Image</th>
								<th>Title</th>
								<th>Price</th>
								<th>Sales</th>
								<th>Action</th>
							</tr>
						</thead>

						<tbody>
							{data.map((gig) => (
								<tr key={gig._id}>
									<td>
										<Link
											className="link"
											to={`/gig/${gig._id}`}
										>
											<img
												className="image"
												src={gig.cover}
												alt=""
											/>
										</Link>
									</td>

									<td>
										<Link
											className="link"
											to={`/gig/${gig._id}`}
										>
											{gig.title}
										</Link>
									</td>

									<td>{gig.price}</td>

									<td>{gig.sales}</td>

									<td>
										<img
											className="delete"
											src="./img/delete.png"
											alt=""
											onClick={() =>
												handleDelete(gig._id)
											}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
