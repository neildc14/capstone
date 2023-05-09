import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
  Suspense,
} from "react";
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
  Text,
} from "@chakra-ui/react";
import PersonnelPanelCard from "../global/PanelCard";
import { useNavigate } from "react-router-dom";
import {
  UilFileCheckAlt,
  UilThLarge,
  UilDocumentInfo,
  UilFileSlash,
} from "@iconscout/react-unicons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PersonnelGenericRequestCard from "./PersonnelGenericRequestCard";
import AuthContext from "../../context/AuthContext";
import ScheduleContext from "../../context/ScheduleContext";
import notif from "../../assets/notif.wav";
import AlertNotif from "../global/AlertNotif";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const PersonnelDashboardPanel = () => {
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState([]);
  const [handledRequesData, setHandledRequestData] = useState([]);
  const [ambulanceData, setAmbulanceData] = useState([]);
  const [isOpenNotifModal, setOpenNotifModal] = useState(false);
  const [newRequestCount, setNewRequestCount] = useState(0);

  const audioRef = useRef(null);

  const user = useContext(AuthContext);
  const parsed_user_data = JSON.parse(user);

  const { status, ambulance_plate } = useContext(ScheduleContext);

  const navigateToAllRequests = () => {
    navigate("pending_requests");
  };

  const fetchDetails = useCallback(async () => {
    const token = await parsed_user_data.token;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const results = await Promise.allSettled([
      axios.get(`${ENDPOINT}request/handled`, { headers }),
      axios.get(`${ENDPOINT}request/all`, { headers }),
      axios.get(`${ENDPOINT}ambulance/all`, { headers }),
    ]);

    return results;
  }, []);

  const queryKey = "personnel_all_informations";
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    [queryKey],
    fetchDetails,
    {
      refetchOnWindowFocus: true,
      refetchInterval: 10000,
      refetchIntervalInBackground: true,
    }
  );

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setHandledRequestData(data[0]?.value?.data);
      setRequestData(data[1]?.value?.data);
      setAmbulanceData(data[2]?.value?.data);
      const newRequestDataLength = data[1]?.value?.data?.length;
      if (
        newRequestDataLength > requestData?.length &&
        newRequestDataLength !== 0 &&
        requestData.length !== 0
      ) {
        setNewRequestCount(newRequestDataLength - requestData.length);
        audioRef.current.play();
        handleOpenNotifModal();
      }
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

  const filterRecentPendingRequest = () => {
    let recentPendingRequest = undefined;
    if (pendingRequests?.length > 0) {
      recentPendingRequest = pendingRequests[pendingRequests?.length - 1];
    }
    return recentPendingRequest;
  };

  const recentPendingRequest = filterRecentPendingRequest();

  const filterApprovedRequests = () => {
    let approvedRequests;
    if (Array.isArray(handledRequesData)) {
      approvedRequests = handledRequesData?.filter(
        (req) => req.status === "approved"
      );
    }
    return approvedRequests;
  };

  const approvedRequests = filterApprovedRequests();

  const filterRecentApprovedRequest = () => {
    let recentApprovedRequest = undefined;
    if (approvedRequests?.length > 0) {
      recentApprovedRequest = approvedRequests[0];
    }
    return recentApprovedRequest;
  };
  const recentApprovedRequest = filterRecentApprovedRequest();

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
      title: "Assigned Ambulance ",
      total: ambulance_plate ?? "None",
      type: "Today",
    },
  ];

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
                  md: "repeat(3, 1fr)",
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
                    queryKey={queryKey}
                    driver_id={parsed_user_data?.id}
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
                      fontWeight="normal"
                    >
                      <UilFileSlash color="white" /> No recent approved request
                      found.
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
                    driver_id={parsed_user_data?.id}
                    queryKey={queryKey}
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
                      fontWeight="normal"
                    >
                      <UilFileSlash color="white" /> No recent pending request
                      found.
                    </CardBody>
                  </Card>
                )}
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
      <Suspense>
        <AlertNotif
          newRequestCount={newRequestCount}
          handleOpenModal={handleOpenNotifModal}
          isOpen={isOpenNotifModal}
          title=" New Request!"
          status="info"
        >
          <Text fontWeight="bold" fontSize="xl">
            {newRequestCount}
          </Text>{" "}
          New request has been submitted by the requestor(s). Please check your
          dashboard for more details.
        </AlertNotif>
      </Suspense>
    </>
  );
};

export default PersonnelDashboardPanel;
