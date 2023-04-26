import React, { useState, useContext, useCallback, useEffect } from "react";
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
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const PersonnelGenericRequestCard = ({
  queryKey,
  available,
  date_time,
  request_data,
  borderRadius = "md",
}) => {
  const [isOpen, setOpen] = useState(false);
  const [toastStatus, setToastStatus] = useState(null);
  const [tripTicketAmbulance, setTripTicketAmbulance] = useState({});
  const [ambulanceStatus, setAmbulanceStatus] = useState("");
  const [ticketMethod, setTicketMethod] = useState("");

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
    pickup_location,
    transfer_location,
    referral_slip,
    patient_condition,
    status,
    ticket_id,
  } = request_data || {};

  const name = `${first_name} ${last_name}`;

  const toast = useToast();
  const queryClient = useQueryClient();

  const fetchAssignedAmbulance = async () => {
    const headers = {
      Authorization: `Bearer ${parsed_user_data.token}`,
    };
    const response = await axios.get(
      `${ENDPOINT}ambulance/travelling/?ticket_id=${ticket_id}`,
      { headers }
    );
    return response.data;
  };

  const { data, error, refetch, isLoading, isFetching } = useQuery(
    ["trip_ticket_ambulance"],
    fetchAssignedAmbulance,
    {
      refetchOnWindowFocus: true,
      enabled: false,
    }
  );

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setTripTicketAmbulance(data);
    }
  }, [data, isLoading, isFetching]);
  console.log({ tripTicketAmbulance });
  console.log(available, "AVAILABLE CARD");

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
    let ambulance_id;
    switch (ambulanceStatus) {
      case "travelling":
        ambulance_id = available?._id;
        break;
      case "available":
        ambulance_id = tripTicketAmbulance?._id;
        break;

      default:
        null;
        break;
    }
    return axios.put(`${ENDPOINT}ambulance/all/${ambulance_id}`, data, config);
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
      queryClient.invalidateQueries(["trip_ticket_ambulance"]);
    },
  });

  const ambulanceMutation = useMutation({
    mutationFn: handleUpdateAmbulanceStatus,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (response) => {
      console.log(response, "SUCCESS");
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
        console.log({ ticket: response }, "ON SUCCESS RESPONSE OF TICKET");

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
    setAmbulanceStatus("available");

    const body = {
      pickup_location: request_data?.pickup_location,
      status: "rejected",
      handled_by: parsed_user_data?.id,
    };
    requestMutation.mutate(body);

    if (ticket_id !== undefined) {
      ambulanceMutation.mutate({
        status: "available",
      });
    }
    setOpen(false);
  };

  const approveRequest = (e) => {
    e.preventDefault();
    setToastStatus("Approved");
    setAmbulanceStatus("travelling");

    if (ticket_id !== undefined) {
      setTicketMethod("put");
      const requestBody = {
        pickup_location: request_data?.pickup_location,
        status: "approved",
      };

      requestMutation.mutate(requestBody);

      ambulanceMutation.mutate({
        status: "travelling",
      });
    } else if (ticket_id === undefined) {
      setTicketMethod("post");
      const ticketBody = {
        ambulance_personnel: parsed_user_data?.id,
        requestor: user_id,
        request_id: _id,
        personnel_fullname: parsed_user_data?.fullName,
        patient_fullname: name,
        ambulance: available?._id,
        destination: transfer_location,
      };
      ticketMutation.mutate(ticketBody);
    }

    setOpen(false);
  };

  const handleOpenModal = () => {
    setOpen(!isOpen);
    if (ticket_id !== undefined) {
      refetch();
    }
  };

  console.log({ ticket_id });
  console.log(ticketMethod, "TICKET METHODS");
  console.log({ tripTicketAmbulance });
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
