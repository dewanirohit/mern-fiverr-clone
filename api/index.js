const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");

const userRoute = require("./routes/user.routes.js");
const gigRoute = require("./routes/gig.routes.js");
const orderRoute = require("./routes/order.routes.js");
const conversationRoute = require("./routes/conversation.routes.js");
const messageRoute = require("./routes/message.routes.js");
const reviewRoute = require("./routes/review.routes.js");
const authRoute = require("./routes/auth.routes.js");

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log("Connected to DB!");
	} catch (error) {
		console.log("Error connecting to DB");
	}
};

const whiteList = [process.env.FRONT_URL];

const corsOptionsDelegate = (req, callback) => {
	let corsOptions;

	const isDomainAllowed = whiteList.indexOf(req.header("Origin")) !== -1;

	if (isDomainAllowed) corsOptions = { origin: true, credentials: true };
	else corsOptions = { origin: false };

	callback(null, corsOptions);
};

app.use(helmet());
app.use(cors(corsOptionsDelegate));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

app.use((err, req, res, next) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Something went wrong!";

	return res.status(errorStatus).send(errorMessage);
});

app.listen(process.env.PORT || 8800, () => {
	connect();
	console.log("Backend server is running!");
});
