import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Divider,
  Flex,
  Skeleton,
  Card,
  CardBody,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { UilThLarge } from "@iconscout/react-unicons";
import RequestCard from "../RequestCard";
import TripTicket from "../TripTicket";
import PanelCard from "../PanelCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PersonnelPanelCard from "../global/PanelCard";

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

  const panel_card_data = [
    { title: "Total Requests", total: 0, type: "Pending" },
    {
      title: "Total Requests",
      total: 0,
      type: "Approved",
    },
    { title: "Total Requests", total: totalRequest, type: "Fulfilled" },
    { title: "Total Requests", total: 0, type: "Rejected" },
  ];

  return (
    <>
      <Box>
        <Flex
          display="flex"
          flexDirection={{ base: "column-reverse", md: "column" }}
          gap={{ base: 4, md: 0 }}
        >
          <Box as="section">
            <Box>
              <Flex justifyContent="space-between" alignItems="center">
                <Heading
                  as="h2"
                  display="inline-flex"
                  gap={2}
                  py={2}
                  fontSize="xl"
                  fontWeight="semibold"
                  bgColor="white"
                  color="gray.700"
                >
                  <UilThLarge color="#FF7A00" /> Dashboard Panel
                </Heading>
              </Flex>
              <Divider />
            </Box>
            <Box my={8}>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(4, 1fr)",
                }}
                gap={6}
              >
                {panel_card_data?.map((panel_card) => (
                  <GridItem key={panel_card.type}>
                    <PersonnelPanelCard
                      total={panel_card.total}
                      title={panel_card.title}
                      type={panel_card.type}
                      bgColor="#E2E8F0"
                    />
                  </GridItem>
                ))}
              </Grid>
            </Box>
          </Box>

          <Box as="section" pb={4}>
            <Box pt={4}>
              <Heading
                as="h2"
                py={2}
                fontSize="xl"
                fontWeight="semibold"
                bgColor="white"
              >
                Recent Request
              </Heading>
              <Divider />
              {!isLoading && !isFetching && data[0]?.status === "fulfilled" && (
                <RequestCard
                  request_data={data[0]?.value.data[0]}
                  request_id={data[0]?.value.data[0]._id}
                  request_status={data[0]?.value.data[0].status}
                />
              )}
              {!isLoading && !isFetching && data[0]?.status === "rejected" && (
                <Card bgColor="gray.50">
                  <CardBody>No request found</CardBody>
                </Card>
              )}
            </Box>
            <Box as="section" pt={4}>
              <Heading
                as="h2"
                py={2}
                fontSize="xl"
                fontWeight="semibold"
                bgColor="white"
              >
                Trip Ticket
              </Heading>
              <Divider />

              {!isLoading && !isFetching && data[1]?.status === "fulfilled" && (
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
              {!isLoading && !isFetching && data[1]?.status === "rejected" && (
                <Card bgColor="gray.50">
                  <CardBody>No trip ticket found</CardBody>
                </Card>
              )}
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default RequestorDashboardPanel;
