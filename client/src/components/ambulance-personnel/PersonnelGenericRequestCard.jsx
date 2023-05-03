import React, { useState, useContext } from "react";
import {
  Heading,
  Flex,
  Button,
  Card,
  CardBody,
  Text,
  ModalBody,
  useToast,
  Divider,
  ModalFooter,
} from "@chakra-ui/react";
import ModalContainer from "../global/ModalContainer";
import { UilEye, UilCheck, UilUserLocation } from "@iconscout/react-unicons";
import { DateTime } from "luxon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import ScheduleContext from "../../context/ScheduleContext";
import { useLocation } from "react-router-dom";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const PersonnelGenericRequestCard = ({
  queryKey,
  approvedRequestsLength,
  date_time,
  request_data,
  borderRadius = "md",
}) => {
  const [isOpen, setOpen] = useState(false);
  const [toastStatus, setToastStatus] = useState(null);
  const [mutationFunctionType, setMutationFunctionType] = useState("");
  const location = useLocation();

  const user = useContext(AuthContext);
  const parsed_user_data = JSON.parse(user);
  const config = {
    headers: {
      Authorization: `Bearer ${parsed_user_data?.token}`,
      "Content-Type": "application/json",
    },
  };

  const { ambulance, id, updateScheduleData } = useContext(ScheduleContext);

  console.log(ambulance, "card");
  const dt = DateTime.fromISO(date_time);
  const formattedDate = dt.toFormat("MM/dd/yy hh:mm:ss");

  const {
    _id: _id,
    user_id,
    first_name,
    last_name,
    ticket_id,
    pickup_location,
    transfer_location,
    referral_slip,
    patient_condition,
    status,
  } = request_data || {};

  const name = `${first_name} ${last_name}`;
  const toast = useToast();
  const queryClient = useQueryClient();

  const updateRequest = async (data) => {
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
    return axios.put(`${ENDPOINT}ambulance/all/${ambulance}`, data, config);
  };
  const updateSchedule = async (data) => {
    const response = await axios.put(
      `${ENDPOINT}schedule/all_schedule/${id}`,
      data,
      config
    );
    return response;
  };

  const updateData = (data) => {
    updateScheduleData({
      id: data._id,
      status: data.status,
      ambulance: data.ambulance,
      ambulance_plate: data.ambulance_plate,
    });
  };

  const requestMutation = useMutation({
    mutationFn: updateRequest,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (response) => {
      toast({
        title: "Request update.",
        description: `Request is marked a ${toastStatus}`,
        status: "success",
        duration: 1000,
        isClosable: true,
      });

      queryClient.invalidateQueries([queryKey]);
      queryClient.invalidateQueries(["ambulance_request"]);
    },
  });

  const ambulanceMutation = useMutation({
    mutationFn: handleUpdateAmbulanceStatus,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (response) => {
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
          handled_by: parsed_user_data?.id,
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
    onSuccess: (response) => {
      updateData(response.data);
      const currentSchedule = JSON.parse(localStorage.getItem("schedule"));

      const updatedSchedule = {
        ...currentSchedule,
        status: response.data.status,
        ambulance: response.data.ambulance,
        ambulance_plate: response.data.ambulance_plate,
      };

      localStorage.setItem("schedule", JSON.stringify(updatedSchedule));
    },
  });

  const rejectRequest = (e) => {
    e.preventDefault();
    setToastStatus("Rejected");

    const body = {
      pickup_location: request_data?.pickup_location,
      status: "rejected",
      handled_by: parsed_user_data?.id,
    };
    requestMutation.mutate(body);

    if (approvedRequestsLength <= 1) {
      ambulanceMutation.mutate({
        status: "available",
      });

      scheduleMutation.mutate({
        status: "stand-by",
        ambulance: ambulance,
      });
    }

    setOpen(false);
  };

  const approveRequest = (e) => {
    e.preventDefault();
    setToastStatus("Approved");

    const ticketBody = {
      ambulance_personnel: parsed_user_data?.id,
      requestor: user_id,
      request_id: _id,
      personnel_fullname: parsed_user_data?.fullName,
      patient_fullname: name,
      ambulance: ambulance,
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
      ambulance: ambulance,
    });
    setOpen(false);
  };

  const fulfilledRequest = () => {
    setToastStatus("Fulfilled");
    const requestBody = {
      pickup_location: request_data?.pickup_location,
      status: "fulfilled",
      handled_by: parsed_user_data?.id,
    };
    requestMutation.mutate(requestBody);

    if (approvedRequestsLength <= 1) {
      ambulanceMutation.mutate({
        status: "available",
      });

      scheduleMutation.mutate({
        status: "stand-by",
        ambulance: ambulance,
      });
    }
  };

  const handleOpenModal = () => {
    setOpen(!isOpen);
  };

  console.log(mutationFunctionType);
  return (
    <>
      <Card
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.25)"
        bgColor={isOpen ? "orange.300" : "white"}
        borderRadius={borderRadius}
      >
        <CardBody>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent="space-between"
            alignItems={{ base: "left", md: "center" }}
            gap={{ base: 4, md: 0 }}
          >
            <Heading
              as="h5"
              flexBasis={{ md: "30%" }}
              display="block"
              fontSize="md"
              fontWeight="semibold"
            >
              Requestor:
              <Text as="span" ps={2} fontWeight="normal">
                {name}
              </Text>
            </Heading>
            <Heading
              as="h5"
              flexBasis={{ md: "5%" }}
              display="block"
              fontSize="md"
              fontWeight="semibold"
            >
              Status:
              <Text
                as="span"
                ps={2}
                fontWeight="normal"
                textTransform="capitalize"
              >
                {status}
              </Text>
            </Heading>
            <Heading
              as="h5"
              display="block"
              fontSize="md"
              fontWeight="semibold"
            >
              Date & Time Requested:
              <Text as="span" ps={2} fontWeight="normal">
                {formattedDate}
              </Text>
            </Heading>
            <Flex
              gap={{ base: 2 }}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Button
                size="sm"
                display="inline-flex"
                gap={1}
                width={{ base: "100%", md: "inherit" }}
                px={6}
                bgColor="custom.primary"
                color="white"
                _hover={{ bgColor: "orange.500" }}
                onClick={handleOpenModal}
              >
                <UilEye color="white" /> View
              </Button>
              <Button
                size="sm"
                display="inline-flex"
                gap={1}
                width={{ base: "100%", md: "inherit" }}
                px={6}
                bgColor="teal.600"
                color="white"
                _hover={{ bgColor: "teal.800" }}
                onClick={fulfilledRequest}
              >
                <UilCheck color="white" /> Fulfill
              </Button>
              {location.pathname === "/ambulance_personnel" && ticket_id && (
                <Button
                  as="a"
                  href={`/ambulance_personnel/map/${ticket_id}/${parsed_user_data.user_type}/${parsed_user_data.fullName}`}
                  size="sm"
                  display="inline-flex"
                  gap={1}
                  width={{ base: "100%", md: "inherit" }}
                  px={6}
                  bgColor="blue.600"
                  color="white"
                  _hover={{ bgColor: "blue.800" }}
                >
                  <UilUserLocation color="white" />
                  Locate
                </Button>
              )}
            </Flex>
          </Flex>
        </CardBody>
      </Card>

      <ModalContainer
        header="Requestor ID"
        header_detail={user_id}
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
        {request_data?.status !== "fulfilled" && (
          <ModalFooter>
            <Flex width="100%" justifyContent="space-between">
              <Button
                size="sm"
                px={{ base: 4, md: 10 }}
                bgColor="yellow.500"
                color="white"
                _hover={{ bgColor: "yellow.600" }}
                isDisabled={status === "rejected" && true}
                onClick={rejectRequest}
              >
                Decline
              </Button>
              <Button
                size="sm"
                px={{ base: 4, md: 10 }}
                bgColor="green.500"
                color="white"
                _hover={{ bgColor: "green.600" }}
                isDisabled={status === "approved" && true}
                onClick={approveRequest}
              >
                Approve
              </Button>
            </Flex>
          </ModalFooter>
        )}
      </ModalContainer>
    </>
  );
};

export default React.memo(PersonnelGenericRequestCard);
