import React, { useState, useEffect, useCallback } from "react";
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
import DriverCard from "../global/DriverCard";
import PaginatedItems from "../global/PaginatedItems";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SearchBar from "../global/SearchBar";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const AdministratorDrivers = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [allDrivers, setAllDrivers] = useState([]);
  const [driverSchedules, setDriverSchedules] = useState([]);
  const [nonAssignedDrivers, setNonAssignedDrivers] = useState([]);
  const [search, setSearch] = useState([]);

  const stand_by = [];
  const driving = [];
  const off_duty = [];

  const fetchDetails = useCallback(async () => {
    const results = await Promise.allSettled([
      axios.get(`${ENDPOINT}auth/users/drivers`),
      axios.get(`${ENDPOINT}schedule/all_schedule`),
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

  useEffect(() => {
    const nonAssignedDrivers = allDrivers?.filter((driver) => {
      if (driverSchedules?.length !== 0) {
        return !driverSchedules?.some(
          (schedule) =>
            schedule.scheduled_personnel?._id === driver._id ||
            schedule.scheduled_personnel?._id === ""
        );
      }
      return [];
    });

    setNonAssignedDrivers(nonAssignedDrivers);
  }, [allDrivers, driverSchedules]);

  const filterDrivers = () => {
    if (Array.isArray(driverSchedules) && driverSchedules !== undefined) {
      stand_by.push(
        ...driverSchedules?.filter((driver) => driver.status === "stand-by")
      );

      driving.push(
        ...driverSchedules?.filter((driver) => driver.status === "driving")
      );

      off_duty.push(
        ...driverSchedules?.filter((driver) => driver.status === "off-duty")
      );
    }
  };
  filterDrivers();

  const checkIfEmptyDrivers = () => {
    const driversWithNoDuty = [];
    if (nonAssignedDrivers !== undefined) {
      driversWithNoDuty.push(...nonAssignedDrivers);
    }
    if (off_duty.length !== 0) {
      driversWithNoDuty.push(off_duty);
    }
    return driversWithNoDuty;
  };

  const driversWithNoDuty = checkIfEmptyDrivers();

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

      items: driversWithNoDuty,
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
                  <UilLayerGroup color="#FF7A00" /> All Drivers
                </Heading>
                <SearchBar
                  memoizedData={allDrivers}
                  setSearch={setSearch}
                  placeholder="Search a request"
                  noResultMessage="No driver found."
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
                {!error &&
                  tabs?.map((tab, index) => (
                    <Tab
                      key={tab.label}
                      display="inline-block"
                      fontSize={{ base: "xs", md: "md" }}
                      _selected={{
                        color: "orange.500",
                        fontWeight: "semibold",
                      }}
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
                      <PaginatedItems itemsPerPage={4} items={tab?.items}>
                        {(currentItems) => (
                          <Flex flexDirection="column" gap={2}>
                            {currentItems !== undefined &&
                              currentItems.map((item) => (
                                <DriverCard
                                  key={item?._id}
                                  borderRadius="sm"
                                  driver_data={item}
                                  name={
                                    item?.scheduled_personnel?.fullName ||
                                    `${item?.firstname} ${item?.lastname}`
                                  }
                                />
                              ))}
                            {tab?.counter === 0 && (
                              <Text fontSize="md" color="orange.500">
                                No drivers found
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

          {search?.length > 0 && !error && (
            <Box bgColor="custom.secondary" mt={4} py={8} px={4}>
              <Flex flexDirection="column" gap={4}>
                <PaginatedItems itemsPerPage={4} items={search}>
                  {(currentItems) => (
                    <Flex flexDirection="column" gap={2}>
                      {currentItems !== undefined &&
                        currentItems.map((item, i) => (
                          <DriverCard
                            key={item?._id}
                            borderRadius="sm"
                            driver_data={item}
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
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default React.memo(AdministratorDrivers);
