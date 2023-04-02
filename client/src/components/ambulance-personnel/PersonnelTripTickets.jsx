import { Box } from "@chakra-ui/react";
import React from "react";
import PersonnelTripTicketCard from "./PersonelTripTicketCard";

const PersonnelTripTickets = () => {
  return (
    <Box as="main">
      <Box as="section">
        {" "}
        <PersonnelTripTicketCard />
      </Box>
    </Box>
  );
};

export default PersonnelTripTickets;
