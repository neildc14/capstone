import React, { useRef } from "react";
import {
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { UilPrint } from "@iconscout/react-unicons";

const PersonnelTripTicketDetails = ({ ticketDetails, handlePrint }) => {
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
              {ticketDetails._id?.slice(0, 7)}
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
              {ticketDetails.personnel_fullname}
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
              {ticketDetails.ambulance?.license_plate}
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
              {ticketDetails?.destination}
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
              {ticketDetails?.patient_fullname}
            </Text>
          </VStack>
        </CardBody>
      </Card>{" "}
      <Button
        size="sm"
        id="printBtn"
        display="inline-flex"
        gap={1}
        width={{ base: "100%" }}
        mt={4}
        px={6}
        borderRadius="md"
        bgColor="gray.300"
        onClick={handlePrint}
      >
        <UilPrint />
        Print
      </Button>{" "}
    </>
  );
};

export default React.memo(PersonnelTripTicketDetails);
