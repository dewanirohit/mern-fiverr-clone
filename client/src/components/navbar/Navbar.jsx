import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import newRequest from "../../utils/newRequest";

import "./navbar.scss";

export default function Navbar() {
	const [active, setActive] = useState(false);
	const [open, setOpen] = useState(false);

	const { pathname } = useLocation();

	const currentUser = JSON.parse(localStorage.getItem("currentUser"));

	const navigate = useNavigate();

	function isActive() {
		window.scrollY > 100 ? setActive(true) : setActive(false);
	}

	async function handleLogout() {
		try {
			await newRequest.post("/auth/logout");

			localStorage.setItem("currentUser", null);

			navigate("/");
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", isActive);
		return () => {
			window.removeEventListener("scroll", isActive);
		};
	}, []);

	return (
		<div
			className={active || pathname !== "/" ? "navbar active" : "navbar"}
		>
			<div className="container">
				<div className="logo">
					<Link
						className="link"
						to="/"
					>
						<span className="text">radGigs</span>
						<span className="dot">.</span>
					</Link>
				</div>

				<div className="links">
					<Link
						className="link"
						to="/"
					>
						radGigs Business
					</Link>

					<Link
						className="link"
						to="/"
					>
						Explore
					</Link>

					{currentUser ? (
						<div
							className="user"
							onClick={() => setOpen((prev) => !prev)}
						>
							<img
								src={currentUser.img || "/img/noavatar.jpg"}
								alt="profile picture"
							/>

							<span>{currentUser?.username}</span>

							{open && (
								<div className="options">
									{currentUser.isSeller && (
										<>
											<Link
												className="link"
												to="/my-gigs"
											>
												Gigs
											</Link>

											<Link
												className="link"
												to="/add"
											>
												Add New Gig
											</Link>
										</>
									)}

									<Link
										className="link"
										to="/orders"
									>
										Orders
									</Link>

									<Link
										className="link"
										to="/messages"
									>
										Messages
									</Link>

									<Link
										className="link"
										onClick={handleLogout}
									>
										Logout
									</Link>
								</div>
							)}
						</div>
					) : (
						<>
							<Link
								className="link"
								to="/login"
							>
								Sign In
							</Link>

							<Link
								className="link"
								to="/register"
							>
								<button>Join</button>
							</Link>
						</>
					)}
				</div>
			</div>

			{(active || pathname !== "/") && (
				<>
					<hr />

					<div className="menu">
						<Link
							className="link menuLink"
							to="/"
						>
							Graphics & Design
						</Link>

						<Link
							className="link menuLink"
							to="/"
						>
							Video & Animation
						</Link>

						<Link
							className="link menuLink"
							to="/"
						>
							Writing & Translation
						</Link>

						<Link
							className="link menuLink"
							to="/"
						>
							AI Services
						</Link>

						<Link
							className="link menuLink"
							to="/"
						>
							Digital Marketing
						</Link>

						<Link
							className="link menuLink"
							to="/"
						>
							Music & Audio
						</Link>

						<Link
							className="link menuLink"
							to="/"
						>
							Programming & Tech
						</Link>

						<Link
							className="link menuLink"
							to="/"
						>
							Business
						</Link>

						<Link
							className="link menuLink"
							to="/"
						>
							Lifestyle
						</Link>
					</div>

					<hr />
				</>
			)}
		</div>
	);
}
