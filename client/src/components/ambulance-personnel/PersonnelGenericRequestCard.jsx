import React, { useState, useContext, useEffect } from "react";
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
import { UilEye } from "@iconscout/react-unicons";
import { DateTime } from "luxon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

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
  const [ambulanceID, setAmbulanceID] = useState(null);

  const user = useContext(AuthContext);
  const parsed_user_data = JSON.parse(user);
  const config = {
    headers: {
      Authorization: `Bearer ${parsed_user_data?.token}`,
      "Content-Type": "application/json",
    },
  };

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

  useEffect(() => {
    const ambulance_id = localStorage.getItem("ambulance_id");
    setAmbulanceID(JSON.parse(ambulance_id));
  }, []);

  const updateRequest = async (data) => {
    return axios.put(
      `${ENDPOINT}request/requestor/${request_data?._id}`,
      data,
      config
    );
  };

  const makeTicket = async (data) => {
    return axios.post(`${ENDPOINT}ticket/all`, data, config);
  };

  const handleUpdateAmbulanceStatus = async (data) => {
    return axios.put(`${ENDPOINT}ambulance/all/${ambulanceID}`, data, config);
  };

  const requestMutation = useMutation({
    mutationFn: updateRequest,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (response) => {
      console.log({ request: response });
      toast({
        title: "Request update.",
        description: `Request is marked a ${toastStatus}`,
        status: "success",
        duration: 2000,
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
    onSuccess: () => {
      queryClient.invalidateQueries(["ambulance"]);
    },
  });

  const ticketMutation = useMutation({
    mutationFn: makeTicket,
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
    }

    setOpen(false);
  };

  const approveRequest = (e) => {
    e.preventDefault();
    setToastStatus("Approved");

    if (ticket_id === undefined) {
      const ticketBody = {
        ambulance_personnel: parsed_user_data?.id,
        requestor: user_id,
        request_id: _id,
        personnel_fullname: parsed_user_data?.fullName,
        patient_fullname: name,
        ambulance: ambulanceID,
        destination: transfer_location,
      };
      ticketMutation.mutate(ticketBody);
    } else if (ticket_id !== undefined) {
      const requestBody = {
        pickup_location: request_data?.pickup_location,
        status: "approved",
        handled_by: parsed_user_data?.id,
      };
      requestMutation.mutate(requestBody);

      ambulanceMutation.mutate({
        status: "travelling",
      });
    }

    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(!isOpen);
  };

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
