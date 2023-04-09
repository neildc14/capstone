import React, { useState } from "react";
import {
  Box,
  Heading,
  Flex,
  Button,
  Card,
  CardBody,
  Text,
  ModalBody,
} from "@chakra-ui/react";
import ModalContainer from "./ModalContainer";
import { UilEye } from "@iconscout/react-unicons";
import { DateTime } from "luxon";

const RequestCard = ({
  name,
  date_time,
  bgColor = "#F5F5F5",
  borderRadius = "md",
}) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(!isOpen);
  };

  const dt = DateTime.fromISO(date_time);
  const formattedDate = dt.toFormat("MM/dd/yy hh:mm:ss");

  return (
    <>
      <Card
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
        bgColor={bgColor}
        borderRadius={borderRadius}
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
              flexBasis={{ md: "20%" }}
              display="block"
              fontSize="md"
              fontWeight="semibold"
            >
              Requestor:
              <Text as="span" ps={2} fontWeight="normal">
                {name}
              </Text>
            </Heading>
            <Heading
              as="h5"
              display="block"
              fontSize="md"
              fontWeight="semibold"
            >
              Date & Time Requested:
              <Text as="span" ps={2} fontWeight="normal">
                {formattedDate}
              </Text>
            </Heading>
            <Button
              size="sm"
              display="inline-flex"
              gap={1}
              width={{ base: "100%", md: "inherit" }}
              px={6}
              bgColor="custom.primary"
              color="white"
              _hover={{ bgColor: "orange.500" }}
              onClick={handleOpenModal}
            >
              <UilEye color="white" /> View
            </Button>
          </Flex>
        </CardBody>
      </Card>

      <ModalContainer
        header="Requestor ID"
        header_detail="pqoerjflsdakfn"
        isOpen={isOpen}
        onClose={handleOpenModal}
      >
        <ModalBody>
          <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
            Requestor Name:
            <Text as="span" fontWeight="normal" textTransform="capitalize">
              Nero Nero
            </Text>
          </Heading>
        </ModalBody>
      </ModalContainer>
    </>
  );
};

export default RequestCard;
