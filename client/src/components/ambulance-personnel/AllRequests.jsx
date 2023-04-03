import React, { useState } from "react";
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
  Text,
} from "@chakra-ui/react";
import { UilSearch, UilLayerGroup } from "@iconscout/react-unicons";
import ModalContainer from "../ModalContainer";

const AllRequests = () => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(!isOpen);
  };

  let count = 10;

  const listItems = [];
  for (let i = 0; i < count; i++) {
    listItems.push(
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
            onClick={handleOpenModal}
          >
            View
          </Button>
        </Td>
      </Tr>
    );
  }
  return (
    <>
      <Box>
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
                {listItems}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <ModalContainer
        header="Requestor ID"
        header_detail="pqoerjflsdakfn"
        isOpen={isOpen}
        onClose={handleOpenModal}
      >
        <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
          Requestor Name:
          <Text as="span" fontWeight="normal" textTransform="capitalize">
            Nero Nero
          </Text>
        </Heading>
      </ModalContainer>
    </>
  );
};

export default AllRequests;
