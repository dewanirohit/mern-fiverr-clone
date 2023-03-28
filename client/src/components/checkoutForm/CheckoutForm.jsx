import { useEffect, useState } from "react";

import {
	PaymentElement,
	LinkAuthenticationElement,
	useStripe,
	useElements,
} from "@stripe/react-stripe-js";

import "./checkoutForm.scss";

export default function CheckoutForm() {
	const stripe = useStripe();
	const elements = useElements();

	const [email, setEmail] = useState("");
	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) return;

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) return;

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!");
					break;

				case "processing":
					setMessage("Payment is being processed");
					break;

				case "requires_payment_method":
					setMessage(
						"Your payment was not successful, please try again."
					);
					break;

				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	async function handleSubmit(e) {
		e.preventDefault();

		if (!stripe || !elements) return;

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${import.meta.env.VITE_BASE_FRONT_URL}/success`,
			},
		});

		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occurred");
		}

		setIsLoading(false);
	}

	const paymentElementOptions = { layout: "tabs" };

	return (
		<div className="container">
			<form
				id="payment-form"
				onSubmit={handleSubmit}
			>
				<LinkAuthenticationElement
					id="link-authentication-element"
					onChange={(e) => setEmail(e.target?.value)}
				/>
				<PaymentElement
					id="payment-element"
					options={paymentElementOptions}
				/>
				<button
					disabled={isLoading || !stripe || !elements}
					id="submit"
				>
					<span id="button-text">
						{isLoading ? (
							<div
								className="spinner"
								id="spinner"
							></div>
						) : (
							"Pay now"
						)}
					</span>
				</button>
				{/* Show any error or success messages */}
				{message && <div id="payment-message">{message}</div>}
			</form>
		</div>
	);
}
