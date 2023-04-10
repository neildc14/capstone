import React, { useState, useMemo } from "react";
import {
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
  ModalBody,
  ModalFooter,
  Divider,
  Image,
  useToast,
} from "@chakra-ui/react";
import ModalContainer from "../global/ModalContainer";
import { UilEye } from "@iconscout/react-unicons";
import { useTable } from "react-table";
import { useMutation , } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const AdministratorPendingRequestCard = ({
  request_data,
  bgColor = "#F5F5F5",
  borderRadius = "md",
}) => {
  const [isOpen, setOpen] = useState(false);
  const [status, setStatus] = useState(null);

  const toast = useToast();

  const updateRequest = (data) => {
    return axios.put(`${ENDPOINT}request/${request_data?._id}`, data);
  };

  const mutation = useMutation({
    mutationFn: updateRequest,
    onError: (error, variables, context) => {
      console.log(error);
    },
    onSuccess: () => {
      toast({
        title: "Request update.",
        description: `Request is marked a ${status}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const rejectRequest = (e) => {
    e.preventDefault();
    setStatus("Rejected");
    const body = {
      pickup_location: request_data?.pickup_location,
      status: "rejected",
    };
    mutation.mutate(body);
    setOpen(false);
  };

  const approveRequest = (e) => {
    e.preventDefault();
    setStatus("Approved");

    const body = {
      pickup_location: request_data?.pickup_location,
      status: "approved",
    };

    mutation.mutate(body);
    setOpen(false);
  };

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

  const id = request_data?._id;
  const name = `${request_data?.first_name} ${request_data?.last_name}`;
  const pickup_location = request_data?.pickup_location;
  const transfer_location = request_data?.transfer_location;
  const referral_slip = request_data?.referral_slip;
  const patient_condition = request_data?.patient_condition;

  const data = useMemo(
    () => [
      {
        id,
        name,
        pickup_location,
        transfer_location,
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
        Header: "Action",
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
                          <Td
                            {...cell.getCellProps()}
                            textAlign="left"
                            width="30%"
                          >
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
        header_detail={id}
        isOpen={isOpen}
        onClose={handleOpenModal}
      >
        <ModalBody>
          <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
            Requestor Name:
            <Text
              as="span"
              ps={2}
              fontWeight="normal"
              textTransform="capitalize"
            >
              {name}
            </Text>
          </Heading>
          <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
            Pick-up Location:
            <Text
              as="span"
              ps={2}
              fontWeight="normal"
              textTransform="capitalize"
            >
              {pickup_location}
            </Text>
          </Heading>
          <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
            Transfer Location:
            <Text
              as="span"
              ps={2}
              fontWeight="normal"
              textTransform="capitalize"
            >
              {transfer_location}
            </Text>
          </Heading>
          <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
            Patient Condition:
            <Text as="span" ps={2} fontWeight="normal">
              {patient_condition}
            </Text>
          </Heading>
          <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
            Referral Slip:
          </Heading>
          {referral_slip && <Image src={referral_slip} alt="referral slip" />}
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Flex width="100%" justifyContent="space-between">
            <Button
              size="sm"
              bgColor="yellow.500"
              color="white"
              _hover={{ bgColor: "yellow.600" }}
              onClick={rejectRequest}
            >
              Decline
            </Button>
            <Button
              size="sm"
              bgColor="green.500"
              color="white"
              _hover={{ bgColor: "green.600" }}
              onClick={approveRequest}
            >
              Approve
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContainer>
    </>
  );
};

export default React.memo(AdministratorPendingRequestCard);
