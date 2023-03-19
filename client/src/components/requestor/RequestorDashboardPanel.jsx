import React, { useState } from "react";
import { Box, Heading, Divider, Flex } from "@chakra-ui/react";
import RequestCard from "./RequestCard";
import TripTicket from "../TripTicket";
import PanelCard from "../PanelCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const RequestorDashboardPanel = () => {
  const fetchRecentRequest = async () => {
    const response = await axios.get(`${ENDPOINT}request`);
    return response.data[0];
  };

  const { data, isLoading, isFetching, error } = useQuery(
    ["ambulance_request"],
    fetchRecentRequest,
    {
      refetchOnWindowFocus: true,
    }
  );

  {
    !isLoading && console.log(data, data._id, data.status);
  }

  return (
    <>
      <Box p={{ md: 6 }}>
        <Flex flexDirection={{ base: "column-reverse", md: "column" }}>
          <Box>
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
          </Box>

          <Box as="section" mb={4}>
            <Box mt={4}>
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
              {!isLoading && (
                <RequestCard
                  request_data={data}
                  request_id={data._id}
                  request_status={data.status}
                />
              )}
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
        </Flex>
      </Box>
    </>
  );
};

export default RequestorDashboardPanel;
