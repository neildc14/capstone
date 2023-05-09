import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  Suspense,
  useRef,
} from "react";
import {
  Box,
  Heading,
  Divider,
  Text,
  Flex,
  Button,
  Grid,
  GridItem,
  useMediaQuery,
  Card,
  CardBody,
} from "@chakra-ui/react";
import PersonnelPanelCard from "../global/PanelCard";
import { useNavigate } from "react-router-dom";
import {
  UilFileCheckAlt,
  UilThLarge,
  UilPlus,
  UilFileSlash,
} from "@iconscout/react-unicons";
import PaginatedItems from "../global/PaginatedItems";
import AreaChart from "../global/AreaChart";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import notif from "../../assets/notif.wav";
import AlertNotif from "../global/AlertNotif";

const AdministratorAddDriverModal = React.lazy(() =>
  import("./AdministratorAddDriverModal")
);
const AdministratorAddAmbulanceModal = React.lazy(() =>
  import("./AdministratorAddAmbulanceModal")
);
const AdministratorPendingRequestCard = React.lazy(() =>
  import("./AdministratorPendingRequestCard")
);

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const AdministratorDashboardPanel = () => {
  const navigate = useNavigate();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const [requestData, setRequestData] = useState([]);
  const [ambulanceData, setAmbulanceData] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [isOpenAddDriverModal, setOpenAddDriverModal] = useState(false);
  const [isOpenAddAmbulanceModal, setOpenAddAmbulanceModal] = useState(false);
  const [isOpenNotifModal, setOpenNotifModal] = useState(false);
  const [displayMobileAddbuttons, setDisplayMobileAddbuttons] = useState(false);
  const [newRequestCount, setNewRequestCount] = useState(0);
  const audioRef = useRef(null);

  const navigateToRequests = () => {
    navigate("requests");
  };

  const user = useContext(AuthContext);
  const parsed_user_data = JSON.parse(user);
  const headers = {
    Authorization: `Bearer ${parsed_user_data?.token}`,
  };

  const fetchDetails = useCallback(async () => {
    const results = await Promise.allSettled([
      axios.get(`${ENDPOINT}request/all`, { headers }),
      axios.get(`${ENDPOINT}ambulance/all`, { headers }),
      axios.get(`${ENDPOINT}schedule/all_schedule`, { headers }),
    ]);

    return results;
  }, []);

  const queryKey = "admin_all_informations";
  const { data, isLoading, isFetching, error } = useQuery(
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
      setRequestData(data[0]?.value?.data);
      setAmbulanceData(data[2]?.value?.data);
      setScheduleData(data[3]?.value?.data);
      const newRequestDataLength = data[0]?.value?.data?.length;
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

  useEffect(() => {
    setDisplayMobileAddbuttons(true);
  }, []);

  const totalAmbulanceAvailable = useCallback(() => {
    let available;
    if (Array.isArray(ambulanceData)) {
      available = ambulanceData?.filter(
        (ambulance) => ambulance.status === "available"
      ).length;
    }
    return available;
  }, [ambulanceData]);
  const available = totalAmbulanceAvailable();

  const filterPendingRequests = useCallback(() => {
    let pendingRequests;
    if (Array.isArray(requestData)) {
      pendingRequests = requestData?.filter((req) => req.status === "pending");
    }
    return pendingRequests;
  }, [requestData]);
  const pendingRequests = filterPendingRequests();

  const filterDriver = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10);
    let driverOnDuty;
    let driverDriving;
    if (Array.isArray(scheduleData)) {
      driverOnDuty = scheduleData?.filter(
        (driver) =>
          driver.status === "stand-by" &&
          driver.createdAt.slice(0, 10) === today
      );
      driverDriving = scheduleData?.filter(
        (driver) =>
          driver.status === "driving" && driver.createdAt.slice(0, 10) === today
      );
    }
    return [driverOnDuty, driverDriving];
  }, [scheduleData]);
  const [driverOnDuty, driverDriving] = filterDriver();

  const requestToday = useCallback(
    function () {
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
        0
      );
      const endOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        23,
        59,
        59,
        999
      );
      const filteredData = requestData?.filter(
        (item) =>
          item.createdAt >= startOfDay.toISOString() &&
          item.createdAt <= endOfDay.toISOString()
      );
      const requestsLength = filteredData?.length;
      return requestsLength;
    },
    [requestData]
  );

  const requestsLength = requestToday();

  const panel_card_data = [
    { title: "Total Requests", total: requestsLength ?? 0, type: "Today" },
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

  const handleOpenAddDriverModal = () => {
    setOpenAddDriverModal(!isOpenAddDriverModal);
  };

  const handleOpenAddAmbulanceModal = () => {
    setOpenAddAmbulanceModal(!isOpenAddAmbulanceModal);
  };

  function handleOpenNotifModal() {
    setOpenNotifModal(!isOpenNotifModal);
  }
  console.log(newRequestCount);
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
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
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
                <Flex gap={2} display={isLargerThan768 ? "flex" : "none"}>
                  <Button
                    leftIcon={<UilPlus />}
                    bgColor="green.500"
                    color="white"
                    _hover={{ bgColor: "green.600" }}
                    onClick={handleOpenAddDriverModal}
                  >
                    Driver
                  </Button>
                  <Button
                    leftIcon={<UilPlus />}
                    bgColor="green.500"
                    color="white"
                    _hover={{ bgColor: "green.600" }}
                    onClick={handleOpenAddAmbulanceModal}
                  >
                    Ambulance
                  </Button>
                </Flex>
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
          <Box as="section">
            {displayMobileAddbuttons && (
              <Flex
                gap={2}
                display={!isLargerThan768 ? "flex" : "none"}
                justifyContent="space-between"
                my={4}
              >
                <Button
                  leftIcon={<UilPlus />}
                  flex={1}
                  display="inline-flex"
                  justifyContent="space-between"
                  bgColor="green.500"
                  color="white"
                  textAlign="center"
                  _hover={{ bgColor: "green.600" }}
                  onClick={handleOpenAddDriverModal}
                >
                  Driver
                </Button>
                <Button
                  leftIcon={<UilPlus />}
                  flex={1}
                  display="inline-flex"
                  justifyContent="space-between"
                  bgColor="green.500"
                  color="white"
                  _hover={{ bgColor: "green.600" }}
                  onClick={handleOpenAddAmbulanceModal}
                >
                  Ambulance
                </Button>
              </Flex>
            )}
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
                            <Suspense>
                              <AdministratorPendingRequestCard
                                key={item._id}
                                request_data={item}
                                bgColor="white"
                                borderRadius="sm"
                              />
                            </Suspense>
                          ))}
                      </Flex>
                    )}
                  </PaginatedItems>
                )}
                {!isLoading && pendingRequests?.length === 0 && (
                  <Card bgColor="orange.300">
                    <CardBody
                      display="inline-flex"
                      alignItems="center"
                      gap={2}
                      color="white"
                      fontSize="normal"
                    >
                      <UilFileSlash color="white" /> No pending request found.
                    </CardBody>
                  </Card>
                )}
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
      <Box
        as="section"
        my={10}
        px={4}
        overflowX={{ sm: "scroll", md: "inherit" }}
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
          Requests Statistical Graph
        </Heading>
        <AreaChart data={requestData} />
      </Box>
      <Suspense>
        <AdministratorAddDriverModal
          handleOpenModal={handleOpenAddDriverModal}
          isOpen={isOpenAddDriverModal}
        />
      </Suspense>
      <Suspense>
        <AdministratorAddAmbulanceModal
          handleOpenModal={handleOpenAddAmbulanceModal}
          isOpen={isOpenAddAmbulanceModal}
        />
      </Suspense>
      <Suspense>
        <AlertNotif
          handleOpenModal={handleOpenNotifModal}
          isOpen={isOpenNotifModal}
          newRequestCount={newRequestCount}
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

export default React.memo(AdministratorDashboardPanel);
