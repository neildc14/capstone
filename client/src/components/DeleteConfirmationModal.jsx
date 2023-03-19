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
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const DeleteConfirmationModal = ({ id, URL, isOpen, onClose, subject }) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const deleteRequest = async () => {
    const delete_recent_request = await axios.delete(`${ENDPOINT}${URL}/${id}`);
    return delete_recent_request;
  };

  const deleteURL = useMutation({
    mutationFn: deleteRequest,
    onSettled: () => {
      queryClient.invalidateQueries(["ambulance_request_with_ticket"]);
    },
    onSuccess: () => {
      toast({
        title: "URL deleted.",
        description: "Request is successfully deleted.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    },
  });

  const deleteRecentRequestFunction = (e) => {
    e.preventDefault();
    deleteURL.mutate(`${ENDPOINT}${URL}/${id}`);
  };

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
              onClick={deleteRecentRequestFunction}
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
