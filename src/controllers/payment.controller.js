import axios from "axios"; // librari same to fetch but more compact 
import {
  PAYPAL_API,
  HOST,
  PAYPAL_API_CLIENT,
  PAYPAL_API_SECRET,
} from "../config.js";




export const createOrder = async (req, res) => {
  try {

    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: "105.70",
          },
        },
      ],
      application_context: {
        brand_name: "mycompany.com",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${HOST}/capture-order`,
        cancel_url: `${HOST}/cancel-payment`,
      },
    };

    // format the body
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    // Generate an access token
    const {
      // data,
      data: { access_token },
    } = await axios.post(
      // "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      `${PAYPAL_API}/v1/oauth2/token`,
      params,
      {
        headers: {// axios add for default, show for example
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );

    // console.log(data);

  //  make a request
    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    // console.log(response.data);

    return res.json(response.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json("Something goes wrong");
  }
};







export const captureOrder = async (req, res) =>{

// res.send("capture order")

  const { token } = req.query; // read token url with response, save in database and details buy client 

  try { // send 
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

export const cancelPayment = (req, res) =>{
  // res.send("cancel")
  res.redirect("/");
} ;

