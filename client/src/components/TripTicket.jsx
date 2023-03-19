import React from "react";
import { Box, Card, CardBody, Heading, Text } from "@chakra-ui/react";

const TripTicket = ({
  ticket_id,
  ambulance_personnel,
  ambulance_plate,
  destination,
}) => {
  return (
    <Card my={2} bgColor="gray.50">
      <CardBody>
        <Heading as="h5" py={1} fontSize="md" fontWeight="semibold">
          Ticket ID:
          <Text as="span" ps={2} fontWeight="normal" textTransform="capitalize">
            {ticket_id}
          </Text>
        </Heading>
        <Heading as="h5" py={1} fontSize="md" fontWeight="semibold">
          Driver:
          <Text as="span" ps={2} fontWeight="normal" textTransform="capitalize">
            {ambulance_personnel}
          </Text>
        </Heading>
        <Heading as="h5" py={1} fontSize="md" fontWeight="semibold">
          Ambulance Plate:
          <Text as="span" ps={2} fontWeight="normal" textTransform="capitalize">
            {ambulance_plate}
          </Text>
        </Heading>
        <Heading as="h5" py={1} fontSize="md" fontWeight="semibold">
          Destination:
          <Text as="span" ps={2} fontWeight="normal" textTransform="capitalize">
            {destination}
          </Text>
        </Heading>
      </CardBody>
    </Card>
  );
};

export default TripTicket;
