import React, { useState, useContext } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { UilEye, UilTrashAlt, UilUserLocation } from "@iconscout/react-unicons";
import RequestCardDetailsModal from "../RequestCardDetailsModal";
import DeleteConfirmationModal from "./RequestorDeleteConfirmationModal";
import { useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const RequestCard = ({
  refetch,
  queryKey,
  request_data,
  request_id,
  request_status,
  bgColor = "gray.50",
}) => {
  const [isOpenRequestCardDetailsModal, setOpenRequestCardDetailsModal] =
    useState(false);
  const [isOpenDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);

  const toggleRequestCardDetailsModal = () => {
    setOpenRequestCardDetailsModal(!isOpenRequestCardDetailsModal);
  };

  const toggleDeleteConfirmationModal = () => {
    setOpenDeleteConfirmationModal(!isOpenDeleteConfirmationModal);
  };

  const location = useLocation();
  const user = useContext(AuthContext);
  const parsed_user_data = JSON.parse(user);

  return (
    <>
      <Card as="form" my={2} bgColor={bgColor}>
        <CardBody>
          <Flex
            flexDirection={{ base: "column", md: "row" }}
            justifyContent={{ md: "space-between" }}
            alignItems={{ md: "center" }}
            gap={{ base: 4 }}
          >
            <Box>
              <Heading
                as="h5"
                display="block"
                pb={2}
                fontSize="md"
                fontWeight="semibold"
              >
                Request ID:{" "}
                <Text as="span" fontWeight="normal">
                  {request_id}
                </Text>
              </Heading>
              <Heading
                as="h5"
                display="block"
                fontSize="md"
                fontWeight="semibold"
              >
                Status:{" "}
                <Text as="span" fontWeight="normal" textTransform="capitalize">
                  {request_status}
                </Text>
              </Heading>
            </Box>
            <Flex
              width="100%"
              gap="1rem"
              justifyContent={{ base: "space-between", md: "end" }}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Button
                size="sm"
                bgColor="#FF7A00"
                color="white"
                _hover={{ bgColor: "orange.500" }}
                leftIcon={<UilEye />}
                onClick={toggleRequestCardDetailsModal}
              >
                View Request
              </Button>
              <Button
                size="sm"
                bgColor="gray.200"
                color="black"
                _hover={{ bgColor: "gray.300" }}
                leftIcon={<UilTrashAlt />}
                onClick={toggleDeleteConfirmationModal}
              >
                Delete Request
              </Button>

              {location.pathname === "/requestor" &&
                request_data?.ticket_id &&
                request_data?.status !== "fulfilled" && (
                  <Button
                    as="a"
                    href={`/requestor/map/${request_data?.ticket_id}/${parsed_user_data.user_type}/${parsed_user_data.fullName}`}
                    size="sm"
                    display="inline-flex"
                    gap={1}
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
      {request_data !== undefined && (
        <>
          <RequestCardDetailsModal
            isOpen={isOpenRequestCardDetailsModal}
            onClose={toggleRequestCardDetailsModal}
            request_data={request_data}
          />
          <DeleteConfirmationModal
            refetch={refetch}
            queryKey={queryKey}
            id={request_id}
            URL="request/requestor"
            subject="request"
            isOpen={isOpenDeleteConfirmationModal}
            onClose={toggleDeleteConfirmationModal}
          />
        </>
      )}
    </>
  );
};

export default React.memo(RequestCard);
