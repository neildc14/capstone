import React from "react";
import { Card, CardBody, Heading, Text, VStack } from "@chakra-ui/react";

const PersonnelTripTicketDetails = ({ ticketDetails }) => {
  return (
    <>
      <Card background="gray.100">
        <CardBody>
          <VStack align="left" spacing={1} pb={3}>
            <Heading
              as="h5"
              display="block"
              fontSize="md"
              fontWeight="semibold"
            >
              Trip Ticket ID:
            </Heading>
            <Text as="span" fontWeight="normal">
              {ticketDetails._id}
            </Text>
          </VStack>
          <VStack align="left" spacing={1} pb={3}>
            <Heading
              as="h5"
              display="block"
              fontSize="md"
              fontWeight="semibold"
            >
              Driver:
            </Heading>
            <Text as="span" fontWeight="normal" textTransform="capitalize">
              {ticketDetails.ambulance_personnel["fullName"]}
            </Text>
          </VStack>
          <VStack align="left" spacing={1} pb={3}>
            <Heading
              as="h5"
              display="block"
              fontSize="md"
              fontWeight="semibold"
            >
              Ambulance Plate:
            </Heading>
            <Text as="span" fontWeight="normal">
              {ticketDetails.ambulance["license_plate"]}
            </Text>
          </VStack>
          <VStack align="left" spacing={1} pb={3}>
            <Heading
              as="h5"
              display="block"
              fontSize="md"
              fontWeight="semibold"
            >
              Destination:
            </Heading>
            <Text as="span" fontWeight="normal" textTransform="capitalize">
              {ticketDetails.destination}
            </Text>
          </VStack>
          <VStack align="left" spacing={1} pb={3}>
            <Heading
              as="h5"
              display="block"
              fontSize="md"
              fontWeight="semibold"
              textTransform="capitalize"
            >
              Patient Name:
            </Heading>
            <Text as="span" fontWeight="normal" textTransform="capitalize">
              Macaraeg Macaraeg
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </>
  );
};

export default React.memo(PersonnelTripTicketDetails);
