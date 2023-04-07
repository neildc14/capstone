import React, { useState, useMemo } from "react";
import {
  Box,
  Heading,
  Flex,
  Button,
  Card,
  CardBody,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
} from "@chakra-ui/react";
import ModalContainer from "../global/ModalContainer";
import { UilEye } from "@iconscout/react-unicons";
import { useTable } from "react-table";

const AdministratorRequestCard = ({
  request_data,
  bgColor = "#F5F5F5",
  borderRadius = "md",
}) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(!isOpen);
  };

  const viewButton = (
    <Button
      size="sm"
      display="inline-flex"
      gap={1}
      px={4}
      bgColor="custom.primary"
      color="white"
      _hover={{ bgColor: "orange.500" }}
      onClick={handleOpenModal}
    >
      <UilEye color="white" /> View
    </Button>
  );

  const data = useMemo(
    () => [
      {
        id: "dasldasdngf",
        name: "Juan Dela Cruz",
        pickup_location: "San Jose",
        transfer_location: "Manila",
        action: viewButton,
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
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
        Header: "",
        accessor: "action",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <Card
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
        bgColor={bgColor}
        borderRadius={borderRadius}
      >
        <CardBody p={0}>
          <TableContainer>
            <Table {...getTableProps()}>
              <Thead>
                {headerGroups.map((headerGroup) => (
                  <Tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <Th {...column.getHeaderProps()} textAlign="left">
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
                          <Td {...cell.getCellProps()} textAlign="left">
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
        </CardBody>
      </Card>

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

export default AdministratorRequestCard;
