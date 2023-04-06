import React, { useEffect, useState, Suspense } from "react";
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
  Button,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  UilThLarge,
  UilDocumentInfo,
  UilTicket,
} from "@iconscout/react-unicons";
import RequestCard from "./RequestorRequestCard";
import TripTicket from "../TripTicket";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PersonnelPanelCard from "../global/PanelCard";
import { useNavigate } from "react-router-dom";

const CTAButton = React.lazy(() => import("../global/CTAButton"));

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const RequestorDashboardPanel = () => {
  const [totalRequest, setTotalRequest] = useState("");
  const [totalSuccessfulTransport, setTotalSuccessfulTransport] = useState("");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [displayMobileRequestbutton, setDisplayMobileRequestbutton] =
    useState(false);

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

  useEffect(() => {
    setDisplayMobileRequestbutton(true);
  }, []);

  const panel_card_data = [
    { title: "Total Requests", total: 0, type: "Pending" },
    {
      title: "Total Requests",
      total: 0,
      type: "Approved",
    },
    { title: "Total Requests", total: totalRequest || 0, type: "Fulfilled" },
    { title: "Total Requests", total: 0, type: "Rejected" },
  ];

  const navigate = useNavigate();
  const handleRequestClick = () => {
    navigate("request");
  };

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
              <Flex justifyContent="space-between" alignItems="center" pb={2}>
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

                <Button
                  size="md"
                  px={10}
                  display={isLargerThan768 ? "block" : "none"}
                  bgColor="red.600"
                  color="white"
                  _hover={{ bgColor: "red.700" }}
                  fontSize="lg"
                  onClick={handleRequestClick}
                >
                  Request
                </Button>
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
            {displayMobileRequestbutton && (
              <Box mb={4}>
                <Button
                  size="md"
                  width="100%"
                  display={!isLargerThan768 ? "block" : "none"}
                  px={10}
                  bgColor="red.600"
                  color="white"
                  _hover={{ bgColor: "red.700" }}
                  fontSize="lg"
                  onClick={handleRequestClick}
                >
                  Request
                </Button>
              </Box>
            )}
            <Box mb={8} border="1px solid #D9D9D9">
              <Heading
                as="h2"
                display="inline-flex"
                gap={2}
                px={4}
                py={2}
                fontSize="xl"
                fontWeight="semibold"
                bgColor="white"
              >
                <UilDocumentInfo color="#FF7A00" /> Recent Request
              </Heading>

              <Divider />
              <Box px={4} py={4}>
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
                  data[0]?.status === "rejected" && (
                    <Card bgColor="gray.50">
                      <CardBody>No request found</CardBody>
                    </Card>
                  )}
              </Box>
            </Box>
            <Box as="section">
              <Box border="1px solid #D9D9D9">
                <Heading
                  as="h2"
                  display="inline-flex"
                  gap={2}
                  px={4}
                  py={2}
                  fontSize="xl"
                  fontWeight="semibold"
                  bgColor="white"
                >
                  <UilTicket color="#FF7A00" /> Trip Ticket
                </Heading>
                <Divider />

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
                  data[1]?.status === "rejected" && (
                    <Card bgColor="gray.50">
                      <CardBody>No trip ticket found</CardBody>
                    </Card>
                  )}
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default React.memo(RequestorDashboardPanel);
