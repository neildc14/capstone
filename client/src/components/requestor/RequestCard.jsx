import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { UilEye, UilTrashAlt } from "@iconscout/react-unicons";
import RequestCardDetailsModal from "./RequestCardDetailsModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal";

const RequestCard = ({
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
              <Heading as="h5" display="block" pb={2} fontSize="md">
                request_id:{" "}
                <Text as="span" fontWeight="normal">
                  {request_id}
                </Text>
              </Heading>
              <Heading as="h5" display="block" fontSize="md">
                status:{" "}
                <Text as="span" fontWeight="normal" textTransform="capitalize">
                  {request_status}
                </Text>
              </Heading>
            </Box>
            <Flex
              width="100%"
              gap="1rem"
              justifyContent={{ base: "space-between", md: "end" }}
            >
              <Button
                size="sm"
                leftIcon={<UilEye />}
                onClick={toggleRequestCardDetailsModal}
              >
                View Full Details
              </Button>
              <Button
                size="sm"
                bgColor="red.500"
                color="gray.50"
                _hover={{ bgColor: "red.400" }}
                leftIcon={<UilTrashAlt />}
                onClick={toggleDeleteConfirmationModal}
              >
                Delete Request
              </Button>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
      <RequestCardDetailsModal
        isOpen={isOpenRequestCardDetailsModal}
        onClose={toggleRequestCardDetailsModal}
        request_data={request_data}
      />
      <DeleteConfirmationModal
        subject="request"
        isOpen={isOpenDeleteConfirmationModal}
        onClose={toggleDeleteConfirmationModal}
      />
    </>
  );
};

export default RequestCard;
