import React, { useCallback, useMemo, useState, useContext } from "react";
import {
  Box,
  Divider,
  Heading,
  Text,
  Flex,
  Skeleton,
  Card,
  CardBody,
} from "@chakra-ui/react";
import RequestCard from "./RequestorRequestCard";
import { UilHistoryAlt, UilFileSlash } from "@iconscout/react-unicons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SearchBar from "../global/SearchBar";
import AuthContext from "../../context/AuthContext";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const RequestorAllRequests = () => {
  const [search, setSearch] = useState([]);
  const user = useContext(AuthContext);

  const parsed_user_data = JSON.parse(user);
  console.log(parsed_user_data?.token);

  const headers = {
    Authorization: `Bearer ${parsed_user_data?.token}`,
  };

  const fetchAllRequests = useCallback(async () => {
    const response = await axios.get(`${ENDPOINT}request/requestor`, { headers });
    return response.data;
  }, []);

  const queryKey = "ambulance_request";
  const { data, isLoading, isFetching, error, refetch } = useQuery(
    [queryKey],
    fetchAllRequests,
    {
      refetchOnWindowFocus: false,
    }
  );

  const memoizedData = useMemo(() => {
    return data;
  }, [data]);

  return (
    <Box>
      <Box>
        <Box maxWidth={{ md: "50%" }} ms="auto">
          <SearchBar
            memoizedData={memoizedData}
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
            display="flex"
            fontSize="xl"
            fontWeight="semibold"
            bgColor="white"
          >
            <UilHistoryAlt color="#FF7A00" />{" "}
            <Text as="span">Request History</Text>
          </Heading>

          <Text color="#FF7A00" fontWeight="semibold">
            Total: {memoizedData?.length}
          </Text>
        </Flex>
        <Divider />
        <Box
          as="section"
          height={{ base: "80vh", md: "70vh" }}
          mt={4}
          overflowY="scroll"
        >
          <Skeleton isLoaded={!isLoading} height={{ base: "40vh", md: "100%" }}>
            {!error &&
              search?.length <= 0 &&
              memoizedData?.map((request) => (
                <RequestCard
                  key={request._id}
                  request_data={request}
                  request_id={request._id}
                  request_status={request.status}
                  refetch={refetch}
                  queryKey={queryKey}
                />
              ))}
            {!error &&
              search?.length > 0 &&
              search?.map((request) => (
                <RequestCard
                  key={request._id}
                  request_data={request}
                  request_id={request._id}
                  request_status={request.status}
                  refetch={refetch}
                  queryKey={queryKey}
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
          </Skeleton>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(RequestorAllRequests);
