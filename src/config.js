import { config } from "dotenv";
config();

// Paypal this data need stay safe in production
export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT; //variable envieronment 
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET; //variable environment
export const PAYPAL_API = process.env.PAYPAL_API; // url sandbox or live for your app

// Server
export const PORT = process.env.PORT || 3000;
export const HOST =
  process.env.NODE_ENV === "production"
    ? process.env.HOST
    : "http://localhost:" + PORT;