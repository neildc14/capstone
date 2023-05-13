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
import React, { useState, useContext, useCallback, useEffect } from "react";
import ModalContainer from "../global/ModalContainer";
import ReferralSlipImage from "../global/ReferralSlipImage";
import { UilEye } from "@iconscout/react-unicons";
import { DateTime } from "luxon";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import ReferralSlip from "../../utils/fetch-referral";
import ZoomImage from "../global/ZoomImage";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const AdministratorGenericRequestCard = ({
  date_time,
  request_data,
  borderRadius = "md",
}) => {
  const [isOpen, setOpen] = useState(false);
  const [toastStatus, setToastStatus] = useState(null);
  const [mutationFunctionType, setMutationFunctionType] = useState("");

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
    patient_condition,
    status,
  } = request_data || {};

  const name = `${first_name} ${last_name}`;

  const toast = useToast();
  const queryClient = useQueryClient();

  const user = useContext(AuthContext);
  const parsed_user_data = JSON.parse(user);
  const config = {
    headers: {
      Authorization: `Bearer ${parsed_user_data?.token}`,
      "Content-Type": "application/json",
    },
  };
  const headers = { Authorization: `Bearer ${parsed_user_data?.token}` };
  const [zoom, setZoom] = useState(false);
  const [zoomImage, setZoomImage] = useState("");

  const referralSlipBlob = ReferralSlip({
    referralSlip: request_data?.referral_slip,
    headers: {
      Authorization: `Bearer ${parsed_user_data?.token}`,
    },
  });

  useEffect(() => {
    if (referralSlipBlob) {
      setZoomImage(URL?.createObjectURL(referralSlipBlob));
    }
  }, [referralSlipBlob]);

  const fetchSchedules = async () => {
    const response = await axios.get(`${ENDPOINT}schedule/all_schedule`, {
      headers,
    });
    return response.data;
  };

  const { data, isLoading, isFetching, error } = useQuery(
    ["schedules"],
    fetchSchedules,
    {
      refetchOnWindowFocus: true,
    }
  );

  const filterDriver = useCallback(() => {
    const today = new Date().toISOString().slice(0, 10);
    let driverOnDuty = [];
    if (Array.isArray(data)) {
      driverOnDuty = data?.filter(
        (driver) =>
          driver.status === "stand-by" &&
          driver.createdAt.slice(0, 10) === today
      );
    }

    return driverOnDuty[0];
  }, [data]);

  const driverOnDuty = filterDriver();

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
          handled_by: driverOnDuty._id,
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
      handled_by: driverOnDuty._id,
    };
    requestMutation.mutate(body);

    if (approvedRequestsLength <= 1) {
      ambulanceMutation.mutate({
        status: "available",
      });

      scheduleMutation.mutate({
        status: "stand-by",
        ambulance: driverOnDuty.ambulance,
      });
    }
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
      ambulance_personnel: driverOnDuty.scheduled_personnel?._id,
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

  console.log(driverOnDuty);
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
        header_detail={_id}
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
        {request_data?.status !== "fulfilled" && (
          <ModalFooter>
            <Flex width="100%" justifyContent="space-between">
              <Button
                size="sm"
                px={{ base: 4, md: 10 }}
                bgColor="yellow.500"
                color="white"
                _hover={{ bgColor: "yellow.600" }}
                isDisabled={
                  status === "rejected" || (status === "rejected" && true)
                }
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
      </ModalContainer>{" "}
      <ZoomImage isOpen={zoom} onClose={handleZoomInModal} image={zoomImage} />
    </>
  );
};

export default AdministratorGenericRequestCard;
