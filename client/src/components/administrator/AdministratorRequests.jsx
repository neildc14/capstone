import React, { useState, useMemo } from "react";
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
import ModalContainer from "../global/ModalContainer";
import { useTable } from "react-table";

const AdministratorRequests = () => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(!isOpen);
  };

  const viewButton = (
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
  );

  const data = useMemo(
    () => [
      {
        id: "sadasddsadasdasdasdgsdgf",
        pickup_location: "Manila",
        transfer_location: "San Jose",
        status: "Pending",
        action: viewButton,
      },
      {
        id: "sadasddsadasdasdasdgsdgf",
        pickup_location: "Manila",
        transfer_location: "San Jose",
        status: "Pending",
        action: viewButton,
      },
      {
        id: "sadasddsadasdasdasdgsdgf",
        pickup_location: "Manila",
        transfer_location: "San Jose",
        status: "Pending",
        action: viewButton,
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Request ID",
        accessor: "id",
      },
      {
        Header: "Pickup Location",
        accessor: "pickup_location",
      },
      {
        Header: "Transfer Location",
        accessor: "transfer_location",
      },
      {
        Header: (
          <Select size="xs" fontWeight="bold" placeholder="STATUS">
            <option value="pending">PENDING</option>
            <option value="approved">APPROVED</option>
            <option value="fulfilled">FULFILLED</option>
            <option value="rejected">REJECTED</option>
          </Select>
        ),
        accessor: "status",
      },
      { Header: "Action", accessor: "action" },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

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
            <Table {...getTableProps()}>
              <Thead>
                {headerGroups.map((headerGroup) => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <Th {...column.getHeaderProps()} textAlign="center">
                        {column.render("Header")}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <Tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <Td {...cell.getCellProps()} textAlign="center">
                            {cell.render("Cell")}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })}
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

export default AdministratorRequests;
