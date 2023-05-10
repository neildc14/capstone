import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  Suspense,
  useRef,
  useMemo,
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
import AlertNotif from "../global/AlertNotif";
import notif from "../../assets/notif.wav";
import { io } from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;
const SOCKET_ENDPOINT = import.meta.env.VITE_REACT_APP_SOCKET_ENDPOINT;

const RequestorDashboardPanel = () => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [displayMobileRequestbutton, setDisplayMobileRequestbutton] =
    useState(false);
  const [requestData, setRequestData] = useState([]);
  const [tripTicketData, setTripTicketData] = useState([]);
  const [isOpenNotifModal, setOpenNotifModal] = useState(false);
  const [notifications, setNotifcations] = useState({
    message: "",
    status: "",
    title: "",
  });
  const audioRef = useRef(null);

  const user = useContext(AuthContext);
  const parsed_user_data = JSON.parse(user);

  const fetchRecentRequestAndTicket = useCallback(async () => {
    const token = await parsed_user_data.token;

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const results = await Promise.allSettled([
      axios.get(`${ENDPOINT}request/requestor`, {
        headers,
      }),
      axios.get(`${ENDPOINT}ticket/requestor`, { headers }),
    ]);

    return results;
  }, [parsed_user_data?.token]);

  const queryKey = "ambulance_request_with_ticket";
  const { data, isLoading, isFetching, refetch } = useQuery(
    [queryKey],
    fetchRecentRequestAndTicket,
    {
      refetchOnWindowFocus: true,
      refetchInterval: 10000,
      refetchIntervalInBackground: true,
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

  const memoizedData = useMemo(() => {
    return requestData;
  }, [requestData]);

  const memoizedTripTicket = useMemo(() => {
    return tripTicketData;
  }, [tripTicketData]);

  useEffect(() => {
    const socket = io(SOCKET_ENDPOINT);
    if (memoizedData) {
      socket.on("connect", () => {
        socket.emit("join_rooms", {
          rooms: [`notifications_${memoizedData[0]?._id}`],
        });
      });

      socket.on("receive_notif", (data) => {
        setNotifcations({
          message: data.message,
          status: data.status,
          title: data.title,
        });

        audioRef.current.play();
        setOpenNotifModal(true);
      });

      return () => socket.disconnect();
    }
  }, [memoizedData]);

  let pending;
  let approved;
  let fulfilled;
  let rejected;
  const totalRequestCounts = () => {
    if (Array.isArray(memoizedData)) {
      pending = memoizedData?.filter((req) => req.status === "pending").length;
      approved = memoizedData?.filter(
        (req) => req.status === "approved"
      ).length;
      fulfilled = memoizedData?.filter(
        (req) => req.status === "fulfilled"
      ).length;
      rejected = memoizedData?.filter(
        (req) => req.status === "rejected"
      ).length;
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

  function handleOpenNotifModal() {
    setOpenNotifModal(!isOpenNotifModal);
  }

  return (
    <>
      {requestData && (
        <audio ref={audioRef} src={notif} style={{ display: "none" }} />
      )}
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
                {memoizedData && (
                  <RequestorRequestCard
                    request_data={memoizedData[0]}
                    request_id={memoizedData[0]?._id}
                    request_status={memoizedData[0]?.status}
                    refetch={refetch}
                    queryKey={queryKey}
                  />
                )}
                {!memoizedData && (
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

                {memoizedTripTicket && (
                  <RequestorTripTicket
                    trip_ticket_data={memoizedTripTicket[0]}
                    ticket_id={memoizedTripTicket[0]?._id}
                    ambulance_personnel={
                      memoizedTripTicket[0]?.ambulance_personnel?.fullName
                    }
                    ambulance_plate={
                      memoizedTripTicket[0]?.ambulance?.license_plate
                    }
                    destination={memoizedTripTicket[0]?.destination}
                  />
                )}
                {!memoizedTripTicket && (
                  <Card bgColor="gray.50">
                    <CardBody>No trip ticket found</CardBody>
                  </Card>
                )}
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
      <Suspense>
        <AlertNotif
          handleOpenModal={handleOpenNotifModal}
          isOpen={isOpenNotifModal}
          title={notifications?.title}
          status={notifications?.status}
        >
          {notifications?.message}
        </AlertNotif>
      </Suspense>
    </>
  );
};

export default React.memo(RequestorDashboardPanel);
