import React, {
  useState,
  useMemo,

  useEffect,
} from "react";
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
  useToast,
} from "@chakra-ui/react";
import ModalContainer from "../global/ModalContainer";
import ReferralSlipImage from "../global/ReferralSlipImage";
import { UilEye } from "@iconscout/react-unicons";
import { useTable } from "react-table";
import { useMutation, useQueryClient, } from "@tanstack/react-query";
import axios from "axios";

import ReferralSlip from "../../utils/fetch-referral";
import ZoomImage from "../global/ZoomImage";
import Authorization from "../../utils/auth";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const AdministratorPendingRequestCard = ({
  request_data,
  driverOnDuty,
  bgColor = "#F5F5F5",
  borderRadius = "md",
}) => {
  const [isOpen, setOpen] = useState(false);
  const [toastStatus, setToastStatus] = useState(null);
  const [mutationFunctionType, setMutationFunctionType] = useState("");

  const {
    _id: _id,
    user_id,
    first_name,
    last_name,
    ticket_id,
    pickup_location,
    transfer_location,
    patient_condition,
  } = request_data || {};

  const name = `${first_name} ${last_name}`;

  const toast = useToast();
  const queryClient = useQueryClient();

  const { headers, config } = Authorization();
  const [zoom, setZoom] = useState(false);
  const [zoomImage, setZoomImage] = useState("");

  const referralSlipBlob = ReferralSlip({
    referralSlip: request_data?.referral_slip,
    headers,
  });

  useEffect(() => {
    if (referralSlipBlob) {
      setZoomImage(URL?.createObjectURL(referralSlipBlob));
    }
  }, [referralSlipBlob]);

  const updateRequest = (data) => {
    return axios.put(
      `${ENDPOINT}request/requestor/${request_data?._id}`,
      data,
      config
    );
  };

  const handleTicket = (data) => {
    switch (mutationFunctionType) {
      case "POST":
        return axios.post(`${ENDPOINT}ticket/all`, data, config);
      case "UPDATE":
        return axios.put(`${ENDPOINT}ticket/all/${ticket_id}`, data, config);
    }
  };

  const handleUpdateAmbulanceStatus = async (data) => {
    return axios.put(
      `${ENDPOINT}ambulance/all/${driverOnDuty.ambulance}`,
      data,
      config
    );
  };
  const updateSchedule = async (data) => {
    const response = await axios.put(
      `${ENDPOINT}schedule/all_schedule/${driverOnDuty._id}`,
      data,
      config
    );
    return response;
  };

  const requestMutation = useMutation({
    mutationFn: updateRequest,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      toast({
        title: "Request update.",
        description: `Request is marked a ${toastStatus}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      queryClient.invalidateQueries(["ambulance_request"]);
      queryClient.invalidateQueries(["admin_all_informations"]);
    },
  });

  const ambulanceMutation = useMutation({
    mutationFn: handleUpdateAmbulanceStatus,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["ambulance"]);
    },
  });

  const ticketMutation = useMutation({
    mutationFn: handleTicket,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (response) => {
      if (response) {
        const requestBody = {
          pickup_location: request_data?.pickup_location,
          status: "approved",
          handled_by: driverOnDuty?.scheduled_personnel?._id,
          ticket_id: response.data._id,
        };
        requestMutation.mutate(requestBody);

        ambulanceMutation.mutate({
          status: "travelling",
        });
      }
    },
  });

  const scheduleMutation = useMutation({
    mutationFn: updateSchedule,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (response) => {},
  });

  const rejectRequest = (e) => {
    e.preventDefault();

    setToastStatus("Rejected");
    const body = {
      pickup_location: request_data?.pickup_location,
      status: "rejected",
      handled_by: driverOnDuty?.scheduled_personnel?._id,
    };
    requestMutation.mutate(body);

    setOpen(false);
  };

  const approveRequest = (e) => {
    e.preventDefault();
    if (driverOnDuty?.length === 0 || driverOnDuty === undefined) {
      alert("No driver on duty found. Please contact your drivers.");
      return;
    }
    setToastStatus("Approved");

    const ticketBody = {
      ambulance_personnel: driverOnDuty?.scheduled_personnel?._id,
      requestor: user_id,
      request_id: _id,
      personnel_fullname: driverOnDuty.scheduled_personnel.fullName,
      patient_fullname: name,
      ambulance: driverOnDuty.ambulance,
      destination: transfer_location,
    };

    if (ticket_id === undefined || ticket_id === null) {
      setMutationFunctionType("POST");
      ticketMutation.mutate(ticketBody);
    } else if (ticket_id !== undefined || ticket_id !== null) {
      setMutationFunctionType("UPDATE");
      ticketMutation.mutate(ticketBody);
    }

    scheduleMutation.mutate({
      status: "driving",
      ambulance: driverOnDuty.ambulance,
    });
    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(!isOpen);
  };

  const handleZoomInModal = () => {
    setOpen(!isOpen);
    setZoom(!zoom);
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
        _id,
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
          <TableContainer width="100%">
            <Table {...getTableProps()} width="100%%">
              <Thead width="100%%">
                {headerGroups.map((headerGroup, i) => (
                  <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
                    {headerGroup.headers.map((column, index) => (
                      <Th
                        {...column.getHeaderProps()}
                        key={index}
                        textAlign="left"
                        width={"30%"}
                        maxWidth={index === 1 && "50px"}
                      >
                        {column.render("Header")}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody {...getTableBodyProps()} width="100%%">
                {rows.map((row, i) => {
                  prepareRow(row);
                  return (
                    <Tr {...row.getRowProps()} key={i}>
                      {row.cells.map((cell, index) => {
                        return (
                          <Td
                            {...cell.getCellProps()}
                            key={index}
                            textAlign="left"
                            maxWidth={index === 1 && "50px"}
                            width={"30%"}
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
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
        header_detail={_id}
        isOpen={isOpen}
        onClose={handleOpenModal}
      >
        <ModalBody>
          <Heading as="h6" fontSize="md" mb={{ base: 4 }} fontWeight="semibold">
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
          <Heading as="h6" fontSize="md" mb={{ base: 4 }} fontWeight="semibold">
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
          <Heading as="h6" fontSize="md" mb={{ base: 4 }} fontWeight="semibold">
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
          <Heading as="h6" fontSize="md" mb={{ base: 4 }} fontWeight="semibold">
            Patient Condition:
            <Text as="span" ps={2} fontWeight="normal">
              {patient_condition}
            </Text>
          </Heading>
          {referralSlipBlob && (
            <>
              <ReferralSlipImage
                handleZoomInModal={handleZoomInModal}
                referralSlipBlob={referralSlipBlob}
              />
            </>
          )}
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
      </ModalContainer>{" "}
      <ZoomImage isOpen={zoom} onClose={handleZoomInModal} image={zoomImage} />
    </>
  );
};

export default React.memo(AdministratorPendingRequestCard);
