import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { PORT } from "./config.js";

import paymentRoutes from "./routes/payment.routes.js"; //make this module create with .js in the end is in express

const app = express();
app.use(cors());
app.use(morgan("dev"));

// app.listen(3000);
// console.log('server on port', 3000)


app.use(paymentRoutes); // call all route create in payment.routes.js

app.use(express.static(path.resolve("./src/public"))); // index.html and payed.html

app.listen(PORT);
console.log(`Server on port http://localhost:${PORT}`);
console.log(`environment: ${process.env.NODE_ENV}`);