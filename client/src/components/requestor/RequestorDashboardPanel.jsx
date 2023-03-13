import React from "react";
import { Box, Heading, Divider, Card, Flex } from "@chakra-ui/react";
import RequestCard from "./RequestCard";
import TripTicket from "../TripTicket";
import PanelCard from "../PanelCard";

const RequestorDashboardPanel = () => {
  return (
    <>
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
            <PanelCard
              cardHeader="Total Requests Made"
              cardBody="10"
              bgColor="blue.200"
            />
            <PanelCard
              cardHeader="Total Successful Transport"
              cardBody="10"
              bgColor="green.200"
            />
            <PanelCard
              cardHeader="Total Successful Transport"
              cardBody="10"
              bgColor="orange.200"
            />
          </Flex>
        </Box>

        <Box as="section" mt={4}>
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
        <Box as="section" mt={4}>
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
    </>
  );
};

export default RequestorDashboardPanel;
