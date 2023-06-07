import axios from "axios"; // librari same to fetch but more compact 
import {
  PAYPAL_API,
  HOST,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
} from "../config.js";



export const createOrder = (req, res) => res.send("Order created");

export const captureOrder = (req, res) => res.send("capture order");

export const cancelPayment = (req, res) => res.send("cancel");

