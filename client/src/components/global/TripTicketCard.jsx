import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  ModalBody,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import ModalContainer from "./ModalContainer";
import { UilEye } from "@iconscout/react-unicons";

const PersonnelTripTicketCard = ({
  showTripTicketDetails,
  trip_ticket,
  ticketDetails,
  setTicketDetails,
}) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [isOpen, setOpen] = useState(false);

  const handleOpenModal = () => {
    setTicketDetails(trip_ticket);
    if (isLargerThan768) {
      showTripTicketDetails();

      return;
    }
    setOpen(!isOpen);
  };

  return (
    <>
      <Card
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
        borderRadius="sm"
        bgColor={
          ticketDetails?._id === trip_ticket?._id ? "orange.300" : "#F5F5F5"
        }
      >
        <CardBody>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems="center"
            gap={{ base: 4, md: 0 }}
          >
            <Heading
              as="h5"
              display="block"
              fontSize="md"
              fontWeight="semibold"
            >
              Patient Name:{" "}
              <Text as="span" fontWeight="normal">
                {trip_ticket?.patient_fullname}
              </Text>
            </Heading>
            <Button
              size="sm"
              display="inline-flex"
              gap={1}
              width={{ base: "100%", md: "inherit" }}
              px={6}
              bgColor={
                ticketDetails?._id === trip_ticket._id
                  ? "orange.500"
                  : "custom.primary"
              }
              color="white"
              _hover={{ bgColor: "orange.500" }}
              onClick={handleOpenModal}
            >
              <UilEye color="white" /> View
            </Button>
          </Flex>
        </CardBody>
      </Card>

      {!isLargerThan768 && (
        <ModalContainer
          header="Requestor ID"
          header_detail="pqoerjflsdakfn"
          isOpen={isOpen}
          onClose={handleOpenModal}
        >
          <ModalBody>
            <VStack align="left" spacing={1} pb={2}>
              <Heading
                as="h5"
                display="block"
                fontSize="md"
                fontWeight="semibold"
              >
                Trip Ticket ID:
              </Heading>
              <Text as="span" fontWeight="normal">
                {trip_ticket?._id}
              </Text>
            </VStack>
            <VStack align="left" spacing={1} pb={2}>
              <Heading
                as="h5"
                display="block"
                fontSize="md"
                fontWeight="semibold"
              >
                Driver:
              </Heading>
              <Text as="span" fontWeight="normal" textTransform="capitalize">
                {trip_ticket?.ambulance_personnel.fullName}
              </Text>
            </VStack>
            <VStack align="left" spacing={1} pb={2}>
              <Heading
                as="h5"
                display="block"
                fontSize="md"
                fontWeight="semibold"
              >
                Ambulance Plate:
              </Heading>
              <Text as="span" fontWeight="normal">
                {trip_ticket?.ambulance?.license_plate}
              </Text>
            </VStack>
            <VStack align="left" spacing={1} pb={2}>
              <Heading
                as="h5"
                display="block"
                fontSize="md"
                fontWeight="semibold"
              >
                Destination:
              </Heading>
              <Text as="span" fontWeight="normal" textTransform="capitalize">
                {trip_ticket?.destination}
              </Text>
            </VStack>
            <VStack align="left" spacing={1} pb={2}>
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
                {trip_ticket?.patient_fullname}
              </Text>
            </VStack>
          </ModalBody>
        </ModalContainer>
      )}
    </>
  );
};

export default React.memo(PersonnelTripTicketCard);
