import React, { useState } from "react";
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

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const AdministratorGenericRequestCard = ({
  date_time,
  request_data,
  borderRadius = "md",
}) => {
  const [isOpen, setOpen] = useState(false);
  const [toastStatus, setToastStatus] = useState(null);

  const toast = useToast();
  const queryClient = useQueryClient();

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
        description: `Request is marked a ${toastStatus}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      queryClient.invalidateQueries(["ambulance_request"]);
    },
  });

  const rejectRequest = (e) => {
    e.preventDefault();
    setToastStatus("Rejected");
    const body = {
      pickup_location: request_data?.pickup_location,
      status: "rejected",
    };
    mutation.mutate(body);
    setOpen(false);
  };

  const approveRequest = (e) => {
    e.preventDefault();
    setToastStatus("Approved");

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

  const dt = DateTime.fromISO(date_time);
  const formattedDate = dt.toFormat("MM/dd/yy hh:mm:ss");

  const id = request_data?._id;
  const name = `${request_data?.first_name} ${request_data?.last_name}`;
  const pickup_location = request_data?.pickup_location;
  const transfer_location = request_data?.transfer_location;
  const referral_slip = request_data?.referral_slip;
  const patient_condition = request_data?.patient_condition;
  const status = request_data?.status;

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
        {request_data?.status !== "fulfilled" && (
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
        )}
      </ModalContainer>
    </>
  );
};

export default AdministratorGenericRequestCard;
