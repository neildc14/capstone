import React from "react";
import { Box, Card, CardBody, Heading, Text } from "@chakra-ui/react";

const TripTicket = () => {
  return (
    <Card my={2} bgColor="gray.50">
      <CardBody>
        <Heading as="h4" py={1} fontSize="lg" fontWeight="semibold">
          Ambulance Personnel:
          <Text as="span" ps={2} fontWeight="normal">
            Juan Dela Cruz
          </Text>
        </Heading>
        <Heading as="h4" py={1} fontSize="lg" fontWeight="semibold">
          Ambulance Plate:
          <Text as="span" ps={2} fontWeight="normal">
            ABCE123
          </Text>
        </Heading>
        <Heading as="h4" py={1} fontSize="lg" fontWeight="semibold">
          Destination:
          <Text as="span" ps={2} fontWeight="normal">
            PJG
          </Text>
        </Heading>
      </CardBody>
    </Card>
  );
};

export default TripTicket;
