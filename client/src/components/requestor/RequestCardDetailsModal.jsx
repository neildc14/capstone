import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Heading,
} from "@chakra-ui/react";

const RequestCardDetailsModal = ({ request_data, onClose, isOpen }) => {
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size={{ base: "xs", md: "md", lg: "lg" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontWeight="semibold" fontSize="md">
          Request ID:{" "}
          <Text as="span" fontWeight="normal">
            {request_data._id}
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Heading as="h6" fontSize="md" mb={2} fontWeight="semibold">
            Requestor Name:{" "}
            <Text as="span" fontWeight="normal" textTransform="capitalize">
              {request_data["requestor_id"].fullName}
            </Text>
          </Heading>
          <Heading as="h6" mb={2} fontSize="md" fontWeight="semibold">
            Pick-up Location:{" "}
            <Text as="span" fontWeight="normal" textTransform="capitalize">
              {request_data.pickup_location}
            </Text>
          </Heading>
          <Heading as="h6" mb={2} fontSize="md" fontWeight="semibold">
            Transfer Location:{" "}
            <Text as="span" fontWeight="normal" textTransform="capitalize">
              {request_data.transfer_location && request_data.transfer_location}
            </Text>
          </Heading>
          <Heading as="h6" mb={2} fontSize="md" fontWeight="semibold">
            Referral Slip:{" "}
          </Heading>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RequestCardDetailsModal;