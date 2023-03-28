import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";

import newRequest from "../../utils/newRequest";
import "./messages.scss";

export default function Messages() {
	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const queryClient = useQueryClient();

	const { isLoading, error, data } = useQuery({
		queryKey: ["conversations"],
		queryFn: () =>
			newRequest.get(`/conversations`).then((res) => {
				return res.data;
			}),
	});

	const mutation = useMutation({
		mutationFn: (id) => {
			return newRequest.put(`/conversations/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(["conversations"]);
		},
	});

	function handleRead(id) {
		mutation.mutate(id);
	}

	return (
		<div className="messages">
			{isLoading ? (
				"Loading..."
			) : error ? (
				"Something went wrong!"
			) : (
				<div className="container">
					<div className="title">
						<h1>Messages</h1>
					</div>

					<table>
						<thead>
							<tr>
								<th>
									{currentUser.isSeller ? "Buyer" : "Seller"}
								</th>
								<th>Last Message</th>
								<th>Date</th>
								<th>Action</th>
							</tr>
						</thead>

						<tbody>
							{data.map((c) => (
								<tr
									className={
										((currentUser.isSeller &&
											!c.readBySeller) ||
											(!currentUser.isSeller &&
												!c.readByBuyer)) &&
										"active"
									}
									key={c.id}
								>
									{console.log(c)}
									<td>
										{currentUser.isSeller
											? c.buyerId
											: c.sellerId}
									</td>
									<td>
										<Link
											to={`/message/${c.id}`}
											className="link"
										>
											{c?.lastMessage?.substring(0, 100)}
											...
										</Link>
									</td>
									<td>{moment(c.updatedAt).fromNow()}</td>
									<td>
										{((currentUser.isSeller &&
											!c.readBySeller) ||
											(!currentUser.isSeller &&
												!c.readByBuyer)) && (
											<button
												onClick={() => handleRead(c.id)}
											>
												Mark as Read
											</button>
										)}
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
