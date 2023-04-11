import React, { useState } from "react";
import ModalContainer from "../global/ModalContainer";
import {
  FormControl,
  FormLabel,
  Input,
  ModalBody,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT;

const AdministratorAddAmbulanceModal = ({ handleOpenModal, isOpen }) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const makeAmbulance = (new_ambulance) => {
    return axios.post(`${ENDPOINT}ambulance`, new_ambulance);
  };

  const mutation = useMutation({
    mutationFn: makeAmbulance,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      toast({
        title: "Ambulance created.",
        description: "Ambulance is successfully created.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      queryClient.invalidateQueries(["admin_all_informations"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    mutation.mutate(data);
    handleOpenModal();
  };

  return (
    <ModalContainer
      header="REGISTER"
      header_detail="New Ambulance "
      isOpen={isOpen}
      onClose={handleOpenModal}
    >
      <ModalBody my={4}>
        <Box as="form" onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel>License Plate</FormLabel>
            <Input type="text" name="license_plate" />
          </FormControl>
          <Button
            type="sumbmit"
            mt={4}
            width="100%"
            bgColor="custom.primary"
            color="white"
            _hover={{ bgColor: "orange.500" }}
          >
            Submit
          </Button>
        </Box>
      </ModalBody>
    </ModalContainer>
  );
};

export default React.memo(AdministratorAddAmbulanceModal);
