import React from "react";
import ReactDOM from "react-dom";
import paypal from "paypal-checkout";

const PaypalCheckoutButton = order => {
  const paypalConf = {
    currency: "USD",
    env: "sandbox",
    client: {
      sandbox: process.env.REACT_APP_APP_ID,
      production: "YOUR-PRODUCTION-APP-ID"
    },
    style: {
      label: "checkout",
      size: "small",
      shape: "pill",
      color: "black",
      tagline: "false"
    }
  };

  const PayPalButton = paypal.Button.driver("react", { React, ReactDOM });

  const payment = (data, actions) => {
    const payment = {
      transactions: [
        {
          amount: {
            total: order.total,
            currency: paypalConf.currency
          },
          description: "Phone Store Transaction"
        }
      ],
      note_to_payer: "Contact us if you need anything"
    };

    return actions.payment.create({ payment });
  };

  const onAuthorize = (data, actions) => {
    return actions.payment
      .execute()
      .then(response => {
        console.log("The payment was succeeded!", response);
        order.clearCart();
        order.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const onError = error => {
    console.log("Error!", error);
  };

  const onCancel = data => {
    console.log("The payment was cancelled!", data);
  };

  return (
    <PayPalButton
      env={paypalConf.env}
      client={paypalConf.client}
      payment={(data, actions) => payment(data, actions)}
      onAuthorize={(data, actions) => onAuthorize(data, actions)}
      onCancel={(data, actions) => onCancel(data, actions)}
      onError={error => onError(error)}
      style={paypalConf.style}
      commit
      locale="en_US"
    />
  );
};
export default PaypalCheckoutButton;
