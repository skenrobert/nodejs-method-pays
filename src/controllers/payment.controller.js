import axios from "axios"; // librari same to fetch but more compact 
import {
  PAYPAL_API,
  HOST,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
} from "../config.js";

//https://developer.paypal.com/docs/api/orders/v2/
export const createOrder = async (req, res) => {
  try {

    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: { //articles
            currency_code: "USD",
            value: "105.70",
          },
        },
      ],
      application_context: {
        brand_name: "mycompany.com",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${HOST}/capture-order`,// routes in payment.routes.js
        cancel_url: `${HOST}/cancel-payment`,// routes in payment.routes.js 
      },
    };

    // format the body
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials"); // allow add username, password

    // Generate an access token
    const { //request with axios for create access_token
      data //Oauth 2.0 authentication
      // data: { access_token }, //Oauth 2.0 authentication
    } = await axios.post(
      // https://api-m.paypal.com/v2/checkout/orders really api paypal
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",// test domain 
      params,
      {
        headers: {//default axios but you are the change 
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );

    console.log(data);
    // console.log(access_token);

    // make a request
    // const response = await axios.post( //request with axios create the orders
    //   `${PAYPAL_API}/v2/checkout/orders`, // PAYPAL_API TEST URL
    //   order, // OBJ create with details behind  
    //   {
    //     headers: {
    //       Authorization: `Bearer ${access_token}`,// send token create behind for verify request
    //     },
    //   }
    // );

    // console.log(response.data);

    // return res.json(response.data);

  } catch (error) {

    console.log(error);
    return res.status(500).json("Something goes wrong");

  }
};

export const captureOrder = async (req, res) => {
  const { token } = req.query;

  try {
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );

    console.log(response.data);

    res.redirect("/payed.html");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

export const cancelPayment = (req, res) => res.redirect("/");
