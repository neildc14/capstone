import React, { useState, useEffect, useCallback } from "react";
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
import DriverCard from "../global/DriverCard";
import PaginatedItems from "../global/PaginatedItems";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const AdministratorDrivers = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [allDrivers, setAllDrivers] = useState([]);
  const [driverSchedules, setDriverSchedules] = useState([]);

  const fetchDetails = useCallback(async () => {
    const results = await Promise.allSettled([
      axios.get(`${ENDPOINT}auth/users/drivers`),
      axios.get(`${ENDPOINT}schedule`),
    ]);

    return results;
  }, []);

  const queryKey = "drivers";
  const { data, error, isLoading, isFetching } = useQuery(
    [queryKey],
    fetchDetails,
    {
      refetchOnWindowFocus: true,
    }
  );

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setAllDrivers(data[0]?.value?.data);
      setDriverSchedules(data[1]?.value?.data);
    }
  }, [data]);

  let stand_by = [];
  let driving = [];
  let off_duty = [];

  const filterDrivers = () => {
    if (Array.isArray(driverSchedules)) {
      stand_by = driverSchedules?.filter(
        (driver) => driver.status === "stand-by"
      );
      driving = driverSchedules?.filter(
        (driver) => driver.status === "driving"
      );
      off_duty = driverSchedules?.filter(
        (driver) => driver.status === "off-duty"
      );
    }
  };
  filterDrivers();

  const tabs = [
    {
      label: "All",
      items: allDrivers ?? [],
      get counter() {
        return this?.items?.length;
      },
    },
    {
      label: "Stand-by",

      items: stand_by,
      get counter() {
        return this?.items?.length;
      },
    },
    {
      label: "Driving",

      items: driving,
      get counter() {
        return this?.items?.length;
      },
    },
    {
      label: "Off-duty",

      items: off_duty,
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
              {!error &&
                tabs?.map((tab) => (
                  <TabPanel key={tab.label}>
                    <Flex flexDirection="column" gap={4}>
                      <PaginatedItems itemsPerPage={4} items={tab.items}>
                        {(currentItems) => (
                          <Flex flexDirection="column" gap={2}>
                            {currentItems &&
                              currentItems.map((item) => (
                                <DriverCard
                                  key={item._id}
                                  borderRadius="sm"
                                  name={
                                    item?.scheduled_personnel?.fullName ||
                                    `${item?.firstname} ${item?.lastname}`
                                  }
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

export default React.memo(AdministratorDrivers);