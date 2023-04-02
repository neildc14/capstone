import React from "react";
import {
  Box,
  Button,
  Divider,
  Heading,
  Flex,
  Input,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Select,
  Tbody,
} from "@chakra-ui/react";
import { UilSearch } from "@iconscout/react-unicons";

const AllRequests = () => {
  return (
    <Box as="main">
      <Box as="section">
        <Box mb={8}>
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
                py={2}
                fontSize="xl"
                fontWeight="semibold"
                alignSelf={{ base: "start" }}
                bgColor="white"
                color="gray.700"
              >
                All Requests
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
        <TableContainer
          height="76vh"
          overflowY="scroll"
          overflowX={{ base: "scroll", lg: "hidden" }}
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th textAlign="center">Request ID</Th>
                <Th textAlign="center">Pickup Location</Th>
                <Th textAlign="center">Transfer Location</Th>
                <Th textAlign="center">
                  <Select placeholder="STATUS" size="xs" fontWeight="bold">
                    <option value="pending">PENDING</option>
                    <option value="approved">APPROVED</option>
                    <option value="fulfilled">FULFILLED</option>
                  </Select>
                </Th>
                <Th textAlign="center">Action</Th>
              </Tr>
            </Thead>
            <Tbody textAlign="center" fontSize={{ base: "sm", lg: "md" }}>
              <Tr>
                <Td textAlign="center">sadasddsadasdasdasdgsdgf</Td>
                <Td textAlign="center">Manila</Td>
                <Td textAlign="center">Cavite</Td>
                <Td textAlign="center">Pending</Td>
                <Td display="inline-flex">
                  <Button
                    size="sm"
                    px={6}
                    bgColor="custom.primary"
                    color="white"
                    _hover={{ bgColor: "orange.500" }}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td textAlign="center">sadasddsadasdasdasdgsdgf</Td>
                <Td textAlign="center">Manila</Td>
                <Td textAlign="center">Cavite</Td>
                <Td textAlign="center">Pending</Td>
                <Td display="inline-flex">
                  <Button
                    size="sm"
                    px={6}
                    bgColor="custom.primary"
                    color="white"
                    _hover={{ bgColor: "orange.500" }}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td textAlign="center">sadasddsadasdasdasdgsdgf</Td>
                <Td textAlign="center">Manila</Td>
                <Td textAlign="center">Cavite</Td>
                <Td textAlign="center">Pending</Td>
                <Td display="inline-flex">
                  <Button
                    size="sm"
                    px={6}
                    bgColor="custom.primary"
                    color="white"
                    _hover={{ bgColor: "orange.500" }}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td textAlign="center">sadasddsadasdasdasdgsdgf</Td>
                <Td textAlign="center">Manila</Td>
                <Td textAlign="center">Cavite</Td>
                <Td textAlign="center">Pending</Td>
                <Td display="inline-flex">
                  <Button
                    size="sm"
                    px={6}
                    bgColor="custom.primary"
                    color="white"
                    _hover={{ bgColor: "orange.500" }}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td textAlign="center">sadasddsadasdasdasdgsdgf</Td>
                <Td textAlign="center">Manila</Td>
                <Td textAlign="center">Cavite</Td>
                <Td textAlign="center">Pending</Td>
                <Td display="inline-flex">
                  <Button
                    size="sm"
                    px={6}
                    bgColor="custom.primary"
                    color="white"
                    _hover={{ bgColor: "orange.500" }}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td textAlign="center">sadasddsadasdasdasdgsdgf</Td>
                <Td textAlign="center">Manila</Td>
                <Td textAlign="center">Cavite</Td>
                <Td textAlign="center">Pending</Td>
                <Td display="inline-flex">
                  <Button
                    size="sm"
                    px={6}
                    bgColor="custom.primary"
                    color="white"
                    _hover={{ bgColor: "orange.500" }}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td textAlign="center">sadasddsadasdasdasdgsdgf</Td>
                <Td textAlign="center">Manila</Td>
                <Td textAlign="center">Cavite</Td>
                <Td textAlign="center">Pending</Td>
                <Td display="inline-flex">
                  <Button
                    size="sm"
                    px={6}
                    bgColor="custom.primary"
                    color="white"
                    _hover={{ bgColor: "orange.500" }}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td textAlign="center">sadasddsadasdasdasdgsdgf</Td>
                <Td textAlign="center">Manila</Td>
                <Td textAlign="center">Cavite</Td>
                <Td textAlign="center">Pending</Td>
                <Td display="inline-flex">
                  <Button
                    size="sm"
                    px={6}
                    bgColor="custom.primary"
                    color="white"
                    _hover={{ bgColor: "orange.500" }}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
              <Tr>
                <Td textAlign="center">sadasddsadasdasdasdgsdgf</Td>
                <Td textAlign="center">Manila</Td>
                <Td textAlign="center">Cavite</Td>
                <Td textAlign="center">Pending</Td>
                <Td display="inline-flex">
                  <Button
                    size="sm"
                    px={6}
                    bgColor="custom.primary"
                    color="white"
                    _hover={{ bgColor: "orange.500" }}
                  >
                    View
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AllRequests;
