import React, { useState } from "react";
import {
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

const DriverCard = ({ name, borderRadius = "md" }) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <Card
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
        bgColor={isOpen ? "orange.300" : "white"}
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
              display="block"
              fontSize="md"
              fontWeight="semibold"
            >
              Driver:
              <Text as="span" ps={2} fontWeight="normal">
                {name}
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
            Driver:
            <Text as="span" fontWeight="normal" textTransform="capitalize">
              Nero
            </Text>
          </Heading>
        </ModalBody>
      </ModalContainer>
    </>
  );
};

export default DriverCard;
