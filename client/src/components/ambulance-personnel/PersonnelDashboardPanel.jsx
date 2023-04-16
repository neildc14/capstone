import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Heading,
  Divider,
  Flex,
  Button,
  Grid,
  GridItem,
  Card,
  CardBody,
} from "@chakra-ui/react";
import PersonnelPanelCard from "../global/PanelCard";
import { useNavigate } from "react-router-dom";
import {
  UilFileCheckAlt,
  UilThLarge,
  UilDocumentInfo,
} from "@iconscout/react-unicons";
import RequestCard from "../global/RequestCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PersonnelGenericRequestCard from "./PersonnelGenericRequestCard";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const PersonnelDashboardPanel = () => {
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState([]);
  const [ambulanceData, setAmbulanceData] = useState([]);

  const navigateToAllRequests = () => {
    navigate("pending_requests");
  };

  const fetchDetails = useCallback(async () => {
    const results = await Promise.allSettled([
      axios.get(`${ENDPOINT}request`),
      axios.get(`${ENDPOINT}ticket`),
      axios.get(`${ENDPOINT}ambulance`),
      axios.get(`${ENDPOINT}schedule`),
    ]);

    return results;
  }, []);

  const queryKey = "personnel_all_informations";
  const { data, isLoading, isFetching, error } = useQuery(
    [queryKey],
    fetchDetails,
    {
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setRequestData(data[0]?.value?.data);
      setAmbulanceData(data[2]?.value?.data);
    }
  }, [data, isLoading, isFetching]);

  const filterPendingRequests = () => {
    let pendingRequests;
    if (Array.isArray(requestData)) {
      pendingRequests = requestData?.filter((req) => req.status === "pending");
    }
    return pendingRequests;
  };
  const pendingRequests = filterPendingRequests();

  const recentPendingRequest = pendingRequests[pendingRequests?.length - 1];

  const filterApprovedRequests = () => {
    let approvedRequests;
    if (Array.isArray(requestData)) {
      approvedRequests = requestData?.filter(
        (req) => req.status === "approved"
      );
    }
    return approvedRequests;
  };

  const approvedRequests = filterApprovedRequests();
  const recentApprovedRequest = approvedRequests[0];

  console.log({ recentApprovedRequest });

  const totalAmbulanceAvailable = () => {
    let available;
    if (Array.isArray(ambulanceData)) {
      available = ambulanceData?.filter(
        (ambulance) => ambulance.status === "available"
      ).length;
    }
    return available;
  };
  const available = totalAmbulanceAvailable();

  const panel_card_data = [
    {
      title: "Total Requests",
      total: pendingRequests?.length ?? 0,
      type: "Pending",
    },

    {
      title: "Total Ambulance",
      total: available ?? 0,
      type: "Available",
    },
    {
      title: "Total Distance Travelled ",
      total: 0,
      type: "Today",
    },
  ];

  return (
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
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
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
        <Box as="section">
          <Box mb={8} border="1px solid #D9D9D9">
            <Box>
              <Flex
                px={4}
                py={2}
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
              >
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
                  <UilFileCheckAlt color="#FF7A00" /> Recent Approved Request
                </Heading>
                <Button
                  size="sm"
                  px={6}
                  width={{ base: "100%", md: "inherit" }}
                  border="1px solid #ff7a00"
                  borderRadius="md"
                  color="custom.primary"
                  bgColor="white"
                  _hover={{ color: "white", bgColor: "custom.primary" }}
                  onClick={navigateToAllRequests}
                >
                  View Pending Requests
                </Button>
              </Flex>
              <Divider />
            </Box>
            <Box px={4} py={4}>
              {recentApprovedRequest && (
                <PersonnelGenericRequestCard
                  request_data={recentApprovedRequest}
                  borderRadius="sm"
                  name={`${recentApprovedRequest?.first_name} ${recentApprovedRequest?.last_name}`}
                  date_time={recentApprovedRequest?.createdAt}
                />
              )}
              {recentApprovedRequest === undefined && (
                <Card bgColor="orange.300">
                  <CardBody
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                    color="white"
                  >
                    No pending request found.
                  </CardBody>
                </Card>
              )}
            </Box>
          </Box>
          <Box border="1px solid #D9D9D9">
            <Box>
              <Heading
                as="h2"
                display="inline-flex"
                gap={2}
                px={4}
                py={2}
                fontSize="xl"
                fontWeight="semibold"
                bgColor="white"
                color="gray.700"
              >
                <UilDocumentInfo color="#FF7A00" /> Recent Pending Request
              </Heading>
              <Divider />
            </Box>
            <Box px={4} py={4}>
              {recentPendingRequest && (
                <PersonnelGenericRequestCard
                  request_data={recentPendingRequest}
                  borderRadius="sm"
                  name={`${recentPendingRequest?.first_name} ${recentPendingRequest?.last_name}`}
                  date_time={recentPendingRequest?.createdAt}
                />
              )}
              {recentPendingRequest === undefined && (
                <Card bgColor="orange.300">
                  <CardBody
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                    color="white"
                  >
                    No pending request found.
                  </CardBody>
                </Card>
              )}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default PersonnelDashboardPanel;
