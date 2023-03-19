import React, { useState } from "react";
import { Box, Heading, Divider, Flex } from "@chakra-ui/react";
import RequestCard from "./RequestCard";
import TripTicket from "../TripTicket";
import PanelCard from "../PanelCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const RequestorDashboardPanel = () => {
  const fetchRecentRequestAndTicket = async () => {
    const results = await Promise.allSettled([
      axios.get(`${ENDPOINT}request`),
      axios.get(`${ENDPOINT}ticket`),
    ]);

    return results;
  };

  const { data, isLoading, isFetching, error } = useQuery(
    ["ambulance_request_with_ticket"],
    fetchRecentRequestAndTicket,
    {
      refetchOnWindowFocus: true,
    }
  );

  {
    !isLoading &&
      console.log(
        data,
        data[0].value.data[0]._id,
        data[0].value.data[0].status
      );
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
                  request_data={data[0].value.data[0]}
                  request_id={data[0].value.data[0]._id}
                  request_status={data[0].value.data[0].status}
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
              {!isLoading && (
                <TripTicket
                  trip_ticket_data={data[1].value.data[0]}
                  ambulance_personnel={
                    data[1].value.data[0].ambulance_personnel["fullName"]
                  }
                  ambulance_plate={
                    data[1].value.data[0].ambulance["license_plate"]
                  }
                  destination={data[1].value.data[0].destination}
                />
              )}
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default RequestorDashboardPanel;
