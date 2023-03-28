import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../components/checkoutForm/CheckoutForm";
import newRequest from "../../utils/newRequest";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

export default function Pay() {
	const [clientSecret, setClientSecret] = useState("");

	const { id } = useParams();

	useEffect(() => {
		const makeRequest = async () => {
			try {
				const res = await newRequest.post(
					`/orders/create-payment-intent/${id}`
				);
				setClientSecret(res.data.clientSecret);
			} catch (err) {
				console.log(err);
			}
		};
		makeRequest();
	}, []);

	const appearance = {
		theme: "stripe",
	};

	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className="pay">
			{clientSecret && (
				<Elements
					options={options}
					stripe={stripePromise}
				>
					<CheckoutForm />
				</Elements>
			)}
		</div>
	);
}
