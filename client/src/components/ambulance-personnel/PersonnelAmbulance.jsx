import React, { useState, useMemo } from "react";
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
  Text,
  ModalBody,
} from "@chakra-ui/react";
import { UilAmbulance } from "@iconscout/react-unicons";
import ModalContainer from "../global/ModalContainer";
import { useTable } from "react-table";

const PersonnelAmbulancePage = () => {
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
        id: "thisisambulanceid1",
        license_plate: "ABCD  1232",
        status: "Available",
        action: viewButton,
      },
      {
        id: "thisisambulanceid2",
        license_plate: "ABCD  1233",
        status: "Available",
        action: viewButton,
      },
      {
        id: "thisisambulanceid3",
        license_plate: "ABCD  1234",
        status: "Available",
        action: viewButton,
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Ambulance ID",
        accessor: "id",
      },
      {
        Header: "Ambulance Plate",
        accessor: "license_plate",
      },
      {
        Header: (
          <Select size="xs" fontWeight="bold" placeholder="STATUS">
            <option value="available">AVAILABLE</option>
            <option value="travelling">TRAVELLING</option>
            <option value="maintenance">MAINTENANCE</option>
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

export default React.memo(PersonnelAmbulancePage);
