import React, { useState } from "react";
import { Button, Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";
import ModalContainer from "./global/ModalContainer";

const AdministrativeCardContainer = ({ card_header, card_header_detail }) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(!isOpen);
  };

  return (
    <>
      <Card boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)" bgColor="#F5F5F5">
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
              {card_header}:
              <Text as="span" fontWeight="normal">
                {card_header_detail}
              </Text>
            </Heading>
            <Button
              size="sm"
              width={{ base: "100%", md: "inherit" }}
              px={6}
              bgColor="custom.primary"
              color="white"
              _hover={{ bgColor: "orange.500" }}
              onClick={handleOpenModal}
            >
              View
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
        <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
          Requestor Name:
          <Text as="span" fontWeight="normal" textTransform="capitalize">
            Nero Nero
          </Text>
        </Heading>
      </ModalContainer>
    </>
  );
};

export default React.memo(AdministrativeCardContainer);
