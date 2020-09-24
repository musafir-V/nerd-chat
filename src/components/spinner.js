import { Loader, Dimmer } from "semantic-ui-react";
import React from "react";

const Spinner = () => (
  <Dimmer>
    <Loader size="huge" content="Preparing Chat" />
  </Dimmer>
);
export default Spinner;
