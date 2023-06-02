import React, { useState, useCallback, useMemo } from "react";
import {
  Box,
  Divider,
  Heading,
  Flex,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { UilLayerGroup } from "@iconscout/react-unicons";
import PaginatedItems from "../global/PaginatedItems";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PersonnelAmbulanceCard from "./PersonnelAmbulanceCard";
import SearchBar from "../global/SearchBar";
import Authorization from "../../utils/auth";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const PersonnelAmbulance = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [search, setSearch] = useState([]);

  const { headers } = Authorization();

  const fetchAllAmbulance = useCallback(async () => {
    const response = await axios.get(`${ENDPOINT}ambulance/all`, { headers });
    return response.data;
  }, []);

  const queryKey = "ambulance";
  const { data, error } = useQuery([queryKey], fetchAllAmbulance, {
    refetchOnWindowFocus: true,
  });

  const memoizedData = useMemo(() => {
    return data;
  }, [data]);

  let available = [];
  let travelling = [];
  let maintenance = [];

  const filterAmbulances = () => {
    if (Array.isArray(memoizedData)) {
      available = memoizedData?.filter((req) => req.status === "available");
      maintenance = memoizedData?.filter((req) => req.status === "maintenance");
      travelling = memoizedData?.filter((req) => req.status === "travelling");
    }
  };
  filterAmbulances();

  const tabs = [
    {
      label: "All",
      get counter() {
        return this?.items?.length;
      },
      items: memoizedData ?? [],
    },
    {
      label: "Available",

      items: available,
      get counter() {
        return this?.items?.length;
      },
    },
    {
      label: "Travelling",

      items: travelling,
      get counter() {
        return this?.items?.length;
      },
    },
    {
      label: "Maintenance",

      items: maintenance,
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
                  <UilLayerGroup color="#FF7A00" /> All Ambulance
                </Heading>
                <SearchBar
                  memoizedData={memoizedData}
                  setSearch={setSearch}
                  placeholder="Search ambulance"
                  noResultMessage="No ambulance found."
                />
              </Flex>
              <Divider />
            </Box>
          </Box>
          {search.length <= 0 && (
            <Tabs
              variant="enclosed"
              isLazy
              selectedindex={selectedTab}
              onChange={(index) => setSelectedTab(index)}
            >
              <TabList overflowX="scroll" overflowY="hidden">
                {tabs?.map((tab, index) => (
                  <Tab
                    key={tab?.label}
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
                    <TabPanel key={tab.label}>
                      <Flex flexDirection="column" gap={4}>
                        <PaginatedItems itemsPerPage={4} items={tab.items}>
                          {(currentItems) => (
                            <Flex flexDirection="column" gap={2}>
                              {currentItems &&
                                currentItems.map((item) => (
                                  <PersonnelAmbulanceCard
                                    key={item?._id}
                                    borderRadius="sm"
                                    ambulance_data={item}
                                    license_plate={item?.license_plate}
                                  />
                                ))}

                              {tab?.counter === 0 && (
                                <Text fontSize="md" color="orange.500">
                                  No ambulance found
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
          )}

          {search.length > 0 && !error && (
            <Box bgColor="custom.secondary" mt={4} py={8} px={4}>
              <Flex flexDirection="column" gap={4}>
                <PaginatedItems itemsPerPage={4} items={search}>
                  {(currentItems) => (
                    <Flex flexDirection="column" gap={2}>
                      {currentItems !== undefined &&
                        currentItems.map((item, i) => (
                          <PersonnelAmbulanceCard
                            key={item._id}
                            borderRadius="sm"
                            ambulance_data={item}
                            license_plate={item?.license_plate}
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

export default React.memo(PersonnelAmbulance);
