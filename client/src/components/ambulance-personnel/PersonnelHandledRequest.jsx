import React, {
  useCallback,
  useMemo,
  useState,
  useContext,
  useEffect,
} from "react";
import {
  Box,
  Heading,
  Divider,
  Flex,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";
import {
  UilHistory,
  UilUserCheck,
  UilFileSlash,
} from "@iconscout/react-unicons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PersonnelGenericRequestCard from "./PersonnelGenericRequestCard";
import SearchBar from "../global/SearchBar";
import AuthContext from "../../context/AuthContext";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const HandledRequest = () => {
  const [search, setSearch] = useState([]);
  const [handledRequests, setHandledRequests] = useState([]);
  const [allAmbulance, setAllAmbulance] = useState([]);
  const user = useContext(AuthContext);

  const parsed_user_data = JSON.parse(user);
  const headers = {
    Authorization: `Bearer ${parsed_user_data.token}`,
  };

  const fetchHandledRequests = useCallback(async () => {
    const response = await axios.get(`${ENDPOINT}request/handled`, { headers });
    return response.data;
  }, []);

  const fetchHandledRequestsAndAmbulance = async () => {
    const headers = {
      Authorization: `Bearer ${parsed_user_data.token}`,
    };

    const results = await Promise.allSettled([
      axios.get(`${ENDPOINT}request/handled`, { headers }),
      axios.get(`${ENDPOINT}ambulance/all`, { headers }),
    ]);
    return results;
  };

  const queryKey = "personnel_handled_requests";
  const { data, isLoading, isFetching, error } = useQuery(
    [queryKey],
    fetchHandledRequestsAndAmbulance,
    {
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setHandledRequests(data[0]?.value?.data);
      setAllAmbulance(data[1]?.value?.data);
    }
  }, [data, isLoading, isFetching]);

  const filterAmbulance = () => {
    let available = [];
    if (Array.isArray(allAmbulance)) {
      available = allAmbulance?.filter((req) => req.status === "available");
    }
    console.log({ available }, "array");
    return available[0];
  };

  const available = filterAmbulance();
  console.log(available, "AMBULANCE REQUESTS");

  console.log({ handledRequests });
  console.log({ available });

  const gethandledRequests = useMemo(() => {
    return handledRequests;
  }, [data]);

  const filterApprovedRequest = () => {
    let approvedRequests;
    let recentApprovedRequest;
    if (Array.isArray(handledRequests)) {
      approvedRequests = handledRequests?.filter(
        (req) => req.status === "approved"
      );

      recentApprovedRequest = approvedRequests[approvedRequests?.length - 1];
    }

    return recentApprovedRequest;
  };
  const recentApprovedRequest = filterApprovedRequest();

  return (
    <Box>
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
                <UilUserCheck color="#FF7A00" /> Recent Approved Request
              </Heading>
            </Flex>
            <Divider />
          </Box>
          <Box px={4} py={4}>
            {recentApprovedRequest !== undefined && (
              <PersonnelGenericRequestCard
                queryKey={queryKey}
                available={available}
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
                  fontWeight="semibold"
                >
                  <UilFileSlash color="white" /> No recent approved request
                  found.
                </CardBody>
              </Card>
            )}
          </Box>
        </Box>
      </Box>
      <Box as="section">
        <Box px={4}>
          <Box maxWidth={{ md: "50%" }} ms="auto">
            <SearchBar
              memoizedData={handledRequests}
              setSearch={setSearch}
              placeholder="Search a request"
              noResultMessage="No request found."
            />
          </Box>
          <Flex
            py={2}
            flexDirection="row"
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
              <UilHistory color="#FF7A00" />
              Request History
            </Heading>
            <Text color="#FF7A00" fontWeight="semibold">
              Total: {handledRequests?.length}
            </Text>
          </Flex>
          <Divider />
        </Box>
        <Box px={4} py={2} height={{ md: "45vh" }} overflowY="scroll">
          <Flex flexDirection="column" gap={4}>
            {!error &&
              search.length <= 0 &&
              handledRequests?.map((request) => (
                <PersonnelGenericRequestCard
                  key={request?._id}
                  queryKey={queryKey}
                  available={available}
                  request_data={request}
                  borderRadius="sm"
                  name={`${request?.first_name} ${request?.last_name}`}
                  date_time={request?.createdAt}
                />
              ))}
            {!error &&
              search?.length >= 0 &&
              search?.map((request) => (
                <PersonnelGenericRequestCard
                  key={request?._id}
                  queryKey={queryKey}
                  available={available}
                  request_data={request}
                  borderRadius="sm"
                  name={`${request?.first_name} ${request?.last_name}`}
                  date_time={request?.createdAt}
                />
              ))}
            {error && (
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
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default HandledRequest;
