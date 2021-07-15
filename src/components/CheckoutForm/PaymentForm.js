import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "../CheckoutForm/Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = (checkoutToken) => {
  const handleSubmit = async (event, elements, stripe) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.checkoutToken.live.line_items,
        customer: {
          firstname: checkoutToken.shippingData.firstName,
          lastname: checkoutToken.shippingData.lastName,
          email: checkoutToken.shippingData.email,
        },
        shipping: {
          name: "Primary",
          street: checkoutToken.shippingData.address1,
          town_city: checkoutToken.shippingData.city,
          county_state: checkoutToken.shippingData.shippingSubdivision,
          postal_zip_code: checkoutToken.shippingData.zip,
          country: checkoutToken.shippingData.shippingCountry,
        },
        fulfillment: {
          shipping_method: checkoutToken.shippingData.shippingOption,
        },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      checkoutToken.onCaptureCheckout(
        checkoutToken.checkoutToken.id,
        orderData
      );
      checkoutToken.timeout();

      checkoutToken.nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={checkoutToken.backStep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay{" "}
                  {
                    checkoutToken.checkoutToken.live.subtotal
                      .formatted_with_symbol
                  }
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;
