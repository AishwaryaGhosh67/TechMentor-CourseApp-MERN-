require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");

// Import Routes
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRouter = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const paymentRouter = require("./router/payment-router"); // ✅ new line

const connectDB = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

// CORS setup
corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, DELETE, PUT, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Mount Routers
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRouter);
app.use("/api/admin", adminRoute);
app.use("/api/payment", paymentRouter); // ✅ new line

// Error handler
app.use(errorMiddleware);

// Start server
const PORT = 5000;
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port: ${PORT}`);
    });
});
