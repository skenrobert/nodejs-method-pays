import { Router } from "express";
import {
  createOrder,
  captureOrder,
  cancelPayment,
} from "../controllers/payment.controller.js";

const router = Router();

// router.get('/', (req, res) => res.redirect("/index.html"))

router.get('/test', (req, res) => res.send('test route'))

router.post("/create-order", createOrder);
// router.get("/create-order", createOrder);

router.get("/capture-order", captureOrder);

router.get("/cancel-payment", cancelPayment);

export default router;