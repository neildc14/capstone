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

const AdministratorDrivers = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const fetchAllDrivers = useCallback(async () => {
    const response = await axios.get(`${ENDPOINT}auth/users/drivers`);
    return response.data;
  }, []);

  const queryKey = "drivers";
  const { data, error } = useQuery([queryKey], fetchAllDrivers, {
    refetchOnWindowFocus: true,
  });

  const memoizedData = useMemo(() => {
    return data;
  }, [data]);

  console.log(memoizedData);

  const tabs = [
    {
      label: "All",
      items: data ?? [],
      get counter() {
        return this?.items?.length;
      },
    },
    {
      label: "On-duty",

      items: [1, 2, 3],
      get counter() {
        return this.items.length;
      },
    },
    {
      label: "Off-duty",

      items: [1, 2, 3, 4, 5],
      get counter() {
        return this.items.length;
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
                    placeholder="Search driver"
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
              {!error &&
                tabs?.map((tab, index) => (
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
              {tabs?.map((tab) => (
                <TabPanel key={tab.label}>
                  <Flex flexDirection="column" gap={4}>
                    <PaginatedItems itemsPerPage={4} items={tab.items}>
                      {(currentItems) => (
                        <Flex flexDirection="column" gap={2}>
                          {currentItems &&
                            currentItems.map((item) => (
                              <RequestCard
                                key={item._id}
                                bgColor="white"
                                borderRadius="sm"
                                card_header="Driver"
                                card_header_detail="Juan Dela Cruz"
                              />
                            ))}
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

export default AdministratorDrivers;
