import React, { useState, useCallback, useMemo } from "react";
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
} from "@chakra-ui/react";
import { UilSearch, UilLayerGroup } from "@iconscout/react-unicons";
import RequestCard from "../global/RequestCard";
import PaginatedItems from "../global/PaginatedItems";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const AdministratorRequests = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const fetchAllRequests = useCallback(async () => {
    const response = await axios.get(`${ENDPOINT}request`);
    return response.data;
  }, []);

  const queryKey = "ambulance_request";
  const { data, error } = useQuery([queryKey], fetchAllRequests, {
    refetchOnWindowFocus: true,
  });

  const memoizedData = useMemo(() => {
    return data;
  }, [data]);

  let pendingRequests = [];
  let approvedRequest = [];
  let fulfilledRequest = [];
  let rejectedRequests = [];

  const filterRequests = () => {
    if (Array.isArray(memoizedData)) {
      pendingRequests = memoizedData?.filter((req) => req.status === "pending");
      approvedRequest = memoizedData?.filter(
        (req) => req.status === "approved"
      );
      fulfilledRequest = memoizedData?.filter(
        (req) => req.status === "fulfilled"
      );
      rejectedRequests = memoizedData?.filter(
        (req) => req.status === "rejected"
      );
    }
  };
  filterRequests();

  const tabs = [
    {
      label: "All",
      get counter() {
        return this?.items?.length;
      },
      items: memoizedData ?? [],
    },
    {
      label: "Pending",
      items: pendingRequests,
      get counter() {
        return this?.items?.length;
      },
    },
    {
      label: "Approved",

      items: approvedRequest,
      get counter() {
        return this?.items?.length;
      },
    },
    {
      label: "Fulfilled",

      items: fulfilledRequest,
      get counter() {
        return this?.items?.length;
      },
    },
    {
      label: "Rejected",
      items: rejectedRequests,
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
                  <UilLayerGroup color="#FF7A00" /> All Requests
                </Heading>
                <Box display="inline-flex" flex="1" gap={2}>
                  <Input
                    type="search"
                    size="sm"
                    flex="1"
                    placeholder="Search a request"
                  />
                  <Button type="submit" display="inline-flex" gap={2} size="sm">
                    <UilSearch size="16px" /> Search
                  </Button>
                </Box>
              </Flex>
              <Divider />
            </Box>
          </Box>
          <Tabs
            variant="enclosed"
            isLazy
            selectedindex={selectedTab}
            onChange={(index) => setSelectedTab(index)}
          >
            <TabList>
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
                            {currentItems &&
                              currentItems.map((item, i) => (
                                <RequestCard
                                  key={item._id}
                                  bgColor="white"
                                  borderRadius="sm"
                                  name={`${item?.first_name} ${item?.last_name}`}
                                  date_time={item?.createdAt}
                                />
                              ))}
                            {tab?.counter === 0 && (
                              <Text fontSize="md" color="orange.500">
                                No requests found
                              </Text>
                            )}
                          </Flex>
                        )}
                      </PaginatedItems>
                    </Flex>
                  </TabPanel>
                ))}
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(AdministratorRequests);
