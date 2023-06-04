import express from "express";
import morgan from "morgan";
import cors from "cors";
// import path from "path";
import { PORT } from "./config.js";

import paymentRoutes from "./routes/payment.routes.js"; //make this module create with .js in the end is in express

const app = express();

// app.listen(3000);
// console.log('server on port', 3000)
app.listen(PORT);

// app.use(cors());
// app.use(morgan("dev"));

app.use(paymentRoutes);

// app.use(express.static(path.resolve("./src/public")));

// console.log(`Server on port http://localhost:${PORT}`);
// console.log(`environment: ${process.env.NODE_ENV}`);