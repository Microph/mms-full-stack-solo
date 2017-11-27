import React, { Component } from "react";


import ReceivedOffers from "./managements/receivedOffer";
import SentRequests from "./managements/sentRequest";

class MyOffers extends Component {
  render() {
    return (
      <div>
        <ReceivedOffers />
        <SentRequests />
      </div>
    );
  }
}

export default MyOffers;
