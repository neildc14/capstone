import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import {
  Box,
  Heading,
  Divider,
  Flex,
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
  UilFileSlash,
} from "@iconscout/react-unicons";
import RequestorRequestCard from "./RequestorRequestCard";
import RequestorTripTicket from "./RequestorTripTicket";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PanelCard from "../global/PanelCard";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const RequestorDashboardPanel = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [displayMobileRequestbutton, setDisplayMobileRequestbutton] =
    useState(false);
  const [requestData, setRequestData] = useState([]);
  const [tripTicketData, setTripTicketData] = useState([]);
  const user = useContext(AuthContext);

  const parsed_user_data = JSON.parse(user);

  const fetchRecentRequestAndTicket = useCallback(async () => {
    const token = await parsed_user_data.token;

    console.log(token);

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const results = await Promise.allSettled([
      axios.get(`${ENDPOINT}request/requestor`, {
        headers,
      }),
      axios.get(`${ENDPOINT}ticket`, { headers }),
    ]);

    return results;
  }, [parsed_user_data?.token]);

  const queryKey = "ambulance_request_with_ticket";
  const { data, isLoading, isFetching, error, isFetched, refetch } = useQuery(
    [queryKey],
    fetchRecentRequestAndTicket,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setRequestData(data[0]?.value?.data);
      setTripTicketData(data[1]?.value?.data);
    }
  }, [data, isLoading, isFetching]);

  useEffect(() => {
    setDisplayMobileRequestbutton(true);
  }, []);

  const memoizeRequestData = useMemo(() => {
    return requestData;
  }, [requestData]);

  let pending;
  let approved;
  let fulfilled;
  let rejected;

  const totalRequestCounts = () => {
    if (Array.isArray(requestData)) {
      pending = requestData?.filter((req) => req.status === "pending").length;
      approved = requestData?.filter((req) => req.status === "approved").length;
      fulfilled = requestData?.filter(
        (req) => req.status === "fulfilled"
      ).length;
      rejected = requestData?.filter((req) => req.status === "rejected").length;
    }
  };
  totalRequestCounts();

  const panel_card_data = [
    { title: "Total Requests", total: pending ?? 0, type: "Pending" },
    {
      title: "Total Requests",
      total: approved ?? 0,
      type: "Approved",
    },
    {
      title: "Total Requests",
      total: fulfilled ?? 0,
      type: "Fulfilled",
    },
    { title: "Total Requests", total: rejected ?? 0, type: "Rejected" },
  ];

  const navigate = useNavigate();
  const handleRequestClick = () => {
    navigate("request");
  };

  console.log({ data });

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
                    <PanelCard
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
                    <RequestorRequestCard
                      request_data={requestData[0]}
                      request_id={requestData[0]?._id}
                      request_status={requestData[0]?.status}
                      refetch={refetch}
                      queryKey={queryKey}
                    />
                  )}
                {!isLoading &&
                  !isFetching &&
                  data[0]?.status === "rejected" && (
                    <Card bgColor="orange.300">
                      <CardBody
                        display="inline-flex"
                        alignItems="center"
                        gap={2}
                        color="white"
                        fontWeight="semibold"
                      >
                        <UilFileSlash color="white" /> No requests found.
                      </CardBody>
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
                    <RequestorTripTicket
                      trip_ticket_data={tripTicketData[0]}
                      ticket_id={tripTicketData[0]?._id}
                      ambulance_personnel={
                        tripTicketData[0]?.ambulance_personnel?.fullName
                      }
                      ambulance_plate={
                        tripTicketData[0]?.ambulance?.license_plate
                      }
                      destination={tripTicketData[0]?.destination}
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
