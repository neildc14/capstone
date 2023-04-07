import React, { useState } from "react";
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
  ModalBody,
} from "@chakra-ui/react";
import { UilSearch, UilLayerGroup } from "@iconscout/react-unicons";
import ModalContainer from "../global/ModalContainer";
import RequestCard from "../global/RequestCard";
import PaginatedItems from "../global/PaginatedItems";

const AdministratorRequests = () => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(!isOpen);
  };

  // Example items, to simulate fetching from another resources.
  const items = [1, 2, 3, 4, 5, 6];

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
          <Tabs variant="enclosed" isLazy>
            <TabList>
              <Tab
                fontSize={{ base: "xs", md: "md" }}
                _selected={{ color: "orange.500", fontWeight: "semibold" }}
              >
                All
              </Tab>
              <Tab
                fontSize={{ base: "xs", md: "md" }}
                _selected={{ color: "orange.500", fontWeight: "semibold" }}
              >
                Pending
              </Tab>
              <Tab
                fontSize={{ base: "xs", md: "md" }}
                _selected={{ color: "orange.500", fontWeight: "semibold" }}
              >
                Approved
              </Tab>
              <Tab
                fontSize={{ base: "xs", md: "md" }}
                _selected={{ color: "orange.500", fontWeight: "semibold" }}
              >
                Fulfilled
              </Tab>
            </TabList>

            <TabPanels bgColor="custom.secondary" mt={4} py={2}>
              <TabPanel>
                <Flex flexDirection="column" gap={4}>
                  <PaginatedItems itemsPerPage={4} items={items}>
                    {(currentItems) => (
                      <Flex flexDirection="column" gap={2}>
                        {currentItems &&
                          currentItems.map((item) => (
                            <RequestCard
                              key={item}
                              bgColor="white"
                              borderRadius="sm"
                              card_header="Request ID"
                              card_header_detail="dasdajhgsdfgdsgfd"
                            />
                          ))}
                      </Flex>
                    )}
                  </PaginatedItems>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex flexDirection="column" gap={4}>
                  <PaginatedItems itemsPerPage={4} items={items}>
                    {(currentItems) => (
                      <Flex flexDirection="column" gap={2}>
                        {currentItems &&
                          currentItems.map((item) => (
                            <RequestCard
                              key={item}
                              bgColor="white"
                              borderRadius="sm"
                              card_header="Request ID"
                              card_header_detail="dasdajhgsdfgdsgfd"
                            />
                          ))}
                      </Flex>
                    )}
                  </PaginatedItems>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex flexDirection="column" gap={4}>
                  <PaginatedItems itemsPerPage={4} items={items}>
                    {(currentItems) => (
                      <Flex flexDirection="column" gap={2}>
                        {currentItems &&
                          currentItems.map((item) => (
                            <RequestCard
                              key={item}
                              bgColor="white"
                              borderRadius="sm"
                              card_header="Request ID"
                              card_header_detail="dasdajhgsdfgdsgfd"
                            />
                          ))}
                      </Flex>
                    )}
                  </PaginatedItems>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex flexDirection="column" gap={4}>
                  <PaginatedItems itemsPerPage={4} items={items}>
                    {(currentItems) => (
                      <Flex flexDirection="column" gap={2}>
                        {currentItems &&
                          currentItems.map((item) => (
                            <RequestCard
                              key={item}
                              bgColor="white"
                              borderRadius="sm"
                              card_header="Request ID"
                              card_header_detail="dasdajhgsdfgdsgfd"
                            />
                          ))}
                      </Flex>
                    )}
                  </PaginatedItems>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>

      <ModalContainer
        header="Requestor ID"
        header_detail="pqoerjflsdakfn"
        isOpen={isOpen}
        onClose={handleOpenModal}
      >
        <ModalBody>
          <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
            Requestor Name:
            <Text as="span" fontWeight="normal" textTransform="capitalize">
              Nero Nero
            </Text>
          </Heading>
        </ModalBody>
      </ModalContainer>
    </>
  );
};

export default AdministratorRequests;
