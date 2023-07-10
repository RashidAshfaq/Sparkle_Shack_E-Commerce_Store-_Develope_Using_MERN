
const express = require('express');
const app = express();
const stripe = require('stripe');
require('dotenv').config();
const stripeInstance = stripe(process.env.PRIVATE_KEY);

const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  const totalQuantity = req.body.cart.items;
  
  const line_items = req.body.cartItems.map((item) => {
    const quantity = totalQuantity[item.id] || 0;
  
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title,
          images: [item.thumbnail],
          description: item.description,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: quantity,
    };
  });
  

  const session = await stripeInstance.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'PK'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd',
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd',
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1,
            },
            maximum: {
              unit: 'business_day',
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/success`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({url: session.url});
});

module.exports = router;