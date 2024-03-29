import React, {
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  Flex,
  Input,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardBody,
} from "@chakra-ui/react";
import {
  UilSearch,
  UilLayerGroup,
  UilFileSlash,
} from "@iconscout/react-unicons";
import PaginatedItems from "../global/PaginatedItems";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PersonnelGenericRequestCard from "./PersonnelGenericRequestCard";
import SearchBar from "../global/SearchBar";
import AuthContext from "../../context/AuthContext";
import Authorization from "../../utils/auth";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const PersonnelRequests2 = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [search, setSearch] = useState([]);

  const { headers } = Authorization();
  
  const fetchPendingRequests = useCallback(async () => {
    const response = await axios.get(`${ENDPOINT}request/all`, { headers });
    return response.data;
  }, []);

  const queryKey = "ambulance_request";
  const { data, error, isLoading, isFetching } = useQuery(
    [queryKey],
    fetchPendingRequests,
    {
      refetchOnWindowFocus: true,
    }
  );

  let pendingRequests = [];

  const filterRequests = () => {
    if (Array.isArray(data)) {
      pendingRequests = data?.filter((req) => req.status === "pending");
    }
  };
  filterRequests();

  const tabs = [
    {
      label: "Pending",
      items: pendingRequests?.reverse(),
      get counter() {
        return this?.items?.length;
      },
    },
  ];

  return (
    <>
      <Box>
        <Box as="section">
          <Box mb={4}>
            <Box>
              <Flex
                px={4}
                py={2}
                flexDirection={{ base: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <Heading
                  as="h2"
                  flex="1"
                  display="inline-flex"
                  gap={2}
                  py={2}
                  fontSize="xl"
                  fontWeight="semibold"
                  alignSelf={{ base: "start" }}
                  bgColor="white"
                  color="gray.700"
                >
                  <UilLayerGroup color="#FF7A00" /> All Pending Requests
                </Heading>
                <SearchBar
                  memoizedData={pendingRequests}
                  setSearch={setSearch}
                  placeholder="Search a request"
                  noResultMessage="No request found."
                />
              </Flex>
              <Divider />
            </Box>
          </Box>
          {search?.length <= 0 && (
            <Tabs
              variant="enclosed"
              isLazy
              selectedindex={selectedTab}
              onChange={(index) => setSelectedTab(index)}
            >
              <TabList overflowX="scroll" overflowY="hidden">
                {tabs?.map((tab, index) => (
                  <Tab
                    key={tab.label}
                    fontSize={{ base: "xs", md: "md" }}
                    _selected={{ color: "orange.500", fontWeight: "semibold" }}
                  >
                    {tab.label}{" "}
                    <Text as="span" opacity={selectedTab === index ? 1 : 0}>
                      {`(${tab.counter})`}
                    </Text>
                  </Tab>
                ))}
              </TabList>

              <TabPanels bgColor="custom.secondary" mt={4} py={2}>
                {!error &&
                  tabs?.map((tab) => (
                    <TabPanel key={tab.label + "panel"}>
                      <Flex flexDirection="column" gap={4}>
                        <PaginatedItems itemsPerPage={4} items={tab.items}>
                          {(currentItems) => (
                            <Flex flexDirection="column" gap={2}>
                              {currentItems !== undefined &&
                                currentItems.map((item, i) => (
                                  <PersonnelGenericRequestCard
                                    key={item?._id}
                                    request_data={item}
                                    borderRadius="sm"
                                    name={`${item?.first_name} ${item?.last_name}`}
                                    date_time={item?.createdAt}
                                  />
                                ))}
                              {tab?.counter === 0 && (
                                <Card bgColor="orange.300">
                                  <CardBody
                                    display="inline-flex"
                                    alignItems="center"
                                    gap={2}
                                    color="white"
                                    fontSize="normal"
                                  >
                                    <UilFileSlash color="white" /> No pending
                                    request found.
                                  </CardBody>
                                </Card>
                              )}
                            </Flex>
                          )}
                        </PaginatedItems>
                      </Flex>
                    </TabPanel>
                  ))}
              </TabPanels>
            </Tabs>
          )}

          {search?.length > 0 && !error && (
            <Box bgColor="custom.secondary" mt={4} py={8} px={4}>
              <Flex flexDirection="column" gap={4}>
                <PaginatedItems itemsPerPage={4} items={search}>
                  {(currentItems) => (
                    <Flex flexDirection="column" gap={2}>
                      {currentItems !== undefined &&
                        currentItems.map((item, i) => (
                          <PersonnelGenericRequestCard
                            key={item?._id}
                            available={available}
                            request_data={item}
                            borderRadius="sm"
                            name={`${item?.first_name} ${item?.last_name}`}
                            date_time={item?.createdAt}
                          />
                        ))}
                    </Flex>
                  )}
                </PaginatedItems>
              </Flex>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default React.memo(PersonnelRequests2);
