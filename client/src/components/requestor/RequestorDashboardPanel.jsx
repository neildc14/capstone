import React from "react";
import { Box, Heading, Divider, Card, Flex } from "@chakra-ui/react";
import RequestCard from "./RequestCard";
import TripTicket from "../TripTicket";

const RequestorDashboardPanel = () => {
  return (
    <Box p={{ md: 6 }}>
      <Box>
        <Heading
          as="h2"
          py={2}
          display="flex"
          fontSize="xl"
          fontWeight="semibold"
          bgColor="white"
        >
          Dashboard Panel
        </Heading>
        <Divider />
      </Box>
      <Box as="section" my={8}>
        <Flex
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-evenly"
          gap="2rem"
        >
          <Card
            flex={{ md: "1" }}
            height={{ base: "4rem", md: "7rem" }}
            bgColor="gray.50"
          >
            lorem10
          </Card>
          <Card
            flex={{ md: "1" }}
            height={{ base: "4rem", md: "7rem" }}
            bgColor="gray.50"
          >
            lorem10
          </Card>
          <Card
            flex={{ md: "1" }}
            height={{ base: "4rem", md: "7rem" }}
            bgColor="gray.50"
          >
            lorem10
          </Card>
        </Flex>
      </Box>

      <Box as="section" mt={4} overflowY="scroll">
        <Heading
          as="h2"
          py={2}
          display="flex"
          fontSize="xl"
          fontWeight="semibold"
          bgColor="white"
        >
          Recent Request
        </Heading>
        <Divider />
        <RequestCard />
      </Box>
      <Box as="section" mt={4} overflowY="scroll">
        <Heading
          as="h2"
          py={2}
          display="flex"
          fontSize="xl"
          fontWeight="semibold"
          bgColor="white"
        >
          Trip Ticket
        </Heading>
        <Divider />
        <TripTicket />
      </Box>
    </Box>
  );
};

export default RequestorDashboardPanel;
