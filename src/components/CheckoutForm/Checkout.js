import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
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
  console.log("C.A.R.T", cart.order);
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [checkoutToken, setcheckoutToken] = useState(null);
  const [shippingData, setShippingData] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Il est impossible d'utiliser un async function dans un useEffect il faut donc creer une nouvelle fonction à l'interieur
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.cart.id, {
          type: "cart",
        });
        setcheckoutToken(token);
      } catch (error) {
        // console.log(error);
        history.pushState("/");
      }
    };
    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);
    }, 3000);
  };

  // Form et Confirmation sont des fonction component
  const Form = () =>
    activeStep === 0 ? (
      <AddressForm checkoutToken={checkoutToken} next={next} />
    ) : (
      <PaymentForm
        shippingData={shippingData}
        checkoutToken={checkoutToken}
        backStep={backStep}
        onCaptureCheckout={cart.onCaptureCheckout}
        nextStep={nextStep}
        timeout={timeout}
      />
    );

  let Confirmation = () =>
    cart.order.customer ? (
      <>
        <div>
          <Typography variant="h5">
            Merci pour vos achats, {cart.order.customer.firstname}{" "}
            {cart.order.customer.lastname}
          </Typography>
          <Typography variant="subtitle2">
            Order ref: {cart.order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to home
        </Button>
      </>
    ) : isFinished ? (
      // No Credit card Logique
      <>
        <div>
          <Typography variant="h5">Merci pour vos achats</Typography>
        </div>
        <br />
        <Button component={Link} to="/" variant="outlined" type="button">
          Back to home
        </Button>
      </>
    ) : (
      <div>
        <CircularProgress />
      </div>
    );
  if (cart.error) {
    <>
      <Typography variant="h5">Error:{cart.error}</Typography>
    </>;
  }

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
