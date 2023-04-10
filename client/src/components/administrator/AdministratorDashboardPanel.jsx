import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Heading,
  Divider,
  Text,
  Flex,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import PersonnelPanelCard from "../global/PanelCard";
import { useNavigate } from "react-router-dom";
import { UilFileCheckAlt, UilThLarge } from "@iconscout/react-unicons";
import PaginatedItems from "../global/PaginatedItems";
import AdministratorPendingRequestCard from "./AdministratorPendingRequestCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const AdministratorDashboardPanel = () => {
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState([]);
  const [tripTicketData, setTripTicketData] = useState([]);
  const [ambulanceData, setAmbulanceData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);

  const navigateToRequests = () => {
    navigate("requests");
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

  const queryKey = "admin_all_informations";
  const { data, isLoading, isFetching, error, isFetched, refetch } = useQuery(
    [queryKey],
    fetchDetails,
    {
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setRequestData(data[0]?.value?.data);
      setTripTicketData(data[1]?.value?.data);
      setAmbulanceData(data[2]?.value?.data);
      setScheduleData(data[3]?.value?.data);
    }
  }, [data, isLoading, isFetching]);

  let available;
  const totalAmbulanceAvailable = () => {
    if (Array.isArray(ambulanceData)) {
      available = ambulanceData?.filter(
        (ambulance) => ambulance.status === "available"
      ).length;
    }
  };
  totalAmbulanceAvailable();

  let pendingRequests;
  const filterPendingRequests = () => {
    if (Array.isArray(requestData)) {
      pendingRequests = requestData?.filter((req) => req.status === "pending");
    }
  };
  filterPendingRequests();

  let driverOnDuty;
  let driverDriving;
  const filterDriver = () => {
    if (Array.isArray(scheduleData)) {
      driverOnDuty = scheduleData?.filter(
        (driver) => driver.status === "stand-by"
      );
      driverDriving = scheduleData?.filter(
        (driver) => driver.status === "driving"
      );
    }
  };
  filterDriver();

  const panel_card_data = [
    { title: "Total Requests", total: requestData?.length ?? 0, type: "Today" },
    {
      title: "Total Ambulance",
      total: available ?? 0,
      type: "Available",
    },
    {
      title: "Total Driver",
      total: driverOnDuty?.length ?? 0,
      type: "Stand-by",
    },
    {
      title: "Total Driver",
      total: driverDriving?.length ?? 0,
      type: "Driving",
    },
  ];

  const items = pendingRequests?.reverse();

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
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
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
          <Box mb={8} bgColor="custom.secondary">
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
                  color="blackAlpha"
                >
                  <UilFileCheckAlt color="#FF7A00" /> Recent Pending Request
                </Heading>

                <Flex
                  width={{ base: "100%", md: "inherit" }}
                  flexDirection={{ base: "row", md: "row" }}
                  justifyContent={{ base: "space-between" }}
                  alignItems={{ base: "center", md: "center" }}
                  gap={4}
                >
                  <Text color="#FF7A00" fontWeight="semibold">
                    Total: {pendingRequests?.length}
                  </Text>
                  <Button
                    size="sm"
                    px={{ base: 2, md: 6 }}
                    border="1px solid #ff7a00"
                    borderRadius="md"
                    color="custom.primary"
                    bgColor="white"
                    _hover={{ color: "white", bgColor: "orange.500" }}
                    onClick={navigateToRequests}
                  >
                    View All
                  </Button>
                </Flex>
              </Flex>
              <Divider />
            </Box>
            <Box px={4} py={4}>
              {!error && (
                <PaginatedItems itemsPerPage={4} items={items}>
                  {(currentItems) => (
                    <Flex flexDirection="column" gap={2}>
                      {currentItems &&
                        currentItems.map((item) => (
                          <AdministratorPendingRequestCard
                            key={item._id}
                            request_data={item}
                            bgColor="white"
                            borderRadius="sm"
                          />
                        ))}
                    </Flex>
                  )}
                </PaginatedItems>
              )}
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default React.memo(AdministratorDashboardPanel);
