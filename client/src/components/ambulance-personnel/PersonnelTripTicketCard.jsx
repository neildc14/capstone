import React from "react";
import { Button, Card, CardBody, Flex, Heading, Text } from "@chakra-ui/react";

const PersonnelTripTicketCard = () => {
  return (
    <Card boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)" bgColor="#F5F5F5">
      <CardBody>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          gap={{ base: 4, md: 0 }}
        >
          <Heading as="h5" display="block" fontSize="md" fontWeight="semibold">
            Ticket ID:{" "}
            <Text as="span" fontWeight="normal">
              3210mfg3asdnfkn489fnf
            </Text>
          </Heading>
          <Button
            size="sm"
            width={{ base: "100%", md: "inherit" }}
            px={6}
            bgColor="custom.primary"
            color="white"
            _hover={{ bgColor: "orange.500" }}
          >
            View
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default PersonnelTripTicketCard;
