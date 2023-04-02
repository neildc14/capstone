import React from "react";
import {
  Box,
  Flex,
  Heading,
  Divider,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Select,
  Button,
} from "@chakra-ui/react";
import { UilAmbulance } from "@iconscout/react-unicons";

const PersonnelAmbulancePage = () => {
  return (
    <Box>
      <Box as="section">
        <Flex justifyContent="space-between" alignItems="center">
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
            <UilAmbulance color="#FF7A00" /> Ambulance
          </Heading>
        </Flex>
        <Divider />
      </Box>
      <TableContainer
        height="76vh"
        overflowY="scroll"
        overflowX={{ base: "scroll", lg: "hidden" }}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th textAlign="center">Ambulance ID</Th>
              <Th textAlign="center">Ambulance Plate</Th>
              <Th
                textAlign="center"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                Status:
                <Select size="xs" fontWeight="bold">
                  <option value="available">AVAILABLE</option>
                  <option value="travelling">TRAVELLING</option>
                  <option value="maintenance">MAINTENANCE</option>
                </Select>
              </Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td textAlign="center">dasdlkwdqfrmpgfsdmfglsdasdadg</Td>
              <Td textAlign="center">ABC 1234</Td>
              <Td textAlign="center">Available</Td>
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
              <Td textAlign="center">dasdlkwdqfrmpgfsdmfglsdasdadg</Td>
              <Td textAlign="center">ABC 1234</Td>
              <Td textAlign="center">Travelling</Td>
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
              <Td textAlign="center">dasdlkwdqfrmpgfsdmfglsdasdadg</Td>
              <Td textAlign="center">ABC 1234</Td>
              <Td textAlign="center">Maintenance</Td>
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
  );
};

export default PersonnelAmbulancePage;
