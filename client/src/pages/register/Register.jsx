import { useState } from "react";
import { useNavigate } from "react-router-dom";

import upload from "../../utils/upload";
import newRequest from "../../utils/newRequest";

import "./register.scss";

export default function Register() {
	const [file, setFile] = useState(null);
	const [user, setUser] = useState({
		username: "",
		email: "",
		password: "",
		img: "",
		country: "",
		isSeller: false,
		desc: "",
	});
	const navigate = useNavigate();

	function handleChange(e) {
		setUser((prev) => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	}

	function handleSeller(e) {
		setUser((prev) => {
			return { ...prev, isSeller: e.target.checked };
		});
	}

	async function handleSubmit(e) {
		e.preventDefault();

		const url = await upload(file);
		try {
			await newRequest.post("/auth/register", {
				...user,
				img: url,
			});
			navigate("/");
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<div className="register">
			<form onSubmit={handleSubmit}>
				<div className="left">
					<h1>Create a new account</h1>

					<label htmlFor="">Username</label>
					<input
						name="username"
						type="text"
						placeholder="Enter your username"
						onChange={handleChange}
					/>

					<label htmlFor="">Email</label>
					<input
						name="email"
						type="email"
						placeholder="Enter your email"
						onChange={handleChange}
					/>

					<label htmlFor="">Password</label>
					<input
						name="password"
						type="password"
						placeholder="Enter your password"
						onChange={handleChange}
					/>

					<label htmlFor="">Profile Picture</label>
					<input
						type="file"
						onChange={(e) => setFile(e.target.files[0])}
					/>

					<label htmlFor="">Country</label>
					<input
						name="country"
						type="text"
						placeholder="Enter your country"
						onChange={handleChange}
					/>

					<button type="submit">Register</button>
				</div>

				<div className="right">
					<h1>I want to become a seller</h1>

					<div className="toggle">
						<label htmlFor="">Activate the seller account</label>
						<label className="switch">
							<input
								type="checkbox"
								onChange={handleSeller}
							/>
							<span className="slider round"></span>
						</label>
					</div>

					<label htmlFor="">Phone Number</label>
					<input
						name="phone"
						type="text"
						placeholder="+1 234 567 89"
						onChange={handleChange}
					/>

					<label htmlFor="">Description</label>
					<textarea
						placeholder="A short description of yourself"
						name="desc"
						id=""
						cols="30"
						rows="10"
						onChange={handleChange}
					/>
				</div>
			</form>
		</div>
	);
}
