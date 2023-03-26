import React, { useEffect, useState } from "react";
import { Box, Heading, Divider, Flex, Skeleton } from "@chakra-ui/react";
import RequestCard from "./RequestCard";
import TripTicket from "../TripTicket";
import PanelCard from "../PanelCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const RequestorDashboardPanel = () => {
  const [totalRequest, setTotalRequest] = useState("");
  const [totalSuccessfulTransport, setTotalSuccessfulTransport] = useState("");

  const fetchRecentRequestAndTicket = async () => {
    const results = await Promise.allSettled([
      axios.get(`${ENDPOINT}request`),
      axios.get(`${ENDPOINT}ticket`),
    ]);

    return results;
  };

  const { data, isLoading, isFetching, error, isFetched } = useQuery(
    ["ambulance_request_with_ticket"],
    fetchRecentRequestAndTicket,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setTotalRequest(data[0]?.value?.data.length || 0);
      setTotalSuccessfulTransport(data[1]?.value?.data.length || 0);
    }
  }, [data, isLoading, isFetching]);

  console.log(totalRequest, totalSuccessfulTransport, data);
  return (
    <>
      <Box px={{ md: 6 }}>
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
                  cardBody={totalRequest}
                  bgColor="blue.200"
                />

                <PanelCard
                  cardHeader="Total Successful Transport"
                  cardBody={totalSuccessfulTransport}
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
              <Skeleton fadeDuration={1} isLoaded={!isLoading || !isFetching}>
                {!isLoading &&
                  !isFetching &&
                  data[0]?.status === "fulfilled" && (
                    <RequestCard
                      request_data={data[0]?.value.data[0]}
                      request_id={data[0]?.value.data[0]._id}
                      request_status={data[0]?.value.data[0].status}
                    />
                  )}
                {!isLoading &&
                  !isFetching &&
                  data[0]?.status === "rejected" && <p>No request found</p>}
              </Skeleton>
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
              <Skeleton fadeDuration={1} isLoaded={!isLoading || !isFetching}>
                {!isLoading &&
                  !isFetching &&
                  data[1]?.status === "fulfilled" && (
                    <TripTicket
                      trip_ticket_data={data[1]?.value.data[0]}
                      ticket_id={data[1]?.value.data[0]._id}
                      ambulance_personnel={
                        data[1]?.value.data[0].ambulance_personnel["fullName"]
                      }
                      ambulance_plate={
                        data[1]?.value.data[0].ambulance["license_plate"]
                      }
                      destination={data[1]?.value.data[0].destination}
                    />
                  )}
                {!isLoading &&
                  !isFetching &&
                  data[1]?.status === "rejected" && <p>No trip ticket found</p>}
              </Skeleton>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default RequestorDashboardPanel;
