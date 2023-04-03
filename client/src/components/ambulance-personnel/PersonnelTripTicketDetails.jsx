import React from "react";
import { Card, CardBody, Heading, Text, VStack } from "@chakra-ui/react";

const PersonnelTripTicketDetails = () => {
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
              asdjfeqflkewqjhrrwin
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
            <Text as="span" fontWeight="normal">
              Juan Dela Crux
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
              ABCM 342
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
            <Text as="span" fontWeight="normal">
              Manila
            </Text>
          </VStack>
          <VStack align="left" spacing={1} pb={3}>
            <Heading
              as="h5"
              display="block"
              fontSize="md"
              fontWeight="semibold"
            >
              Patient Name:
            </Heading>
            <Text as="span" fontWeight="normal">
              Macaraeg Macaraeg
            </Text>
          </VStack>
        </CardBody>
      </Card>
    </>
  );
};

export default React.memo(PersonnelTripTicketDetails);
