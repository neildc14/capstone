import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";

const DeleteConfirmationModal = ({ id, URL, isOpen, onClose, subject }) => {
  
  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      size={{ base: "xs", md: "md", lg: "lg" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you sure that you want to delete this {subject}?</Text>
        </ModalBody>
        <ModalFooter>
          <Flex width="100%" gap="1rem" justifyContent={{ base: "end" }}>
            <Button size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              size="sm"
              bgColor="red.500"
              color="gray.50"
              _hover={{ bgColor: "red.400" }}
            >
              Delete Request
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
