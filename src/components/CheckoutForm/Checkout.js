import React, { useState, useEffect } from "react";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import { commerce } from "../../lib/commerce";
import useStyles from "./checkoutStyles";

const steps = ["Shipping address", "Payment details"];

function Checkout(cart) {
  console.log("C.A.R.T", cart.cart);
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setcheckoutToken] = useState(null);

  useEffect(() => {
    // Il est impossible d'utiliser un async function dans un useEffect il faut donc creer une nouvelle fonction à l'interieur
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.cart.id, {
          type: "cart",
        });
        // console.log("TOKEN", token);
        setcheckoutToken(token);
      } catch (error) {}
    };
    generateToken();
  }, [cart]);

  // Form et Confirmation sont des fonction component
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} />
    ) : (
      <PaymentForm />
    );

  const Confirmation = () => <div>Confirmation</div>;

  return (
    <>
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
}

export default Checkout;
